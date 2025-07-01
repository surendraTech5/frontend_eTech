import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "lectureName",
    header: "Lecture Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "courseName",
    header: "Course",
  },
  {
    accessorKey: "courseName",
    header: "Course",
  },
  {
    accessorKey: "duration",
    header: "video",
  },
    {
    accessorKey: "duration",
    header: "CreatedBy",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("isActive");
      return (
        <Badge
          className={cn(
            "border-transparent font-medium",
            active
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 hover:bg-emerald-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200"
          )}
        >
          {active ? "Active" : "Inactive"}
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
   {
    id: "update",
    header: "Update",
    cell: ({ row }) => {
      return (
        <Button variant="link" className="text-primary p-0 text-xs">
          Edit
        </Button>
      );
    },
  },
]; 