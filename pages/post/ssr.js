// 更好的实践：服务端提供初始数据，客户端只更新变化部分
import {useState} from "react";

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/a.json');
    const initialData = await res.json();

    return { props: { initialData } };
}

export default function Page({ initialData }) {
    const [data, setData] = useState(initialData);

    // 只有当需要更新时才发起客户端请求
    const refreshData = () => {
        fetch('/a.json')
            .then(res => res.json())
            .then(setData);
    };

    return (
        <div>
            <button onClick={refreshData}>刷新数据</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
