import { Locate } from "lucide-react";

function InformationSections() {
    return (
        <div className="flex items-center gap-4">
            <Locate className="h-6 w-6 text-amber-300" />
            <p className="text-[20px] font-bold text-amber-300">123 Đường Phố, Quận 1, TP.HCM</p>
        </div>
    );
}

export default InformationSections;
