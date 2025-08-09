Ok, mình sẽ viết lại toàn bộ hướng dẫn **cài đặt Git, Node.js, npm, pnpm, Docker** kèm theo **các lệnh Docker cơ bản** dưới dạng Markdown, chỉ dành riêng cho **Windows**.

````markdown
# Hướng dẫn cài đặt Git, Node.js, npm, pnpm và Docker trên Windows

## 1. Cài đặt Git

1. Truy cập [https://git-scm.com/download/win](https://git-scm.com/download/win).
2. Tải bản cài đặt `.exe` (64-bit nếu máy hỗ trợ).
3. Chạy file cài đặt, giữ nguyên các tùy chọn mặc định (nếu không có yêu cầu đặc biệt).
4. Sau khi cài xong, mở **Command Prompt** hoặc **PowerShell** và kiểm tra:
    ```bash
    git --version
    ```
````

---

## 2. Cài đặt Node.js (tích hợp npm)

> npm sẽ được cài tự động khi cài Node.js.

1. Truy cập [https://nodejs.org/](https://nodejs.org/).
2. Tải bản **LTS** (khuyến nghị).
3. Chạy file `.msi` và tick vào tùy chọn **Add to PATH**.
4. Kiểm tra sau khi cài:

    ```bash
    node -v
    npm -v
    ```

---

## 3. Cài đặt pnpm

> pnpm là công cụ quản lý package nhanh hơn và tiết kiệm dung lượng hơn npm.

Cài qua npm (khuyến nghị):

```bash
npm install -g pnpm
```

Kiểm tra:

```bash
pnpm -v
```

---

## 4. Cài đặt Docker Desktop

1. Truy cập [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
2. Tải **Docker Desktop for Windows**.
3. Chạy file `.exe` và làm theo hướng dẫn.
4. Sau khi cài xong:
    - Mở **Docker Desktop** và bật tùy chọn **Start Docker Desktop when you log in** nếu muốn chạy tự động.
    - Nếu máy chưa bật **WSL 2** hoặc **Hyper-V**, Docker sẽ hướng dẫn bạn bật.

5. Kiểm tra phiên bản Docker:

    ```bash
    docker --version
    docker compose version
    ```

---

## 5. Các lệnh Docker cơ bản

### 5.1 Kiểm tra thông tin Docker

```bash
docker info
```

### 5.2 Tìm kiếm image trên Docker Hub

```bash
docker search <tên_image>
```

Ví dụ:

```bash
docker search nginx
```

### 5.3 Tải image từ Docker Hub

```bash
docker pull <tên_image>:<tag>
```

Ví dụ:

```bash
docker pull nginx:latest
```

### 5.4 Chạy container

```bash
docker run -d --name <tên_container> -p <port_host>:<port_container> <tên_image>
```

Ví dụ:

```bash
docker run -d --name mynginx -p 8080:80 nginx
```

### 5.5 Liệt kê container

```bash
docker ps            # container đang chạy
docker ps -a         # tất cả container (kể cả đã dừng)
```

### 5.6 Dừng / Xóa container

```bash
docker stop <tên_container hoặc ID>
docker rm <tên_container hoặc ID>
```

### 5.7 Xóa image

```bash
docker rmi <tên_image hoặc ID>
```

### 5.8 Xem log container

```bash
docker logs -f <tên_container>
```

### 5.9 Sử dụng Docker Compose

Tạo file `docker-compose.yml`:

```yaml
version: "3"
services:
    web:
        image: nginx:latest
        ports:
            - "8080:80"
```

Chạy:

```bash
docker compose up -d
```

Dừng:

```bash
docker compose down
```

---

## 6. Kiểm tra toàn bộ công cụ

Sau khi cài xong, kiểm tra tất cả phiên bản:

```bash
git --version
node -v
npm -v
pnpm -v
docker --version
docker compose version
```

## 7. Chạy dự án

Front end: (sau khi cài đặt pnpm)

```bash
pnpm run dev
```

Tạo 1 file .env ở thư mục gốc và dán cái dưới vào

```bash
VITE_API_URL=http://localhost:5123
```

Backend: (sau khi cài đặt docker)

```bash
docker compose -d --build
```

Tạo 1 file .env ở thư mục gốc và dán cái dưới vào

```bash
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=go_db
BE_PORT=5000

CLOUDINARY_CLOUD_NAME=dbuulcdnd
CLOUDINARY_API_KEY=183415744639643
CLOUDINARY_API_SECRET=S6VZQROGWMwE_jbkHWTHYzjq6Jo
```
