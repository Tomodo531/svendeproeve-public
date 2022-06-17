import { PremadeFine } from "types/PremadeFine"

export enum FineActionTypes {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}

export interface FineAction {
    type: FineActionTypes
    payload: PremadeFine
}

export default function fineReducer(state: PremadeFine[], action: FineAction) {
    const { type, payload } = action

    switch (type) {
        case FineActionTypes.ADD:
            return [...state, payload]

        case FineActionTypes.REMOVE:
            return state.filter(function (premadeFine) {
                return premadeFine.id !== payload.id
            })

        default:
            return state
    }
}