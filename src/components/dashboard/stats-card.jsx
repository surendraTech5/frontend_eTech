import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatsCard({ title, value, change, icon: Icon, trend, gradientFrom, gradientTo }) {
    const gradientStyle = {
        background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
    };

    return (
        <Card className="group relative overflow-hidden transition-transform hover:scale-105 duration-300 ease-in-out">
            <div 
                className='absolute inset-0 opacity-20 blur-xl'
                style={gradientStyle}
            ></div>
            <div className="relative">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex flex-col space-y-1">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                        <div className="text-2xl font-bold">{value}</div>
                    </div>
                    <div 
                        className="flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground"
                        style={gradientStyle}
                    >
                        <Icon className="h-6 w-6" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-1 text-xs">
                        <span className={cn("flex items-center gap-1 font-semibold", trend === 'up' ? 'text-green-400' : 'text-red-400')}>
                            {trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                            {change}
                        </span>
                        <span className="text-muted-foreground">from last month</span>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
} 