import { status } from "@lib/fineStatus";

export interface Fine {
    id: number
    premade_fine_id: number | null
    status: status
    title: string
    description?: string
    amount: number
    user: {
        id: number
        name: string
    }
}

export interface newFine {
    id?: number
    title: string
    description?: string
    amount: number
}
