import { ReactNode } from "react"

const Wrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
    return <div className={`flex flex-col gap-3 my-3 ${className}`}>{children}</div>
}

export default Wrapper