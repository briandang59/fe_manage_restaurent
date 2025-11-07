"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FormInput } from "../forms-component/FormInput";
import JoditEditor from "jodit-react";
import { RecruitmentResponseType } from "@/types/response/recruitment";

export interface RecruitmentFormValues {
    title: string;
    content: string;
    is_open: boolean;
}

interface RecruitmentFormProps {
    onSubmit: (data: RecruitmentFormValues) => void;
    initialData?: Partial<RecruitmentResponseType>;
    isLoading?: boolean;
    mode: "create" | "update";
    onClose: () => void;
}

function RecruitmentForm({
    onSubmit,
    initialData,
    isLoading,
    mode,
    onClose,
}: RecruitmentFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RecruitmentFormValues>({
        defaultValues: {
            title: "",
            content: "",
            is_open: true,
        },
    });

    const contentValue = watch("content");

    // Load initial data
    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title ?? "",
                content: initialData.content ?? "",
                is_open: initialData.is_open ?? true,
            });
        }
    }, [initialData, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[calc(100vh-200px)] space-y-4 overflow-y-auto"
        >
            {/* TITLE */}
            <FormInput control={control} label="Tiêu đề" name="title" errors={errors} required />

            {/* CONTENT */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Nội dung</label>

                <JoditEditor
                    value={contentValue}
                    onChange={(value: string) => setValue("content", value)}
                />

                {errors.content && (
                    <p className="text-sm text-red-500">{String(errors.content.message)}</p>
                )}
            </div>

            {/* STATUS */}
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    onChange={(e) => setValue("is_open", e.target.checked)}
                    checked={watch("is_open")}
                />
                Đang tuyển
            </label>

            {/* BUTTON */}
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Hủy
                </Button>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang lưu..." : mode === "create" ? "Tạo mới" : "Cập nhật"}
                </Button>
            </div>
        </form>
    );
}

export default RecruitmentForm;
