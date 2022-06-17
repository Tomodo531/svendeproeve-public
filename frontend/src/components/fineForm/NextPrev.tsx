import React from 'react'
import Button from '../elements/Button'

interface NextPrevTypes {
    nextStep?: () => void
    prevStep?: () => void
}

const NextPrev = ({ nextStep, prevStep }: NextPrevTypes) => {
    return (
        <div className="flex flex-row gap-3">
            {prevStep && (
                <Button onClick={prevStep}>
                    Back
                </Button>
            )}

            {nextStep && (
                <Button appearance="primary" onClick={nextStep}>
                    Next
                </Button>
            )}
        </div>
    )
}

export default NextPrev
