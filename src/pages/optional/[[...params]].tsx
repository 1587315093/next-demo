import { useRouter } from "next/router";

export default function OptionalPage(props: any) {
    const { query } = useRouter()

    return <h1>CatchPage: {JSON.stringify(query)}</h1>
}
