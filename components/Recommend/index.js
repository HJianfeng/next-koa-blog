import React from 'react';
import { Icon } from 'antd';
import Link from 'next/link';
import './index.less';


function Recommend({ recommendData, title = '你可能感兴趣' }) {
  return (
    <div className="recommend-container">
      <div className="recommend-title">
        {title}
      </div>
      <div className="recommend-list">
        {
          recommendData.map((item) => {
            return (
              <Link
                key={item._id}
                href={`/post/${item._id}`}
              >
                <div className="recommend-item">
                  <div className="recommend-item-title">{item.title}</div>
                  <div className="recommend-item-bar">
                    <div className="placeholder" />
                    <div className="bar-item">
                      <Icon className="icon" type="eye" />
                      <span className="num">{item.viewNum}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}

export default Recommend;
