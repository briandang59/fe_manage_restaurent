export function toSlug(input: string): string {
    return (
        input
            // chuẩn hoá và bỏ dấu (tiếng Việt & Latin nói chung)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            // chữ đ/Đ
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            // về lowercase
            .toLowerCase()
            // thay mọi ký tự không phải a-z0-9 bằng dấu gạch
            .replace(/[^a-z0-9]+/g, "-")
            // bỏ bớt gạch thừa ở đầu/cuối
            .replace(/^-+|-+$/g, "")
    );
}
