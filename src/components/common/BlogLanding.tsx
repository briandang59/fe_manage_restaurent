import images from "@/assets/images";
import Image from "../ui/image";

function BlogLanding() {
    return (
        <div className="flex flex-col gap-4 rounded-[10px] border border-gray-200 bg-white p-4 shadow-md">
            <Image
                src={images.banner}
                alt="Blog Banner"
                className="h-[300px] w-full rounded-[10px] object-cover"
            />
            <h3 className="text-center text-[22px] font-bold">Warm Atmosphere</h3>
            <p className="text-center text-[16px] text-gray-500">
                Step into our cozy space filled with traditional Vietnamese decor and the aroma of
                authentic spices.
            </p>
        </div>
    );
}

export default BlogLanding;
