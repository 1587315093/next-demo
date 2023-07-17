import { useContext } from "react";
import { GlobalContext } from "./_app"
import dynamic from "next/dynamic";
import { TestCop2 } from "@components"
import { logFn } from "utils"


const TestCop = dynamic(import("../app/components/TestCop"))
const TestCop2Dy = dynamic(import("../app/components/TestCop2").then(res => res.TestCop2))
const TestCopLoading = dynamic(() => import("../app/components/TestCop"), {
    loading: () => <p>666</p>,
    ssr: false,
})

export default function PageIndex(props: any) {
    const { state, setState } = useContext<any>(GlobalContext)
    logFn('666')

    return (
        <>
            <TestCop2 />
            <h1 onClick={() => { setState(2) }}>Hellow PageIndex</h1>
            <TestCop />
            <TestCop2Dy />
            <TestCopLoading />
        </>
    );
}

export async function getServerSideProps(context: any) {
    const { params, query } = context

    console.log(params, query, 'params, query');

    return {
        props: {

        },
    };
}
