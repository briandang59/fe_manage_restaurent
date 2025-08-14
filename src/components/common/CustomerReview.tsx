import images from "@/assets/images";
import Image from "../ui/image";

function CustomerReview() {
    return (
        <div className="flex min-h-[300px] flex-col gap-4 rounded-[10px] border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <Image src={images.logo} alt="avatar" className="size-[50px] rounded-full" />
                <h3 className="text-[18px] font-bold">Trần Quang Việt</h3>
            </div>
            <p className="mt-4 text-[18px] font-medium italic leading-relaxed text-gray-700">
                "Món ăn ở đây thật tuyệt vời! Tôi đã thưởng thức phở và bún riêu, hương vị rất đậm
                đà và đúng chất Việt Nam. Không gian quán cũng rất ấm cúng và thân thiện."
            </p>
        </div>
    );
}

export default CustomerReview;
