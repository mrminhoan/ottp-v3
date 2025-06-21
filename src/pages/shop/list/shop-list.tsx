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
import { ActionButton } from '@/components/ui/custom/custom-button/action-button'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
import { useGlobalDialog } from '@/components/ui/custom/custom-dialog/custom-dialog'
import { OpacityAnimation } from '@/components/ui/custom/custom-frammer-motion'
import DataTable from '@/components/ui/custom/custom-table/data-table/data-table'
import { Separator } from '@/components/ui/separator'
import { API } from '@/constants/api'
import { SYMBOL_CURRENCY } from '@/constants/common'
import { CustomFormatNumber } from '@/lib/lib-format-number'
import { ShopModelResponse, ShopSearchModel } from '@/models/class/shop/shop.model'
import { ShopService } from '@/service/pages/shop/shop.service'
import { KeyValueComp } from '@/shared/components'
import { useCustomQuery } from '@/tanstack-query'
import { ColumnDef } from '@tanstack/react-table'
import { BoltIcon, ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { CreateForm } from './form/create-form'

const ShopList = () => {
  const dialog = useGlobalDialog()
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
                    <p className='text-xs text-foreground-muted opacity-50'>{data?.shop_name}</p>
                  </div>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[20rem] bg-surface'>
                <DropdownMenuLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        ID
                      </p>
                      <span className='text-xs'>{data?.username}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Shop name
                      </p>
                      <span className='text-xs'>{data?.shop_name}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Wallet
                      </p>
                      <CustomButtonCopy textToCopy={data?.address_base58}>{data?.address_base58}</CustomButtonCopy>
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
        size: 50,
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
            <div className='py-1 px-2 gap-4 flex flex-col'>
              <KeyValueComp title='D' classNameKey='bg-deposit'>
                <CustomFormatNumber value={row.original.total_deposit} suffix={SYMBOL_CURRENCY.MAIN} />
              </KeyValueComp>
              <KeyValueComp title='W' classNameKey='bg-withdrawal'>
                <CustomFormatNumber value={row.original.total_deposit} suffix={SYMBOL_CURRENCY.MAIN} />
              </KeyValueComp>
            </div>
          )
        }
      },
      {
        accessorKey: '',
        header: `Deposit/Withdrawal (${SYMBOL_CURRENCY.TETHER})`,
        size: 200,
        meta: {
          sorter: true
        },
        cell: ({ row }) => {
          return (
            <div className='py-1 px-2 gap-4 flex flex-col'>
              <KeyValueComp title='D' classNameKey='bg-deposit'>
                <CustomFormatNumber value={row.original.total_deposit_t} suffix={SYMBOL_CURRENCY.TETHER} />
              </KeyValueComp>
              <KeyValueComp title='W' classNameKey='bg-withdrawal'>
                <CustomFormatNumber value={row.original.total_deposit_t} suffix={SYMBOL_CURRENCY.TETHER} />
              </KeyValueComp>
            </div>
          )
        }
      },

      {
        accessorKey: '',
        header: `Commission`,
        size: 200,
        meta: {
          sorter: true
        },
        cell: ({ row }) => {
          return (
            <div className='py-1 px-2 gap-4 flex flex-col'>
              <KeyValueComp title='D' classNameKey='bg-deposit'>
                <CustomFormatNumber value={row.original.commission_rate} suffix={SYMBOL_CURRENCY.PERCENT} />
              </KeyValueComp>
              <KeyValueComp title='W' classNameKey='bg-withdrawal'>
                <CustomFormatNumber value={row.original.commission_rate_withdraw} suffix={SYMBOL_CURRENCY.PERCENT} />
              </KeyValueComp>
            </div>
          )
        }
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        size: 200,
        cell: ({ row }) => {
          return (
            <div className='flex overflow-hidden rounded w-full'>
              <KeyValueComp title='Register'>
                <CustomFormatNumber value={row.original.commission_rate_withdraw} suffix={SYMBOL_CURRENCY.PERCENT} />
              </KeyValueComp>
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

  const handleOpenDialog = () => {
    dialog.open({
      title: 'Create new shop',
      content: <CreateForm />
    })
  }

  return (
    <Box>
      <ActionButton action='add' onClick={handleOpenDialog}>
        New Shop
      </ActionButton>
      <OpacityAnimation>
        <DataTable
          columns={columns}
          data={shopList?.data?.data}
          totalItem={shopList?.data?.totalItem}
          totalPages={shopList?.data?.totalPages}
          paramSearch={paramSearch}
          onTableChange={handleParamSearchChange}
          getRowCanExpand={() => true}
          loading={isFetching}
        />
      </OpacityAnimation>
    </Box>
  )
}

export default ShopList
