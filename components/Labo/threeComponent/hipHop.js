import * as THREE from 'three';

const isServer = typeof window === 'undefined';
let OrbitControls;
let FBXLoader;
if(!isServer){
  const controls = require('three/examples/jsm/controls/OrbitControls.js');
  OrbitControls = controls.OrbitControls;

  const loader = require('three/examples/jsm/loaders/FBXLoader.js');
  FBXLoader = loader.FBXLoader
}

class HipHop {
  constructor(domId, callback) {
    this.callback = callback;
    callback();
    this.domId = domId
    this.headerHeight = 50;
    this.init();
  }

  init() {
    // 创建一个场景
    this.scene = new THREE.Scene();
    // 地板
    const geometry = new THREE.PlaneGeometry(100, 100);

    const material = new THREE.MeshPhongMaterial({
      color: 0x999999,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -1
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // 环境

    // const axisHelper = new THREE.AxisHelper(250);
    // this.scene.add(axisHelper)
    this.addLight();
    this.addCamera();
    this.addRenderer();

    this.loadModel();
  }
  loadModel() {
    const loader = new FBXLoader();
    const that = this;
    loader.load('/static/model/HipHopDancing.fbx',function(obj) {
      obj.translateY(-1)
      obj.scale.set(0.01,0.01,0.01)
      obj.rotation.y = Math.PI
      const mixer = new THREE.AnimationMixer(obj);
      const action = mixer.clipAction(obj.animations[0]);
      action.play();
      obj.traverse( function (child) {
        if ( child.isMesh ) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      that.scene.add( obj );
      that.mixer = mixer;
      that.animate();
      if(that.callback) that.callback()
    })
  }

  addLight() {
    // 半球光：光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    // 平行光：平行光是沿着特定方向发射的光。用平行光来模拟太阳光 的效果
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(-3, 10, -10);
    dirLight.castShadow = true; // 动态阴影
    // 对象用来计算该平行光产生的阴影。
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    this.scene.add(dirLight);
  }

  addCamera() {
    const k = window.innerWidth / (window.innerHeight - this.headerHeight); //窗口宽高比
    // PerspectiveCamera（透视摄像机） OrthographicCamera（正交相机）
    const camera = new THREE.PerspectiveCamera(45, k, 1, 1000);
    camera.position.set(1, 2, -3); //设置相机位置
    // camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    this.camera = camera;
  }
  addRenderer() {
    const container = document.getElementById(this.domId);
    const renderer = new THREE.WebGLRenderer({
      antialias: false // 抗锯齿
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight - this.headerHeight);//设置渲染区域尺寸
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true; // 包含阴影贴图的引用。
    container.appendChild(renderer.domElement);
    const that = this;
    window.addEventListener('resize', function() {
      that.camera.aspect = window.innerWidth / (window.innerHeight - that.headerHeight);
      that.camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight - that.headerHeight);
    });
    renderer.setClearColor(0xffffff, 1); //设置背景颜色

    this.renderer = renderer;
    this.addOrbitControls();

    // that.renderer.render(that.scene, that.camera);
  }
  animate() {
    const that = this;
    const clock = new THREE.Clock();
    const animate = function() {
      window.requestAnimationFrame(animate);

      let mixerUpdateDelta = clock.getDelta();
      that.mixer.update(mixerUpdateDelta);
      that.renderer.render(that.scene, that.camera);
    }
    animate();
  }
  addOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);//创建控件对象
  }
}
export default HipHop;