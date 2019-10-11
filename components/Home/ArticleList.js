import React from 'react';
import Link from 'next/link';
import { formatTime } from '@/utils';

// @param {String}  type     [1: 原创 2: 翻译 3: 转载]
function ArticleList({ homeDataItem }) {
  return (
    <Link
      href={`/post/${homeDataItem._id}`}
    >
      <div className="article-item">
        <ul className="article-item-top">
          <li className="article-label dot">
            { homeDataItem.type === 1 ? '原创' : null}
            { homeDataItem.type === 2 ? '翻译' : null}
            { homeDataItem.type === 3 ? '转载' : null}
          </li>
          <li className="article-author dot">作者</li>
          <li className="article-author dot">{formatTime(homeDataItem.createTime, '{y}-{m}-{d}')}</li>
          <li className="article-author">{homeDataItem.category || 'js'}</li>
        </ul>
        <div className="article-item-content">{homeDataItem.title}</div>
        <div className="article-item-summary">{homeDataItem.summary || ''}</div>
        <div className="article-item-footer">
          <div className="empty" />
          <div className="view-num">
            {`${homeDataItem.viewNum}浏览`}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleList;
