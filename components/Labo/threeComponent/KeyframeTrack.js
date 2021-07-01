import * as THREE from 'three';

const isServer = typeof window === 'undefined';
let OrbitControls;
if(!isServer){
  const controls = require('three/examples/jsm/controls/OrbitControls.js');
  OrbitControls = controls.OrbitControls;
}

export default class Demo2 {
  constructor(domId) {
    this.domId = domId
    this.init();
  }

  init() {
    // 创建一个场景
    const scene = new THREE.Scene();

    // const mesh1 = new THREE.Mesh();
    // mesh1.name = "Box";
    const group = new THREE.Group();
    const spheregeometry = new THREE.SphereGeometry(20, 25, 25);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    });

    const boxGeometry = new THREE.BoxGeometry(100, 10, 10);
    const material = new THREE.MeshLambertMaterial({color: 0x0000ff});

    const mesh1 = new THREE.Mesh(boxGeometry, material);
    mesh1.name = 'Box';
    const mesh2 = new THREE.Mesh(spheregeometry, sphereMaterial);
    mesh2.name = "Sphere";
    group.add(mesh1)
    group.add(mesh2)

    scene.add(group);
    this.scene = scene;
    /**
     * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
     */
    // 创建名为Box对象的关键帧数据
    const times = [0, 10]; // 关键帧时间数组，离散的时间点序列
    const values = [0, 0, 0, 150, 0, 0]; // 与时间点对应的值组成的数组
    // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
    const posTrack = new THREE.KeyframeTrack('Box.position',times, values);
    // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
    const colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
    // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
    const scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 10], [1,1,1, 3,3,3]);
    // duration决定了默认的播放时间，一般取所有帧动画的最大时间
    // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
    const duration = 20;
    // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
    const clip = new THREE.AnimationClip('default', duration, [posTrack, colorKF, scaleTrack]);
    /**
     * 播放编辑好的关键帧数据
     */
    // group作为混合器的参数，可以播放group中所有子对象的帧动画
    const mixer = new THREE.AnimationMixer(group);
    // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
    const AnimationAction = mixer.clipAction(clip);
    // 通过操作Action设置播放方式
    AnimationAction.timeScale = 20;
    AnimationAction.loop = THREE.LoopOnce;
    AnimationAction.clampWhenFinished = true;
    AnimationAction.play();
    this.mixer = mixer;

    // 辅助三维坐标系
    const axisHelper = new THREE.AxisHelper(250);
    this.scene.add(axisHelper)
    this.addLight();
    this.addCamera();
    this.addRenderer();
  }
  /**
   * 光源
   */
  addLight() {
    //点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(-200, 200, 300);
    this.scene.add(point);
    //环境光
    const ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
  }

  /**
   * 相机
   */
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
    //执行渲染操作   指定场景、相机作为参数

    const clock = new THREE.Clock();
    const that = this;
    function render() {
      renderer.render(that.scene, that.camera);
      requestAnimationFrame(render);

      //clock.getDelta()方法获得两帧的时间间隔
      // 更新混合器相关的时间
      that.mixer.update(clock.getDelta());
    }
    render();
  }

}
