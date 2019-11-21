// import Link from 'next/link'
import React from 'react';
import './style.less';

/* eslint-disable  */
const Header = () => (
  <div className="footer-container">
    <div className="footer-content">
      <div className="footer-item dot">HJF</div>
      <div className="footer-item dot">学如逆水行舟，不进则退</div>
      <a target="_blank" href="https://github.com/HJianfeng/learn" className="footer-item hover">Github</a>
      
    </div>
    <div className="footer-content" style={{marginTop: '10px'}}>
      <a target="_blank" href="http://www.beian.miit.gov.cn/" className="footer-item hover dot">闽ICP备19023032号</a>
      <a
        className="footer-item hover"
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35021302000293"
      >
          <img src="../../static/gov.png" />
          <p>闽公网安备 35021302000293号</p>
      </a>
    </div>
  </div>
)

export default Header
