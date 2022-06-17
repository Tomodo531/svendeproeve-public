import { XCircleIcon, DotsCircleHorizontalIcon, CheckCircleIcon } from '@heroicons/react/outline'
import {status} from "@lib/fineStatus"
import { PremadeFine as PremadeFineProps } from "types/PremadeFine"

export const PremadeFine = ({premadeFine} : {premadeFine: PremadeFineProps}) => {
    return(
        <div className="flex text-base text-white items-center px-1 gap-3">
            <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{premadeFine.title}</p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">{premadeFine.description}</p>
            </div>
            <span className="flex-none font-semibold ml-auto whitespace-nowrap">{premadeFine.amount} kr</span>
        </div>
    )
}
