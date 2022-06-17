import Image from 'next/image'
import Link from 'next/link'
import { Children, ReactNode } from 'react'

interface NavButtonProps {
    link: string
    children: ReactNode
}
export const NavButton = ({ link, children }: NavButtonProps) => {
    return (
        <Link href={link} passHref>
            <div className="basis-1/5 flex items-center justify-center p-5 font-thin text-white">{children}</div>
        </Link>
    )
}
