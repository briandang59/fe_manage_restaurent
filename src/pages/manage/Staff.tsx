import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCreateStaff, useDeleteStaff, useStaffs, useUpdateStaff } from "@/utils/hooks/useStaff";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import { createStaffColumns } from "@/utils/constants/cols/staffCols";
import { StaffResponse } from "@/types/response/staff";
import toast from "react-hot-toast";
import StaffForm from "@/components/forms/StaffForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";

function Staff() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState<StaffResponse | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data: staffData, isLoading, error } = useStaffs(page, pageSize);
  const paginationData = staffData?.pagination;
  const totalPages = paginationData
    ? Math.ceil(paginationData.total / paginationData.page_size)
    : 1;
  const totalItems = paginationData?.total || 0;
  const staffs = staffData?.data || [];

  const deleteMutation = useDeleteStaff();
  const createMutation = useCreateStaff();
  const updateMutation = useUpdateStaff();
  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Xóa nhân viên thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa nhân viên");
    }
  };

  const handleSubmitStaff = async (
    data: Partial<StaffResponse> & { role_id?: string | number }
  ) => {
    try {
      const gender = typeof data.gender === "boolean" ? data.gender : data.gender === "true";
      const commonData = {
        full_name: data.full_name || "",
        gender: gender,
        birthday: data.birthday || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        schedule_type: data.schedule_type || "",
        address: data.address || "",
        join_date: data.join_date || "",
        base_salary: Number(data.base_salary) || 0,
        salary_per_hour: Number(data.salary_per_hour) || 0,
        role_id: Number(data.role_id) || 0,
      };

      if (data.id) {
        // Cập nhật
        const updateData = {
          ...commonData,
          id: data.id.toString(),
        };
        await updateMutation.mutateAsync(updateData);
        toast.success("Cập nhật nhân viên thành công");
        setIsUpdateDialogOpen(false);
        setSelectedItem(null);
      } else {
        // Tạo mới
        await createMutation.mutateAsync(commonData);
        toast.success("Tạo nhân viên thành công");
        setIsCreateDialogOpen(false);
      }
    } catch (error: any) {
      toast.error(`${error.message}` || "Có lỗi xảy ra khi xử lý nhân viên");
    }
  };
  const handleEditClick = (item: StaffResponse) => {
    setSelectedItem(item);
    setIsUpdateDialogOpen(true);
  };

  const staffColumns = createStaffColumns(handleEditClick, handleDelete, deleteMutation.isPending);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  return (
    <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-[24px] font-bold">Nhân viên</h1>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} modal={true}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                <span>Thêm mới</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] w-[90vw] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Thêm nhân viên mới</DialogTitle>
              </DialogHeader>
              <StaffForm onSubmit={handleSubmitStaff} isLoading={createMutation.isPending} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DataTable
        columns={staffColumns}
        data={staffs}
        page={page - 1}
        pageSize={pageSize}
        setPage={(newPage) => setPage(newPage + 1)}
        setPageSize={setPageSize}
        totalPages={totalPages}
        totalItems={totalItems}
      />

      {/* Modal cập nhật nhân viên */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="max-h-[80vh] w-[90vw] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Cập nhật nhân viên</DialogTitle>
          </DialogHeader>
          <StaffForm
            onSubmit={handleSubmitStaff}
            isLoading={updateMutation.isPending}
            initialData={selectedItem}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Staff;
