## Next.js

## 启动

> yarn 与 node 16.14

#### 使用 `next` 官方提供的 `create-next-app`

```bash
npx create-next-app
```

然后像选配一样选择项目需要一起初始化的工具之类的,可以根据项目所需选择需要的就行了，这边是全部都选了

**需要注意的是下面这个选项,可能会导致项目结构不一致,他会问你是否需要创建以 src/ 为根目录的项目结构, 这边也选了**

```bash
? Would you like to use `src/` directory with this project? » No / Yes
```

这个选项是用来决定是否使用 src/ 目录作为项目根目录

选择 Yes 会将 src/ 目录作为项目根目录，选择 No 则使用默认的项目结构，将 pages/、public/、styles/ 等目录作为项目根目录。

**还有这个选项,与路由相关的,这边也是选了 Yes**

```bash
? Use App Router (recommended)? » No / Yes
```

选择 Yes 会使用 Next.js 推荐的路由方案，选择 No 则需要手动配置路由。

> 使用 App Router 是 Next.js 推荐的路由方案，它提供了一些特性，例如动态路由、嵌套路由、自动代码分割等。使用 App Router 可以让你更方便地实现页面跳转和路由控制，同时也可以提高页面的性能和加载速度。

总的来说，选择 Yes 可以让你更快地创建一个 Next.js 应用，并使用 Next.js 推荐的路由方案。而选择 No 可以让你更加灵活地控制路由行为，但需要手动配置路由。

最后得到一个这样的目录结构~

```
next-app
├─ public                  # 存放静态资源的目录
│   ├─ next.svg            # Next.js 的 logo
│   └─ vercel.svg          # Vercel 的 logo
├─ src                     # 存放代码位置与初始生成是否选择 src 有关
│   └─ app                 # 应用程序的代码目录
│       ├─ favicon.ico     # 网站的图标
│       ├─ globals.css     # 全局样式
│       ├─ layout.tsx      # 页面布局组件
│       └─ page.tsx        # 页面组件
├─ next-env.d.ts           # Next.js 生成的类型声明文件
├─ next.config.js          # Next.js 的配置文件
├─ package-lock.json       # 锁定依赖包的版本信息
├─ package.json            # 项目的依赖包信息
├─ postcss.config.js       # PostCSS 相关配置
├─ README.md               # 项目的说明文档
├─ tailwind.config.js      # Tailwind CSS 相关配置
└─ tsconfig.json           # TypeScript 相关配置
```

接下来就是下依赖启动了，可以看到 pageage.json 里使用 dev 命令触发 `next dev` 的

```bash
yarn

yarn dev
```

然后默认启动了 `http://localhost:3000/` 为本地服务，点击打开就可以看到一个 `next` 的页面 `demo`

