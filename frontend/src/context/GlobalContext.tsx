import axios from '@lib/axios'
import { AxiosResponse } from 'axios'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { Contributor } from 'types/Contributor'
import { Fine } from 'types/Fine'

interface GlobalContext {
    goal: number
    title: string
    balance: number
    progress: number
    topContributors: Contributor[]
    latestFines: Fine[]
}

export const GlobalContext = createContext<GlobalContext>({
    goal: 0,
    title: 'goal',
    balance: 0,
    progress: 0,
    topContributors: [],
    latestFines: []
})

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { mutate } = useSWRConfig()
    //const [goal, setGoal] = useState({ value: 0, title: 'goal'})
    //const [balance, setBalance] = useState(0)

    const { data: goal, error: goalError } = useSWR('/api/goal', () =>
        axios
            .get('api/goal')
            .then((res: AxiosResponse) => res.data)
            .catch((err) => console.log('err', err))
    )

    const { data: balance, error: balanceError } = useSWR('/api/balance', () =>
        axios
            .get('api/balance')
            .then((res: AxiosResponse) => res.data)
            .catch((err) => console.log('err', err))
    )

    const { data: topContributors, error: topContributorsError } = useSWR(
        '/api/fine/topContributors',
        () =>
            axios
                .get('api/fine/topContributors')
                .then((res: AxiosResponse) => res.data)
                .catch((err) => console.log('err', err))
    )

    const { data: latestFines, error: latestFinesError } = useSWR(
        '/api/fine/latestFines',
        () =>
            axios
                .get('api/fine/latestFines')
                .then((res: AxiosResponse) => res.data)
                .catch((err) => console.log('err', err))
    )

    let progress = goal?.amount && balance ? Math.floor((100 / goal.amount) * balance) : 0

    return (
        <GlobalContext.Provider
            value={{
                goal: goal?.amount || 0,
                title: goal?.title || '',
                balance: balance || 0,
                topContributors: topContributors || [],
                latestFines: latestFines || [],
                progress: progress,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
