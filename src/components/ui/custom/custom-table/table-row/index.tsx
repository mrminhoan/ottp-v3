import { cn } from "@/lib/utils";
import React from "react";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <tr className={cn("hover:bg-surface-muted transition-colors duration-200", className)} {...rest} ref={ref}>
      {children}
    </tr>
  );
});
