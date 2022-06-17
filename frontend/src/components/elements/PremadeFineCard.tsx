import { PremadeFine } from 'types/PremadeFine'
import { FineAction, FineActionTypes } from '@lib/utils/reducers/fineReducer'

const PremadeFineCard = ({ premadeFine }: { premadeFine: PremadeFine }) => {
    return (
        <div className="flex text-base w-full text-white items-center py-3 px-5 rounded-xl bg-secondary gap-3">
            <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    {premadeFine.title}
                </p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {premadeFine.description}
                </p>
            </div>
            <span className="flex-none font-semibold ml-auto whitespace-nowrap">{premadeFine.amount} kr</span>
        </div>
    )
}

export default PremadeFineCard
