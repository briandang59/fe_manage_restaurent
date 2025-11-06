import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { BaseResponse } from "@/types/response/baseResponse";
import recruitmentApis from "@/apis/recruitmentApis";
import { RecruitmentResponseType } from "@/types/response/recruitment";

export interface RecruitmentRequest {
    title: string;
    content: string;
    is_open?: boolean;
}

export const recruitmentQueryKeys = {
    all: ["recruitment"] as const,
    lists: () => [...recruitmentQueryKeys.all, "list"] as const,
    list: (filters: string) => [...recruitmentQueryKeys.lists(), { filters }] as const,
    details: () => [...recruitmentQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...recruitmentQueryKeys.details(), id] as const,
};

// ✅ GET LIST
export const useRecruitments = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...recruitmentQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<RecruitmentResponseType>> => {
            return await recruitmentApis.getRecruitments(page, pageSize, search);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

// ✅ CREATE
export const useCreateRecruitment = (): UseMutationResult<
    BaseResponse<RecruitmentResponseType>,
    Error,
    RecruitmentRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: RecruitmentRequest
        ): Promise<BaseResponse<RecruitmentResponseType>> => {
            return await recruitmentApis.createRecruitment(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo tin tuyển dụng:", error);
        },
    });
};

// ✅ UPDATE
export const useUpdateRecruitment = (): UseMutationResult<
    BaseResponse<RecruitmentResponseType>,
    Error,
    RecruitmentRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: RecruitmentRequest & { id: string }
        ): Promise<BaseResponse<RecruitmentResponseType>> => {
            return await recruitmentApis.updateRecruitment(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật tin tuyển dụng:", error);
        },
    });
};
