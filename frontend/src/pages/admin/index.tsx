import { AuthGuard } from '@components/common/AuthGuard'
import Wrapper from '@components/common/Wrapper'
import Button from '@components/elements/Button'
import PageHeader from '@components/elements/PageHeader'
import Link from 'next/link'
import React from 'react'

const AdminPanel = () => {
  return (
    <AuthGuard admin={true}>
        <PageHeader headline="Admin panel" subHeadline="All admin features"/>
        <Wrapper>
            <Link href="/fine/all" passHref>
                <Button appearance="primary">All fines</Button>
            </Link>
            <Link href="/fine/create" passHref>
                <Button>Create fines</Button>
            </Link>
            <Link href="/goal" passHref>
                <Button appearance="primary">Update goal</Button>
            </Link>
            <Link href="/withdrawal/create" passHref>
                <Button>Make withdrawal</Button>
            </Link>
            <Link href="/premadefine" passHref>
                <Button appearance="primary">All premade fines</Button>
            </Link>
            <Link href="/premadefine/form" passHref>
                <Button>Create premade fines</Button>
            </Link>
        </Wrapper>
    </AuthGuard>
  )
}

export default AdminPanel