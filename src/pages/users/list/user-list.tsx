import { OpacityAnimation } from '@/components/ui/custom/custom-frammer-motion'
import { LoadingOverlay } from '@/components/ui/custom/custom-loading'
import DataTable from '@/components/ui/custom/custom-table/data-table/data-table'
import { API, PATHS, SYMBOL_CURRENCY } from '@/constants'
import { MemberModel, MemberSearchModel } from '@/models/class/member/member.model'
import { MemberService } from '@/service/pages/members/member.service'
import { UserStore } from '@/service/pages/users'
import { useCustomQuery } from '@/tanstack-query/use-custom-query'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/animate-ui/radix/dropdown-menu'
import { BoltIcon, ChevronDownIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
import CardBank from '@/shared/components/payment-cards/card-bank'
import { KeyValueComp } from '@/shared/components'
import { CustomFormatNumber } from '@/lib/lib-format-number'
import { CustomDateTime } from '@/shared/components/custom-date-time'

export default function UserList() {
  const [paramSearch, setParamSearch] = useState<MemberSearchModel>(new MemberSearchModel())

  const { data: memberList, isFetching } = useCustomQuery({
    queryKey: [API.MEMBER.LIST],
    fetcher: MemberService.getList,
    props: {
      payload: {
        ...paramSearch,
        shop_id: UserStore.getProfile()?.shop_id ?? 0
      }
    }
  })

  const memberListData = memberList?.data ?? []

  console.log(memberListData)

  const columns = useMemo<ColumnDef<MemberModel>[]>(() => {
    return [
      {
        accessorKey: 'username',
        meta: {
          sorter: true,
          isPinned: 'left'
        },
        header: 'User Information',
        size: 200,
        cell: ({ row }) => {
          const data = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center justify-between rounded-md transition-colors focus:outline-none focus:ring-none focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-[white] hover:text-accent-foreground border border-transparent hover:border-border px-3 py-1 gap-5'>
                  <div className='flex flex-col items-start min-w-[8rem]'>
                    <p className='text-sm font-medium'>{data?.username}</p>
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

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Full Name
                      </p>
                      <span className='text-xs'>{data?.full_name}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Wallet
                      </p>
                      <CustomButtonCopy textToCopy={data?.address_base58}>{data?.address_base58}</CustomButtonCopy>
                    </div>

                    <Separator />

                    <CardBank
                      bankName={data?.bank_name}
                      accountNumber={data?.account_number}
                      accountName={data?.account_holder_name}
                    />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    window.open(
                      `${PATHS.EXTERNAL.SHOP.BASIC_INFO}?id=${data?.shop_id}`,
                      'shop-detail',
                      'width=1024,height=768,resizable=yes,scrollbars=yes,noopener=true,noreferrer=true'
                    )
                  }}
                >
                  <BoltIcon size={16} className='opacity-60' aria-hidden='true' />
                  <span>Shop Settings</span>
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
                <CustomFormatNumber value={row.original.total_withdraw} suffix={SYMBOL_CURRENCY.MAIN} />
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
                <CustomFormatNumber value={row.original?.total_deposit_t} suffix={SYMBOL_CURRENCY.TETHER} />
              </KeyValueComp>
              <KeyValueComp title='W' classNameKey='bg-withdrawal'>
                <CustomFormatNumber value={row.original?.total_withdraw_t} suffix={SYMBOL_CURRENCY.TETHER} />
              </KeyValueComp>
            </div>
          )
        }
      },
      {
        accessorKey: '',
        header: 'Date',
        size: 150,
        meta: {
          sorter: false
        },
        cell: ({ row }) => {
          return (
            <KeyValueComp title='Last Login' classNameKey='min-w-[5rem]'>
              <CustomDateTime date={row.original?.last_login} className='text-xs' />
            </KeyValueComp>
          )
        }
      }
    ]
  }, [])

  const handleParamSearchChange = (value: Partial<MemberSearchModel>) => {
    setParamSearch((prev) => ({
      ...prev,
      ...value
    }))
  }

  return (
    <LoadingOverlay isLoading={isFetching}>
      <OpacityAnimation>
        <DataTable
          columns={columns}
          data={memberListData?.data}
          totalItem={memberListData?.totalItems}
          totalPages={memberListData?.totalPages}
          paramSearch={paramSearch}
          onTableChange={handleParamSearchChange}
          getRowCanExpand={() => true}
          loading={isFetching}
        />
      </OpacityAnimation>
    </LoadingOverlay>
  )
}
