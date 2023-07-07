import { useRouter } from "next/router";


export default function UuidPage(props: any) {
    const { query } = useRouter()
    return <h1>UuidPage</h1>
}


export async function getServerSideProps(context: any) {
    const { params, query } = context

    console.log(params, query, 'params, query');

    return {
        props: {

        },
    };
}