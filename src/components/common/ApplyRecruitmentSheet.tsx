"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import ApplyRecruitmentForm from "../forms/ApplyRecruitmentForm";

export function ApplyRecruitmentSheet({
    open,
    onClose,
    recruitmentId,
}: {
    open: boolean;
    onClose: () => void;
    recruitmentId: number;
}) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right" className="max-w-md">
                <SheetHeader>
                    <SheetTitle>Ứng tuyển vị trí</SheetTitle>
                    <SheetDescription>
                        Điền thông tin và tải CV để gửi đến nhà tuyển dụng.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-4">
                    <ApplyRecruitmentForm recruitmentId={recruitmentId} onClose={onClose} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
