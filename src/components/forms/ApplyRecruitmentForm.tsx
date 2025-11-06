"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "../forms-component/FormInput";

import { useState } from "react";
import { useUploadAttachment } from "@/utils/hooks/useAttachments";
import { useCreateApplyRecruitment } from "@/utils/hooks/useApplyRecruitment";

interface FormData {
    fullname: string;
    email: string;
    phone_number: string;
}

export default function ApplyRecruitmentForm({
    recruitmentId,
    onClose,
}: {
    recruitmentId: number;
    onClose: () => void;
}) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            fullname: "",
            email: "",
            phone_number: "",
        },
    });

    const uploadMutation = useUploadAttachment();
    const createMutation = useCreateApplyRecruitment();

    const [cvId, setCvId] = useState<number | null>(null);

    const handleUploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const res = await uploadMutation.mutateAsync(e.target.files[0]);
        setCvId(res?.data?.id);
    };

    const onSubmit = (data: FormData) => {
        if (!cvId) return alert("Vui lòng upload CV");

        createMutation.mutate(
            {
                ...data,
                recruitment_id: recruitmentId,
                cv_id: cvId,
            },
            {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
            <FormInput
                control={control}
                label="Họ và tên"
                name="fullname"
                required
                errors={errors}
            />

            <FormInput control={control} label="Email" name="email" required errors={errors} />

            <FormInput
                control={control}
                label="Số điện thoại"
                name="phone_number"
                required
                errors={errors}
            />

            <div>
                <label className="block text-sm font-medium">Tải CV</label>
                <input type="file" onChange={handleUploadCV} />
                {cvId && <p className="text-sm text-green-600">✅ CV uploaded</p>}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Hủy
                </Button>

                <Button type="submit" disabled={!cvId || createMutation.isPending}>
                    {createMutation.isPending ? "Đang gửi..." : "Gửi đơn"}
                </Button>
            </div>
        </form>
    );
}
