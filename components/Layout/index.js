import Head from 'next/head'
import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const defaultKeyword = '掘金,稀土,Vue.js,微信小程序,Kotlin,RxJava,React Native,Wireshark,敏捷开发,Bootstrap,OKHttp,正则表达式,WebGL,Webpack,Docker,MVVM'
const defaultDescription = '掘金是一个帮助开发者成长的社区，是给开发者用的 Hacker News，给设计师用的 Designer News，和给产品经理用的 Medium。掘金的技术文章由稀土上聚集的技术大牛和极客共同编辑为你筛选出最优质的干货，其中包括：Android、iOS、前端、后端等方面的内容。用户每天都可以在这里找到技术世界的头条内容。与此同时，掘金内还有沸点、掘金翻译计划、线下活动、专栏文章等内容。即使你是 GitHub、StackOverflow、开源中国的用户，我们相信你也可以在这里有所收获。'

const Layout = ({
  children,
  title = 'hjf的博客',
  keyword = defaultKeyword,
  description = defaultDescription,
}) => {
  return (
    <div>
      <Head>
        <title>{ title }</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="renderer" content="webkit" />
        <meta name="keywords" content={keyword} />
        <meta name="description" content={description} />
        <meta name="apple-itunes-app" content="app-id=1172743994" />
        <link rel="icon" href="/static/favicon.ico" mce_href="/static/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/static/css/reset.css" />
        <script src="https://pv.sohu.com/cityjson?ie=utf-8" />
      </Head>
      <Header />
      { children }
      <Footer />
    </div>
  )
}

export default Layout
