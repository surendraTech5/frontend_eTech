import StatsCard from "@/components/dashboard/stats-card";
import { UsersRound, ShoppingBag } from "lucide-react";
import MonthlySalesChart from "@/components/dashboard/user-activity-chart";
import MonthlyTargetChart from "@/components/dashboard/course-enrollment-chart";
import SalesOverTimeChart from "@/components/dashboard/sales-over-time-chart";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        <StatsCard
          title="Customers"
          value="3,782"
          change="11.01%"
          icon={UsersRound}
          trend="up"
          gradientFrom="hsl(var(--chart-1))"
          gradientTo="hsl(var(--chart-2))"
        />
        <StatsCard
          title="Orders"
          value="5,359"
          change="9.05%"
          icon={ShoppingBag}
          trend="down"
          gradientFrom="hsl(var(--chart-3))"
          gradientTo="hsl(var(--chart-4))"
        />
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <MonthlySalesChart />
        </div>
        <div className="lg:col-span-2">
            <MonthlyTargetChart />
        </div>
      </div>
      <div>
        <SalesOverTimeChart />
      </div>
    </div>
  );
} 