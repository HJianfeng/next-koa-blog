import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { actionCreators } from '@store/user';
import {
  Icon, Input, Button, message
} from 'antd';
import { login } from '@/utils/api/user';
import './style.less';

function Login() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = useCallback(async (userName, password) => {
    if (!userName || userName === '') {
      message.warning('请输入账号');
      return false;
    }
    if (!password || password.lenght < 6) {
      message.warning('密码不少于6位');
      return false;
    }
    const param = {
      userName, password
    };
    const { data } = await login(param);
    if (data.code === 200) {
      message.success('登录成功');
      Router.push('/');
    } else {
      message.error(data.msg);
    }
    return data;
  }, []);
  const changeInput = useCallback((e, type) => {
    const { value } = e.target;
    if (type === 'user') {
      setName(value);
    } else if (type === 'pass') {
      setPass(value);
    }
  }, []);
  return (
    <div className="login-container">
      <div className="login-content">
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
          value={name}
          onChange={(e) => { changeInput(e, 'user'); }}
          style={{ marginBottom: '20px' }}
        />
        <Input.Password
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Password"
          value={pass}
          onChange={(e) => { changeInput(e, 'pass'); }}
          style={{ marginBottom: '20px' }}
        />
        <div className="btn">
          <Button onClick={() => { handleSubmit(name, pass); }} type="primary" className="login-form-button">登录</Button>
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
    saveUserInfo(user) {
      dispatch(actionCreators.changeUserInfo(user));
    }
  };
};
export default connect(mapState, mapDispatch)(Login);
