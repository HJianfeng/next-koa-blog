/**
 * 森林下雨
 */
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

    var texture = new THREE.TextureLoader().load('/static/tree.png');
    // 100颗树
    for (let i = 0; i < 100; i++) {
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      scene.add(sprite);

      sprite.scale.set(100, 100, 1);
      const k1 = Math.random() - 0.5;
      const k2 = Math.random() - 0.5;
      // 设置精灵模型位置，在xoz平面上随机分布
      sprite.position.set(1000 * k1, 50, 1000 * k2)
    }
    // 加载雨滴理贴图
    var textureRain = new THREE.TextureLoader().load('/static/rain.png');
    const rainGroup = new THREE.Group();
    for (let i = 0; i < 400; i++) {
      const spriteMaterial = new THREE.SpriteMaterial({
        map:textureRain,//设置精灵纹理贴图
      });
      // 创建精灵模型对象
      const sprite = new THREE.Sprite(spriteMaterial);
      // 控制精灵大小,
      sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
      const k1 = Math.random() - 0.5;
      const k2 = Math.random() - 0.5;
      const k3 = Math.random();
      // 设置精灵模型位置，在整个空间上上随机分布
      sprite.position.set(200 * k1, 200*k3, 1000 * k2)
      rainGroup.add(sprite);
    }
    scene.add(rainGroup);
    this.rainGroup = rainGroup;
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const grasstexture = new THREE.TextureLoader().load('/static/grass.jpg');
    grasstexture.wrapS = THREE.RepeatWrapping;
    grasstexture.wrapT = THREE.RepeatWrapping;
    // // uv两个方向纹理重复数量
    grasstexture.repeat.set(10, 10);
    var material = new THREE.MeshLambertMaterial({
      map:grasstexture
    });
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    mesh.rotateX(-Math.PI/2);

    this.scene = scene;
    this.addLight();
    this.addCamera();
    this.addRenderer();
    this.animate();
    // this.addOrbitControls();

    // 辅助三维坐标系
    // const axisHelper = new THREE.AxisHelper(250);
    // this.scene.add(axisHelper)
    

  }


  addLight() {
    //点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(-200, 200, 300);
    this.scene.add(point);
    //环境光
    const ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
  }

  addCamera() {
    const k = window.innerWidth / window.innerHeight; //窗口宽高比
    // PerspectiveCamera（透视摄像机） OrthographicCamera（正交相机）
    const camera = new THREE.PerspectiveCamera(60, k, 1, 1000); 
    // const camera = new THREE.PerspectiveCamera(45, k, 1, 1000); 
    camera.position.set(292, 109, 268); //设置相机位置
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
      that.rainGroup.children.forEach(sprite => {
        // 雨滴的y坐标每次减1
        sprite.position.y -= 1;
        if (sprite.position.y < 0) {
          // 如果雨滴落到地面，重置y，从新下落
          sprite.position.y = 200;
        }
      });
      that.renderer.render(that.scene, that.camera);
      window.requestAnimationFrame(animate);
    }
    animate();
  }
}

export default Human;