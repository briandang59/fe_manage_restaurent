import { ColumnDef } from "@tanstack/react-table"
import { MenuItemResponse } from "@/types/response/menuItem"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { useDeleteMenuItem, useToggleMenuItemStatus } from "@/utils/hooks/useMenuItem"
import { toast } from "sonner"

export const menuColumns: ColumnDef<MenuItemResponse>[] = [
  {
    accessorKey: "name",
    header: "Tên món",
  },
  {
    accessorKey: "price",
    header: "Giá (VNĐ)",
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      return new Intl.NumberFormat("vi-VN").format(price)
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === "Available" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {status === "Available" ? "Hoạt động" : "Tạm ngưng"}
        </span>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      const menuItem = row.original
      const deleteMutation = useDeleteMenuItem()
      const toggleStatusMutation = useToggleMenuItemStatus()

      const handleDelete = async () => {
        if (confirm("Bạn có chắc chắn muốn xóa món này?")) {
          try {
            await deleteMutation.mutateAsync(menuItem.id.toString())
            toast.success("Xóa món ăn thành công!")
          } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa món ăn")
          }
        }
      }

      const handleToggleStatus = async () => {
        const newStatus = menuItem.status === "Available" ? "Unavailable" : "Available"
        try {
          await toggleStatusMutation.mutateAsync({ id: menuItem.id.toString(), status: newStatus as "active" | "inactive" })
          toast.success("Cập nhật trạng thái thành công!")
        } catch (error) {
          toast.error("Có lỗi xảy ra khi cập nhật trạng thái")
        }
      }

      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleToggleStatus}
            disabled={toggleStatusMutation.isPending}
          >
            {menuItem.status === "Available" ? "Tạm ngưng" : "Kích hoạt"}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
] 