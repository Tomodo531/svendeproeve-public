interface NavBarProgressProps {
    progress: number
}
export const NavBarProgress = ({ progress }: NavBarProgressProps) => {
    return (
        <div className="basis-1/5 -translate-y-2">
            <div className="flex items-center justify-center rounded-full border-4 border-turquoise h-[60px] w-[60px] m-auto text-white text-[18px]">
                <p>
                    {progress}
                    <span className="text-xs">%</span>
                </p>
            </div>
        </div>
    )
}
