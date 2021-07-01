import React, { useEffect } from 'react';
// const isServer = typeof window === 'undefined';
import Watermelon from './watermelon';


function Matter() {
  useEffect(() => {
    const canvas = document.getElementById('canvas')
    Watermelon(canvas);
  }, []);

  return (
    <div>
      <canvas id="canvas" />
    </div>
  );
}

export default Matter;
