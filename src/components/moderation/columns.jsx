import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";


export const columns = [
  {
    accessorKey: "content",
    header: "Flagged Content",
    cell: ({ row }) => {
        const item = row.original;
        return (
            <div className="flex flex-col gap-1 max-w-xs">
                <span className="font-medium truncate">{item.content}</span>
                <Badge variant="outline" className="w-fit">{item.contentType}</Badge>
            </div>
        )
    }
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
        const item = row.original;
        return (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/40?u=${item.author}`} alt={item.author} />
                    <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{item.author}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
        const item = row.original;
        return (
            <div className="flex flex-col gap-1">
                <span>{item.reason}</span>
                <span className="text-[10px] text-muted-foreground">Flagged by: {item.flaggedBy}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                            <CheckCircle className="h-5 w-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Approve</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <XCircle className="h-5 w-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Remove</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
      );
    },
  },
]; 