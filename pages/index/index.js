
import React, { useState, useCallback } from 'react';
import SideBar from 'components/Home/SideBar';
import { connect } from 'react-redux';
import { actionCreators } from '@store/home';
import axios from '@/utils/axios';
import './index.less';

function Home({ homeData }) {
  console.log('homeData', homeData);
  const [count, setCount] = useState(0);
  const handelClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-article">
          <div className="article-list">
            <div className="article-item">
              <ul className="article-item-top">
                <li onClick={handelClick} className="article-label dot">原创</li>
                <li className="article-author dot">作者</li>
                <li className="article-author dot">2019-04-14</li>
                <li className="article-author">React</li>
              </ul>
              <div className="article-item-content">一文吃透 React SSR 服务端渲染和同构原理</div>
              <div className="article-item-summary"> 一文吃透 React SSR 服务端渲染和同构原理一文吃透 React SSR 服务端渲染和同构原理一文吃透 React SSR 服务端渲染和同构原理一文吃透 React SSR 服务端渲染和同构原理</div>
              <div className="article-item-footer">
                <div className="empty" />
                <div className="view-num">
                  1000 浏览
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-aside">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const params = { a: 1 };
  const result = await axios.get('/api/test', { params });
  return {
    homeData: result.data
  };
};

const mapState = (state) => {
  return {
    scrollFlag: state.home.scrollFlag
  };
};

const mapDispatch = (dispatch) => {
  return {
    scrollHandler(type) {
      dispatch(actionCreators.changeScrollFlag(type));
    }
  };
};

export default connect(mapState, mapDispatch)(Home);
