import { API } from "@/constants"
import { TransactionService } from "@/service/pages/member/member.service"
import { useCustomQuery } from "@/tanstack-query"

export default function UserTransaction() {
  const { data: transactionList } = useCustomQuery({
    queryKey: [API.TRANSACTION.LIST],
    queryFn: () => TransactionService.getRecentTransactionList()
  })
  console.log(transactionList)

  return <div>UserTransaction</div>
}

