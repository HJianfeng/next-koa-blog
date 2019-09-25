import React from 'react';
import SideBar from 'components/Home/SideBar';
import axios from '@/utils/axios';
import './index.less';


function Home() {
  const handelClick = async () => {
    const params = { page: 1 };
    const result = await axios.get('/api/test', { params });
    console.log(result.data);
  };
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-article">
          <div className="article-list">
            <div className="article-item">
              <ul className="article-item-top">
                <button type="button" onClick={handelClick}>Sort</button>
                <li className="article-label dot">原创</li>
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
  const result = await axios.get('/api/test');
  console.log(result.data);
  return {
    title: '标题',
  };
};

export default Home;
