import React from "react";
import { TPropsTableHeaderContext, TTableHeaderContext } from "./type";

export const TableHeaderContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.createContext<TTableHeaderContext<any>>(null);

export const TableHeaderProvider = <T,>(props: TPropsTableHeaderContext<T>) => {
  const { header, children } = props;
  const { column } = header || {};
  return (
    <TableHeaderContext.Provider value={{ header, column }}>
      {children}
    </TableHeaderContext.Provider>
  );
};
