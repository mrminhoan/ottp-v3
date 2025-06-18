import { Users } from '@/components/animate-ui/icons/users'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/animate-ui/radix/dropdown-menu'
import Box from '@/components/ui/custom/box'
import DataTable from '@/components/ui/custom/custom-table/data-table/data-table'
import { Separator } from '@/components/ui/separator'
import { API } from '@/constants/api'
import { SYMBOL_CURRENCY } from '@/constants/common'
import { CustomFormatNumber } from '@/lib/lib-format-number'
import { ShopModelResponse, ShopSearchModel } from '@/models/class/shop/shop.model'
import { ShopService } from '@/service/pages/shop/shop.service'
import { useCustomQuery } from '@/tanstack-query'
import { ColumnDef } from '@tanstack/react-table'
import { BoltIcon, ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

const ShopList = () => {
  const [paramSearch, setParamSearch] = useState<ShopSearchModel>(new ShopSearchModel())

  const { data: shopList, isFetching } = useCustomQuery({
    queryKey: [API.SHOP.LIST],
    fetcher: ShopService.getList,
    props: {
      payload: {
        ...paramSearch
      }
    }
  })

  const columns = React.useMemo<ColumnDef<ShopModelResponse>[]>(
    () => [
      {
        accessorKey: 'username',
        meta: {
          sorter: true,
          isPinned: 'left'
        },
        header: 'Shop',
        size: 200,
        cell: ({ row }) => {
          const data = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center justify-between rounded-md transition-colors focus:outline-none focus:ring-none focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-[white] hover:text-accent-foreground border border-transparent hover:border-border px-3 py-1 gap-5'>
                  <div className='flex flex-col items-start min-w-[8rem]'>
                    <p className='text-sm font-medium'>{data?.username}</p>
                    <p className='text-xs text-black/50'>{data?.shop_name}</p>
                  </div>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[13rem] bg-surface'>
                <DropdownMenuLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        ID
                      </p>
                      <span className='text-xs'>{data?.username}</span>
                    </div>

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Shop name
                      </p>
                      <span className='text-xs'>{data?.shop_name}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                // onClick={() => {
                //   window.open(
                //     `${PATHS.EXTERNAL.SHOP.ROOT}?id=${data?.id}`,
                //     'shop-detail',
                //     'width=1024,height=768,resizable=yes,scrollbars=yes,noopener=true,noreferrer=true'
                //   )
                // }}
                >
                  <BoltIcon size={16} className='opacity-60' aria-hidden='true' />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                // onClick={() => {
                //   window.open(
                //     `${PATHS.EXTERNAL.SHOP.USER_LIST}?id=${data?.id}`,
                //     'shop-user-listƒ',
                //     'width=1024,height=768,resizable=yes,scrollbars=yes,noopener=true,noreferrer=true'
                //   )
                // }}
                >
                  <Users size={16} className='opacity-60' aria-hidden='true' />
                  <span>User List</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      },
      {
        accessorKey: 'user_count',
        meta: {
          sorter: true
        },
        header: 'User Amount',
        size: 150,
        cell: ({ row }) => {
          const data = row.original
          return (
            <div className='flex items-center gap-3 w-full justify-center'>
              <Users animateOnHover size={16} />
              <p className='text-xs'>{data?.user_count}</p>
            </div>
          )
        }
      },
      {
        accessorKey: '',
        header: `Deposit/Withdrawal (${SYMBOL_CURRENCY.MAIN})`,
        size: 200,
        meta: {
          sorter: true
        },
        cell: ({ row }) => {
          return (
            <div className='p-4   gap-4 flex flex-col'>
              <div className='flex overflow-hidden rounded w-full'>
                <span className='text-xs flex items-center  bg-deposit text-white font-semibold px-3 py-1'>D</span>
                <span className=' flex-1 text-xs text-foreground font-medium bg-white border border-border px-3 py-1 border-l-0 rounded-r-md text-right'>
                  <CustomFormatNumber value={row.original.total_deposit} suffix={SYMBOL_CURRENCY.MAIN} />
                </span>
              </div>
              <div className='flex overflow-hidden rounded w-full'>
                <span className='text-xs flex items-center  bg-withdrawal font-semibold px-3 py-1 text-white'>W</span>
                <span className='flex-1 text-xs text-foreground font-medium bg-white border border-border px-3 py-1 border-l-0 rounded-r-md text-right'>
                  <CustomFormatNumber value={row.original.total_deposit} suffix={SYMBOL_CURRENCY.MAIN} />
                </span>
              </div>
            </div>
          )
        }
      },
      {
        accessorKey: '',
        header: `Deposit/Withdrawal (${SYMBOL_CURRENCY.TETHER})`,
        size: 150,
        meta: {
          sorter: true
        },
        cell: ({ row }) => {
          return (
            <div className='p-4 gap-4 flex flex-col'>
              <div className='flex overflow-hidden rounded w-full'>
                <span className='text-xs flex items-center  bg-deposit text-white font-semibold px-3 py-1'>D</span>
                <span className=' flex-1 text-xs text-foreground font-medium bg-white border border-border px-3 py-1 border-l-0 rounded-r-md text-right'>
                  <CustomFormatNumber value={row.original.total_deposit_t} suffix={SYMBOL_CURRENCY.TETHER} />
                </span>
              </div>
              <div className='flex overflow-hidden rounded w-full'>
                <span className='text-xs flex items-center  bg-withdrawal text-white font-semibold px-3 py-1'>W</span>
                <span className='flex-1 text-xs text-foreground font-medium bg-white border border-border px-3 py-1 border-l-0 rounded-r-md text-right'>
                  <CustomFormatNumber value={row.original.total_deposit_t} suffix={SYMBOL_CURRENCY.TETHER} />
                </span>
              </div>
            </div>
          )
        }
      },

      {
        accessorKey: '',
        header: `Deposit/Withdrawal (${SYMBOL_CURRENCY.TETHER})`,
        size: 150,
        meta: {
          sorter: true
        },
        cell: ({ row }) => {
          return (
            <div className='p-4 gap-4 flex flex-col'>
              <div className='flex overflow-hidden rounded w-full'>
                <span className='text-xs flex items-center  bg-deposit text-white font-semibold px-3 py-1'>D</span>
                <span className=' flex-1 text-xs text-foreground font-medium bg-white border border-border px-3 py-1 border-l-0 rounded-r-md text-right'>
                  <CustomFormatNumber value={row.original.total_deposit_t} suffix={SYMBOL_CURRENCY.TETHER} />
                </span>
              </div>
              <div className='flex overflow-hidden rounded w-full'>
                <span className='text-xs flex items-center  bg-withdrawal text-white font-semibold px-3 py-1'>W</span>
                <span className='flex-1 text-xs text-foreground font-medium bg-white border border-border px-3 py-1 border-l-0 rounded-r-md text-right'>
                  <CustomFormatNumber value={row.original.total_deposit_t} suffix={SYMBOL_CURRENCY.TETHER} />
                </span>
              </div>
            </div>
          )
        }
      }
    ],
    []
  )
  const handleParamSearchChange = (value: Partial<ShopSearchModel>) => {
    setParamSearch((prev) => ({
      ...prev,
      ...value
    }))
  }
  return (
    <Box>
      <DataTable
        columns={columns}
        data={shopList?.data?.data}
        totalItem={shopList?.data?.totalItem}
        totalPages={shopList?.data?.totalPages}
        // data={shopList?.data}
        // totalItem={shopList?.data?.length}
        paramSearch={paramSearch}
        onTableChange={handleParamSearchChange}
        getRowCanExpand={() => true}
        loading={isFetching}
      />
    </Box>
  )
}

export default ShopList
