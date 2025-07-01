"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", sales: 189 },
  { month: "Feb", sales: 212 },
  { month: "Mar", sales: 380 },
  { month: "Apr", sales: 220 },
  { month: "May", sales: 190 },
  { month: "Jun", sales: 250 },
  { month: "Jul", sales: 290 },
  { month: "Aug", sales: 150 },
  { month: "Sep", sales: 260 },
  { month: "Oct", sales: 410 },
  { month: "Nov", sales: 320 },
  { month: "Dec", sales: 180 },
]

export default function MonthlySalesChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Monthly new user registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Users",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
               <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent
                  indicator="dot"
                  labelClassName="font-semibold"
                  className="bg-card border-border shadow-lg"
                />}
              />
              <Bar dataKey="sales" fill="url(#salesGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 