import { cn } from "@/lib/utils";
import React from "react";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
>((props, ref) => {
  const { children, className } = props;
  return (
    <tbody ref={ref} className={cn("", className)}>
      {children}
    </tbody>
  );
});
