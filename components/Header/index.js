import React from 'react';
import './style.less';
import Link from 'next/link';

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <Link href="/"><a>LOGO</a></Link>
        </div>
        <div className="header-navbar">
          <div className="header-navbar-item">文章</div>
          {/* <div className="header-navbar-item">热门</div>
          <div className="header-navbar-item">探索</div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
