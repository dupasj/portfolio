<template>
  <div class="absolute left-0 top-0 w-full">
    <canvas style="height:calc(100vh + 200px)" class="fixed w-full left-0 top-0 z-[-1]" ref="canvas"></canvas>
    <slot/>
    <div :style="{opacity: lottieVisible}" class="fixed bottom-[20px] left-[50%] -translate-x-1/2 pointer-events-none h-[120px] w-[120px]" ref="lottie"></div>
  </div>

</template>

<script>
import Animation from "~/lib/animation";
import lerp from "~/lib/lerp";
import unlerp from "~/lib/lerp/unlerp";
import * as d3 from "d3-ease";
import * as THREE from 'three';
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {ObjectLoader} from "three";
import lottie from 'lottie-web'

const unproject = (pos, camera) => {
  const position = pos.clone()
  position.unproject(camera)
  position.sub(camera.position).normalize()

  const distance = (pos.z - camera.position.z) / position.z

  return camera.position.clone().add(position.multiplyScalar(distance))
}


export default {
  name: 'Background',
  components: {
  },
  props: {
    cube: {
      type: Boolean,
      default: false,
    }
  },
  data(){
    return {
      scrollY: 0,
      orientation: new THREE.Vector2()
    }
  },
  computed: {
    lottieVisible(){
      if (this.$isServer){
        return 0;
      }
      return this.cube ? 1 - unlerp(0,0.5,this.scrollY/window.innerHeight) : 0;
    }
  },
  async mounted() {
    if (this.$isServer){
      return
    }

    lottie.loadAnimation({
      container: this.$refs.lottie,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../lottie/scroll.json'),
    })

    this.$locomotive.onUpdate(this.scroll);

    const loader = {
      rgbe: new RGBELoader(),
      object: new ObjectLoader(),
      texture: new THREE.TextureLoader(),
    };

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      canvas: this.$refs.canvas
    })

    renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)
    scene.add(camera);

    const clearcoatNormal = await loader.texture.loadAsync("/rough-normal.jpeg");
    const fbm = await loader.texture.loadAsync("/fbm.png");

    fbm.encoding = THREE.sRGBEncoding;
    clearcoatNormal.encoding = THREE.sRGBEncoding;


    const background = new THREE.Mesh(
      new THREE.PlaneGeometry( 1,1,1 ),
      new THREE.ShaderMaterial({
        depthWrite: true,
        depthTest: true,
        uniforms: {
          u_time: new THREE.Uniform(0),
          u_intensity: new THREE.Uniform(0),
          u_offset: new THREE.Uniform(new THREE.Vector2()),
          u_aspect: new THREE.Uniform(1),
          u_white: new THREE.Uniform(1),
          u_fbm: new THREE.Uniform(fbm),
        },
        vertexShader: require('../assets/three/shader/background/background-vertex.glsl').default,
        fragmentShader: require('../assets/three/shader/background/background-fragment.glsl').default
      })
    );

    background.position.set(0,0,-50);
    camera.add(background)


    const mouse = {
      orientation: new THREE.Vector2(),
      position: new THREE.Vector2(),
      force: new THREE.Vector2(),
      value: new THREE.Vector2(),
    }
    const spacing = {
      position: 1.1,
      force: 0,
      value: 1.1,
    }

    const points = [];

    const group = new THREE.Group();
    group.position.set(0,0,-50);
    camera.add(group);

    const free = {
      x: Math.floor(Math.random() * 3) - 1,
      y: Math.floor(Math.random() * 3) - 1,
      z: Math.floor(Math.random() * 3) - 1,
    }

    const cubeMaterial = new THREE.ShaderMaterial({
      depthWrite: true,
      depthTest: true,
      uniforms: {
        u_time: new THREE.Uniform(0),
        u_intensity: new THREE.Uniform(0),
        u_offset: new THREE.Uniform(new THREE.Vector2()),
        u_aspect: new THREE.Uniform(1),
        u_white: new THREE.Uniform(1),
        u_fbm: new THREE.Uniform(fbm),
        u_normal: new THREE.Uniform(clearcoatNormal),
        u_ior: { value: 2.5 }, // Set your IOR value
        u_thickness: { value: 1.7 }, // Set your thickness value
      },
      vertexShader: require('../assets/three/shader/cube/cube-vertex.glsl').default,
      fragmentShader: require('../assets/three/shader/cube/cube-fragment.glsl').default
    })

    for(let x=0;x<3;x++){
      for(let y=0;y<3;y++){
        for(let z=0;z<3;z++){
          if (free.x === x-1 && free.y === y-1 && free.z === z-1){
            continue;
          }

          const mesh = (() => {
            return new THREE.Mesh(
              new THREE.BoxGeometry(),
              cubeMaterial,
            )
          })()

          group.add(mesh);

          points.push({
            grid: {
              x: x - 1,
              y: y - 1,
              z: z - 1,
            },
            position: {
              x: x - 1,
              y: y - 1,
              z: z - 1,
            },
            group: mesh,
          });
        }
      }
    }

    const mousePosition = (evt) => {
      mouse.position.set(
        evt.clientX/window.innerWidth * 2 - 1,
        evt.clientY/window.innerHeight * -2 + 1,
      )
    };
    const orientationPosition = (event) => {
      mouse.orientation.set(
        lerp(-1,1,unlerp(-45,45,event.gamma ?? 0,true)) * 2,
        lerp(-1,1,unlerp(0,60,(event.beta ?? 0)*-1+80,true)) * 2,
      );
    };


    const movePoint = () => {
      const choices = [
        {
          x: free.x - 1,
          y: free.y,
          z: free.z,
        },
        {
          x: free.x + 1,
          y: free.y,
          z: free.z,
        },
        {
          x: free.x,
          y: free.y - 1,
          z: free.z,
        },
        {
          x: free.x,
          y: free.y + 1,
          z: free.z,
        },
        {
          x: free.x,
          y: free.y,
          z: free.z - 1,
        },
        {
          x: free.x,
          y: free.y,
          z: free.z + 1,
        }
      ].filter((item) => {
        return item.x >= -1 && item.x <= 1
          && item.y >= -1 && item.y <= 1
          && item.z >= -1 && item.z <= 1
      })

      const choice = choices[Math.floor(Math.random() * choices.length)];

      const item = points.find(point => {
        return point.grid.x === choice.x
          && point.grid.y === choice.y
          && point.grid.z === choice.z
      })
      if (typeof item === "undefined"){
        setTimeout(movePoint,Math.random() * 1500)
        return;
      }

      const animation = new Animation();
      animation.setDuration(200 + 700 * Math.random());
      animation.bind((coef) => {
        item.position.x = lerp(item.grid.x,free.x,coef);
        item.position.y = lerp(item.grid.y,free.y,coef);
        item.position.z = lerp(item.grid.z,free.z,coef);
      });
      animation.start();
      animation.onEnd(() => {
        for(const key in free){
          item.grid[key] = free[key];
        }
        for(const key in choice){
          free[key] = choice[key];
        }

        setTimeout(movePoint,Math.random() * 1500)
      })
    };
    movePoint();
    window.addEventListener("mousemove",mousePosition);

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.addEventListener("deviceorientation",orientationPosition);
    }

    window.addEventListener("mousedown",() => {
      spacing.position = 3;
    });
    window.addEventListener("mouseleave",() => {
      spacing.position = 1.1;
    });
    window.addEventListener("mouseup",() => {
      spacing.position = 1.1;
    });

    window.addEventListener("touchstart",() => {
      const coef = this.scrollY/window.innerHeight;

      spacing.position = coef > 0.5 ? 1.1 : 3;
    });
    window.addEventListener("touchmove",() => {
      const coef = this.scrollY/window.innerHeight;

      spacing.position = coef > 0.5 ? 1.1 : 3;
    });
    window.addEventListener("touchend",(e) => {
      if (e.touches.length > 0){
        return;
      }
      spacing.position = 1.1;
    });
    window.addEventListener("touchcancel",(e) => {
      if (e.touches.length > 0){
        return;
      }
      spacing.position = 1.1;
    });


    const resize = () => {
      renderer.setSize(Math.min(1024,window.innerWidth),Math.min(1024,window.innerHeight + 200),false)
      renderer.setPixelRatio(1);

      camera.aspect = window.innerWidth/(window.innerHeight + 200)
      camera.updateProjectionMatrix()

      const aspect = camera.aspect;

      const fov = 2.0*Math.atan( 1.0/camera.projectionMatrix.elements[5] ) * 180.0 / Math.PI;

      background.material.uniforms.u_aspect.value = camera.aspect;
      cubeMaterial.uniforms.u_aspect.value = camera.aspect;

      const scale = Math.tan(fov / 180 * Math.PI / 2) * Math.abs(50) * 2;
      background.scale.set(scale * aspect,scale,1);

      const y = lerp(-1,1,0.5 * (window.innerHeight + 200) / window.innerHeight);
      group.position.copy(unproject(new THREE.Vector3(0,y,-15),camera))
    };
    resize()
    window.addEventListener("resize",resize)

    const clock = new THREE.Clock();


    const update = () => {
      // @ts-ignore
      if (this._isDestroyed){
        window.removeEventListener("resize",resize)
        window.removeEventListener("click",mousePosition);
        return;
      }

      {
        const force = mouse.position.clone().add(mouse.orientation).sub(mouse.value);
        const distance = force.length();
        force.normalize();

        mouse.value.add(force.multiplyScalar(distance * 0.1));
      }
      {
        const force = spacing.position - spacing.value;

        spacing.value += force * 0.3;
      }

      const delta = clock.getDelta()

      group.rotateY(delta * Math.PI * 0.1)
      group.rotateX(delta * Math.PI * 0.01)
      group.rotateZ(delta * Math.PI * 0.04)

      const invert = group.quaternion.clone().invert();

      background.material.uniforms.u_time.value+=delta

      background.material.uniforms.u_intensity.value = this.cube ? lerp(3,0.8,this.scrollY/window.innerHeight) : 0.8;
      background.material.uniforms.u_offset.value.x = 0;
      background.material.uniforms.u_offset.value.y = this.scrollY/window.innerHeight;
      background.material.uniforms.u_white.value = lerp(1,0,clock.getElapsedTime(),true);

      cubeMaterial.uniforms.u_time.value+=delta
      cubeMaterial.uniforms.u_intensity.value = this.cube ? lerp(3,0.8,this.scrollY/window.innerHeight) : 0.8;
      cubeMaterial.uniforms.u_offset.value.x = 0;
      cubeMaterial.uniforms.u_offset.value.y = this.scrollY/window.innerHeight;
      cubeMaterial.uniforms.u_white.value = lerp(1,0,clock.getElapsedTime(),true);


      if (this.cube){
        const scroll = Math.min(this.scrollY/window.innerHeight * 2,1);
        const direction = new THREE.Vector3(
          mouse.value.x,
          mouse.value.y,
          0
        );
        const up = new THREE.Vector3(0,1,0)
        up.applyQuaternion(invert)
        direction.applyQuaternion(invert)





        for(let i=0;i<points.length;i++){
          const point = points[i];

          const delay = ((clock.getElapsedTime() - 0.1) * 1000) - (points.length - i) * 20;
          const appear = d3.easeQuadOut(unlerp(0,1200,delay,true));
          const ratio = (cube_position,position) => {
            return position * (Math.abs(position - cube_position * -1));
          };

          const delayed_scroll = d3.easeQuadIn(i / points.length * scroll + scroll);

          point.group.position.set(
            point.position.x * spacing.value + ratio(point.position.x,direction.x) * 0.4 + up.x * (1 - appear) * -7 + up.x * delayed_scroll * 7,
            point.position.y * spacing.value + ratio(point.position.y,direction.y) * 0.4 + up.y * (1 - appear) * -7 + up.y * delayed_scroll * 7,
            point.position.z * spacing.value + ratio(point.position.z,direction.z) * 0.4 + up.z * (1 - appear) * -7 + up.z * delayed_scroll * 7
          );
          point.group.traverse((node) => {
            if (node.isMesh){
              node.material.opacity = appear * (1 - delayed_scroll);
            }
          });
        }
      }
      group.visible = this.cube;


      renderer.render(scene,camera);
      this.$emit("tick",renderer);

      requestAnimationFrame(update);
    }
    const ready = () => {
      if (document.readyState !== "complete"){
        return;
      }

      document.removeEventListener("readystatechange",ready);
      update();
    };
    document.addEventListener("readystatechange",ready);
    ready();
  },
  methods: {
    scroll(evt){
      this.scrollY = evt.y;
    }
  }
}
</script>
