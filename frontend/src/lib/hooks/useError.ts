import { AxiosError } from "axios"
import { useEffect, useState } from "react"

export const useError = () => {
    const initialErrors: string[] = []
    const initialStatus: string = ''

    const [status, setStatus] = useState('')
    const [response, setResponse] = useState<AxiosError>()
    const [errors, setErrors] = useState(initialErrors)

    useEffect(() => {
        if(response && response?.response?.status === 422){
            setErrors(Object.values(Object.values(response?.response?.data.errors)))
            setStatus(initialStatus)
        }
    }, [response])

    useEffect(() => {
      setErrors(initialErrors)
    }, [status])
    

    return {
        errors,
        setResponse,
        setErrors,
        status,
        setStatus
    }
}