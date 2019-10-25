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
  }

  componentDidUpdate() {
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
