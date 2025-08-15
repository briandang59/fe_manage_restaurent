import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { IngredientResponse } from "@/types/response/ingredients";

interface IngredientRequest {
    name: string;
    quantity: number;
}

const ingredientApis = {
    getIngredient: async (
        page: number,
        pageSize: number
    ): Promise<ApiResponse<IngredientResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.ingredients}`, {
                params: {
                    page,
                    page_size: pageSize,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getIngredientById: async (id: string): Promise<BaseResponse<IngredientResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.ingredients}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createIngredient: async (
        data: IngredientRequest
    ): Promise<BaseResponse<IngredientResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.ingredients}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateIngredient: async (
        id: string,
        data: Partial<IngredientRequest>
    ): Promise<BaseResponse<IngredientResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.ingredients}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteIngredient: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.ingredients}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default ingredientApis;
