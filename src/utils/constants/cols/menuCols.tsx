import { ColumnDef } from "@tanstack/react-table"
import { MenuItemResponse } from "@/types/response/menuItem"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const createMenuColumns = (onEdit: (item: MenuItemResponse) => void, onDelete: (id: string) => void, isDeleting: boolean): ColumnDef<MenuItemResponse>[] => [
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

      return (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(menuItem)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa món "{menuItem.name}"? Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(menuItem.id.toString())}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
] 