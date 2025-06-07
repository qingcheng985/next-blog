import { useState, useEffect } from 'react';

export default function CSRPost() {
    const [post, setPost] = useState(null);

    // ======================
    // CSR 的优点：
    // 1. 减少服务器负载（渲染工作在浏览器完成）
    // 2. 适合高度动态交互的内容（如用户仪表盘）
    // 3. 页面切换更快（仅加载数据，不刷新整个页面）
    // ======================
    useEffect(() => {
        fetch('/a.json')
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('CSR 数据加载失败:', error));
    }, []);

    // ======================
    // CSR 的缺点：
    // 1. SEO 不友好（初始 HTML 为空，爬虫无法获取内容）
    // 2. 首屏加载较慢（需等待 JS 下载、执行和数据请求）
    // 3. 依赖 JavaScript（如果用户禁用 JS，页面无法渲染）
    // ======================
    if (!post) return <div>Loading...</div>; // 数据未加载时的占位

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}
