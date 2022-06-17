import '@styles/globals.css'
import Layout from "@components/common/Layout";
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { createContext, useEffect, useState } from 'react'
import axios from '@lib/axios'
import { AxiosResponse } from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { GlobalProvider } from 'context/GlobalContext';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => {
        return(
            <>
                <GlobalProvider>
                    <Head>
                        <title>Finer</title>
                        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"/>
                    </Head>

                    <Layout>{page}</Layout>
                </GlobalProvider>
            </>
        )
    })

    return getLayout(<Component {...pageProps} />)
}
