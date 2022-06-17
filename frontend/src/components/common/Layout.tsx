import React, { ReactNode } from 'react'
import NavBar from '@components/common/Navbar/NavBar'
import { AuthGuard } from './AuthGuard'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <AuthGuard>
            <div className="p-5 mb-[60px]">{children}</div>
            <NavBar />
        </AuthGuard>
    )
}

export default Layout
