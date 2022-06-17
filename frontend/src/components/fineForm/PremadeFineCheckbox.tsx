import { PremadeFine } from 'types/PremadeFine'
import { FineAction, FineActionTypes } from '@lib/utils/reducers/fineReducer'

const PremadeFineCheckbox = ({
    premadeFine,
    state,
    dispatch,
}: {
    premadeFine: PremadeFine
    state: PremadeFine[]
    dispatch: React.Dispatch<FineAction>
}) => {
    const handleChecked = () => dispatch({ type: FineActionTypes.ADD, payload: premadeFine })

    const handleUnChecked = () => dispatch({ type: FineActionTypes.REMOVE, payload: premadeFine })

    return (
        <label
            htmlFor={premadeFine.id + ''}
            className="flex text-base text-white items-center py-3 px-5 rounded-xl bg-secondary gap-3"
        >
            <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    {premadeFine.title}
                </p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {premadeFine.description}
                </p>
            </div>
            <span className="flex-none font-semibold ml-auto whitespace-nowrap">{premadeFine.amount} kr</span>
            <input
                id={premadeFine.id + ''}
                type="checkbox"
                checked={state.some(obj => obj.id === premadeFine.id)}
                onChange={(event) => event.target.checked ? handleChecked() : handleUnChecked()}
            />
        </label>
    )
}

export default PremadeFineCheckbox
