interface SuccessStatusProps {
    status: string|null
    className?: string
}

const SuccessStatus = (
    {
        status,
        className,
        ...props
    }: SuccessStatusProps
) => <>
    {status && (
        <div
            className={`${className} font-medium text-sm text-green-600`}
            {...props}>
            {status}
        </div>
    )}
</>

export default SuccessStatus
