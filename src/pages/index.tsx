import Layout from "@/app/layout";

export default function PageIndex(props: any) {
    return (
        // <Layout>
        <h1>Hellow PageIndex</h1>
        // </Layout>
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
