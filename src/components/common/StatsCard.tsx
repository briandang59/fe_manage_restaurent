import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface StatsCardProps {
    title: string;
    isLoading: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode; // ✅ Cho phép truyền icon
}

const StatsCard = ({ title, isLoading, children, icon }: StatsCardProps) => {
    return (
        <Card className="rounded-2xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {icon && <span className="text-gray-500">{icon}</span>}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                {isLoading ? (
                    <div className="flex h-20 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                ) : (
                    <div className="space-y-1 text-sm text-gray-800">{children}</div>
                )}
            </CardContent>
        </Card>
    );
};

export default StatsCard;
