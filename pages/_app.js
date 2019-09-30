import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/Layout';
import makeStore from '../store';
import 'antd/dist/antd.less';
import '../static/css/reset.less';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
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
