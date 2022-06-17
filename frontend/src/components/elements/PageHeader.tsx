import React from 'react'

interface ButtonProps {
    headline: string
    subHeadline: string
}

const PageHeader = ({headline, subHeadline}: ButtonProps) => {
  return (
    <div className="mb-4">
        <h1 className="text-white text-xl">{headline}</h1>
        <p className="text-lightGrey text-medium">{subHeadline}</p>
    </div>
  )
}

export default PageHeader