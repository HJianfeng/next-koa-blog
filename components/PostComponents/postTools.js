import React, { useCallback, Fragment } from 'react';
import Router from 'next/router';
import { message, Popconfirm } from 'antd';
import { deleteArticle } from '@/utils/api/home';
import { formatTime } from '@/utils';


function PostTools({ userInfo, articeData }) {
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
  );
}

export default PostTools;
