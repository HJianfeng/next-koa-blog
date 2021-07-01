import * as THREE from 'three';

const isServer = typeof window === 'undefined';
let OrbitControls;
let GLTFLoader;
if(!isServer){
  const controls = require('three/examples/jsm/controls/OrbitControls.js');
  OrbitControls = controls.OrbitControls;

  const loader = require('three/examples/jsm/loaders/GLTFLoader.js');
  GLTFLoader = loader.GLTFLoader
}

class Human {
  constructor(domId) {
    this.domId = domId
    this.headerHeight = 50;
    this.curAction = 'walk'; // 当前的动作，walk,run,idle
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
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // 环境
    this.addLight();
    this.addCamera();
    this.addRenderer();

    this.loadModel();
    // this.addOrbitControls();
  }
  loadModel() {
   const loader = new GLTFLoader();
   const that = this;
   loader.load('/static/model/Soldier.glb', function(gltf) {
      const model = gltf.scene;
      model.translateY(-1)

      that.scene.add(model);
      model.traverse(function(object) {
        if(object.isMesh) object.castShadow = true;

      })

      const skeleton = new THREE.SkeletonHelper(model); // 用来模拟骨骼 Skeleton 的辅助对象. 
      skeleton.visible = false;
      that.scene.add( skeleton );

      const animations = gltf.animations;
      const mixer = new THREE.AnimationMixer( model );
      const idleAction = mixer.clipAction( animations[ 0 ] );
      const walkAction = mixer.clipAction( animations[ 3 ] );
      const runAction = mixer.clipAction( animations[ 1 ] );

      const actions = [ idleAction, walkAction, runAction ];

      that.setWeight( idleAction, 0.0 );
      that.setWeight( walkAction, 1.0 );
      that.setWeight( runAction, 0.0 );
      
      actions.forEach(function (action) {
        action.play();
      });

      that.actions = actions;
      that.mixer = mixer;
      that.idleAction = idleAction;
      that.walkAction = walkAction;
      that.runAction = runAction;

      that.animate();
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
  /**
   * 创建渲染器对象
   */
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
  }

  addOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);//创建控件对象
  }

  animate() {
    const that = this;
    const clock = new THREE.Clock();
    const animate = function() {
      window.requestAnimationFrame(animate);

      let mixerUpdateDelta = clock.getDelta();

      that.actions.forEach( function ( action ) {
        action.paused = false;
      });

      that.mixer.update(mixerUpdateDelta);
      that.renderer.render(that.scene, that.camera);
    }
    animate();
  }

  // utils
  setWeight( action, weight ) {
    action.enabled = true;
    action.setEffectiveTimeScale( 1 );
    action.setEffectiveWeight( weight );
  }

  toRun(duration) {
    const curAction = this.curAction;
    if(curAction === 'idle') {
      this.executeCrossFade( this.idleAction, this.runAction, duration);
    } else if(curAction === 'walk') {
      this.synchronizeCrossFade( this.walkAction, this.runAction, duration);
    }
    this.curAction = 'run'
  }
  toWalk(duration) {
    const curAction = this.curAction;
    if(curAction === 'run') {
      this.synchronizeCrossFade( this.runAction, this.walkAction, duration);
    } else if(curAction === 'idle') {
      this.executeCrossFade( this.idleAction, this.walkAction, duration);
    }
    this.curAction = 'walk'
  }
  toStop(duration) {
    const curAction = this.curAction;
    // 从走路 -> 停止
    if(curAction === 'walk') {
      this.synchronizeCrossFade( this.walkAction, this.idleAction, duration);
    } else if(curAction === 'run') {
      // 从跑步 -> 停止
      this.synchronizeCrossFade( this.runAction, this.idleAction, duration);
    }
    this.curAction = 'idle';
  }

  synchronizeCrossFade( startAction, endAction, duration) {
    // 等待当前这一轮的动画结束才开始变化动作
    this.mixer.addEventListener( 'loop', onLoopFinished );
    const that = this;
    function onLoopFinished( event ) {
      if ( event.action === startAction ) {
        that.mixer.removeEventListener( 'loop', onLoopFinished );
        that.executeCrossFade( startAction, endAction, duration );
      }
    }
  }

  executeCrossFade(startAction, endAction, duration = 1) {
    this.setWeight(endAction, 1);
    endAction.time = 0;

    // 在传入的时间段内, 让此动作淡出（fade out），同时让另一个动作淡入。此方法可链式调用。
    startAction.crossFadeTo(endAction, duration, true);
  }

}

export default Human;