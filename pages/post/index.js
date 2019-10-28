/* eslint-disable react/no-danger */
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '@store/home';
import { message, Popconfirm } from 'antd';
import Router from 'next/router';
import Recommend from '@/components/Recommend';
import { getArticeOne, getRecommend, deleteArticle } from '@/utils/api/home';
import Catalog from '@/components/Posts/Catalog';
import { formatTime } from '@/utils';
import marked from '@/components/marked';

import './index.less';
import './markdown.less';
import 'highlight.js/styles/tomorrow.css';

function Post({ articeData, recommendData, userInfo }) {
  const deletePost = useCallback(async (id) => {
    if (!id && id === '') return;
    const { data } = await deleteArticle(id);
    if (data.code === 200) {
      message.success('删除成功');
      Router.push('/');
    } else {
      message.error(data.msg);
    }
  }, []);
  const editPost = useCallback(async (id) => {
    Router.push(`/editor?id=${id}`);
  }, []);
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
                          <div onClick={() => { editPost(articeData.data._id); }} className="post-tools-item dot tools-operation">编辑</div>
                          <Popconfirm
                            title="确定要删除这篇文章吗?"
                            onConfirm={() => { deletePost(articeData.data._id); }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <div className="post-tools-item tools-operation">删除</div>
                          </Popconfirm>
                        </Fragment>
                      )
                      : null
                    }
                  </div>
                </div>
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(articeData.data.content) }} />
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
          { articeData
            && articeData.code === 200
            && articeData.data.catalog
            && articeData.data.catalog.length > 0
            ? <Catalog catalog={articeData.data.catalog} />
            : null
          }
        </div>
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
