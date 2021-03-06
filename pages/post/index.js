/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '@store/home';
import { Row, Col } from 'antd';
import Recommend from '@/components/Recommend';
import PostTools from '@/components/PostComponents/postTools';
import Catalog from '@/components/PostComponents/Catalog';
import marked from '@/components/marked';
import { getArticeOne, getRecommend } from '@/utils/api/home';

import './index.less';
import './markdown.less';
import 'highlight.js/styles/tomorrow.css';

function Post({ articeData, recommendData, userInfo }) {
  const artice = marked(articeData.data.content);
  return (
    <div className="post-container">
      <div className="post-content">
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 17 }}>
            <div className="markdown-container">
              { articeData && articeData.data
                ? (
                  <Fragment>
                    <div className="post-top">
                      <div className="post-title">{articeData.data.title}</div>
                      <PostTools userInfo={userInfo} articeData={articeData} />
                    </div>
                    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: artice }} />
                  </Fragment>
                )
                : ''
              }
            </div>
          </Col>
          <Col xs={{ span: 0 }} sm={{ span: 6 }} className="post-aside">
            <div className="right-bar">
              { recommendData && recommendData.code === 200
                ? <Recommend recommendData={recommendData.data} />
                : null
              }
              { articeData
                  && articeData.code === 200
                  && articeData.data.content
                ? <Catalog artice={artice} />
                : null
              }
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Post.getInitialProps = async (ctx) => {
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
