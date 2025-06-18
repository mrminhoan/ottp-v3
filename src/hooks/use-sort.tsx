import { SORT_TYPE } from "@/constants/paginations";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";

export function UseSort() {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: null,
      desc: false,
    },
  ]);

  return {
    keySort: sorting[0] ? sorting[0].id : null,
    sortType: sorting[0]?.desc ? SORT_TYPE.DESC : SORT_TYPE.ASC,
    sorting,
    setSorting,
  };
}
