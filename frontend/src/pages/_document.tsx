import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href='/manifest.json'/>
                    <link rel="apple-touch-icon" href="/favicon.ico"/>
                    <meta name="theme-color" content="#27e0a6"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}
export default MyDocument
