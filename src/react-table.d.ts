import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    sorter?: boolean
    iconSort?: ReactNode | ((props: { header: Header<TData, unknown> }) => ReactNode)
    className_header_group?: string
    isPinned?: 'left' | 'right' | undefined
  }
}
