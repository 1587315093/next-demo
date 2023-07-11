import { useState, createContext } from "react"
import type { AppProps } from 'next/app'
import "../app/globals.css"

export const GlobalContext = createContext({})

export default function App({ Component, pageProps }: AppProps) {
    const [state, setState] = useState(1);

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    )
}