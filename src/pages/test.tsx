export default function Test(props: any) {
    console.log(props, 'props');

    return <h1>test</h1>
}

export async function getServerSideProps(params: any) {
    console.log('控制台params');


    return {
        props: {

        }
    }
}  