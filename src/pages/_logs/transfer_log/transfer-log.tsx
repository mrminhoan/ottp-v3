import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
import DataTable from '@/components/ui/custom/custom-table/data-table/data-table'
import { CustomCodeEditor } from '@/components/ui/custom/custom-code-editor/code-editor'
import { TransferLogModel, TransferLogSearchModel } from '@/models/class/_log/tranfer-log.model'
import { LogService } from '@/service/_logs/logs.service'
import { useCustomQuery } from '@/tanstack-query/use-custom-query'
import { ColumnDef, Row } from '@tanstack/react-table'
import React, { useState } from 'react'
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
import { PATHS } from '@/constants/paths'
import { CustomDateTime } from '@/shared/components/custom-date-time'
import { LoadingOverlay } from '@/components/ui/custom/custom-loading'
import { OpacityAnimation } from '@/components/ui/custom/custom-frammer-motion'
import { Badge } from '@/components/ui/badge'
import { DateTimeHelper } from '@/lib/date-time-helper'

export default function TransferLog() {
  const [paramSearch, setParamSearch] = useState<TransferLogSearchModel>(new TransferLogSearchModel())

  const { data: transferLogs, isFetching } = useCustomQuery({
    queryKey: ['transfer-logs'],
    fetcher: LogService.getTransferLogs,
    props: {
      payload: {
        ...paramSearch
      }
    }
  })

  const handleParamSearchChange = (value: Partial<TransferLogSearchModel>) => {
    setParamSearch((prev) => ({
      ...prev,
      ...value
    }))
  }

  const columns = React.useMemo<ColumnDef<TransferLogModel>[]>(() => {
    return [
      {
        accessorKey: 'information',
        header: 'Infomation',
        meta: {
          isPinned: 'left'
        },
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                className: 'cursor-pointer bg-primary text-white font-bold px-3 py-1 rounded-md text-xs'
              }}
            >
              {row.getIsExpanded() ? 'INFOMATION 👇' : 'INFOMATION 👉'}
            </button>
          ) : (
            <></>
          )
        }
      },
      {
        accessorKey: 'Tranfer ID',
        header: 'Tranfer ID',
        cell: ({ row }) => {
          return <CustomButtonCopy textToCopy={row.original?.txn_id}>{row.original?.txn_id}</CustomButtonCopy>
        }
      },
      {
        accessorKey: '',
        header: 'User Infomation',
        cell: ({ row }) => {
          const data = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center justify-between rounded-md transition-colors focus:outline-none focus:ring-none focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-[white] hover:text-accent-foreground border border-transparent hover:border-border px-3 py-1 gap-5'>
                  <div className='flex flex-col items-start min-w-[8rem]'>
                    <p className='text-xs font-medium'>{data?.username}</p>
                    {/* <p className='text-xs text-foreground-muted opacity-50'>{data?.shop_name}</p> */}
                  </div>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[20rem] '>
                <DropdownMenuLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        User ID
                      </p>
                      <span className='text-xs'>{data?.username}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        ShopID
                      </p>
                      <span className='text-xs'>{data?.username_shop}</span>
                    </div>
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
        header: 'Seller Infomation',
        cell: ({ row }) => {
          const data = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center justify-between rounded-md transition-colors focus:outline-none focus:ring-none focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-[white] hover:text-accent-foreground border border-transparent hover:border-border px-3 py-1 gap-5'>
                  <div className='flex flex-col items-start min-w-[8rem]'>
                    <p className='text-xs font-medium'>{data?.username_seller}</p>
                    {/* <p className='text-xs text-foreground-muted opacity-50'>{data?.shop_name}</p> */}
                  </div>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[20rem] '>
                <DropdownMenuLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Seller ID
                      </p>
                      <span className='text-xs'>{data?.username_seller}</span>
                    </div>

                    <Separator />

                    <div className='flex items-center gap-2 justify-between'>
                      <p className='border border-border rounded-xs px-2 py-0.5 bg-primary text-white min-w-[5.5rem] text-center text-xs'>
                        Seller Name
                      </p>
                      <span className='text-xs'>{data?.seller_name}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    window.open(
                      `${PATHS.EXTERNAL.SELLER.BASIC_INFO}?id=${data?.seller_id}`,
                      'seller-detail',
                      'width=1024,height=768,resizable=yes,scrollbars=yes,noopener=true,noreferrer=true'
                    )
                  }}
                >
                  <BoltIcon size={16} className='opacity-60' aria-hidden='true' />
                  <span>Seller Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      },

      {
        accessorKey: 'status_code',
        header: 'Status Code',
        cell: ({ row }) => {
          const statusCode = row.original?.status_code
          const isSuccess = statusCode === 200
          return (
            <div
              className={`mx-auto w-fit text-xs px-2 py-0.5 rounded ${isSuccess ? 'bg-success text-white' : 'bg-error-gradient text-white'}`}
            >
              {statusCode}
            </div>
          )
        }
      },

      {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => {
          return (
            <Badge variant={row.original?.action} className='capitalize'>
              {row.original?.action}
            </Badge>
          )
        }
      },

      {
        accessorKey: 'message',
        header: 'Message',
        cell: ({ row }) => {
          return <div className='text-xs'>{row.original?.message}</div>
        }
      },

      {
        accessorKey: 'created_at',
        header: 'Request Time	',
        size: 200,
        cell: ({ row }) => {
          return <CustomDateTime date={row.original.request_date} className='text-xs font-medium' />
        }
      },
      {
        accessorKey: 'created_at',
        header: 'Response Time	',
        size: 200,
        cell: ({ row }) => {
          return <CustomDateTime date={row.original.response_date} className='text-xs font-medium' />
        }
      },
      {
        accessorKey: '',
        header: 'Process Time',
        size: 200,
        cell: ({ row }) => {
          return <p>{DateTimeHelper.diffMinutes(row.original.request_date, row.original.response_date)}</p>
        }
      }
    ]
  }, [])

  const renderSubComponent = ({ row }: { row: Row<any> }) => {
    return (
      <div className='flex gap-2'>
        <CustomCodeEditor
          data={row.original?.information}
          title='Transmitted Data :'
          showCodeEditor={true}
          showKeyValueList={true}
        />
        <CustomCodeEditor
          data={row.original?.response}
          title='Response Data URL :'
          showCodeEditor={true}
          showKeyValueList={true}
        />
      </div>
    )
  }

  return (
    <OpacityAnimation>
      <LoadingOverlay isLoading={isFetching}>
        <DataTable
          columns={columns}
          data={transferLogs?.data?.data}
          totalItem={transferLogs?.data?.totalItems}
          totalPages={transferLogs?.data?.totalPages}
          paramSearch={paramSearch}
          onTableChange={handleParamSearchChange}
          getRowCanExpand={() => true}
          loading={isFetching}
          renderSubComponent={renderSubComponent}
        />
      </LoadingOverlay>
    </OpacityAnimation>
  )
}
