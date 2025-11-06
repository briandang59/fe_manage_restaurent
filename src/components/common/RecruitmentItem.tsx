"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ApplyRecruitmentSheet } from "./ApplyRecruitmentSheet";

interface RecruitmentItemProps {
    id: number;
    title: string;
    content: string;
    is_open: boolean;
}

export default function RecruitmentItem({ id, title, content, is_open }: RecruitmentItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card className="border border-gray-200 shadow-md transition-all hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="text-[20px] font-bold">{title}</span>
                        <span
                            className={`rounded px-2 py-1 text-sm ${
                                is_open ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                        >
                            {is_open ? "Đang tuyển" : "Ngừng tuyển"}
                        </span>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div
                        className="prose prose-sm max-w-full"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {is_open && (
                        <div className="pt-4">
                            <Button onClick={() => setOpen(true)}>Ứng tuyển ngay</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <ApplyRecruitmentSheet open={open} onClose={() => setOpen(false)} recruitmentId={id} />
        </>
    );
}
