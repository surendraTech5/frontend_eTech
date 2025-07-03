import StatsCard from "@/components/dashboard/stats-card";
import { UsersRound, BookOpen,GraduationCap,Presentation  } from "lucide-react";
import MonthlySalesChart from "@/components/dashboard/user-activity-chart";
import MonthlyTargetChart from "@/components/dashboard/course-enrollment-chart";
import SalesOverTimeChart from "@/components/dashboard/sales-over-time-chart";
import { getDashboardstats } from "../config/liveapi";
import { useEffect, useState } from "react";

 export default function Dashboard() {
  const [stats, setStats] = useState({
    userCount: 0,
    courseCount: 0,
    subjectCount: 0,
    lectureCount: 0,
    usersLastMonth: 0,
    coursesLastMonth: 0,
    lecturesLastMonth: 0,
    subjectLastMonth: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await getDashboardstats(token);
        if (res.success) {
          setStats(res);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        <StatsCard
          title="Number Of Users"
          change={`${stats.usersLastMonth} new`}
          value={stats.userCount.toLocaleString() || "0"}
          trend={stats.usersLastMonth > 0 ? "up" : "down"}
          icon={UsersRound}
          gradientFrom="hsl(var(--chart-1))"
          gradientTo="hsl(var(--chart-2))"
        />
        <StatsCard
          title="Number Of Courses"
          value={stats.courseCount.toLocaleString()}
           icon={GraduationCap}
           change={`${stats.coursesLastMonth} new`}
  trend={stats.coursesLastMonth > 0 ? "up" : "down"}
          gradientFrom="hsl(var(--chart-3))"
          gradientTo="hsl(var(--chart-4))"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        <StatsCard
          title="Number Of Lectures"
          value={stats.lectureCount.toLocaleString()}
          change={`${stats.lecturesLastMonth} new`}
  trend={stats.lecturesLastMonth > 0 ? "up" : "down"}
           icon={Presentation}
         gradientFrom="hsl(var(--chart-3))"
          gradientTo="hsl(var(--chart-4))"
        />
        <StatsCard
          title="Number Of Subjects"
          icon={BookOpen}
          value={stats.subjectCount.toLocaleString()}
          change={`${stats.subjectLastMonth} new`}
  trend={stats.subjectLastMonth > 0 ? "up" : "down"}
          gradientFrom="hsl(var(--chart-1))"
          gradientTo="hsl(var(--chart-2))"
        />
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <MonthlySalesChart usersLastMonth={stats.usersLastMonth}/>
        </div>
        <div className="lg:col-span-2">
            <MonthlyTargetChart
            courseCount={stats.courseCount}
            coursesLastMonth={stats.coursesLastMonth} />
        </div>
      </div>
      <div>
        <SalesOverTimeChart />
      </div>
    </div>
  );
} 