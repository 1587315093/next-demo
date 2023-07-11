// import Layout from "@/app/layout";
import { useContext } from "react";
import { GlobalContext } from "./_app"
export default function PageIndex(props: any) {
    const { state, setState } = useContext<any>(GlobalContext)

    console.log(state, 'state');
    return (
        <h1 onClick={() => { setState(2) }}>Hellow PageIndex</h1>
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
