import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import attachmentApis from "@/apis/attachmentApis";

// Hook để lấy danh sách files
export const useAttachments = (page: number, pageSize: number) => {
    return useQuery({
        queryKey: ["attachments", page, pageSize],
        queryFn: async () => {
            return await attachmentApis.getFiles(page, pageSize);
        },
    });
};

// Hook để lấy file theo ID
export const useAttachmentById = (id: string) => {
    return useQuery({
        queryKey: ["attachment", id],
        queryFn: async () => {
            return await attachmentApis.getFileById(id);
        },
        enabled: !!id,
    });
};

// Hook để upload file
export const useUploadAttachment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: File) => {
            return await attachmentApis.uploadFile(file);
        },
        onSuccess: () => {
            // Invalidate và refetch danh sách attachments
            queryClient.invalidateQueries({ queryKey: ["attachments"] });
        },
    });
};

// Hook để xóa file
export const useDeleteAttachment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return await attachmentApis.deleteFile(id);
        },
        onSuccess: () => {
            // Invalidate và refetch danh sách attachments
            queryClient.invalidateQueries({ queryKey: ["attachments"] });
        },
    });
};

// Hook để download file
export const useDownloadAttachment = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            return await attachmentApis.downloadFile(id);
        },
    });
};
