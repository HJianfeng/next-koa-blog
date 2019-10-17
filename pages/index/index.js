/* eslint-disable no-underscore-dangle */
import React from 'react';
// import SideBar from 'components/Home/SideBar';
import Recommend from 'components/Recommend';
import ArticleList from 'components/Home/ArticleList';
import { connect } from 'react-redux';
import { actionCreators } from '@store/home';
import { getArticeList, getRecommend } from '@/utils/api/home';
import './index.less';

function Home({ homeData, recommendData }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-article">
          <div className="article-list">
            {
              homeData.data.map((item) => {
                return <ArticleList key={item._id} homeDataItem={item} />;
              })
            }
          </div>
        </div>
        <div className="home-aside">
          { recommendData && recommendData.code === 200
            ? <Recommend recommendData={recommendData.data} />
            : null
          }
        </div>
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
