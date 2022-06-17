import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode
    appearance?: 'circular' | 'wide'
}

const RoundButton = (
    {
        children,
        appearance,
        className,
        ...rest
    }: ButtonProps
) => {
    return (
        <button
            className={clsx(
                !appearance && `flex items-center justify-center rounded-full py-3 w-full bg-offWhite w-[50px] h-[50px] ${className}`,
                appearance === 'wide' && `flex items-center justify-center rounded-full bg-offWhite text-primary text-sm py-1 px-5 ${className}`,
                appearance === 'circular' && `flex items-center justify-center rounded-full bg-offWhite ${className}`,
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

export default RoundButton
