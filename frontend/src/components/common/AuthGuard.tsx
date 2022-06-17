import {useAuth} from "@lib/hooks/useAuth";
import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode
    admin?: boolean
}

export const AuthGuard = (
    {
        children,
        admin
    }: LayoutProps
) => {
    useAuth({ middleware: admin ? 'admin' : 'auth', redirectIfAuthenticated: '/login' })

    return <>{children}</>
}
