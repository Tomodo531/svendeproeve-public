import React, { TextareaHTMLAttributes } from 'react'

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label: string
}

const Input = (
    {
        name,
        label,
        ...rest
    }: InputProps
) => {
    return (
        <div>
            {label && <label className="block text-white font-semibold mb-2" htmlFor={name}>{label}</label>}
            <textarea
                className="w-full p-3 border-2 outline-0 border-turquoise bg-secondary/50 text-white focus:shadow-active rounded-lg transition-shadow"
                placeholder={label}
                id={name}
                name={name}
                {...rest}
            />
        </div>
    )
}

export default Input 
