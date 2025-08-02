import { Button } from "@/components/ui/button"
import { File, Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { useMenuItems, useDeleteMenuItem, useCreateMenuItem, useUpdateMenuItem } from "@/utils/hooks/useMenuItem"
import { useState } from "react"
import { createMenuColumns } from "@/utils/constants/cols"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MenuItemForm } from "@/components/forms/MenuItemForm"
import { MenuItemResponse } from "@/types/response/menuItem"
import toast from "react-hot-toast"

function ManageMenu() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItemResponse | null>(null)
  
  const { data: menuData, isLoading, error } = useMenuItems(page, pageSize)
  const deleteMutation = useDeleteMenuItem()
  const createMenuItemMutation = useCreateMenuItem()
  const updateMenuItemMutation = useUpdateMenuItem()
  const paginationData = menuData?.pagination
  const totalPages = paginationData ? Math.ceil(paginationData.total / paginationData.page_size) : 1
  const totalItems = paginationData?.total || 0
  const menuItems = menuData?.data || []

  const handleCreate = async (data: Partial<MenuItemResponse>) => {
    try {
      const createData = {
        name: data.name || "",
        price: Number(data.price) || 0,
        description: data.description || "",
      }
      await createMenuItemMutation.mutateAsync(createData)
      toast.success("Tạo món ăn thành công")
      setIsCreateDialogOpen(false)
    } catch (error: any) {
      toast.error(`${error.message}` || "Có lỗi xảy ra khi tạo món ăn")
    }
  }

  const handleUpdate = async (data: Partial<MenuItemResponse>) => {
    try {
      if (!data.id) {
        toast.error("ID món ăn không tồn tại")
        return
      }
      const updateData = {
        name: data.name || "",
        price: Number(data.price) || 0,
        description: data.description || "",
        id: data.id.toString()
      }
      await updateMenuItemMutation.mutateAsync(updateData)
      toast.success("Cập nhật món ăn thành công")
      setIsUpdateDialogOpen(false)
      setSelectedItem(null)
    } catch (error: any) {
      toast.error(`${error.message}` || "Có lỗi xảy ra khi cập nhật món ăn")
    }
  }

  const handleEditClick = (item: MenuItemResponse) => {
    setSelectedItem(item)
    setIsUpdateDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      toast.success("Xóa món ăn thành công!")
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa món ăn")
    }
  }

  const menuColumns = createMenuColumns(handleEditClick, handleDelete, deleteMutation.isPending)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải dữ liệu...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Có lỗi xảy ra khi tải dữ liệu</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Thực đơn</h1>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                <span>Thêm mới</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm món ăn mới</DialogTitle>
              </DialogHeader>
              <MenuItemForm
                onSubmit={handleCreate}
                mode="create"
                isLoading={false}
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <File className="h-4 w-4 mr-2" />
            <span>Nhập từ Excel</span>
          </Button>
        </div>
      </div>
      
      <DataTable 
        columns={menuColumns} 
        data={menuItems} 
        page={page - 1} 
        pageSize={pageSize}
        setPage={(newPage) => setPage(newPage + 1)} 
        setPageSize={setPageSize}
        totalPages={totalPages}
        totalItems={totalItems}
      />

      {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật món ăn</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <MenuItemForm
              onSubmit={handleUpdate}
              initialData={selectedItem}
              mode="update"
              isLoading={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ManageMenu