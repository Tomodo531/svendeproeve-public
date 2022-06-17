import { CircularProgress } from '@components/elements/CircularProgress'
import { ListSwitcher } from '@components/elements/ListSwitcher'
import { Header } from '@components/common/Header'
import { useGlobalContext } from "context/GlobalContext";


const Dashboard = () => {

    return (
        <>
            <Header variant={'dashboard'}/>
            <CircularProgress/>

            <ListSwitcher/>
        </>
    )
}

export default Dashboard
