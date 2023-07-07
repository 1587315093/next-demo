import { useRouter } from "next/router";


export default function HomeUid(props: any) {
    const { query } = useRouter()


    return <h1>HomeUid: {query.uid}</h1>
}


// ssr 相关，函数会在服务端执行
export async function getServerSideProps(context: any) {
    const { params } = context
    // params 为url的参数
    console.log(params, '控制台params');


    return {
        props: {

        }
    }
}  