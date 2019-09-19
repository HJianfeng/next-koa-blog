import React from 'react';
import './style.less';
// import '@/static/css/common.less';

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">LOGO</div>
        <div className="header-navbar">
          <div className="header-navbar-item">文章</div>
          <div className="header-navbar-item">热门</div>
          <div className="header-navbar-item">探索</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
