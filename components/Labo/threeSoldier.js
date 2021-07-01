import React, { useEffect, useState } from 'react';
// const isServer = typeof window === 'undefined';
import Human from './threeComponent/Soldier.js'
import { Button, Icon } from 'antd';
import './style.less';

function Soldier() {
  const [threeCache, setThreeCache] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!threeCache || !threeCache.human ) {
      setLoading(true);
      const humanAction = new Human('three-container', function() {
        setLoading(false);
      });
      setThreeCache({human: humanAction})
    }
  }, []); 

  const handelClick = (type) => {
    switch (type) {
      case 'run':
        threeCache.human.toRun();
        break;
      case 'walk':
        threeCache.human.toWalk();
        break;
      default:
        threeCache.human.toStop();
        break;
    }
  };
  return (
    <div id="three-container" className="canvas">
      <div className="btn-group">
        <Button className="btn" onClick={() => { handelClick('run') }} >跑步</Button>
        <Button className="btn" onClick={() => { handelClick('walk') }} >走路</Button>
        <Button className="btn" onClick={() => { handelClick('') }} >暂停</Button>
      </div>
      {
        loading?(
          <div className="loading-container"><Icon type="loading" />加载中</div>
        ): '' 
      }
    </div>
  );
}

export default Soldier;
