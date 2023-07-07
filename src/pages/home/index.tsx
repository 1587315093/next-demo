export default function Home(props: any) {
    console.log(props, 'props');

    return <h1>Home</h1>
}

export async function getServerSideProps(context: any) {
    console.log('控制台params');


    return {
        props: {

        }
    }
}  