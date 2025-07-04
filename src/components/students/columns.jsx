import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns = (onEdit, onDelete) => [
  {
    header: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Gender",
    accessorFn: (row) =>
      row.gender
        ? row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
        : "-",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onEdit(student)}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-muted rounded-lg"
                >
                  <Pencil className="w-4 h-4 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onDelete(student._id)}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-muted rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
];
