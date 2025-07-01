import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "courseDuration",
    header: "Course Duration",
  },
  {
    accessorKey: "medium",
    header: "Medium",
  },
  {
    accessorKey: "board",
    header: "Board",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "subjects",
    header: ({ column, table }) => {
      const subjectValues = new Set();
      table.getPreFilteredRowModel().flatRows.forEach((row) => {
        const value = row.getValue("subjects");
        if (value) subjectValues.add(value);
      });
      const subjects = Array.from(subjectValues);


      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex justify-start -ml-4 data-[state=open]:bg-accent"
            >
              <span>Subjects</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className={
              subjects.length > 4 ? "max-h-[180px] overflow-y-auto" : ""
            }
          >
            <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
              All
            </DropdownMenuItem>
            {subjects.map((subject) => (
              <DropdownMenuItem
                key={subject}
                onClick={() => column.setFilterValue(subject)}
              >
                {subject}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("subjects")}</div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: ({ column, table }) => {
      const creatorValues = new Set();
      table.getPreFilteredRowModel().flatRows.forEach((row) => {
        const value = row.getValue("createdBy");
        if (value) creatorValues.add(value);
      });
      const creators = Array.from(creatorValues);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex justify-start -ml-4 data-[state=open]:bg-accent"
            >
              <span>Created By</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className={
              creators.length > 4 ? "max-h-[180px] overflow-y-auto" : ""
            }
          >
            <DropdownMenuLabel>Filter by Creator</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
              All
            </DropdownMenuItem>
            {creators.map((creator) => (
              <DropdownMenuItem
                key={creator}
                onClick={() => column.setFilterValue(creator)}
              >
                {creator}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("createdBy")}</div>
    ),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.getValue("active");
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