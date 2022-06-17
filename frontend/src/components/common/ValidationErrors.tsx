const ValidationErrors = ({ errors = [], className, ...props }: {errors: string[], className?: string}) => (
    <>
        {errors.length > 0 && (
            <div className={className} {...props}>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
    </>
)

export default ValidationErrors
