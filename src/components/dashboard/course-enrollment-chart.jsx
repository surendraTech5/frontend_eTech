"use client"

import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

const chartData = [{ name: "Target", value: 75.55, fill: "url(#enrollmentGradient)" }]

const chartConfig = {
  value: {
    label: "Enrollment",
    color: "hsl(var(--chart-3))",
  },
}

export default function MonthlyTargetChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Course Enrollment</CardTitle>
        <CardDescription>Monthly enrollment target progress</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-8">
        <div className="relative">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[180px]"
          >
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
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                background={{ fill: 'hsl(var(--muted))' }}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-bold">75.55%</p>
              <p className="text-xs bg-green-500/20 text-green-400 rounded-full px-2 py-0.5 mt-1">+10%</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">You earn $3287 today, it's higher than last month. Keep up your good work!</p>
        <div className="flex justify-between w-full mt-6 text-xs gap-4">
          <div className="text-center">
            <p className="text-muted-foreground">Target</p>
            <p className="font-bold flex items-center justify-center">$20K <span className="text-red-500 ml-1">↓</span></p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Revenue</p>
            <p className="font-bold flex items-center justify-center">$20K <span className="text-green-500 ml-1">↑</span></p>
          </div>
           <div className="text-center">
            <p className="text-muted-foreground">Today</p>
            <p className="font-bold flex items-center justify-center">$20K <span className="text-green-500 ml-1">↑</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 