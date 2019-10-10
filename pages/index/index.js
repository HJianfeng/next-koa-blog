/* eslint-disable no-underscore-dangle */
import React from 'react';
import SideBar from 'components/Home/SideBar';
import ArticleList from 'components/Home/ArticleList';
import { connect } from 'react-redux';
import { actionCreators } from '@store/home';
import { getArticeList } from '@/utils/api/home';
import './index.less';

function Home({ homeData }) {
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
          <SideBar />
        </div>
      </div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const params = { page: 1 };
  const result = await getArticeList(params);
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
