import React, { useCallback, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import './style.less';
import Link from 'next/link';
import { Avatar, Dropdown, Menu } from 'antd';
import { actionCreators } from '@store/user';
import { delCookie } from '@/utils';


function Header({ userInfo, getUserInfo }) {
  console.log(userInfo);
  const handelClick = useCallback((type) => {
    switch (type) {
      case 1:
        Router.push('/editor');
        break;
      default:
        delCookie('xtoken');
        getUserInfo();
        break;
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
              <p className="name">name</p>
            </a>
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
