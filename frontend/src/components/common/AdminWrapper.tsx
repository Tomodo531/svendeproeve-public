import { useAuth } from '@lib/hooks/useAuth'
import React, { ReactNode } from 'react'

const AdminWrapper = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()

    if (!user) return null

    return user.admin ? <>{children}</> : null
}

export default AdminWrapper
