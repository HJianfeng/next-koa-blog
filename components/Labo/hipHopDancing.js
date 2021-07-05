import React, { useEffect, useState } from 'react';
import HipHop from './threeComponent/hipHop.js'
import { Icon } from 'antd';
import './style.less';

function Soldier() {
  const [threeCache, setThreeCache] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!threeCache || !threeCache.data ) {
      setLoading(true);
      const action = new HipHop('hipHop-container', function() {
        setLoading(false);
      });
      setThreeCache({data: action})
    }
  }, []); 

 
  return (
    <div id="hipHop-container" className="canvas">
      {
        loading?(
          <div className="solider-loading-container"><Icon type="loading" />加载中</div>
        ): '' 
      }
    </div>
  );
}

export default Soldier;
