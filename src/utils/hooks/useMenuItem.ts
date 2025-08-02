import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import menuApis from "@/apis/menuApis";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { MenuItemResponse } from "@/types/response/menuItem";


// Định nghĩa kiểu dữ liệu cho request tạo mới
export interface CreateMenuItemRequest {
  name: string;
  price: number;
  description: string;
  status?: string;
}

// Định nghĩa kiểu dữ liệu cho request cập nhật
export interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {
  id: string;
}

// Query Keys
export const menuQueryKeys = {
  all: ["menu"] as const,
  lists: () => [...menuQueryKeys.all, "list"] as const,
  list: (filters: string) => [...menuQueryKeys.lists(), { filters }] as const,
  details: () => [...menuQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...menuQueryKeys.details(), id] as const,
};

// Hook để lấy danh sách menu items
export const useMenuItems = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: [...menuQueryKeys.lists(), page, pageSize],
    queryFn: async (): Promise<ApiResponse<MenuItemResponse>> => {
      return await menuApis.getMenu(page, pageSize);
    },
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

// Hook để lấy chi tiết một menu item
export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: menuQueryKeys.detail(id),
    queryFn: async (): Promise<BaseResponse<MenuItemResponse>> => {
      // Giả sử có API getMenuItemById
      return await menuApis.getMenuItemById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook để tạo mới menu item
export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMenuItemRequest): Promise<BaseResponse<MenuItemResponse>> => {
      return await menuApis.createMenuItem(data);
    },
    onSuccess: () => {
      // Invalidate và refetch danh sách menu
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() });
    },
    onError: (error) => {
      console.error("Lỗi khi tạo menu item:", error);
    },
  });
};

// Hook để cập nhật menu item
export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMenuItemRequest): Promise<BaseResponse<MenuItemResponse>> => {
      return await menuApis.updateMenuItem(data.id, data);
    },
    onSuccess: (data, variables) => {
      // Invalidate queries liên quan
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.detail(variables.id) });
      
      // Cập nhật cache cho item cụ thể
      queryClient.setQueryData(
        menuQueryKeys.detail(variables.id),
        data
      );
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật menu item:", error);
    },
  });
};

// Hook để xóa menu item
export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<BaseResponse<void>> => {
      return await menuApis.deleteMenuItem(id);
    },
    onSuccess: (_, deletedId) => {
      // Invalidate danh sách menu
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() });
      
      // Xóa item khỏi cache
      queryClient.removeQueries({ queryKey: menuQueryKeys.detail(deletedId) });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa menu item:", error);
    },
  });
};


