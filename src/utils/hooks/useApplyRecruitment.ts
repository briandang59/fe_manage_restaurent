import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { BaseResponse } from "@/types/response/baseResponse";
import recruitmentApis from "@/apis/applyRecruitmentApis";
import { RecruitmentResponseType } from "@/types/response/recruitment";

export interface ApplyRecruitmentPayload {
    recruitment_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    cv_id: number;
}

export const applyRecruitmentQueryKeys = {
    all: ["applyRecruitment"] as const,
    lists: () => [...applyRecruitmentQueryKeys.all, "list"] as const,
    list: (filters: string) => [...applyRecruitmentQueryKeys.lists(), { filters }] as const,
    details: () => [...applyRecruitmentQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...applyRecruitmentQueryKeys.details(), id] as const,
};

// ✅ GET LIST
export const useApplyRecruitments = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...applyRecruitmentQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<RecruitmentResponseType>> => {
            return await recruitmentApis.getApplyRecruitments(page, pageSize, search);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

// ✅ CREATE
export const useCreateApplyRecruitment = (): UseMutationResult<
    BaseResponse<RecruitmentResponseType>,
    Error,
    ApplyRecruitmentPayload
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: ApplyRecruitmentPayload
        ): Promise<BaseResponse<RecruitmentResponseType>> => {
            return await recruitmentApis.createApplyRecruitments(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applyRecruitmentQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi nộp ứng tuyển:", error);
        },
    });
};

// ✅ UPDATE
export const useUpdateApplyRecruitment = (): UseMutationResult<
    BaseResponse<RecruitmentResponseType>,
    Error,
    ApplyRecruitmentPayload & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: ApplyRecruitmentPayload & { id: string }
        ): Promise<BaseResponse<RecruitmentResponseType>> => {
            return await recruitmentApis.updateApplyRecruitments(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applyRecruitmentQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật ứng tuyển:", error);
        },
    });
};
