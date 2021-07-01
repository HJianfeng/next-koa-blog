/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Soldier from 'components/Labo/threeSoldier';
import { Select } from 'antd';
const { Option } = Select;
import './index.less';

function Labo() {
  const [animate, setAnimate] = useState(0)
  const handelChange = (val) => {
    setAnimate(val);
  }
  return (
    <div className="labo-container">
      <div className="tip">
        <span className="label">Three.js 动画示例</span>
        <Select defaultValue={animate} onChange={(val) => {handelChange(val)}}>
          <Option value={0}>行走的士兵</Option>
        </Select>
      </div> 
      {
        animate === 0?(<Soldier />):''
      }
    </div>
  );
}

const mapState = (state) => {
  return {
    userInfo: state.user.userInfo
  };
};

Labo.getInitialProps = async (ctx) => {
  return {
    FooterHidden: true
  };
};
export default connect(mapState)(Labo);
