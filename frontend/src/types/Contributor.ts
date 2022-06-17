export type Contributor = {
    user_id: number
    contribution: string
    sum: string
    user: {
        id: number
        name: string
        tag: string
    }
}