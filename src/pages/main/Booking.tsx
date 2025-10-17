import InformationSection from "@/components/common/InformationSection";
import { FormArea } from "@/components/forms-component/FormArea";
import { FormDatepicker } from "@/components/forms-component/FormDatepicker";
import { FormInput } from "@/components/forms-component/FormInput";
import { FormTimePicker } from "@/components/forms-component/FormTimePicker";
import Image from "@/components/ui/image";
import images from "@/assets/images";
import { INFORMATION } from "@/utils/constants/common/information";
import { useForm } from "react-hook-form";
import { useCreateBooking } from "@/utils/hooks/useBooking";
import toast from "react-hot-toast";
import { BookingRequestType } from "@/types/request/booking";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useCreateCustomer } from "@/utils/hooks/useCustomer";

interface BookingFormProps {
    fullname: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    people: number;
    note: string;
}
function Booking() {
    const createBooking = useCreateBooking();
    const createCustomer = useCreateCustomer();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<any>({});
    const onSubmit = async (data: BookingFormProps) => {
        try {
            const payload: BookingRequestType = {
                booking_date: dayjs(data.date).format("YYYY/MM/DD"),
                booking_time: data.time,
                customer_name: data.fullname,
                email: data.email,
                memo: data.note,
                phone_number: data.phone,
                total_persons: Number(data.people),
            };
            await createBooking.mutateAsync(payload);
            await createCustomer.mutateAsync({
                full_name: data.fullname,
                phone_number: data.phone,
            });
            toast.success("Đặt bàn thành công");
        } catch (error) {
            toast.error(`${error}`);
        }
    };
    return (
        <div className="min-h-screen p-[96px_32px]">
            <div className="container mx-auto grid grid-cols-2 gap-4">
                <div className="h-fit w-full rounded-[10px] border border-gray-300 bg-white p-4 shadow-md">
                    <h3 className="text-[28px] font-bold text-orange-600">Thông Tin Đặt Bàn</h3>
                    <form className="flex flex-col gap-4 pt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-2">
                            <FormInput
                                control={control}
                                label="Họ và tên"
                                name="fullname"
                                errors={errors}
                                required
                                placeholder="Họ và tên"
                            />
                            <FormInput
                                control={control}
                                label="Số điện thoại"
                                name="phone"
                                errors={errors}
                                required
                                placeholder="Số điện thoại"
                            />
                        </div>
                        <FormInput
                            control={control}
                            label="Email"
                            name="email"
                            errors={errors}
                            required
                            placeholder="Email"
                        />
                        <div className="grid grid-cols-3 gap-2">
                            <FormDatepicker
                                control={control}
                                label="Ngày đặt bàn"
                                name="date"
                                errors={errors}
                                required
                                placeholder="Ngày đặt bàn"
                            />
                            <FormTimePicker
                                control={control}
                                label="Giờ đặt bàn"
                                name="time"
                                errors={errors}
                                required
                                placeholder="Giờ đặt bàn"
                            />
                            <FormInput
                                control={control}
                                label="Số người"
                                name="people"
                                errors={errors}
                                required
                                placeholder="Số người"
                            />
                        </div>
                        <FormArea
                            control={control}
                            label="Ghi chú"
                            name="note"
                            errors={errors}
                            required
                            placeholder="Ghi chú"
                        />
                        <Button type="submit">Xác nhận</Button>
                    </form>
                </div>
                <div className="flex flex-col gap-4 rounded-[10px] border border-gray-200 bg-white p-4 shadow-md">
                    <h3 className="text-[28px] font-bold text-orange-600">Thông Tin Nhà Hàng</h3>
                    <div className="flex flex-col gap-4">
                        {INFORMATION.map((item) => (
                            <InformationSection key={item.title} {...item} />
                        ))}
                    </div>
                    <Image
                        src={images.banner_booking}
                        alt="banner-booking"
                        className="my-8 rounded-[10px]"
                    />
                    <div className="rounded-[10px] border border-amber-500 bg-[#FFFBEB] p-4">
                        <h3 className="text-[20px] font-bold text-orange-600">Lưu Ý Đặt Bàn</h3>
                        <ul className="ml-4 list-disc">
                            <li className="text-[16px] font-normal text-gray-700">
                                Vui lòng đặt bàn trước ít nhất 2 giờ
                            </li>
                            <li className="text-[16px] font-normal text-gray-700">
                                Nhà hàng sẽ giữ bàn trong 15 phút kể từ giờ đặt
                            </li>
                            <li className="text-[16px] font-normal text-gray-700">
                                Đối với nhóm trên 8 người, vui lòng gọi trực tiếp
                            </li>
                            <li className="text-[16px] font-normal text-gray-700">
                                Có thể hủy hoặc thay đổi đặt bàn trước 1 giờ
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
