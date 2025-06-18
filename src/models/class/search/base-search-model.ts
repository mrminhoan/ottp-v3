import { PAGINATION, SORT_TYPE } from "@/constants/paginations"

// export type TOrderType = "ASC" | "DESC" | "";
export type TOrderType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE] | ''

export class BaseSearchModel {
  offset = 0
  limit: number = PAGINATION.LIMIT
  keyword: string = null
  sortBy: string = null
  itemPerPage: number = PAGINATION.ITEM_PER_PAGE[0]
  showPage = 5
  sortType: TOrderType = SORT_TYPE.ASC
  keySort: string = null
  page: number = 1
  search: string = ''
}
