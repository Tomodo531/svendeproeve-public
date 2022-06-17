import { Withdrawal } from 'types/Withdrawal'

const WithdrawalCard = ({ withdrawal }: { withdrawal: Withdrawal }) => {
    return (
        <div className="flex text-base w-full text-white items-center py-3 px-5 rounded-xl bg-secondary gap-3">
            <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    {withdrawal.title}
                </p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {withdrawal.user.name}
                </p>
            </div>
            <span className="flex-none font-semibold ml-auto whitespace-nowrap text-red-500">-{withdrawal.amount} kr</span>
        </div>
    )
}

export default WithdrawalCard
