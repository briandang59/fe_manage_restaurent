import Image from "../ui/image";

// Định nghĩa Props để nhận dữ liệu động
interface FeatureCardProps {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
}

export default function FeatureCard({ title, description, imageUrl, imageAlt }: FeatureCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-[10px] border border-gray-200 bg-white p-4 shadow-md">
            <Image
                src={imageUrl}
                alt={imageAlt}
                className="h-[300px] w-full rounded-[10px] object-cover"
            />
            <h3 className="text-center text-[22px] font-bold">{title}</h3>
            <p className="text-center text-[16px] text-gray-500">{description}</p>
        </div>
    );
}
