import { Controller, FieldValues, RegisterOptions, Path } from "react-hook-form";
import { FormFieldProps } from "./types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface Option {
    label: string;
    value: string;
}

interface FormSelectWithPaginationProps<TFieldValues extends FieldValues = FieldValues>
    extends FormFieldProps<TFieldValues> {
    options: Option[];
    onLoadMore?: (page: number, search?: string) => void;
    hasMore?: boolean;
    isLoading?: boolean;
    searchable?: boolean;
}

export function FormSelectWithPagination<TFieldValues extends FieldValues = FieldValues>({
    name,
    control,
    label,
    placeholder,
    rules,
    errors,
    options,
    required = false,
    onLoadMore,
    hasMore = false,
    isLoading = false,
    searchable = false,
    ...rest
}: FormSelectWithPaginationProps<TFieldValues>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (isOpen && onLoadMore) {
            onLoadMore(1, searchTerm);
        }
    }, [isOpen]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
        if (onLoadMore) {
            onLoadMore(1, value);
        }
    };

    const handleLoadMore = () => {
        if (hasMore && !isLoading && onLoadMore) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            onLoadMore(nextPage, searchTerm);
        }
    };

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={name} className="block font-medium">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules as RegisterOptions<TFieldValues, Path<TFieldValues>>}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        onOpenChange={setIsOpen}
                        {...rest}
                    >
                        <SelectTrigger id={name}>
                            <SelectValue placeholder={placeholder || label} />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            {searchable && (
                                <div className="border-b p-2">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            placeholder="Tìm kiếm..."
                                            value={searchTerm}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="max-h-[200px] overflow-y-auto">
                                {options.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="border-t p-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleLoadMore}
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        {isLoading ? "Đang tải..." : "Tải thêm"}
                                    </Button>
                                </div>
                            )}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors?.[name] && (
                <p className="mt-1 text-sm text-red-500">{String(errors[name]?.message)}</p>
            )}
        </div>
    );
}
