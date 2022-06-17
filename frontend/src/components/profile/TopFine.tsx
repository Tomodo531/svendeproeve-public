import clsx from 'clsx'

interface TopFineProps {
    appearance: 'gold' | 'silver' | 'bronze'
    title: string
    amount: string | number
}

export const TopFine = (
    {
        appearance,
        title,
        amount
    }: TopFineProps
) => {
    return (
        <div
            className={clsx(
                appearance == 'gold' && 'bg-gradient-to-r from-[#AF7A2A] to-[#E9A94A1A]',
                appearance == 'silver' && 'bg-gradient-to-r from-[#898989] to-[#DDDDDD1A]',
                appearance == 'bronze' && 'bg-gradient-to-r from-[#842F00] to-[#DE893A1A]',
                'flex rounded-lg font-semibold text-base text-white px-4 py-6'
            )}
        >
            <span className="text-ellipsis overflow-hidden whitespace-nowrap">{title}</span>
            <span className="block ml-auto whitespace-nowrap">{amount} kr</span>
        </div>
    )
}
