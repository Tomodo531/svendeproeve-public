import Link from 'next/link'
import { CubeTransparentIcon } from '@heroicons/react/outline'

export const NavAdminButton = ({ href }: { href: string }) => {
    return (
        <div className="basis-1/5 -translate-y-2">
            <Link href={href} passHref>
                <div className="flex items-center justify-center rounded-full bg-turquoise h-[60px] w-[60px] m-auto">
                    <CubeTransparentIcon className="h-[32px] w-[32px] stroke-1" />
                </div>
            </Link>
        </div>
    )
}
