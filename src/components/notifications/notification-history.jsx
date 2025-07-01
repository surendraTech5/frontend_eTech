import { notifications } from "@/data/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export default function NotificationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification History</CardTitle>
        <CardDescription>A log of all past announcements.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-6">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <Badge variant="secondary" className="mt-2">{notification.audience}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No notifications found.</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 