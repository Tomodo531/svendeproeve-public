import { AuthGuard } from '@components/common/AuthGuard'
import FineForm from '@components/fineForm/FineForm'
import React from 'react'

const Create = () => {
  return (
    <AuthGuard admin={true}>
      <div className="mb-[65px]">
        <FineForm/>
      </div>
    </AuthGuard>
  )
}

export default Create