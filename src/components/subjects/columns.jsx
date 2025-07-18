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
    accessorKey: "subjectName",
    header: "Subject Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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
      <Button
        variant="link"
        className="text-primary p-0 text-xs"
        onClick={() => {
          const course = row.original;
          // trigger modal open via props or context
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("openEditCourseModal", { detail: course })
            );
          }
        }}
      >
          Edit
        </Button>
      );
    },
  },
]; 