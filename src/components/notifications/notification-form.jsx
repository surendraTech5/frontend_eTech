"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  audience: z.enum(["All", "Teachers", "Students"]),
})

export default function NotificationForm() {
    const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      audience: "All",
    },
  })

  function onSubmit(values) {
    console.log(values)
    toast({
        title: "Notification Sent!",
        description: `Your message "${values.title}" has been sent to ${values.audience}.`,
      })
    form.reset()
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Compose Notification</CardTitle>
            <CardDescription>Create a new announcement for your users.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Scheduled Maintenance" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Enter your message here..." {...field} className="min-h-[120px]" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="audience"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Audience</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="All" />
                            </FormControl>
                            <FormLabel className="font-normal">All Users</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="Teachers" />
                            </FormControl>
                            <FormLabel className="font-normal">Teachers Only</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="Students" />
                            </FormControl>
                            <FormLabel className="font-normal">Students Only</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    Send Notification
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  )
} 