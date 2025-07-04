import * as React from "react";
import { cn } from "@/lib/utils";

const Command = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-1 p-2 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
));
Command.displayName = "Command";

export const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-md border px-3 py-2 text-sm outline-none",
      className
    )}
    {...props}
  />
));
CommandInput.displayName = "CommandInput";

export const CommandGroup = ({ className, ...props }) => (
  <div className={cn("mt-2 space-y-1", className)} {...props} />
);
CommandGroup.displayName = "CommandGroup";

export const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-3 py-2 cursor-pointer hover:bg-muted rounded-sm",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

export const CommandEmpty = ({ className, ...props }) => (
  <div className={cn("px-3 py-2 text-sm text-muted", className)} {...props} />
);
CommandEmpty.displayName = "CommandEmpty";

export { Command };
