import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import staffApis from "@/apis/staffApis";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { StaffResponse } from "@/types/response/staff";

// Định nghĩa kiểu dữ liệu cho request tạo mới
export interface CreateStaffRequest {
  full_name: string;
  gender: boolean;
  birthday: string;
  phone_number: string;
  email: string;
  schedule_type: string;
  address: string;
  join_date: string;
  base_salary: number;
  salary_per_hour: number;
  role_id: number;
}

// Định nghĩa kiểu dữ liệu cho request cập nhật
export interface UpdateStaffRequest extends Partial<CreateStaffRequest> {
  id: string;
}

// Query Keys
export const staffQueryKeys = {
  all: ["staff"] as const,
  lists: () => [...staffQueryKeys.all, "list"] as const,
  list: (filters: string) => [...staffQueryKeys.lists(), { filters }] as const,
  details: () => [...staffQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...staffQueryKeys.details(), id] as const,
};

// Hook để lấy danh sách staff
export const useStaffs = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: [...staffQueryKeys.lists(), page, pageSize],
    queryFn: async (): Promise<ApiResponse<StaffResponse>> => {
      return await staffApis.getStaff(page, pageSize);
    },
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

// Hook để tạo mới staff
export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateStaffRequest): Promise<BaseResponse<StaffResponse>> => {
      return await staffApis.createStaff(data);
    },
    onSuccess: () => {
      // Invalidate và refetch danh sách menu
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.lists() });
    },
    onError: (error) => {
      console.error("Lỗi khi tạo menu item:", error);
    },
  });
};

// Hook để cập nhật staff
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateStaffRequest): Promise<BaseResponse<StaffResponse>> => {
      return await staffApis.updateStaff(data.id, data);
    },
    onSuccess: (data, variables) => {
      // Invalidate queries liên quan
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.detail(variables.id) });

      // Cập nhật cache cho item cụ thể
      queryClient.setQueryData(staffQueryKeys.detail(variables.id), data);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật menu item:", error);
    },
  });
};

// Hook để xóa staff
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<BaseResponse<void>> => {
      return await staffApis.deleteStaff(id);
    },
    onSuccess: (_, deletedId) => {
      // Invalidate danh sách menu
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.lists() });

      // Xóa item khỏi cache
      queryClient.removeQueries({ queryKey: staffQueryKeys.detail(deletedId) });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa menu item:", error);
    },
  });
};
