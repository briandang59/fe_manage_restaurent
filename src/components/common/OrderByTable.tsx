import images from "@/assets/images";
import Image from "../ui/image";
import { Button } from "../ui/button";

function OrderByTable() {
    return (
        <div className="min-h-[500px] rounded-[10px] border border-gray-200 p-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[24px] font-bold text-orange-600">Bàn 4</h3>
                <h3 className="text-gray-600">Danh sách món cần làm</h3>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src={images.banner}
                            alt="order image"
                            width={50}
                            height={50}
                            className="size-[70px] rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="text-[20px] font-medium">Món 1</p>
                            <p className="text-[16px] text-gray-700">Số lương</p>
                        </div>
                    </div>

                    <Button>Đã xong</Button>
                </div>
            </div>
        </div>
    );
}

export default OrderByTable;
