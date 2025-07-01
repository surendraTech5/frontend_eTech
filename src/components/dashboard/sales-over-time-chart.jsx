"use client"
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const monthlyData = [
  { date: "Jan", value: 150 },
  { date: "Feb", value: 180 },
  { date: "Mar", value: 220 },
  { date: "Apr", value: 200 },
  { date: "May", value: 250 },
  { date: "Jun", value: 230 },
  { date: "Jul", value: 280 },
  { date: "Aug", value: 260 },
  { date: "Sep", value: 240 },
  { date: "Oct", value: 290 },
  { date: "Nov", value: 310 },
  { date: "Dec", value: 350 },
];

const chartConfig = {
  value: {
    label: "Sales",
    color: "hsl(var(--chart-5))",
  },
};

export default function SalesOverTimeChart() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Sales Over Time</CardTitle>
                    <CardDescription>A summary of your sales performance.</CardDescription>
                </div>
                <Tabs defaultValue="monthly">
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                    <TabsTrigger value="annually">Annually</TabsTrigger>
                  </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <AreaChart 
                        data={monthlyData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={10}/>
                        <Tooltip 
                          cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                          content={<ChartTooltipContent 
                            indicator="dot" 
                            labelClassName="font-semibold" 
                            className="bg-card border-border shadow-lg"
                          />} 
                        />
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-5))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
} 