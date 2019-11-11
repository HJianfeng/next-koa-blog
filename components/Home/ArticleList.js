import React from 'react';
import Router from 'next/router';
import { formatTime } from '@/utils';

// @param {String}  type     [1: 原创 2: 翻译 3: 转载]
// href={`/post/${homeDataItem._id}`}
function ArticleList({ homeDataItem }) {
  return (
    <div className="article-item" onClick={() => Router.push(`/post/${homeDataItem._id}`)}>
      <div className="article-item-content">{homeDataItem.title}</div>
      <div className="article-item-summary">{homeDataItem.summary || ''}</div>
      <div className="article-item-footer">
        <div className="empty" />
        { homeDataItem.type === 2 ? <div className="article-label dot">翻译</div> : null}
        { homeDataItem.type === 3 ? <div className="article-label dot">转载</div> : null}
        <div className="article-author dot">{homeDataItem.category || 'js'}</div>
        <div className="article-author dot">{formatTime(homeDataItem.createTime, '{y}-{m}-{d}')}</div>
        <div className="view-num">
          {`${homeDataItem.viewNum}浏览`}
        </div>
      </div>
    </div>
  );
}

export default ArticleList;
