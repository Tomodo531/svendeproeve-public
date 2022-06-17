import { Fine as FineType } from "types/Fine"
import { XCircleIcon, DotsCircleHorizontalIcon, CheckCircleIcon } from '@heroicons/react/outline'
import {status} from "@lib/fineStatus"

export const Fine = ({fine} : {fine: FineType}) => {
    return(
        <div className="flex text-base text-white items-center px-1 gap-3">
            {
                fine?.status && <div className="flex-none w-[35px]">
                    {
                        fine?.status === status.WAITING ? <XCircleIcon className="h-[35px] w-[35px] text-red-600"/> :
                            fine?.status === status.PENDING ? <DotsCircleHorizontalIcon className="h-[35px] w-[35px] text-yellow-400"/> :
                                fine?.status === status.PAID ? <CheckCircleIcon className="h-[35px] w-[35px] text-green-600"/> :
                                    fine?.status === status.REJECTED ? <XCircleIcon className="h-[35px] w-[35px] text-red-600"/> :
                                        null
                    }
                </div>
            }
            <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{fine.title}</p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">{fine.description}</p>
                <p className="text-turquoise text-ellipsis overflow-hidden whitespace-nowrap">{fine.user.name}</p>
            </div>
            <span className="flex-none font-semibold ml-auto whitespace-nowrap">{fine.amount} kr</span>
        </div>
    )
}
