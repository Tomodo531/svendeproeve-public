export type Withdrawal = {
    user_id: number
    title: string
    description?: string
    amount: number | string
    user: {
        id: number
        name: string
    }
}

export type NewWithdrawal = {
    title: string
    description?: string
    amount: number | string
}