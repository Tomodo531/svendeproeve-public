import { useAuth } from "@lib/hooks/useAuth";
import { useGlobalContext } from "context/GlobalContext";
import { NavAdminButton } from "./NavAdminButton";
import { NavBarProgress } from "./NavBarProgress";
import { NavButton } from "./NavButton";
import { HomeIcon, CurrencyDollarIcon, UsersIcon, ReceiptRefundIcon} from '@heroicons/react/outline'

const NavBar = () => {
    const { user } = useAuth()
    const {progress} = useGlobalContext()

    return (
        <div className="fixed bottom-0 left-0 right-0 flex flex-row max-h-[60px] rounded-t-xl glassmorphism">
            <NavButton
                link="/dashboard"
            >
                <HomeIcon className="stroke-1"/>
            </NavButton>

            <NavButton
                link={`/fine/${user?.id}`}
            >
                <CurrencyDollarIcon className="stroke-1"/>
            </NavButton>

            {
                user?.admin ? (
                    <NavAdminButton
                        href="/admin"
                    />
                ) : (
                    <NavBarProgress
                        progress={progress}
                    />
                )
            }

            <NavButton
                link="/user"
            >
                <UsersIcon className="stroke-1"/>
            </NavButton>

            <NavButton
                link="/withdrawal"
            >
                <ReceiptRefundIcon className="stroke-1"/>
            </NavButton>
        </div>
    )
}

export default NavBar