![image](https://github.com/ant-design/ant-design/assets/77056991/10be1af8-fe23-4c4a-9778-98a3ffdb2588)

## 路由

> 直观的、 基于页面 的路由系统（并支持 动态路由）

#### 基于页面的路由

基于页面就是会基于 `pages` 文件下中导出得 `.js`、`jsx`、`.ts` 或 `.tsx ` 的 `React` 组件 每个 `page`都使用其**文件名作为路由**

所以创建一个 `pages` 目录，然后在里面创建个 `home.tsx` ，写入一个 `React` 组件并 `export default` 它

```tsx
export default function Home(props: any) {
  return <h1>Home</h1>;
}
```

然后访问 `http://localhost:3000/home` 就可以看到效果了

#### 动态路由

**基础用法**

例如在 `pages` 下创建一个 `[uid].tsx` 文件作为路由，那么你就可以通过 `pages/123` 、`pages/321` 这样进行访问路由。

然后是要 `next` 提供的 `useRouter` 可以获取到路由的 `query` 参数

```tsx
// pages/[uid].tsx

import { useRouter } from "next/router";

export default function UidPage(props: any) {
  const { query } = useRouter();

  return <h1>uid: {query.uid}</h1>;
}
```

**动态路由再携带其他参数**

如 `http://localhost:3000/999?test=test` , 这先是命中了 `[uid].tsx` 的页面,然后 ? 后的路由参数会存储在 `useRouter` 的 `query` 里

```tsx
// pages/[uid].tsx

import { useRouter } from "next/router";

export default function UidPage(props: any) {
  const { query } = useRouter();

  console.log(query, "query"); // 会在控制台输出 { uid:999,test:"test" }

  return <h1>uid: {query.uid}</h1>;
}
```

与 `page` 同名的参数名，会被 `page` 覆盖，如 `http://localhost:3000/999?uid=123` 这样访问，查询参数会被路由参数覆盖

```tsx
console.log(query, "query"); // 会在控制台输出 { uid:999}
```

**多层动态路由**

在 `pages/about` 目录下创建 `[uuid]` 目录，然后得到 `pages/about/[uuid]` ，再继续在里面创建 `[cid].tsx`，得到一个`pages/about/[uuid]/[cid].tsx` 的路由路线

访问 `http://localhost:3000/about/666/666` 进入到`pages/about/[uuid]/[cid].tsx` 路由

得到以下路由`query`参数

```tsx
console.log(query, "query"); // 会在控制台输出 {uuid: '666', cid: '666'}
```

中间还有一层 `pages/about/[uuid]` , 想要命中的话 需要在 `[uuid]` 目录下创建个 `index.tsx`, 这样访问 `http://localhost:3000/about/666` 就可以命中 `uuid`

```tsx
console.log(query, "query"); // 会在控制台输出 {uuid: '666'}
```

**捕获所有路由**

利用`...` 扩展运算符来创建路由

在 `pages/catch` 目录下创建 `[...params].tsx` 文件，然后得到 `pages/catch/[...params].tsx` 的路由

无论是 `/catch/6` 还是 `/catch/6/7` 或者 `/catch/6/7/8`, 都会被`[...params].tsx`捕获到

`query` 数据会以数组形式呈现

```tsx
//  /catch/6
console.log(query, "query"); // 会在控制台输出 {"params":["6"]}

//  /catch/6/7
console.log(query, "query"); // 会在控制台输出 {"params":["6","7"]}

//  /catch/6/7/8
console.log(query, "query"); // 会在控制台输出 {"params":["6","7","8"]}
```

**可选捕获所有路由**

通过将参数包含在双括号 `[[...params]]` 中，可以使捕获所有路由成为可选的。

例如，`pages/optional/[[...params]].ts` 将匹配`/optional`、`/optional/a`、`/optional/a/b` 等。

像上面得捕获所有路由的是进如 `/catch` 路由后如果 pages 下没有 一个动态路由文件 则会 404， 而可选捕获则不会造成 404 原因

区别

- `[...params].tsx` 会捕获所有路由，但是没有路由参数的会造成 访问 `/catch` 会 404
- `[[...params]].tsx` 不会造成 404，可选的意思是他的参数不是必穿的，也就是不穿参数，也能进到 `/optional` 页面

## 预渲染

预渲染有两种模式

1. `SSG（Static Site Generation）`静态站点生成
2. `SSR（Server Side Rendering）` 服务端渲染 也被称为 动态渲染

在预渲染中，服务器在构建时生成静态 HTML 文件，包含了页面的基本结构、样式和部分静态内容。
当用户请求页面时，服务器直接返回这个已经生成好的静态 HTML 文件，客户端只需要进行少量的交互和数据绑定，从而快速展示页面。

预渲染 与 `CSR（Client Side Rendering）`客户端渲染 的区别

| 预渲染                               | 客户端渲染                                     |
| ------------------------------------ | ---------------------------------------------- |
| 返回生成好的 HTML 文件包含结构与样式 | 返回空 HTML 由客户端 JS 加载剩下的续结构与样式 |
| 在服务端做进行网络请求               | 在客户端进行网络请求                           |
| 在服务端或者构建时进行页面渲染       | 在客户端浏览器上进行页面渲染                   |
| 首次加载速度快                       | 首次加载时间较长                               |
| 数据与交互都要刷新页面               | 更丰富的交互和实时数据更新的能力               |

所以预渲染优点就是

1. 减少客户端压力，如计算与网络请求
2. 提高了页面的加载速度

而 `Next.js` 提供了两种预渲染方式

1. `SSG` 使用 `getStaticProps`
2. `SSR` 使用 `getServerSideProps`

#### getStaticProps

在 `next` 中，要使页面使用`SSG 静态生成`，只需导出`（export）`页面组件或导出`（export）` `getStaticProps` 函数

HTML 是在 构建时（build time） 生成的

在 `pages` 下创建名为 `ssg` 的目录，然后创建 `index.tsx` 路由，最后得到 `pages/ssg/index.tsx`

书写 SSG 代码，先写个模板

```tsx
// `pages/ssg/index.tsx`

export default function SSGDemoPage() {
  return <>SSGDemoPage</>;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
```

当然现在访问 http://localhost:3000/ssg 只能看到一个 SSGDemoPage 的文字

试着自己填充点数据在`getStaticProps` 中

```tsx
// `pages/ssg/index.tsx`

export default function SSGDemoPage(props: any) {
  console.log(props);
  return (
    <>
      <h1> SSGDemoPage</h1>
      {props.testData}
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      testData: 666,
    },
  };
}
```

可以在页面与控制台中看到 `props.testData` 的数据

所以 `getStaticProps` 返回值会填充到组件的 props 中，而 `getStaticProps` 可以在服务端请求网络直接进行数据注入，数据注入也叫**水合（data hydration）**

来做个请求，在 `getStaticProps` 请求知乎的世界各国大区接口`https://www.zhihu.com/api/v3/oauth/sms/supported_countries`

```tsx
// `pages/ssg/index.tsx`

export default function SSGDemoPage(props: any) {
  const { list } = props;
  console.log(list, "list");

  return (
    <>
      <h1>SSGDemoPage</h1>
      <ul>
        {list.map((item: any) => (
          <li key={item.abbr + item.code}>
            {item.abbr + "  " + item.code + "  " + item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://www.zhihu.com/api/v3/oauth/sms/supported_countries"
  );
  // 返回的数据需要经过.json() 处理
  const { data = [] } = await res.json();

  return {
    props: {
      list: data,
    },
  };
}
```

然后就可以看到页面循环出来了请求的数据，控制台也能看到

![image](https://github.com/1587315093/next-demo/assets/77056991/6d68c33e-812e-46bc-90c9-1a5b84e41dc7)

#### getServerSideProps

在 `next` 中，要使页面使用`SSR 服务端渲染`，只需导出`（export）`页面组件或导出`（export）` `getServerSideProps` 函数

HTML 是在每个页面请求时生成的

在 `pages` 下创建名为 `ssr` 的目录，然后创建 `index.tsx` 路由，最后得到 `pages/ssr/index.tsx`,直接 copy 刚才的 ssg 吧，反正改个渲染模式就行了

只是把 `getStaticProps` 换成了 `getServerSideProps`, 还是请求某乎的接口来渲染

```tsx
// pages/ssr/index.tsx
import Layout from "../../app/layout";

export default function SSRDemoPage(props: any) {
  const { list } = props;
  console.log(list, "list");

  return (
    <Layout>
      <h1>SSRDemoPage</h1>
      <ul>
        {list.map((item: any) => (
          <li key={item.abbr + item.code}>
            {item.abbr + "  " + item.code + "  " + item.name}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// ssr
export async function getServerSideProps() {
  const res = await fetch(
    "https://www.zhihu.com/api/v3/oauth/sms/supported_countries"
  );
  const { data = [] } = await res.json();

  return {
    props: {
      list: data,
    },
  };
}
```
