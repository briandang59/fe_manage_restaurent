import images from "@/assets/images";
import BlogLanding from "@/components/common/BlogLanding";
import CustomerReview from "@/components/common/CustomerReview";
import InformationSections from "@/components/common/InformationSection";
import MenuUI from "@/components/common/MenuUI";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { useMenuItems } from "@/utils/hooks/useMenuItem";

function Home() {
    const { data: menuItems } = useMenuItems(1, 6);
    return (
        <div>
            <div className="grid min-h-[700px] bg-gradient-to-tr from-orange-600 to-amber-500 p-[96px_32px]">
                <div className="container mx-auto grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-[40px] font-bold text-white">
                            Trải nghiệm cái tâm của Việt Nam
                        </h2>
                        <span className="text-[18px] text-white">
                            Hãy thưởng thức hương vị chính thống trong một không gian ấm áp và chào
                            đón, nơi mỗi món ăn đều kể một câu chuyện về truyền thống ẩm thực Việt
                            Nam. Từ những tô phở thơm lừng buổi sáng, bát bún riêu đậm đà buổi trưa,
                            cho đến những món ăn đường phố dân dã nhưng đầy tinh tế, tất cả đều được
                            chế biến từ nguyên liệu tươi ngon và tâm huyết của người đầu bếp. Chúng
                            tôi tin rằng ẩm thực không chỉ là món ăn, mà còn là ký ức, cảm xúc và sự
                            kết nối giữa con người với con người. Hãy đến để cảm nhận trọn vẹn nét
                            đẹp văn hóa và hương vị đậm đà của quê hương Việt Nam.
                        </span>
                        <div className="flex items-center gap-4">
                            <Button className="bg-white text-orange-600 hover:bg-white">
                                Đặt bàn
                            </Button>
                            <Button className="border border-white bg-transparent text-white hover:bg-transparent">
                                Xem menu
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image
                            src={images.banner}
                            alt="banner"
                            className="h-[500px] rounded-[10px]"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex flex-col gap-4 p-[96px_32px]">
                <h2 className="text-center text-[32px] font-bold">
                    Trải Nghiệm Việt Nam Đích Thực
                </h2>
                <p className="mx-auto mt-2 w-[700px] text-center text-[20px] font-normal text-gray-700">
                    Hãy đắm mình trong nền văn hóa phong phú của Việt Nam qua từng miếng ăn. Không
                    gian được chúng tôi chăm chút kỹ lưỡng để mang đến trải nghiệm ẩm thực khó quên.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <BlogLanding />
                    <BlogLanding />
                    <BlogLanding />
                </div>
            </div>

            <div className="min-h-[500px] bg-[#FFFBEB] p-[96px_32px]">
                <div className="container mx-auto flex flex-col gap-4">
                    <h3 className="text-center text-[32px] font-bold">Món Ăn Đặc Sắc</h3>
                    <p className="mx-auto w-[700px] text-center text-[22px] text-gray-700">
                        Khám phá những món ăn được yêu thích nhất, mỗi món đều được chế biến với kỹ
                        thuật Việt Nam truyền thống và nguyên liệu tươi ngon nhất.
                    </p>
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        {menuItems?.data?.map((menuItem) => (
                            <MenuUI key={menuItem.id} menuItem={menuItem} type="home" />
                        ))}
                    </div>
                    <div className="mt-8 flex items-center justify-center">
                        <Button className="bg-orange-600 text-white hover:bg-orange-600">
                            Xem thực đơn
                        </Button>
                    </div>
                </div>
            </div>

            <div className="min-h-[500px] bg-white p-[96px_32px]">
                <div className="container mx-auto flex flex-col gap-4">
                    <h3 className="text-center text-[32px] font-bold">
                        Khách Hàng Nói Gì Về Chúng Tôi
                    </h3>
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <CustomerReview />
                        <CustomerReview />
                        <CustomerReview />
                    </div>
                </div>
            </div>

            <div className="bg-orange-600 p-[96px_32px]">
                <div className="container mx-auto grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-[32px] font-bold text-white">
                            Hãy Ghé Thăm Chúng Tôi Hôm Nay
                        </h3>
                        <div className="mt-8 flex flex-col gap-4">
                            <InformationSections />
                            <InformationSections />
                            <InformationSections />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image
                            src={images.banner}
                            alt="map"
                            className="ratio-3 h-[400px] w-[300px] rounded-[10px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
