import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/animate-ui/radix/dropdown-menu'
import Box from '@/components/ui/custom/box'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
import { OpacityAnimation } from '@/components/ui/custom/custom-frammer-motion'
import { LoadingOverlay } from '@/components/ui/custom/custom-loading'
import DataTable from '@/components/ui/custom/custom-table/data-table/data-table'
import { Separator } from '@/components/ui/separator'
import { API, PATHS, SYMBOL_CURRENCY } from '@/constants'
import { CustomFormatNumber } from '@/lib/lib-format-number'
import { SellerModel, SellerSearchModel } from '@/models/class/seller/seller.model'
import { SellerService } from '@/service/pages/seller/seller.service'
import { KeyValueComp } from '@/shared/components'
import { CustomDateTime } from '@/shared/components/custom-date-time'
import { BadgePayment, KakaoBadge } from '@/shared/components/payment_methods/payment_methods'
import { useCustomQuery } from '@/tanstack-query/use-custom-query'
import { ColumnDef } from '@tanstack/react-table'
import { BoltIcon, ChevronDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import FilterBox from './filter/filter'

function SellerList() {
  const [paramSearch, setParamSearch] = useState<SellerSearchModel>(new SellerSearchModel())

  const { data: sellerList, isFetching } = useCustomQuery({
    queryKey: [API.SELLER.LIST],
    fetcher: SellerService.getList,
    props: {
      payload: {
        ...paramSearch
      }
    }
  })

  const handleSearch = () => {
    setParamSearch((prev) => ({
      ...prev
    }))
  }

  const columns = useMemo<ColumnDef<SellerModel>[]>(
    () => [
      {
        accessorKey: 'Information',
        size: 100,
        cell: ({ row }) => {
          const data = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center justify-between rounded-md transition-colors focus:outline-none focus:ring-none focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-[white] hover:text-accent-foreground border border-transparent hover:border-border px-3 py-1 gap-5'>
                  <div className='flex flex-col items-start min-w-[8rem]'>
                    <p className='text-sm font-medium'>{data?.username}</p>
                    <p className='text-xs text-foreground-muted opacity-50'>{data?.seller_name}</p>
                  </div>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[20rem] '>
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
                        Seller name
                      </p>
                      <span className='text-xs'>{data?.seller_name}</span>
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
                  onClick={() => {
                    window.open(
                      `${PATHS.EXTERNAL.SELLER.BASIC_INFO}?id=${data?.id}`,
                      'seller-detail'
                      // 'width=1024,height=768,resizable=yes,scrollbars=yes,noopener=true,noreferrer=true'
                    )
                  }}
                >
                  <BoltIcon size={16} className='opacity-60' aria-hidden='true' />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        header: `Amount Transactions`,
        size: 200,
        meta: {
          sorter: true
        },
        cell: ({ row }) => {
          return (
            <div className='py-1 px-2 gap-4 flex flex-col'>
              <KeyValueComp title='D' classNameKey='bg-deposit'>
                <CustomFormatNumber value={row.original.deposit_transaction_count} suffix={SYMBOL_CURRENCY.TETHER} />
              </KeyValueComp>
              <KeyValueComp title='W' classNameKey='bg-withdrawal'>
                <CustomFormatNumber value={row.original.withdraw_transaction_count} suffix={SYMBOL_CURRENCY.TETHER} />
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
                <CustomFormatNumber value={row.original.commission_withdraw_rate} suffix={SYMBOL_CURRENCY.PERCENT} />
              </KeyValueComp>
            </div>
          )
        }
      },

      {
        accessorKey: '',
        header: `Payment Methods`,
        size: 200,
        cell: ({ row }) => {
          return (
            <div className='flex items-center gap-2'>
              <BadgePayment bank_type_id={1} />
              <BadgePayment bank_type_id={2} />
              <BadgePayment bank_type_id={3} />
            </div>
          )
        }
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        size: 200,
        meta: {
          sorter: false
        },
        cell: ({ row }) => {
          return (
            <div className='flex overflow-hidden rounded w-full'>
              <KeyValueComp title='Register'>
                <CustomDateTime date={row.original.created_at} className='text-xs font-bold' />
              </KeyValueComp>
            </div>
          )
        }
      }
    ],
    []
  )
  return (
    <LoadingOverlay isLoading={isFetching}>
      <OpacityAnimation>
        <Box title='Seller List'>
          <FilterBox  className='mb-4' />
          <DataTable
            columns={columns}
            data={sellerList?.data?.data}
            totalItem={sellerList?.data?.totalItem}
            totalPages={sellerList?.data?.totalPages}
            paramSearch={paramSearch}
            onTableChange={handleSearch}
            getRowCanExpand={() => true}
            loading={isFetching}
          />
        </Box>
      </OpacityAnimation>
    </LoadingOverlay>
  )
}

export default SellerList
