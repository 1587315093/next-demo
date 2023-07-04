import Layout from "@/app/layout";
import { Button, Radio, Space } from "antd-mobile";

export default function Test(props: any) {

    const handleClick = () => {
        console.log("handleClick");

    }
    return (
        <Layout>
            <Button>Test</Button>
            <br />
            <div onClick={handleClick} style={{ padding: 20, background: 'red' }}>
                <label>
                    <input type="radio" />
                    <div>radio</div>
                </label>
            </div>
        </Layout>
    );
}

// export async function getServerSideProps(params: any) {
//     return {
//         props: {},
//     };
// }
