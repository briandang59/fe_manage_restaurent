import { Button } from "@/components/ui/button"
import { File, Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { useMenuItems } from "@/utils/hooks/useMenuItem"
import { useState } from "react"
import { menuColumns } from "@/utils/constants/cols"

function ManageMenu() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data: menuData, isLoading, error } = useMenuItems(page, pageSize)

  const paginationData = menuData?.pagination
  const totalPages = paginationData ? Math.ceil(paginationData.total / paginationData.page_size) : 1
  const totalItems = paginationData?.total || 0
  const menuItems = menuData?.data || []

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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            <span>Thêm mới</span>
          </Button>
          <Button variant="outline">
            <File className="h-4 w-4 mr-2" />
            <span>Nhập từ Excel</span>
          </Button>
        </div>
      </div>
      
      <DataTable 
        columns={menuColumns} 
        data={menuItems} 
        page={page - 1} // Convert to 0-based index for DataTable
        pageSize={pageSize}
        setPage={(newPage) => setPage(newPage + 1)} // Convert back to 1-based index
        setPageSize={setPageSize}
        totalPages={totalPages}
        totalItems={totalItems}
      />
    </div>
  )
}

export default ManageMenu