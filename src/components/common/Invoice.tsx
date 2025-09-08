import { OrderResponse } from "@/types/response/order";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { useRef } from "react";
import dayjs from "dayjs";

interface InvoiceProps {
    order: OrderResponse;
    onClose?: () => void;
}

function Invoice({ order, onClose }: InvoiceProps) {
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (invoiceRef.current) {
            const printWindow = window.open("", "_blank");
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Hóa đơn #${order.id}</title>
                            <style>
                                body { font-family: Arial, sans-serif; margin: 20px; }
                                .invoice-header { text-align: center; margin-bottom: 30px; }
                                .invoice-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                                .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                                .invoice-details { margin-bottom: 30px; }
                                .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                                .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                                .invoice-table th { background-color: #f2f2f2; }
                                .invoice-total { text-align: right; font-size: 18px; font-weight: bold; }
                                .invoice-footer { margin-top: 50px; text-align: center; }
                                @media print {
                                    body { margin: 0; }
                                    .no-print { display: none; }
                                }
                            </style>
                        </head>
                        <body>
                            ${invoiceRef.current.innerHTML}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();
            }
        }
    };

    const handleDownload = () => {
        if (invoiceRef.current) {
            const content = invoiceRef.current.innerHTML;
            const blob = new Blob(
                [
                    `
                <html>
                    <head>
                        <title>Hóa đơn #${order.id}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            .invoice-header { text-align: center; margin-bottom: 30px; }
                            .invoice-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                            .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                            .invoice-details { margin-bottom: 30px; }
                            .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            .invoice-table th { background-color: #f2f2f2; }
                            .invoice-total { text-align: right; font-size: 18px; font-weight: bold; }
                            .invoice-footer { margin-top: 50px; text-align: center; }
                        </style>
                    </head>
                    <body>
                        ${content}
                    </body>
                </html>
            `,
                ],
                { type: "text/html" }
            );

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `hoa-don-${order.id}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="mx-auto max-w-4xl bg-white p-6">
            <div ref={invoiceRef}>
                {/* Header */}
                <div className="invoice-header">
                    <h1 className="invoice-title">HÓA ĐƠN THANH TOÁN</h1>
                    <p>Nhà hàng Mộc Quán</p>
                    <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
                    <p>Điện thoại: 0123-456-789</p>
                </div>

                {/* Invoice Info */}
                <div className="invoice-info">
                    <div>
                        <p>
                            <strong>Mã hóa đơn:</strong> #{order.id}
                        </p>
                        <p>
                            <strong>Ngày tạo:</strong>{" "}
                            {dayjs(order.created_at).format("DD/MM/YYYY HH:mm")}
                        </p>
                        <p>
                            <strong>Nhân viên:</strong> ID {order.employee_id}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Trạng thái:</strong>
                            <span
                                className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${
                                    order.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.status === "completed"
                                          ? "bg-green-100 text-green-800"
                                          : order.status === "cancelled"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {order.status === "pending"
                                    ? "Chờ xử lý"
                                    : order.status === "completed"
                                      ? "Hoàn thành"
                                      : order.status === "cancelled"
                                        ? "Đã hủy"
                                        : "Không xác định"}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="invoice-details">
                    <h3 className="mb-4 text-lg font-semibold">Chi tiết đơn hàng</h3>
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên món</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mock data - replace with actual order items */}
                            <tr>
                                <td>1</td>
                                <td>Phở Bò</td>
                                <td>2</td>
                                <td>50,000 VNĐ</td>
                                <td>100,000 VNĐ</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Bún Bò Huế</td>
                                <td>1</td>
                                <td>45,000 VNĐ</td>
                                <td>45,000 VNĐ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Total */}
                <div className="invoice-total">
                    <p>
                        Tổng cộng: <span className="text-2xl">145,000 VNĐ</span>
                    </p>
                </div>

                {/* Footer */}
                <div className="invoice-footer">
                    <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
                    <p>Hẹn gặp lại quý khách lần sau</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="no-print mt-6 flex justify-center gap-4">
                <Button onClick={handlePrint} className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    In hóa đơn
                </Button>
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <Download className="h-4 w-4" />
                    Tải xuống
                </Button>
                {onClose && (
                    <Button onClick={onClose} variant="outline">
                        Đóng
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Invoice;
