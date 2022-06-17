import clsx from 'clsx'
import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode
    appearance?: 'primary' | 'social' | 'alert'
}

const Button = (
    {
        children,
        appearance,
        ...rest
    }: ButtonProps
) => {
    return (
        <button
            className={clsx(
                !appearance && "bg-white font-bold text-black",
                appearance === 'primary' && "bg-turquoise font-bold text-primary",
                appearance === 'alert' && "bg-red-500 bg-opacity-90 font-bold text-white font-l",
                appearance === 'social' && "border-2 border-zinc-200 bg-secondary/50 text-zinc-400",
                "flex justify-center gap-2 items-center w-full rounded-lg py-3"
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
