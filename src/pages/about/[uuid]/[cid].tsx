import { useRouter } from "next/router";


export default function CidPage(props: any) {
    const { query } = useRouter()
    console.log(query, 'query');

    return <h1>CidPage</h1>
}

export async function getServerSideProps(context: any) {
    const { params, query } = context

    console.log(params, query, 'params, query');

    return {
        props: {

        },
    };
}
