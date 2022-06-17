import clsx from 'clsx'
import { Contributor } from 'types/Contributor'

const Contributor = ({ contributor, index }: { contributor: Contributor, index: number }) => {
    return (
        <div className="flex text-base text-white items-center px-1 my-4 gap-3">
            <div className={clsx(
                index === 0 && "bg-gradient-to-r from-[#AF7A2A] to-[#E9A94A]",
                index === 1 && "bg-gradient-to-r from-[#898989] to-[#DDDDDD]",
                index === 2 && "bg-gradient-to-r from-[#842F00] to-[#DE893A]",
                "flex-none rounded-full bg-turquoise p-[4px]")}>
                <div className="flex items-center justify-center rounded-full h-[55px] w-[55px] m-auto text-white text-[18px] bg-primary">
                    <p>{contributor.contribution}<span className="text-xs">%</span></p>
                </div>
            </div>

            <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{contributor.user.name}</p>
                {contributor.user.tag && <p className="text-ellipsis overflow-hidden whitespace-nowrap text-lightGrey">@{contributor.user.tag}</p>}
            </div>
            <span className="font-semibold ml-auto whitespace-nowrap">{contributor.sum} kr</span>
        </div>
    )
}

export default Contributor
