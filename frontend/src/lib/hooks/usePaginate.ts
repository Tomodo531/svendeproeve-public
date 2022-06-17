import { useEffect, useState } from 'react'
import axios from '@lib/axios'

interface initialPaginateType {
    pageNumber: number
    pages: Array<any>
}

const initialPaginate = {
    pageNumber: 1,
    pages: [],
}

export const usePaginate = (url: string) => {
    const [search, setSearch] = useState('')
    const [lastPage, setLastPage] = useState(false)
    const [state, setState] = useState<initialPaginateType>(initialPaginate)

    const nextPage = () => {
        if (lastPage) return

        let endpoint = `${url}?page=${state.pageNumber}`

        if (search) endpoint = `${endpoint}&search=${search}`

        axios
            .get(endpoint)
            .then((res) => {
                if (res.data.last_page <= state.pageNumber) setLastPage(true)

                setState({
                    ...state,
                    pages: [...state.pages, ...res.data.data],
                    pageNumber: state.pageNumber + 1,
                })
            })
            .catch((err) => console.log(err))
    }

    const mutatePageItem = (item: any, index: number) => {
        if (item === null) state.pages.splice(index, 1)
        else state.pages[index] = item

        setState({ ...state })
    }

    useEffect(() => {
        setLastPage(false)
        setState(initialPaginate)
    }, [search])

    useEffect(() => {
        nextPage()
    }, [state, lastPage])

    useEffect(() => {
        nextPage()
    }, [])

    return {
        lastPage,
        nextPage,
        pages: state.pages,
        pageNumber: state.pageNumber,
        mutatePageItem,
        search,
        setSearch,
    }
}
