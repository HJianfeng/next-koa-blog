import * as THREE from 'three';
import { Bone } from 'three';

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
    this.initBones();
    this.addLight();
    this.addCamera();
    this.addRenderer();
    this.animate();
    this.addOrbitControls();
  }
  initBones() {
    const segmentHeight = 60;
    const segmentCount = 4;
    const height = segmentHeight * segmentCount;
    const halfHeight = height * 0.5;

    const sizing = {
      segmentHeight: segmentHeight,
      segmentCount: segmentCount,
      height: height,
      halfHeight: halfHeight
    };
    const geometry = this.createGeometry( sizing );
    const bones = this.createBones( sizing );
    const mesh = this.createMesh( geometry, bones );
    mesh.scale.multiplyScalar(1);
    const axisHelper = new THREE.AxesHelper(250);
    this.scene.add(axisHelper)
    this.scene.add(mesh);
  }
  createGeometry(sizing) {
    const geometry = new THREE.CylinderGeometry(
      15, // radiusTop
      15, // radiusBottom
      sizing.height, // height
      8, // radiusSegments
      sizing.segmentCount * 3, // heightSegments
      true // openEnded
    );
    const position = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const skinIndices = [];
    const skinWeights = [];
    for ( let i = 0; i < position.count; i ++ ) {
      vertex.fromBufferAttribute( position, i );
      const y = ( vertex.y + sizing.halfHeight );
      const skinIndex = Math.floor( y / sizing.segmentHeight );
      const skinWeight = ( y % sizing.segmentHeight ) / sizing.segmentHeight;
      skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
      skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
    }
    geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ));
    geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ));
    return geometry;
  }
  createBones(sizing) {
    const bones = [];
    let prevBone = new THREE.Bone();
    bones.push(prevBone);
    prevBone.position.y = - sizing.halfHeight;

    for ( let i = 0; i < sizing.segmentCount; i ++ ) {
      const bone = new THREE.Bone();
      bone.position.y = sizing.segmentHeight;
      bones.push( bone );
      prevBone.add( bone );
      prevBone = bone;
    }
    return bones;
  }
  createMesh(geometry, bones) {
    const material = new THREE.MeshPhongMaterial( {
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    } );
    const mesh = new THREE.SkinnedMesh( geometry,	material );
    const skeleton = new THREE.Skeleton( bones );

    mesh.add(bones[0]);
    mesh.bind(skeleton);
    // skeleton.bones[1].rotation.x = 0.5;
    // skeleton.bones[2].rotation.x = 0.5;
    // skeleton.bones[3].rotation.x = 0.5;
    // skeleton.bones[4].rotation.x = 0.5;
    this.skeleton = skeleton;
    const skeletonHelper = new THREE.SkeletonHelper( mesh );
    skeletonHelper.material.linewidth = 2;
    this.scene.add( skeletonHelper );

    return mesh;
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

    var n = 0;
    var T = 50;
    var step = 0.01;
    const that = this;
    const skeleton = this.skeleton;
    // 渲染函数
    function render() {
      renderer.render(that.scene, that.camera);
      // requestAnimationFrame(render);
      // n += 1;
      // if (n < T) {
      //   // 改变骨关节角度
      //   skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x - step;
      //   skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x + step;
      //   skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x + 2 * step;
      //   skeleton.bones[3].rotation.x = skeleton.bones[2].rotation.x + 2 * step;
      // }
      // if (n < 2 * T && n > T) {
      //   skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x + step;
      //   skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x - step;
      //   skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x - 2 * step;
      //   skeleton.bones[3].rotation.x = skeleton.bones[2].rotation.x + 2 * step;
      // }
      // if (n === 2 * T) {
      //   n = 0;
      // }
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