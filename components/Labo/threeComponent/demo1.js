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
    const geometry = new THREE.BoxGeometry(50, 100, 100); // (立方体）对象
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x49ef4,
      roughness: 1,
      metalness: 0
    }); // 材质
    this.mesh = new THREE.Mesh(geometry, material); // 物体对象（Mesh）：包括二维物体（点、线、面）、三维物体，模型
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
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(this.scene, this.camera);
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