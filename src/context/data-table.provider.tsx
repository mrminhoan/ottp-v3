import { createContext, useState } from "react";
import { TDataTableContext, TPropsDataTableContext } from "./type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTableContext = createContext<TDataTableContext<any>>(null);

export const DataTableProvider = <T,>(props?: TPropsDataTableContext<T>) => {
  const { children, useTable, paramSearch, onTableChange } = props;
  const value = {
    useTable,
    paramSearch,
    onTableChange,
  };
  return (
    <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>
  );
};
