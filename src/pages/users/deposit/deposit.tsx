import { Popover, PopoverButton, PopoverPanel } from '@/components/animate-ui/headless/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/animate-ui/radix/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import Box from '@/components/ui/custom/box'
import { ActionButton } from '@/components/ui/custom/custom-button/action-button'
import { CustomButton } from '@/components/ui/custom/custom-button/button'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
import { OpacityAnimation } from '@/components/ui/custom/custom-frammer-motion'
import { LoadingOverlay } from '@/components/ui/custom/custom-loading'
import DataTable from '@/components/ui/custom/custom-table/data-table/data-table'
import { alertService } from '@/components/ui/custom/custom-toast/alert.service'
import { Separator } from '@/components/ui/separator'
import { API, BANK_TYPE_NAME, PROCESS_STATUS_TYPE, STATUS_TRANSACTION, SYMBOL_CURRENCY } from '@/constants'
import { CustomFormatNumber } from '@/lib/lib-format-number'
import { TransactionModel, TransactionSearchModel } from '@/models/class/transaction/transaction.model'
import { TransactionService } from '@/service/pages/transaction/transaction.service'
import { CustomDateTime } from '@/shared/components/custom-date-time'
import { KeyValueComp } from '@/shared/components/key-value'
import CardBank from '@/shared/components/payment-cards/card-bank'
import CardKakao from '@/shared/components/payment-cards/card-kakao'
import CardPaypal from '@/shared/components/payment-cards/card-paypal'
import { useCustomMutation } from '@/tanstack-query/use-custom-mutation'
import { useCustomQuery } from '@/tanstack-query/use-custom-query'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import FilterBox from './filter/filter'
import { BaseSearchModel } from '@/models/class/search/base-search-model'

