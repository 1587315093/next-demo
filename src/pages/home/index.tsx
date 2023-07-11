import { useContext } from "react";
import { GlobalContext } from "../_app"

export default function Home(props: any) {
    const { state } = useContext<any>(GlobalContext)
    console.log(state, 'state');
    return <h1>Home</h1>
}

export async function getServerSideProps(context: any) {
    console.log('控制台params');


    return {
        props: {

        }
    }
}  