interface InformationSectionProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function InformationSection({ icon, title, description }: InformationSectionProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex items-center justify-center">{icon}</div>
            <div className="flex flex-col gap-2">
                <p className="text-[18px] font-bold">{title}</p>
                <p className="text-[16px] text-gray-500">{description}</p>
            </div>
        </div>
    );
}

export default InformationSection;
