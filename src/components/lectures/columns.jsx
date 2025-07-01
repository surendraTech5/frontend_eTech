import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "lectureTitle",
    header: "Lecture Title",
  },
  {
    accessorKey: "courseName",
    header: "Course",
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          className={cn(
            "border-transparent font-medium",
            status === "Completed" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200",
            status === "Upcoming" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 hover:bg-yellow-200",
            status === "Live" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <Button variant="link" className="text-primary p-0 text-xs">
          View Details
        </Button>
      );
    },
  },
]; 