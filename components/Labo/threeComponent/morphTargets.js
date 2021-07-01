import * as THREE from 'three';

const isServer = typeof window === 'undefined';
let OrbitControls;
if(!isServer){
  const controls = require('three/examples/jsm/controls/OrbitControls.js');
  OrbitControls = controls.OrbitControls;
}

class Human {
  constructor(domId) {
    this.domId = domId
    
    this.init();
  }
  init() {
    // 创建一个场景
    this.scene = new THREE.Scene();
    this.addGeometry();
    this.addLight();
    this.addCamera();
    this.addRenderer();
    this.animate();
    this.addOrbitControls();
  }

  addGeometry() {
    // 添加一个立方体
    const geometry = new THREE.BoxGeometry(50, 50, 50); // (立方体）对象

    const box1 = new THREE.BoxGeometry(100, 5, 100); //为变形目标1提供数据
    const box2 = new THREE.BoxGeometry(5, 200, 5); //为变形目标1提供数据

    // 设置变形目标的数据
    // geometry.morphTargets[0] =  {name: 'target1',vertices: box1.attributes.position};
    // geometry.morphTargets[1] =  {name: 'target2',vertices: box2.attributes.position};
    geometry.morphAttributes.position = [
      box1.attributes.position,
      box2.attributes.position
    ];
    console.log(geometry.toJSON());
    var material = new THREE.MeshLambertMaterial({
      morphTargets: true, //允许变形
      color: 0x0000ff
    }); //材质对象
    this.mesh = new THREE.Mesh(geometry, material); // 物体对象（Mesh）：包括二维物体（点、线、面）、三维物体，模型
   
    // 帧动画
    var Track1 = new THREE.KeyframeTrack('.morphTargetInfluences[0]', [0,10,20], [0,1, 0]);
    // 设置变形目标2对应权重随着时间的变化
    var Track2 = new THREE.KeyframeTrack('.morphTargetInfluences[1]', [20,30, 40], [0, 1,0]);
    // 创建一个剪辑clip对象，命名"default"，持续时间40
    var clip = new THREE.AnimationClip("default", 40, [Track1,Track2]);
    const mixer = new THREE.AnimationMixer(this.mesh);
    const animationAction = mixer.clipAction(clip);
    animationAction.timeScale = 5; //默认1，可以调节播放速度
    // animationAction.loop = THREE.LoopOnce; //不循环播放
    // animationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
    animationAction.play(); //开始播放

    this.mixer = mixer;

    this.scene.add(this.mesh); // 物体将会被添加到(0,0,0)坐标
    
    // 辅助三维坐标系
    const axisHelper = new THREE.AxisHelper(250);
    this.scene.add(axisHelper)
  }

  addLight() {
    //点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);
    this.scene.add(point);
    //环境光
    const ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
  }

  addCamera() {
    const k = window.innerWidth / window.innerHeight; //窗口宽高比
    const s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    // PerspectiveCamera（透视摄像机） OrthographicCamera（正交相机）
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000); 
    // const camera = new THREE.PerspectiveCamera(45, k, 1, 1000); 
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    this.camera = camera;
  }
  /**
   * 创建渲染器对象
   */
  addRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    const container = document.getElementById(this.domId);
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    const that = this;
    function render() {
      renderer.render(that.scene, that.camera);
      if(that.mixer)  {
        requestAnimationFrame(render);

        //clock.getDelta()方法获得两帧的时间间隔
        // 更新混合器相关的时间
        that.mixer.update(clock.getDelta());
      }
    }
    render();
    this.renderer = renderer;
  }

  addOrbitControls() {
    var controls = new OrbitControls(this.camera, this.renderer.domElement);//创建控件对象
  }

  animate() {
    const that = this;
    const animate = function() {
      window.requestAnimationFrame(animate);
      // that.mesh.rotation.x += 0.01;
      // that.mesh.rotation.y += 0.01;
      that.renderer.render(that.scene, that.camera);
    }
    animate();
  }
}

export default Human;