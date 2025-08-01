# React Query Hooks cho Menu Items

## Tổng quan

File `useMenuItem.ts` chứa các React Query hooks để quản lý menu items với đầy đủ chức năng CRUD.

## Các Hooks có sẵn

### 1. `useMenuItems()`
Lấy danh sách tất cả menu items.

```typescript
const { data, isLoading, error } = useMenuItems()
```

### 2. `useMenuItem(id: string)`
Lấy chi tiết một menu item theo ID.

```typescript
const { data, isLoading, error } = useMenuItem("item-id")
```

### 3. `useCreateMenuItem()`
Tạo mới menu item.

```typescript
const createMutation = useCreateMenuItem()

const handleCreate = async () => {
  try {
    await createMutation.mutateAsync({
      name: "Phở bò",
      category: "Món chính",
      price: 45000,
      status: "active",
      description: "Phở bò truyền thống"
    })
  } catch (error) {
    console.error("Lỗi khi tạo:", error)
  }
}
```

### 4. `useUpdateMenuItem()`
Cập nhật menu item.

```typescript
const updateMutation = useUpdateMenuItem()

const handleUpdate = async () => {
  try {
    await updateMutation.mutateAsync({
      id: "item-id",
      name: "Phở bò cải tiến",
      price: 50000
    })
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error)
  }
}
```

### 5. `useDeleteMenuItem()`
Xóa menu item.

```typescript
const deleteMutation = useDeleteMenuItem()

const handleDelete = async (id: string) => {
  try {
    await deleteMutation.mutateAsync(id)
  } catch (error) {
    console.error("Lỗi khi xóa:", error)
  }
}
```

### 6. `useToggleMenuItemStatus()`
Thay đổi trạng thái menu item (active/inactive).

```typescript
const toggleMutation = useToggleMenuItemStatus()

const handleToggle = async (id: string, newStatus: "active" | "inactive") => {
  try {
    await toggleMutation.mutateAsync({ id, status: newStatus })
  } catch (error) {
    console.error("Lỗi khi thay đổi trạng thái:", error)
  }
}
```

### 7. `useSearchMenuItems(searchTerm: string)`
Tìm kiếm menu items.

```typescript
const { data, isLoading } = useSearchMenuItems("phở")
```

## Kiểu dữ liệu

### MenuItem
```typescript
interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  status: "active" | "inactive"
  description: string
  image?: string
  createdAt?: string
  updatedAt?: string
}
```

### CreateMenuItemRequest
```typescript
interface CreateMenuItemRequest {
  name: string
  category: string
  price: number
  status: "active" | "inactive"
  description: string
  image?: string
}
```

### UpdateMenuItemRequest
```typescript
interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {
  id: string
}
```

## Query Keys

Các query keys được tổ chức theo cấu trúc:

```typescript
menuQueryKeys = {
  all: ["menu"]
  lists: () => ["menu", "list"]
  list: (filters) => ["menu", "list", { filters }]
  details: () => ["menu", "detail"]
  detail: (id) => ["menu", "detail", id]
}
```

## Cache Management

- **Stale Time**: 5 phút cho queries, 2 phút cho search
- **GC Time**: 10 phút cho queries, 5 phút cho search
- **Auto Invalidation**: Tự động invalidate cache khi có mutations
- **Optimistic Updates**: Cập nhật cache ngay lập tức cho một số operations

## Error Handling

Tất cả hooks đều có error handling tích hợp:

```typescript
const { data, isLoading, error } = useMenuItems()

if (error) {
  console.error("Lỗi:", error)
  // Hiển thị thông báo lỗi
}
```

## Loading States

Sử dụng `isLoading` và `isPending` để hiển thị loading states:

```typescript
const { isLoading } = useMenuItems()
const { isPending } = useCreateMenuItem()

if (isLoading) {
  return <div>Đang tải...</div>
}

if (isPending) {
  return <div>Đang xử lý...</div>
}
``` 