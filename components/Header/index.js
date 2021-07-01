import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import './style.less';
import Link from 'next/link';
import { Avatar, Dropdown, Menu } from 'antd';
import { actionCreators } from '@store/user';
import { delCookie } from '@/utils';


function Header({ userInfo, getUserInfo }) {
  const router = useRouter();
  const handelClick = useCallback((type) => {
    if (type === 1) {
      router.push('/editor');
    } else {
      delCookie('xtoken');
      getUserInfo();
    }
  }, []);
  const menu = useCallback(() => {
    return (
      <Menu>
        <Menu.Item onClick={() => { handelClick(1); }}>写文章</Menu.Item>
        <Menu.Item onClick={() => { handelClick(2); }}>退出登录</Menu.Item>
      </Menu>
    );
  }, []);
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <Link href="/">
            <a>
              <img className="logo" src="../../static/logo.png" alt="logo" />
              <p className="name">行舟</p>
            </a>
          </Link>
        </div>
        <div className="header-menu">
          <Link href="/">
            <div className={router.pathname === '/index' ? 'header-menu-item active' : 'header-menu-item'}>首页</div>
          </Link>
          <Link href="/labo">
            <div className={router.pathname === '/labo' ? 'header-menu-item active' : 'header-menu-item'}>实验</div>
          </Link>
        </div>

        <div className="header-navbar">
          {/* <div className="header-navbar-item">文章</div> */}
          {/* <div className="header-navbar-item">热门</div>
          <div className="header-navbar-item">探索</div> */}
          <div className="userInfo-container">
            {
              userInfo && userInfo.code === 200 && userInfo.data
                ? (
                  <Dropdown overlay={menu} trigger={['click', 'hover']}>
                    <div className="userInfo-content">
                      <Avatar style={{ backgroundColor: '#f56a00' }} size="default">Avatar</Avatar>
                      <div className="name">{userInfo.data.nick}</div>
                    </div>
                  </Dropdown>
                )
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}


const mapState = (state) => {
  return {
    userInfo: state.user.userInfo
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUserInfo(token) {
      dispatch(actionCreators.getUserInfoAction(token));
    }
  };
};
export default connect(mapState, mapDispatch)(Header);