export default function Deposit() {
  // const [paramSearch, setParamSearch] = useState<TransactionSearchModel>(new TransactionSearchModel())
  const [paramSearch, setParamSearch] = useState<BaseSearchModel>(new BaseSearchModel())

  const {
    data: transactionList,
    isFetching,
    refetch: refetchTransactionList
  } = useCustomQuery({
    queryKey: [API.TRANSACTION.LIST],
    fetcher: TransactionService.getDepositList,
    props: {
      payload: {
        ...paramSearch
      }
    }
  })

  const { mutate: acceptTransaction, isPending: isAccepting } = useCustomMutation({
    mutationFn: TransactionService.acceptTransaction,
    onSuccess: () => {
      refetchTransactionList()
      return alertService.success({
        title: 'Request successfully',
        message: 'Accept transaction successfully'
      })
    },
    props: {
      onError: (error) => {
        return alertService.error({
          title: 'Request failed',
          message: error.message
        })
      }
    }
  })

  const { mutate: cancelTransaction, isPending: isCancelling } = useCustomMutation({
    mutationFn: TransactionService.cancelTransaction,
    onSuccess: () => {
      refetchTransactionList()
      return alertService.success({
        title: 'Request successfully',
        message: 'Cancel transaction successfully'
      })
    },
    props: {
      onError: (error) => {
        return alertService.error({
          title: 'Request failed',
          message: error.message
        })
      }
    }
  })

  const onConfirmTransaction = (data: number, type: 'accept' | 'cancel') => {
    if (type === 'accept') {
      acceptTransaction({
        payload: {
          id: data
        }
      })
    } else {
      cancelTransaction({
        payload: {
          id: data
        }
      })
    }
  }

  const columns = useMemo<ColumnDef<TransactionModel>[]>(
    () => [
      {
        header: 'Transaction ID',
        size: 200,
        cell: ({ row }) => {
          return (
            <CustomButtonCopy textToCopy={row.original.transaction_hash}>
              {row.original.transaction_hash}
            </CustomButtonCopy>
          )
        }
      },
      {
        accessorKey: '',
        header: 'User',
        size: 200,
        cell: ({ row }) => {
          const data = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center justify-between rounded-md transition-colors focus:outline-none focus:ring-none focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-[white] hover:text-accent-foreground border border-transparent hover:border-border px-3 py-1 gap-5'>
                  <div className='flex flex-col items-start min-w-[8rem]'>
                    <p className='text-sm font-medium'>{data?.user?.username}</p>
                    <p className='text-xs text-foreground-muted opacity-50'>{data?.user?.full_name}</p>
                  </div>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[20rem]'>
                <DropdownMenuLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        ID
                      </p>
                      <span className='text-xs'>{data?.user?.username}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Full name
                      </p>
                      <span className='text-xs'>{data?.user?.full_name}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Wallet
                      </p>
                      <CustomButtonCopy textToCopy={data?.user?.address_base58}>
                        {data?.user?.address_base58}
                      </CustomButtonCopy>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Network
                      </p>
                      <span className='text-xs'>{data?.user?.blockchain_network}</span>
                    </div>
                  </div>

                  {data?.user?.bank_info?.account_number && (
                    <>
                      <Separator className='my-2' />
                      <CardBank
                        bankName={data?.user?.bank_info?.bank_name}
                        accountNumber={data?.user?.bank_info?.account_number}
                        accountName={data?.user?.bank_info?.account_holder_name}
                      />
                    </>
                  )}
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      },
      {
        accessorKey: '',
        header: 'Shop',
        size: 200,
        cell: ({ row }) => {
          const data = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center justify-between rounded-md transition-colors focus:outline-none focus:ring-none focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-[white] hover:text-accent-foreground border border-transparent hover:border-border px-3 py-1 gap-5'>
                  <div className='flex flex-col items-start min-w-[8rem]'>
                    <p className='text-sm font-medium'>{data?.shop?.username}</p>
                  </div>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[20rem]'>
                <DropdownMenuLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-shop text-white min-w-[5.5rem] text-center text-xs'>
                        ID
                      </p>
                      <span className='text-xs'>{data?.shop?.username}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-shop text-white min-w-[5.5rem] text-center text-xs'>
                        Wallet
                      </p>
                      <CustomButtonCopy textToCopy={data?.user?.address_base58}>
                        {data?.user?.address_base58}
                      </CustomButtonCopy>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-shop text-white min-w-[5.5rem] text-center text-xs'>
                        Network
                      </p>
                      <span className='text-xs'>{data?.user?.blockchain_network}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      },

      {
        accessorKey: '',
        header: 'Seller',
        size: 100,
        cell: ({ row }) => {
          const data = row.original?.seller
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
              <DropdownMenuContent className='w-[20rem]'>
                <DropdownMenuLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-seller text-white min-w-[5.5rem] text-center text-xs'>
                        ID
                      </p>
                      <span className='text-xs'>{data?.username}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-seller text-white min-w-[5.5rem] text-center text-xs'>
                        Wallet
                      </p>
                      <CustomButtonCopy textToCopy={data?.address_base58}>{data?.address_base58}</CustomButtonCopy>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-seller text-white min-w-[5.5rem] text-center text-xs'>
                        Network
                      </p>
                      <span className='text-xs'>{data?.blockchain_network}</span>
                    </div>
                  </div>

                  <Separator className='my-2' />
                  {data?.bank_info?.bank_type_name == BANK_TYPE_NAME.Bank && (
                    <CardBank
                      bankName={data?.bank_info?.bank_name}
                      accountNumber={data?.bank_info?.account_number}
                      accountName={data?.bank_info?.account_holder_name}
                    />
                  )}

                  {data?.bank_info?.bank_type_name == BANK_TYPE_NAME.KakaoPay && (
                    <CardKakao kakao_id={data?.bank_info?.payment_details?.kakao_id} />
                  )}

                  {data?.bank_info?.bank_type_name == BANK_TYPE_NAME.PayPal && (
                    <CardPaypal paypal_id={data?.bank_info?.payment_details?.paypal_id} />
                  )}
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      },
      {
        header: 'Amount (원)',
        size: 300,
        cell: ({ row }) => {
          return (
            <div className='flex items-center flex-col gap-4'>
              <KeyValueComp title='원' classNameKey='bg-main-currency' classNameValue='min-w-[8rem]'>
                <CustomFormatNumber
                  value={row.original.fiat_amount}
                  suffix={SYMBOL_CURRENCY.MAIN}
                  className='font-bold'
                />
              </KeyValueComp>
              <KeyValueComp title='T' classNameKey='bg-tether' classNameValue='min-w-[8rem]'>
                <CustomFormatNumber
                  value={row.original.tether_amount}
                  suffix={SYMBOL_CURRENCY.TETHER}
                  className='font-bold'
                />
              </KeyValueComp>
            </div>
          )
        }
      },

      {
        header: 'Commission',
        size: 150,
        cell: ({ row }) => {
          return (
            <CustomFormatNumber
              value={row.original.master_commission}
              suffix={SYMBOL_CURRENCY.PERCENT}
              decimalScale={8}
              className='font-bold'
            />
          )
        }
      },
      {
        header: 'Amount (T)',
        size: 150,
        cell: ({ row }) => {
          return (
            <CustomFormatNumber
              value={row.original.tether_amount}
              suffix={SYMBOL_CURRENCY.TETHER}
              decimalScale={8}
              className='font-bold'
            />
          )
        }
      },

      {
        header: 'Status',
        size: 150,
        meta: {
          sorter: true
        },
        cell: ({ row }) => {
          return <Badge variant={STATUS_TRANSACTION[row.original.status_order]}>{row.original.status_order}</Badge>
        }
      },

      {
        accessorKey: 'created_at',
        header: 'Date',
        size: 200,
        cell: ({ row }) => {
          return (
            <div className='flex flex-col gap-3 rounded w-full'>
              <KeyValueComp title='Register' classNameKey='min-w-[5rem]'>
                <CustomDateTime date={row.original.created_at} className='text-xs font-bold' />
              </KeyValueComp>

              <Separator />

              {row.original.status_order === STATUS_TRANSACTION['pending'] && (
                <KeyValueComp title='Expiry' classNameKey='min-w-[5rem]'>
                  <CustomDateTime date={row.original.expiry_time} className='text-xs font-bold' />
                </KeyValueComp>
              )}
            </div>
          )
        }
      },
      {
        header: 'Action',
        size: 150,
        meta: {
          isPinned: 'right'
        },
        cell: ({ row }) => {
          const data = row.original
          return (
            data?.status_order === STATUS_TRANSACTION['pending'] && (
              <div className='flex items-center gap-2 w-full justify-center'>
                <Popover>
                  <PopoverButton>
                    <ActionButton action='approve' onClick={() => {}} asChild />
                  </PopoverButton>
                  <PopoverPanel className='w-fit'>
                    <div className='flex flex-col items-center gap-2'>
                      <p>Are you sure to approve?</p>
                      <CustomButton
                        variant='success'
                        size='sm'
                        onClick={() => onConfirmTransaction(data.transaction_id, 'accept')}
                      >
                        Approve
                      </CustomButton>
                    </div>
                  </PopoverPanel>
                </Popover>

                <Popover>
                  <PopoverButton>
                    <ActionButton action='cancel' onClick={() => {}} asChild />
                  </PopoverButton>
                  <PopoverPanel className='w-fit'>
                    <div className='flex flex-col items-center gap-2'>
                      <p>Are you sure to reject?</p>
                      <CustomButton
                        variant='destructive'
                        size='sm'
                        onClick={() => onConfirmTransaction(data.transaction_id, 'cancel')}
                      >
                        Reject
                      </CustomButton>
                    </div>
                  </PopoverPanel>
                </Popover>
              </div>
            )
          )
        }
      }
    ],
    []
  )

  const handleParamSearchChange = (value: Partial<TransactionSearchModel>) => {
    setParamSearch((prev) => ({
      ...prev,
      ...value
    }))
  }

  return (
    <Box title='Deposit List'>
      <FilterBox className='mb-4' />
      <OpacityAnimation>
        <LoadingOverlay isLoading={isFetching || isAccepting}>
          <DataTable
            columns={columns}
            data={transactionList?.data?.data}
            totalItem={transactionList?.data?.totalItem}
            totalPages={transactionList?.data?.totalPages}
            paramSearch={paramSearch}
            onTableChange={handleParamSearchChange}
            getRowCanExpand={() => true}
            loading={isFetching}
          />
        </LoadingOverlay>
      </OpacityAnimation>
    </Box>
  )
}
