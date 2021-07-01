import React, { useEffect, useState } from 'react';
// const isServer = typeof window === 'undefined';
import Human from './threeComponent/Soldier.js'
import { Button } from 'antd';
import './style.less';

function Soldier() {
  const [threeCache, setThreeCache] = useState({})
  useEffect(() => {
    if(!threeCache || !threeCache.human ) {
      const humanAction = new Human('three-container');
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
    </div>
  );
}

export default Soldier;
