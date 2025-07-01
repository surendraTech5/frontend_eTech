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
    header: ({ table }) => {
      const subjectOptions = table.options.meta?.subjectOptions || [];

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
              subjectOptions.length > 4
                ? "max-h-[180px] overflow-y-auto"
                : ""
            }
          >
            <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.options.meta?.setSelectedSubjectId("All")}
            >
              All
            </DropdownMenuItem>
            {subjectOptions.map((subject) => (
              <DropdownMenuItem
                key={subject._id}
                onClick={() =>
                  table.options.meta?.setSelectedSubjectId(subject._id)
                }
              >
                {subject.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("subjects");
      if (Array.isArray(value)) {
        return value.map((v) => v.subjectName || v).join(", ");
      }
      if (typeof value === "object" && value !== null) {
        return value.subjectName ?? "—";
      }
      return value ?? "—";
    },
  },


{
    accessorKey: "createdBy",
    header: ({ table }) => {
      const creatorOptions = table.options.meta?.creatorOptions || [];

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
              creatorOptions.length > 4
                ? "max-h-[180px] overflow-y-auto"
                : ""
            }
          >
            <DropdownMenuLabel>Filter by Creator</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.options.meta?.setSelectedCreatedBy("All")}
            >
              All
            </DropdownMenuItem>
            {creatorOptions.map((creator) => (
              <DropdownMenuItem
                key={creator._id}
                onClick={() =>
                  table.options.meta?.setSelectedCreatedBy(creator._id)
                }
              >
                {creator.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const creator = row.getValue("createdBy");
      if (typeof creator === "object" && creator !== null) {
        return `${creator.firstName ?? ""} ${creator.lastName ?? ""}`.trim() || "—";
      }
      return creator ?? "—";
    },
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
