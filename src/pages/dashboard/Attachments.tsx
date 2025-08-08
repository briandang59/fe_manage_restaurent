import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    useAttachments,
    useUploadAttachment,
    useDeleteAttachment,
} from "@/utils/hooks/useAttachments";
import {
    Upload,
    File,
    Image,
    Trash2,
    Download,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { AttachmentResponse } from "@/types/response/attachment";
import urls from "@/utils/constants/common/urls";

function Attachments() {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(20);
    const [selectedFile, setSelectedFile] = useState<AttachmentResponse | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: attachmentsData, isLoading, error } = useAttachments(page, pageSize);
    const uploadMutation = useUploadAttachment();
    const deleteMutation = useDeleteAttachment();

    const attachments = attachmentsData?.data || [];
    const paginationData = attachmentsData?.pagination;
    const totalPages = paginationData
        ? Math.ceil(paginationData.total / paginationData.page_size)
        : 1;

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        try {
            for (let i = 0; i < files.length; i++) {
                await uploadMutation.mutateAsync(files[i]);
            }
            toast.success("Upload file thành công!");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi upload file");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa file thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa file");
        }
    };

    const handlePreview = (file: AttachmentResponse) => {
        setSelectedFile(file);
        setIsPreviewOpen(true);
    };

    const handleDownload = async (file: AttachmentResponse) => {
        const displayUrl = getImageUrl(file);
        const downloadUrl = getDownloadUrl(file);
        console.log("Display URL:", displayUrl);
        console.log("Download URL:", downloadUrl);

        // Kiểm tra nếu URL hiển thị là external URL
        const isExternalUrl =
            displayUrl.includes("cloudinary.com") ||
            (displayUrl.includes("http") && !displayUrl.includes(import.meta.env.VITE_API_URL));

        if (isExternalUrl) {
            // Với external URL, thử download qua API
            try {
                const response = await fetch(downloadUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = file.file_name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    toast.success("Tải xuống thành công!");
                } else {
                    // Fallback: Mở trong tab mới
                    window.open(displayUrl, "_blank");
                    toast.success("Đang mở file...");
                }
            } catch (error) {
                console.error("Download error:", error);
                // Fallback: Mở trong tab mới
                window.open(displayUrl, "_blank");
                toast.success("Đang mở file...");
            }
            return;
        }

        try {
            // Với internal URL, thử download
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = file.file_name;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Đang tải xuống file...");
        } catch (error) {
            console.error("Download error:", error);

            // Fallback: Sử dụng fetch API
            try {
                const response = await fetch(downloadUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = file.file_name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    toast.success("Tải xuống thành công!");
                } else {
                    toast.error("Không thể tải xuống file");
                }
            } catch (fetchError) {
                console.error("Fetch error:", fetchError);
                toast.error("Có lỗi xảy ra khi tải xuống file");
            }
        }
    };

    const getFileIcon = (fileName: string) => {
        if (!fileName) return <File className="h-8 w-8 text-gray-500" />;

        const extension = fileName.split(".").pop()?.toLowerCase();
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
            return <Image className="h-8 w-8 text-blue-500" />;
        }
        return <File className="h-8 w-8 text-gray-500" />;
    };

    const isImageFile = (fileName: string) => {
        if (!fileName) return false;
        const extension = fileName.split(".").pop()?.toLowerCase();
        return ["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "");
    };

    const getImageUrl = (file: AttachmentResponse) => {
        // Nếu có URL trực tiếp từ API và là external URL
        if (file.url) {
            return file.url;
        }

        // Tạo URL download từ API
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        return `${baseUrl}/${urls.api}/${urls.files}/${file.id}/download`;
    };

    const getDownloadUrl = (file: AttachmentResponse) => {
        // Luôn sử dụng API endpoint để download
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        return `${baseUrl}/${urls.api}/${urls.files}/${file.id}/download`;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-lg">Đang tải dữ liệu...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-lg text-red-600">Có lỗi xảy ra khi tải dữ liệu</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quản lý Files</h1>
                <div className="flex gap-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadMutation.isPending}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        {uploadMutation.isPending ? "Đang upload..." : "Upload Files"}
                    </Button>
                </div>
            </div>

            {/* File Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {attachments.map((file) => (
                    <div
                        key={file.id}
                        className="group relative rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                    >
                        {/* File Preview */}
                        <div className="mb-2 flex aspect-square items-center justify-center overflow-hidden rounded-md bg-white">
                            {isImageFile(file.file_name) ? (
                                <img
                                    src={getImageUrl(file)}
                                    alt={file.file_name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        // Fallback to icon if image fails to load
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.nextElementSibling?.classList.remove(
                                            "hidden"
                                        );
                                    }}
                                />
                            ) : null}
                            <div
                                className={`${isImageFile(file.file_name) ? "hidden" : ""} flex items-center justify-center`}
                            >
                                {getFileIcon(file.file_name)}
                            </div>
                        </div>

                        {/* File Info */}
                        <div className="text-center">
                            <p
                                className="truncate text-sm font-medium text-gray-900"
                                title={file.file_name || "Unknown file"}
                            >
                                {file.file_name || "Unknown file"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {formatFileSize(file.size || 0)}{" "}
                                {/* Using price field as file size temporarily */}
                            </p>
                            <p className="text-xs text-gray-400">{formatDate(file.created_at)}</p>
                        </div>

                        {/* Actions */}
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-0 opacity-0 transition-all duration-200 group-hover:bg-opacity-50 group-hover:opacity-100">
                            <div className="flex gap-1">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handlePreview(file)}
                                    className="h-8 w-8 p-0"
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>

                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleDownload(file)}
                                    className="h-8 w-8 p-0"
                                >
                                    <Download className="h-4 w-4" />
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="h-8 w-8 p-0"
                                            disabled={deleteMutation.isPending}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Bạn có chắc chắn muốn xóa file "
                                                {file.file_name || "Unknown file"}"? Hành động này
                                                không thể hoàn tác.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDelete(file.id.toString())}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                Xóa
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        Hiển thị {attachments.length} / {paginationData?.total || 0} files
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="flex items-center px-3 text-sm">
                        Trang {page} / {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Preview Dialog */}
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Xem trước file</DialogTitle>
                    </DialogHeader>
                    {selectedFile && (
                        <div className="space-y-4">
                            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                                {isImageFile(selectedFile.file_name) ? (
                                    <img
                                        src={getImageUrl(selectedFile)}
                                        alt={selectedFile.file_name}
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                            e.currentTarget.nextElementSibling?.classList.remove(
                                                "hidden"
                                            );
                                        }}
                                    />
                                ) : null}
                                <div
                                    className={`${isImageFile(selectedFile.file_name) ? "hidden" : ""} flex items-center justify-center`}
                                >
                                    {getFileIcon(selectedFile.file_name)}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p>
                                    <strong>Tên file:</strong>{" "}
                                    {selectedFile.file_name || "Unknown file"}
                                </p>
                                <p>
                                    <strong>Kích thước:</strong>{" "}
                                    {formatFileSize(selectedFile.size || 0)}
                                </p>
                                <p>
                                    <strong>Ngày tạo:</strong> {formatDate(selectedFile.created_at)}
                                </p>
                                <p>
                                    <strong>Mô tả:</strong>{" "}
                                    {selectedFile.mime_type || "Không có mô tả"}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleDownload(selectedFile)}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Tải xuống
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Attachments;
