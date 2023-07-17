import Layout from "app/layout"

export default function SSGDemoPage(props: any) {
    const { list } = props
    console.log(list, 'list');

    return (
        <Layout>
            <h1>SSGDemoPage</h1>
            <ul>
                {list.map((item: any) => (
                    <li key={item.abbr + item.code}>{item.abbr + '  ' + item.code + '  ' + item.name}</li>
                ))}
            </ul>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://www.zhihu.com/api/v3/oauth/sms/supported_countries');
    const { data = [] } = await res.json();

    return {
        props: {
            list: data
        }
    }
}  