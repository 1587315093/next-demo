import { useRouter } from "next/router";


export default function UuidPage(props: any) {
    const { query } = useRouter()
    console.log(query, 'query');

    return <h1>UuidPage</h1>
}