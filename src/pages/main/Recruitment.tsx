"use client";

import RecruitmentItem from "@/components/common/RecruitmentItem";
import { useRecruitments } from "@/utils/hooks/useRecruitment";

export default function RecruitmentMainPage() {
    const { data: recruitmentData, isLoading } = useRecruitments(1, 100);

    if (isLoading) {
        return <p className="py-10 text-center">⏳ Đang tải...</p>;
    }

    const list = recruitmentData?.data ?? [];

    return (
        <div className="container mx-auto w-full space-y-4 p-4">
            <h1 className="mb-4 text-2xl font-bold">Danh sách tuyển dụng</h1>

            <div className="grid grid-cols-2 gap-4">
                {list.length === 0 ? (
                    <p className="text-center text-gray-500">Chưa có tin tuyển dụng.</p>
                ) : (
                    list.map((item) => (
                        <RecruitmentItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            content={item.content}
                            is_open={item.is_open}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
