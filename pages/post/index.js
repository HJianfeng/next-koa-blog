/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '@store/home';
import Recommend from '@/components/Recommend';
import { getArticeOne, getRecommend } from '@/utils/api/home';
import Catalog from '@/components/Posts/Catalog';
import { formatTime } from '@/utils';

import './index.less';
import 'github-markdown-css';
import 'highlight.js/styles/tomorrow.css';

function Post({ articeData, recommendData, userInfo }) {
  return (
    <div className="post-container">
      <div className="post-content">
        <div className="markdown-container">
          {
          articeData && articeData.data
            ? (
              <Fragment>
                <div className="post-top">
                  <div className="post-title">{articeData.data.title}</div>
                  <div className="post-tools">
                    <div className="post-tools-item">{formatTime(articeData.data.createTime, '{y}年{m}月{d}日')}</div>
                    <div className="post-tools-item">{`阅读${articeData.data.viewNum}`}</div>
                    {userInfo && userInfo.code === 200 && userInfo.data
                      ? (
                        <Fragment>
                          <div className="post-tools-item dot tools-operation">编辑</div>
                          <div className="post-tools-item tools-operation">删除</div>
                        </Fragment>
                      )
                      : null
                    }
                  </div>
                </div>
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: articeData.data.content }} />
              </Fragment>
            )
            : ''
          }
        </div>
        <div className="right-bar">
          { recommendData && recommendData.code === 200
            ? <Recommend recommendData={recommendData.data} />
            : null
          }
          { articeData && articeData.code === 200 && articeData.data.catalog.length > 0
            ? <Catalog catalog={articeData.data.catalog} />
            : null
          }
        </div>
      </div>
    </div>
  );
}

Post.getInitialProps = async (ctx) => {
  if (ctx.req && ctx.res) {
    const { id } = ctx.query;
    const params = { id };
    const recommendParams = {
      pageSize: 5,
      postId: id
    };
    const [artice, recommendData] = await Promise.all([
      getArticeOne(params),
      getRecommend(recommendParams)
    ]);
    return {
      articeData: artice.data,
      recommendData: recommendData.data
    };
  }
  return {};
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
export default connect(mapState, mapDispatch)(Post);
