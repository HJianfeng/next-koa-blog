/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin, Row, Col } from 'antd';
import { actionCreators } from '@store/home';

import Recommend from 'components/Recommend';
import ArticleList from 'components/Home/ArticleList';

import { getArticeList, getRecommend } from '@/utils/api/home';
import './index.less';

function Home({ homeData, recommendData }) {
  const [articleList, setArticleList] = useState(homeData.data || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  const handleInfiniteOnLoad = useCallback(async (current) => {
    if (flag) {
      setLoading(true);
      setFlag(false);
      const params = {
        page: current + 1,
        pageSize: 10
      };
      const { data } = await getArticeList(params);
      setPage(data.current);
      setLoading(false);
      if (data.code === 200 && data.data.length > 0) {
        setFlag(true);
        const newArr = articleList.concat(data.data);
        setArticleList(newArr);
      }
    }
  }, [flag]);

  return (
    <div className="home-container">
      <div className="home-content">
        <Row className="home-row">
          <Col xs={{ span: 24 }} sm={{ span: 17 }} className="home-article">
            <div className="home-article-list">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() => { handleInfiniteOnLoad(page); }}
                hasMore={page < homeData.page}
              >
                <div className="article-list">
                  {
                  articleList.map((item) => {
                    return <ArticleList key={item._id} homeDataItem={item} />;
                  })
                }
                </div>
              </InfiniteScroll>
            </div>
            <div className="loading-container"><Spin spinning={loading} /></div>
            {
              articleList.length >= homeData.total
                ? <div className="loading-container">加载完成</div> : ''
            }
          </Col>
          <Col xs={{ span: 0 }} sm={{ span: 6 }} className="home-aside">
            { recommendData && recommendData.code === 200
              ? <Recommend recommendData={recommendData.data} />
              : null
            }
          </Col>
        </Row>
      </div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const params = { page: 1, pageSize: 10 };
  const recommendParams = { pageSize: 10 };
  const [articeList, recommendData] = await Promise.all([
    getArticeList(params),
    getRecommend(recommendParams)
  ]);

  return {
    homeData: articeList.data,
    recommendData: recommendData.data
  };
};

const mapState = (state) => {
  return {
    userInfo: state.user.userInfo
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
