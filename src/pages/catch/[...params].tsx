import { useRouter } from "next/router";

export default function CatchPage(props: any) {
    const { query } = useRouter()

    return <h1>CatchPage: {JSON.stringify(query)}</h1>
}
