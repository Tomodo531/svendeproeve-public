import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    placeholder: string
}

const Input = (
    {
        name,
        label,
        placeholder,
        ...rest
    }: InputProps
) => {
    return (
        <div>
            {label && <label className="block text-white font-semibold mb-2" htmlFor={name}>{label}</label>}
            <input
                className="w-full p-3 border-2 outline-0 border-turquoise bg-secondary/50 text-white focus:shadow-active rounded-lg transition-shadow"
                placeholder={placeholder}
                id={name}
                name={name}
                {...rest}
            />
        </div>
    )
}

export default Input
