import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { IngredientResponse } from "@/types/response/ingredients";
import ingredientApis from "@/apis/ingredientsApis";
import { BaseResponse } from "@/types/response/baseResponse";

interface IngredientRequest {
    name: string;
    quantity: number;
}

export const ingredientQueryKeys = {
    all: ["ingredient"] as const,
    lists: () => [...ingredientQueryKeys.all, "list"] as const,
    list: (filters: string) => [...ingredientQueryKeys.lists(), { filters }] as const,
    details: () => [...ingredientQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...ingredientQueryKeys.details(), id] as const,
};

export const useIngredients = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...ingredientQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<IngredientResponse>> => {
            return await ingredientApis.getIngredient(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateIngredient = (): UseMutationResult<
    BaseResponse<IngredientResponse>,
    Error,
    IngredientRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: IngredientRequest): Promise<BaseResponse<IngredientResponse>> => {
            return await ingredientApis.createIngredient(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ingredientQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo nguyên liệu:", error);
        },
    });
};

export const useUpdateIngredient = (): UseMutationResult<
    BaseResponse<IngredientResponse>,
    Error,
    IngredientRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: IngredientRequest & { id: string }
        ): Promise<BaseResponse<IngredientResponse>> => {
            return await ingredientApis.updateIngredient(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ingredientQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật nguyên liệu:", error);
        },
    });
};

export const useDeleteIngredient = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await ingredientApis.deleteIngredient(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ingredientQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa nguyên liệu:", error);
        },
    });
};
