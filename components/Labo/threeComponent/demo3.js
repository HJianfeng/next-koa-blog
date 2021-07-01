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
    const scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(204, 102);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('Earth.png', function(texture) {
      var material = new THREE.MeshLambertMaterial({
        // color: 0x0000ff,
        // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        map: texture,//设置颜色贴图属性值
      }); //材质对象Material
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      scene.add(mesh); //网格模型添加到场景中

      this.scene = scene;
      this.addLight();
      this.addCamera();
      this.addRenderer();
      this.animate();
      this.addOrbitControls();

      // 辅助三维坐标系
      const axisHelper = new THREE.AxisHelper(250);
      this.scene.add(axisHelper)
    })

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