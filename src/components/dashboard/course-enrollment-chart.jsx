"use client"

import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export default function MonthlyTargetChart({ courseCount, coursesLastMonth }) {
  const percent = courseCount && coursesLastMonth
    ? ((coursesLastMonth / courseCount) * 100).toFixed(2)
    : 0;

  const chartData = [
    {
      name: "Target",
      value: parseFloat(percent),
      fill: "url(#enrollmentGradient)",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Course Enrollment</CardTitle>
        <CardDescription>{coursesLastMonth} new courses this month</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-8">
        <div className="relative">
          <ChartContainer config={{ value: { label: "Enrollment" } }} className="mx-auto aspect-square h-[180px]">
            <RadialBarChart
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius="80%"
              outerRadius="100%"
              barSize={20}
            >
              <defs>
                <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl font-bold">{percent}%</p>
            <p className="text-xs bg-green-500/20 text-green-400 rounded-full px-2 py-0.5 mt-1">
              +{coursesLastMonth} new
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          {coursesLastMonth} out of {courseCount} total courses this month
        </p>
      </CardContent>
    </Card>
  );
}
