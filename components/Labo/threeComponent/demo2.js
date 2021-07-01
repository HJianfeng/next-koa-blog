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

    var headMesh = this.sphereMesh(10, 0, 0, 0);
    headMesh.name = "脑壳"
    var leftEyeMesh = this.sphereMesh(1, 8, 5, 4);
    leftEyeMesh.name = "左眼"
    var rightEyeMesh = this.sphereMesh(1, 8, 5, -4);
    rightEyeMesh.name = "右眼"
    var headGroup = new THREE.Group();
    headGroup.name = "头部"
    headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);

    // 身体网格模型和组
    var neckMesh = this.cylinderMesh(3, 10, 0, -15, 0);
    neckMesh.name = "脖子"
    var bodyMesh = this.cylinderMesh(14, 30, 0, -35, 0);
    bodyMesh.name = "腹部"
    var leftLegMesh = this.cylinderMesh(4, 60, 0, -80, -7);
    leftLegMesh.name = "左腿"
    var rightLegMesh = this.cylinderMesh(4, 60, 0, -80, 7);
    rightLegMesh.name = "右腿"
    var legGroup = new THREE.Group();
    legGroup.name = "腿"
    legGroup.add(leftLegMesh, rightLegMesh);
    var bodyGroup = new THREE.Group();
    bodyGroup.name = "身体"
    bodyGroup.add(neckMesh, bodyMesh, legGroup);

    // 人Group
    var personGroup = new THREE.Group();
    personGroup.name = "人"
    personGroup.add(headGroup, bodyGroup)
    personGroup.translateY(50)
    scene.add(personGroup);

    this.scene = scene;
    this.addLight();
    this.addCamera();
    this.addRenderer();
    
  }
  /**
   * 光源
   */
  addLight() {
    //点光源
    const directionalLight = new THREE.SpotLight(0xffffff);
    directionalLight.position.set(20, 90, 50);
    directionalLight.angle = Math.PI /6
    this.scene.add(directionalLight);
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    // directionalLight.shadow.mapSize.set(1024,1024)

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
    renderer.render(this.scene, this.camera);
    this.renderer = renderer;
  }


  // 球体网格模型创建函数
  sphereMesh(R, x, y, z) {
    var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
    var material = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
    mesh.position.set(x, y, z);
    return mesh;
  }
  // 圆柱体网格模型创建函数
  cylinderMesh(R, h, x, y, z) {
    var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
    var material = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
    mesh.position.set(x, y, z);
    return mesh;
  }
}
