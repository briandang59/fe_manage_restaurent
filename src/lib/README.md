# Token Management System

## Tổng quan

Hệ thống quản lý token được thiết kế để tự động xử lý authentication trong ứng dụng.

## Các thành phần chính

### 1. `tokenManager.ts`
Utility functions để quản lý token trong localStorage.

```typescript
import { tokenManager } from "@/lib/tokenManager";

// Lấy token
const token = tokenManager.getToken();

// Lưu token
tokenManager.setToken("your-jwt-token");

// Xóa token
tokenManager.removeToken();

// Kiểm tra có token không
const hasToken = tokenManager.hasToken();

// Lấy token với Bearer prefix
const bearerToken = tokenManager.getBearerToken();
```

### 2. `axiosInstance.ts`
Axios instance được cấu hình để tự động:
- Thêm token vào header Authorization cho mọi request
- Xử lý lỗi 401 (Unauthorized) - tự động xóa token và redirect
- Xử lý các lỗi network khác

### 3. `useAuth.ts`
React hook để quản lý authentication state và actions.

```typescript
import { useAuth } from "@/utils/hooks/useAuth";

const { 
  isAuthenticated, 
  isTokenValid, 
  isLoading, 
  login, 
  logout 
} = useAuth();

// Login
await login("username", "password");

// Logout
await logout();
```

## Cách hoạt động

### 1. Login Flow
1. User nhập username/password
2. Gọi API login
3. Nếu thành công, token được lưu vào localStorage
4. Tự động redirect về dashboard

### 2. Request Flow
1. Mỗi request sẽ tự động thêm token vào header
2. Format: `Authorization: Bearer <token>`
3. Nếu không có token, request vẫn được gửi (cho public APIs)

### 3. Error Handling
1. Nếu nhận được lỗi 401 (Unauthorized)
2. Token sẽ bị xóa khỏi localStorage
3. User được redirect về trang login
4. Các request tiếp theo sẽ không có token

### 4. Token Verification
- Hook `useAuth` có thể verify token với server
- Kiểm tra token có hợp lệ không
- Tự động logout nếu token không hợp lệ

## Sử dụng trong Components

### Login Component
```typescript
import { useAuth } from "@/utils/hooks/useAuth";

const LoginComponent = () => {
  const { login, isLoading } = useAuth();

  const handleSubmit = async (username: string, password: string) => {
    try {
      await login(username, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### Protected Route
```typescript
import { useAuth } from "@/utils/hooks/useAuth";

const ProtectedComponent = () => {
  const { isAuthenticated, isTokenValid } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isTokenValid) {
    return <div>Token không hợp lệ</div>;
  }

  return <div>Protected content</div>;
};
```

### API Calls
```typescript
// Token sẽ tự động được thêm vào header
const { data } = useMenuItems();
```

## Environment Variables

Đảm bảo có file `.env` với:

```env
VITE_API_URL=http://localhost:3000/api
```

## Security Considerations

1. **Token Storage**: Token được lưu trong localStorage (có thể thay đổi thành sessionStorage nếu cần)
2. **Token Expiration**: Tự động xử lý khi token hết hạn
3. **HTTPS**: Đảm bảo sử dụng HTTPS trong production
4. **Token Refresh**: Có thể thêm logic refresh token nếu cần

## Troubleshooting

### Token không được gửi
- Kiểm tra token có trong localStorage không
- Kiểm tra tên key "token" có đúng không
- Kiểm tra console có lỗi gì không

### Lỗi 401 liên tục
- Token có thể đã hết hạn
- Kiểm tra format token có đúng không
- Kiểm tra server có nhận đúng header Authorization không

### Redirect không hoạt động
- Kiểm tra React Router đã được setup chưa
- Kiểm tra path "/login" có tồn tại không 