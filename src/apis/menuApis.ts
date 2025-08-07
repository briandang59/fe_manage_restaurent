import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { CreateMenuItemRequest } from "@/utils/hooks/useMenuItem";
import { MenuItemResponse } from "@/types/response/menuItem";
import { ApiResponse } from "@/types/response/pagination";

const menuApis = {
    getMenu: async (page: number, pageSize: number): Promise<ApiResponse<MenuItemResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.menuItems}`, {
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

    getMenuItemById: async (id: string): Promise<BaseResponse<MenuItemResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.menuItems}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createMenuItem: async (
        data: CreateMenuItemRequest
    ): Promise<BaseResponse<MenuItemResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.menuItems}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateMenuItem: async (
        id: string,
        data: Partial<CreateMenuItemRequest>
    ): Promise<BaseResponse<MenuItemResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.menuItems}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteMenuItem: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.menuItems}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default menuApis;
