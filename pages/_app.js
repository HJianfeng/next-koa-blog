import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import axios from '@/utils/axios';
import Layout from '../components/Layout';
import makeStore from '../store';
import 'antd/dist/antd.less';
import '../static/css/reset.less';
import { actionCreators } from '../store/Reducer/user';
import { getServerCookie } from '@/utils';

const isServer = typeof window === 'undefined';
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let xtoken = '';
    if (isServer && ctx.req && ctx.req.headers) {
      xtoken = getServerCookie(ctx.req.headers.cookie, 'xtoken') || '';
      // 第一次请求时，只有这里能获取到cookie
      // 把token插入axios heades
      axios.defaults.headers.xtoken = xtoken;
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    await ctx.store.dispatch(actionCreators.getUserInfoAction());
    return { pageProps };
  }

  componentDidMount() {
    /* eslint-disable */
    var _hmt = _hmt || [];
    (function () {
      let hm = document.createElement('script');
      hm.src = 'https://hm.baidu.com/hm.js?d71667f63372cbb013eb0b535f067be1';
      let s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(hm, s);
    }());
  }

  componentDidUpdate() {
    const { location } = window;
    const contentUrl = location.pathname + location.hash;
    if (window._czc) {
      const refererUrl = '/';
      window._czc.push(['_trackPageview', contentUrl, refererUrl]);
    }
    if (window._hmt) {
      window._hmt.push(['_trackPageview', contentUrl]);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Layout
            title={pageProps.title}
            headerHidden={pageProps.headerHidden}
            FooterHidden={pageProps.FooterHidden}
          >
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
