import { BaseSearchModel } from '@/models/class/search/base-search-model'
import { Column, ColumnDef, Header, Table } from '@tanstack/react-table'
import { PropsWithChildren } from 'react'

export type TPropsDataTableContext<T> = {
  useTable: Table<T>
  paramSearch?: BaseSearchModel
  onTableChange: (value: BaseSearchModel) => void
} & PropsWithChildren

export type TDataTableContext<T> = {
  useTable: Table<T>
  paramSearch: BaseSearchModel
  onTableChange: (value: Partial<BaseSearchModel>) => void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // setParamSearch: React.Dispatch<React.SetStateAction<BaseSearchModel>>;
}

export type TPropsTableHeaderContext<T> = PropsWithChildren & {
  header: Header<T, unknown>
}
export type TTableHeaderContext<T> = {
  header: Header<T, unknown>
  column: Column<T, unknown>
}
