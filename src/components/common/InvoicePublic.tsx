import { OrderResponse } from "@/types/response/order";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { useRef } from "react";
import dayjs from "dayjs";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";

interface OrderItem {
    menu_item_id: number;
    menu_item: {
        name: string;
        price: number;
    };
    quantity: number;
    amount: number;
}

interface InvoicePublicProps {
    order: OrderResponse;
    orderItems: OrderItem[];
    totalAmount: number;
    onClose?: () => void;
}

function InvoicePublic({ order, orderItems, totalAmount, onClose }: InvoicePublicProps) {
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
                                * { box-sizing: border-box; }
                                body { 
                                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                                    margin: 0; 
                                    padding: 20px; 
                                    background: white;
                                    color: #333;
                                    line-height: 1.6;
                                }
                                
                                .invoice-container {
                                    max-width: 800px;
                                    margin: 0 auto;
                                    background: white;
                                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                                    border-radius: 8px;
                                    overflow: hidden;
                                }
                                
                                .invoice-header { 
                                    text-align: center; 
                                    padding: 15px 0;
                                    background: white;
                                    color: #000;
                                    border-bottom: 1px solid #333;
                                }
                                .invoice-title { 
                                    font-size: 18px; 
                                    font-weight: bold; 
                                    margin-bottom: 5px;
                                }
                                .invoice-subtitle {
                                    font-size: 14px;
                                    margin-bottom: 10px;
                                    font-weight: 600;
                                }
                                .invoice-address {
                                    font-size: 10px;
                                    color: #666;
                                }
                                
                                .invoice-info { 
                                    display: flex; 
                                    justify-content: space-between; 
                                    margin: 15px 0;
                                    gap: 20px;
                                }
                                .info-card {
                                    flex: 1;
                                    background: white;
                                    padding: 0;
                                }
                                .info-title {
                                    font-size: 12px;
                                    font-weight: bold;
                                    color: #000;
                                    margin-bottom: 5px;
                                }
                                .info-item {
                                    margin-bottom: 3px;
                                    font-size: 11px;
                                }
                                .status-badge {
                                    display: inline-block;
                                    padding: 2px 4px;
                                    border: 1px solid #333;
                                    font-size: 9px;
                                    font-weight: bold;
                                }
                                
                                .invoice-details { 
                                    margin: 15px 0; 
                                }
                                .details-title {
                                    font-size: 14px;
                                    font-weight: bold;
                                    color: #000;
                                    margin-bottom: 10px;
                                }
                                .invoice-table { 
                                    width: 100%; 
                                    border-collapse: collapse; 
                                    margin-bottom: 15px;
                                    background: white;
                                    border: 1px solid #333;
                                }
                                .invoice-table th { 
                                    background: #f0f0f0;
                                    color: #000;
                                    padding: 4px 6px;
                                    text-align: left;
                                    font-weight: bold;
                                    font-size: 10px;
                                    border: 1px solid #333;
                                }
                                .invoice-table td { 
                                    padding: 4px 6px;
                                    border: 1px solid #333;
                                    font-size: 10px;
                                    color: #000;
                                }
                                .invoice-table tr:nth-child(even) {
                                    background: #f9f9f9;
                                }
                                
                                .invoice-total { 
                                    background: white;
                                    padding: 0;
                                    margin: 10px 0;
                                    text-align: right;
                                }
                                .total-label {
                                    font-size: 11px;
                                    font-weight: bold;
                                    color: #000;
                                }
                                .total-amount {
                                    font-size: 11px;
                                    font-weight: bold;
                                    color: #000;
                                }
                                
                                .invoice-footer { 
                                    margin-top: 20px; 
                                    text-align: center; 
                                    padding: 10px 0;
                                    background: white;
                                }
                                .footer-thanks {
                                    font-size: 11px;
                                    font-weight: bold;
                                    color: #000;
                                    margin-bottom: 5px;
                                }
                                .footer-tagline {
                                    font-size: 10px;
                                    color: #000;
                                }
                                
                                @media print {
                                    body { 
                                        margin: 0; 
                                        padding: 15px;
                                        -webkit-print-color-adjust: exact;
                                        print-color-adjust: exact;
                                    }
                                    .no-print { display: none !important; }
                                    .invoice-container {
                                        box-shadow: none;
                                        border-radius: 0;
                                    }
                                    .invoice-header {
                                        -webkit-print-color-adjust: exact;
                                        print-color-adjust: exact;
                                    }
                                    .invoice-table th {
                                        -webkit-print-color-adjust: exact;
                                        print-color-adjust: exact;
                                    }
                                    .invoice-total {
                                        -webkit-print-color-adjust: exact;
                                        print-color-adjust: exact;
                                    }
                                    @page {
                                        margin: 0.5in;
                                        size: A4;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <div class="invoice-container">
                                ${invoiceRef.current.innerHTML}
                            </div>
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
                            * { box-sizing: border-box; }
                            body { 
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                                margin: 0; 
                                padding: 20px; 
                                background: white;
                                color: #333;
                                line-height: 1.6;
                            }
                            
                            .invoice-container {
                                max-width: 800px;
                                margin: 0 auto;
                                background: white;
                                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                                border-radius: 8px;
                                overflow: hidden;
                            }
                            
                            .invoice-header { 
                                text-align: center; 
                                padding: 15px 0;
                                background: white;
                                color: #000;
                                border-bottom: 1px solid #333;
                            }
                            .invoice-title { 
                                font-size: 18px; 
                                font-weight: bold; 
                                margin-bottom: 5px;
                            }
                            .invoice-subtitle {
                                font-size: 14px;
                                margin-bottom: 10px;
                                font-weight: 600;
                            }
                            .invoice-address {
                                font-size: 10px;
                                color: #666;
                            }
                            
                            .invoice-info { 
                                display: flex; 
                                justify-content: space-between; 
                                margin: 15px 0;
                                gap: 20px;
                            }
                            .info-card {
                                flex: 1;
                                background: white;
                                padding: 0;
                            }
                            .info-title {
                                font-size: 12px;
                                font-weight: bold;
                                color: #000;
                                margin-bottom: 5px;
                            }
                            .info-item {
                                margin-bottom: 3px;
                                font-size: 11px;
                            }
                            .status-badge {
                                display: inline-block;
                                padding: 2px 4px;
                                border: 1px solid #333;
                                font-size: 9px;
                                font-weight: bold;
                            }
                            
                            .invoice-details { 
                                margin: 15px 0; 
                            }
                            .details-title {
                                font-size: 14px;
                                font-weight: bold;
                                color: #000;
                                margin-bottom: 10px;
                            }
                            .invoice-table { 
                                width: 100%; 
                                border-collapse: collapse; 
                                margin-bottom: 15px;
                                background: white;
                                border: 1px solid #333;
                            }
                            .invoice-table th { 
                                background: #f0f0f0;
                                color: #000;
                                padding: 4px 6px;
                                text-align: left;
                                font-weight: bold;
                                font-size: 10px;
                                border: 1px solid #333;
                            }
                            .invoice-table td { 
                                padding: 4px 6px;
                                border: 1px solid #333;
                                font-size: 10px;
                                color: #000;
                            }
                            .invoice-table tr:nth-child(even) {
                                background: #f9f9f9;
                            }
                            
                            .invoice-total { 
                                background: white;
                                padding: 0;
                                margin: 10px 0;
                                text-align: right;
                            }
                            .total-label {
                                font-size: 11px;
                                font-weight: bold;
                                color: #000;
                            }
                            .total-amount {
                                font-size: 11px;
                                font-weight: bold;
                                color: #000;
                            }
                            
                            .invoice-footer { 
                                margin-top: 20px; 
                                text-align: center; 
                                padding: 10px 0;
                                background: white;
                            }
                            .footer-thanks {
                                font-size: 11px;
                                font-weight: bold;
                                color: #000;
                                margin-bottom: 5px;
                            }
                            .footer-tagline {
                                font-size: 10px;
                                color: #000;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="invoice-container">
                            ${content}
                        </div>
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
        <div className="mx-auto max-w-4xl bg-white p-8 shadow-2xl">
            <div ref={invoiceRef} className="space-y-8">
                {/* Header */}
                <div className="border-b border-gray-300 pb-4 text-center">
                    <div className="mb-3">
                        <h1 className="text-xl font-bold text-black">HÓA ĐƠN THANH TOÁN</h1>
                        <h2 className="mt-1 text-base font-semibold text-black">Nhà hàng ABC</h2>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                        <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
                        <p>Điện thoại: 0123-456-789</p>
                    </div>
                </div>

                {/* Invoice Info */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <p className="text-sm">
                            <span className="font-semibold">Mã hóa đơn:</span> #{order.id}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Ngày tạo:</span>{" "}
                            {dayjs(order.created_at).format("DD/MM/YYYY HH:mm")}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Nhân viên:</span> ID {order.employee_id}
                        </p>
                    </div>

                    <div className="space-y-2 text-right">
                        <p className="text-sm">
                            <span className="font-semibold">Trạng thái:</span>{" "}
                            {order.status === "pending"
                                ? "Chờ xử lý"
                                : order.status === "completed"
                                  ? "Hoàn thành"
                                  : order.status === "cancelled"
                                    ? "Đã hủy"
                                    : "Không xác định"}
                        </p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3">
                    <h3 className="text-base font-bold text-black">Chi tiết đơn hàng</h3>
                    <div className="border border-gray-300">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border-r border-gray-300 px-2 py-2 text-left text-xs font-bold text-black">
                                        STT
                                    </th>
                                    <th className="border-r border-gray-300 px-2 py-2 text-left text-xs font-bold text-black">
                                        Tên món
                                    </th>
                                    <th className="border-r border-gray-300 px-2 py-2 text-center text-xs font-bold text-black">
                                        Số lượng
                                    </th>
                                    <th className="border-r border-gray-300 px-2 py-2 text-right text-xs font-bold text-black">
                                        Đơn giá
                                    </th>
                                    <th className="px-2 py-2 text-right text-xs font-bold text-black">
                                        Thành tiền
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr
                                        key={item.menu_item_id}
                                        className="border-t border-gray-300"
                                    >
                                        <td className="border-r border-gray-300 px-2 py-2 text-xs text-black">
                                            {index + 1}
                                        </td>
                                        <td className="border-r border-gray-300 px-2 py-2 text-xs text-black">
                                            {item.menu_item.name}
                                        </td>
                                        <td className="border-r border-gray-300 px-2 py-2 text-center text-xs text-black">
                                            {item.quantity}
                                        </td>
                                        <td className="border-r border-gray-300 px-2 py-2 text-right text-xs text-black">
                                            {formatNumberWithCommas(item.menu_item.price)} VNĐ
                                        </td>
                                        <td className="px-2 py-2 text-right text-xs text-black">
                                            {formatNumberWithCommas(item.amount)} VNĐ
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Total */}
                <div className="text-right">
                    <p className="text-sm font-bold text-black">
                        Tổng cộng: {formatNumberWithCommas(totalAmount)} VNĐ
                    </p>
                </div>

                {/* Footer */}
                <div className="pt-4 text-center">
                    <div className="space-y-1 text-sm text-black">
                        <p className="font-semibold">Cảm ơn quý khách đã sử dụng dịch vụ!</p>
                        <p>Hẹn gặp lại quý khách lần sau</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="no-print mt-8 flex justify-center gap-4">
                <Button
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
                >
                    <Printer className="h-4 w-4" />
                    In hóa đơn
                </Button>
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex items-center gap-2 border-amber-600 text-amber-600 hover:bg-amber-50"
                >
                    <Download className="h-4 w-4" />
                    Tải xuống
                </Button>
                {onClose && (
                    <Button onClick={onClose} variant="outline" className="border-gray-300">
                        Đóng
                    </Button>
                )}
            </div>
        </div>
    );
}

export default InvoicePublic;
