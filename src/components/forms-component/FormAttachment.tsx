import { useState } from "react";
import { useController, Control, FieldError } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAttachments } from "@/utils/hooks/useAttachments";
import { AttachmentResponse } from "@/types/response/attachment";
import { Image, File, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FormAttachmentProps {
  control: Control<any>;
  name: string;
  label: string;
  errors?: FieldError;
  disabled?: boolean;
}

export function FormAttachment({ control, name, label, errors, disabled }: FormAttachmentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: attachmentsData, isLoading } = useAttachments(page, pageSize);
  const attachments = attachmentsData?.data || [];

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const selectedAttachment = attachments.find(att => att.id === value);

  const isImageFile = (fileName: string) => {
    if (!fileName) return false;
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  };

  const getFileIcon = (fileName: string) => {
    if (!fileName) return <File className="h-6 w-6 text-gray-500" />;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="h-6 w-6 text-blue-500" />;
    }
    return <File className="h-6 w-6 text-gray-500" />;
  };

  const getImageUrl = (file: AttachmentResponse) => {
    return file.url || `${import.meta.env.VITE_API_URL}/api/files/${file.id}/download`;
  };

  const filteredAttachments = attachments.filter(att => 
    att.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAttachment = (attachment: AttachmentResponse) => {
    onChange(attachment.id);
    setIsDialogOpen(false);
  };

  const handleRemoveAttachment = () => {
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Selected Attachment Display */}
      {selectedAttachment && (
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center overflow-hidden">
            {isImageFile(selectedAttachment.file_name) ? (
              <img 
                src={getImageUrl(selectedAttachment)} 
                alt={selectedAttachment.file_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`${isImageFile(selectedAttachment.file_name) ? 'hidden' : ''} flex items-center justify-center`}>
              {getFileIcon(selectedAttachment.file_name)}
            </div>
          </div>
          
                     <div className="flex-1 min-w-0">
             <p className="text-sm font-medium text-gray-900 truncate" title={selectedAttachment.file_name}>
               {selectedAttachment.file_name.length > 20 
                 ? selectedAttachment.file_name.substring(0, 20) + '...' 
                 : selectedAttachment.file_name}
             </p>
             <p className="text-xs text-gray-500">
               {(selectedAttachment.size / 1024 / 1024).toFixed(2)} MB
             </p>
           </div>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveAttachment}
            disabled={disabled}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Select Attachment Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-full justify-start"
          >
            {selectedAttachment ? "Thay đổi file" : "Chọn file"}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Chọn file</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* File Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
              {isLoading ? (
                <div className="col-span-full text-center py-8">
                  <div className="text-lg">Đang tải...</div>
                </div>
              ) : filteredAttachments.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Không tìm thấy file nào
                </div>
              ) : (
                filteredAttachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    onClick={() => handleSelectAttachment(attachment)}
                    className={`group cursor-pointer p-2 border rounded-lg hover:bg-gray-50 transition-colors ${
                      value === attachment.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="aspect-square bg-white rounded-md flex items-center justify-center mb-2 overflow-hidden">
                      {isImageFile(attachment.file_name) ? (
                        <img 
                          src={getImageUrl(attachment)} 
                          alt={attachment.file_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`${isImageFile(attachment.file_name) ? 'hidden' : ''} flex items-center justify-center`}>
                        {getFileIcon(attachment.file_name)}
                      </div>
                    </div>
                    
                                         <div className="text-center">
                       <p className="text-xs font-medium text-gray-900 truncate" title={attachment.file_name}>
                         {attachment.file_name.length > 15 
                           ? attachment.file_name.substring(0, 15) + '...' 
                           : attachment.file_name}
                       </p>
                       <p className="text-xs text-gray-500">
                         {(attachment.size / 1024 / 1024).toFixed(2)} MB
                       </p>
                     </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {attachmentsData?.pagination && attachmentsData.pagination.total > pageSize && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Trước
                </Button>
                <span className="flex items-center px-3 text-sm">
                  Trang {page} / {Math.ceil(attachmentsData.pagination.total / pageSize)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(attachmentsData.pagination.total / pageSize)}
                >
                  Sau
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {errors && (
        <p className="text-sm text-red-600">{errors.message}</p>
      )}
    </div>
  );
} 