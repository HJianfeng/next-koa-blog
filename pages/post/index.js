/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '@store/home';
import { getArticeOne } from '@/utils/api/home';
import './index.less';
import 'github-markdown-css';
import 'highlight.js/styles/tomorrow.css';

function Post({ articeData }) {
  return (
    <div className="post-container">
      <div className="post-content">
        <div className="markdown-container">
          {
          articeData && articeData.data
            ? <div className="markdown-body" dangerouslySetInnerHTML={{ __html: articeData.data.content }} />
            : ''
          }
        </div>
        <div className="right-bar">rightbar</div>
      </div>
    </div>
  );
}

Post.getInitialProps = async (ctx) => {
  if (ctx.req && ctx.res) {
    const { id } = ctx.query;
    const params = { id };
    const result = await getArticeOne(params);
    return {
      articeData: result.data
    };
  }
  return {};
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
export default connect(mapState, mapDispatch)(Post);
