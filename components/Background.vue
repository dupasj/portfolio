<template>
  <canvas style="height: calc(100vh + 10px)" class="fixed w-full left-0 top-0 z-[-1] pointer-events-none" ref="canvasEL"></canvas>
  <div class="w-full" :class="{'pt-[100vh]': props.cube}">
    <slot/>
  </div>
  <div :style="{opacity: lottieVisible}" class="fixed bottom-[20px] left-[50%] -translate-x-1/2 pointer-events-none h-[120px] w-[120px]" ref="lottieEL"></div>
  <nav class="fixed left-0 top-0 w-full h-[120px] flex justify-center align-center z-[100]">
    <canvas style="height: calc(100vh + 10px)" class="fixed w-full left-0 top-0 z-[-1] pointer-events-none" ref="canvasNavEL"></canvas>
    <ul class="container justify-between content-center flex space-x-[15px]">
      <li class="flex">
        <NuxtLink :to="{ name: `index___${locale}` }" class="flex content-center justify-center justify-items-center items-center space-x-[3px] text-white p-[7px] subpixel-antialiased"><span class="scroll-animation rounded-full px-[10px] py-[3px] bg-[#FF0058] inline-block font-sans text-[16px]">Jérémie</span><span class="scroll-animation inline-block font-sans text-[16px]">Dupas_></span></NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import lerp from "~/lib/util/lerp";
import unlerp from "~/lib/util/lerp/unlerp";
import * as d3 from "d3-ease";
import * as THREE from 'three';
import {ref, watch} from "vue";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import Spring from "~/lib/spring/spring.ts";
import {useI18n} from "vue-i18n";
import lottie from 'lottie-web'


/*
<li class="inline-block">
        <span class="inline-block text-white p-[7px] subpixel-antialiased font-sans text-[18px]">FR</span>
      </li>
 */

const { locale } = useI18n();

const lottieEL = ref(null);
const canvasEL = ref(null);
const canvasNavEL = ref(null);
const lottieVisible = ref(false);



watch(lottieEL,async () => {
  const el = lottieEL.value;
  if (!el){
    return
  }
  lottie.loadAnimation({
    container: lottieEL.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: (await import('../assets/lottie/scroll.json')).default,
  })
})

const props = defineProps({
  cube: {
    type: Boolean,
    required: true,
  },
});

const spring = {
  point: {
    stiffness: 30,
    damping: 5,
    mass: 1,
  },
  spacing: {
    stiffness: 300,
    damping: 15,
    mass: 1,
  },
  mouse: {
    stiffness: 70,
    damping: 7,
    mass: 1,
  },
  scroll: {
    stiffness: 120,
    damping: 60,
    mass: 1,
  }
}

onMounted( async () => {
  if (!process.client){
    return
  }

  const loader = {
    texture: new THREE.TextureLoader(),
  };

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)

  const renderer = {
    background: new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      canvas: canvasEL.value,
      powerPreference: "low-power"
    }),
    nav: new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvasNavEL.value,
      powerPreference: "low-power"
    }),
  }
  const composer = new EffectComposer(renderer.nav);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const gradientPass = new ShaderPass(new THREE.ShaderMaterial({
    depthWrite: true,
    depthTest: true,
    uniforms: {
      tDiffuse: { value: null },
      uResolution: new THREE.Uniform(new THREE.Vector2()),
      uFrom: new THREE.Uniform(80),
      uTo: new THREE.Uniform(120),
    },
    vertexShader: (await import('../assets/three/shader/gradient/gradient-vertex.glsl?raw')).default,
    fragmentShader: (await import('../assets/three/shader/gradient/gradient-fragment.glsl?raw')).default
  }));
  composer.addPass(gradientPass);




  scene.add(camera);

  const unproject = (pos, camera) => {
    const position = pos.clone()
    position.unproject(camera)
    position.sub(camera.position).normalize()

    const distance = (pos.z - camera.position.z) / position.z

    return camera.position.clone().add(position.multiplyScalar(distance))
  }






  const fbm = await loader.texture.loadAsync((await import("../assets/three/fbm.png")).default);
  const background = new THREE.Mesh(
      new THREE.PlaneGeometry( 1,1,1 ),
      new THREE.ShaderMaterial({
        depthWrite: true,
        depthTest: true,
        uniforms: {
          uTime: new THREE.Uniform(0),
          uIntensity: new THREE.Uniform(0),
          uOffset: new THREE.Uniform(new THREE.Vector2()),
          uAspect: new THREE.Uniform(1),
          uWhite: new THREE.Uniform(1),
          uFbm: new THREE.Uniform(fbm),
        },
        vertexShader: (await import('../assets/three/shader/background/background-vertex.glsl?raw')).default,
        fragmentShader: (await import('../assets/three/shader/background/background-fragment.glsl?raw')).default
      })
  );

  background.position.set(0,0,-100);
  camera.add(background)

  const cubes = [
    {
      position: new THREE.Vector2(0,0),
      mesh: new THREE.Group()
    },
    {
      position: new THREE.Vector2(0.5,0),
      mesh: new THREE.Group()
    }
  ]

  for(const cube of cubes){
    camera.add(cube.mesh)
  }




  const points = [];
  const mouse = {
    x: new Spring(spring.mouse.stiffness,spring.mouse.damping,spring.mouse.mass),
    y: new Spring(spring.mouse.stiffness,spring.mouse.damping,spring.mouse.mass),
  }
  const spacing = new Spring(spring.spacing.stiffness,spring.spacing.damping,spring.spacing.mass)
  spacing.freezeTo(1.1)


  const scroll = new Spring(spring.scroll.stiffness,spring.scroll.damping,spring.scroll.mass)
  scroll.freezeTo(window.scrollY)


  const mousePosition = (evt) => {
    mouse.x.springTo(evt.clientX/window.innerWidth * 2 - 1);
    mouse.y.springTo(evt.clientY/window.innerHeight * -2 + 1);
  };
  const orientationPosition = (event) => {
    mouse.x.springTo(lerp(-1,1,unlerp(-45,45,event.gamma ?? 0,true)) * 2);
    mouse.y.springTo(lerp(1,-1,unlerp(0,60,event.beta ?? 0,true)) * 2);
  };


  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.addEventListener("deviceorientation",orientationPosition);
  }else{
    window.addEventListener("mousemove",mousePosition);
  }

  window.addEventListener("mousedown",() => {
    spacing.springTo(3)
  });
  window.addEventListener("mouseleave",() => {
    spacing.springTo(1.1)
  });
  window.addEventListener("mouseup",() => {
    spacing.springTo(1.1)
  });


  const free = {
    x: Math.floor(Math.random() * 3) - 1,
    y: Math.floor(Math.random() * 3) - 1,
    z: Math.floor(Math.random() * 3) - 1,
  }

  const cubeMaterial = new THREE.ShaderMaterial({
    depthWrite: true,
    depthTest: true,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uIntensity: new THREE.Uniform(0),
      uOpacity: new THREE.Uniform(1),
      uOffset: new THREE.Uniform(new THREE.Vector2()),
      uAspect: new THREE.Uniform(1),
      uWhite: new THREE.Uniform(1),
      uFbm: new THREE.Uniform(fbm),
      uIor: { value: 1 },
      uThickness: { value: 0.2 },
    },
    vertexShader: (await import('../assets/three/shader/cube/cube-vertex.glsl?raw')).default,
    fragmentShader: (await import('../assets/three/shader/cube/cube-fragment.glsl?raw')).default
  })

  for(let x=0;x<3;x++){
    for(let y=0;y<3;y++){
      for(let z=0;z<3;z++){
        if (free.x === x-1 && free.y === y-1 && free.z === z-1){
          continue;
        }

        const point = {
          animation: {
            x: new Spring(spring.point.stiffness,spring.point.damping,spring.point.mass),
            y: new Spring(spring.point.stiffness,spring.point.damping,spring.point.mass),
            z: new Spring(spring.point.stiffness,spring.point.damping,spring.point.mass),
          },
          meshes: cubes.map(cube => {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(),
                cubeMaterial
            );
            cube.mesh.add(mesh);
            return mesh;
          }),
        };

        point.animation.x.freezeTo(x-1)
        point.animation.y.freezeTo(y-1)
        point.animation.z.freezeTo(z-1)

        points.push(point);
      }
    }
  }







  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight + 10;

    renderer.background.setSize(w,h,false)
    renderer.nav.setSize(w,h,false)

    renderer.nav.setScissorTest(true);
    renderer.nav.setScissor(0, h - 120, w, 120);
    renderer.nav.setViewport(0, h - 120, w, 120);


    renderer.background.setPixelRatio(1);
    renderer.nav.setPixelRatio(1);

    camera.aspect = w/h
    camera.updateProjectionMatrix()

    composer.setSize(w,h);
    composer.setPixelRatio(1);
    gradientPass.uniforms.uResolution.value.set(w,h);



    const fov = 2.0*Math.atan( 1.0/camera.projectionMatrix.elements[5] ) * 180.0 / Math.PI;

    background.material.uniforms.uAspect.value = camera.aspect;
    cubeMaterial.uniforms.uAspect.value = camera.aspect;

    const scale = Math.tan(fov / 180 * Math.PI / 2) * Math.abs(100) * 2;
    background.scale.set(scale * camera.aspect,scale,1);

    const y = lerp(-1,1,0.5 * (window.innerHeight + 10) / window.innerHeight);

    for(const cube of cubes){
      cube.mesh.position.copy(unproject(new THREE.Vector3(cube.position.x,cube.position.y + y,-15),camera))
    }


  };
  resize()
  window.addEventListener("resize",resize)



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

    const point = points.find(point => {
      return point.animation.x.getTarget() === choice.x
          && point.animation.y.getTarget() === choice.y
          && point.animation.z.getTarget() === choice.z
    })
    if (typeof point === "undefined"){
      setTimeout(movePoint,Math.random() * 1500)
      return;
    }

    const __copy = {
      x: free.x,
      y: free.y,
      z: free.z,
    }

    free.x = point.animation.x.getTarget();
    free.y = point.animation.y.getTarget();
    free.z = point.animation.z.getTarget();

    point.animation.x.springTo(__copy.x);
    point.animation.y.springTo(__copy.y);
    point.animation.z.springTo(__copy.z);

    setTimeout(movePoint,Math.random() * 1500 + 200)
  };
  movePoint();




  const clock = new THREE.Clock()



  const update = () => {
    const delta = clock.getDelta();


    scroll.springTo(window.scrollY);
    scroll.tick(delta);

    const __scroll = scroll.getPosition()


    lottieVisible.value = props.cube ? unlerp(Math.min(700,window.innerHeight * 0.5),0,__scroll) * unlerp(4,5,clock.getElapsedTime(),true) : 0;

    background.material.uniforms.uTime.value+=delta


    background.material.uniforms.uIntensity.value = props.cube ? lerp(3,1.2,__scroll/window.innerHeight) : 0.8;
    background.material.uniforms.uOffset.value.x = 0;
    background.material.uniforms.uOffset.value.y = __scroll/window.innerHeight;
    background.material.uniforms.uWhite.value = lerp(1,0,clock.getElapsedTime(),true);



    if (props.cube){
      for(const cube of cubes){
        cube.mesh.rotateY(delta * Math.PI * 0.1)
        cube.mesh.rotateX(delta * Math.PI * 0.01)
        cube.mesh.rotateZ(delta * Math.PI * 0.04)
      }


      const invert = cubes[0].mesh.quaternion.clone().invert();

      cubeMaterial.uniforms.uTime.value+=delta
      cubeMaterial.uniforms.uIntensity.value = props.cube ? lerp(3,1.2,__scroll/window.innerHeight) : 0.8;
      cubeMaterial.uniforms.uOffset.value.x = 0;
      cubeMaterial.uniforms.uOffset.value.y = __scroll/window.innerHeight;
      cubeMaterial.uniforms.uWhite.value = lerp(1,0,clock.getElapsedTime(),true);

      mouse.x.tick(delta);
      mouse.y.tick(delta);
      const __mouse = {
        x: mouse.x.getPosition(),
        y: mouse.y.getPosition(),
      };

      const scroll = Math.min(__scroll/window.innerHeight * 2,1);
      const direction = new THREE.Vector3(
          __mouse.x,
          __mouse.y,
          0
      );
      const up = new THREE.Vector3(0,1,0)
      up.applyQuaternion(invert)
      direction.applyQuaternion(invert)



      spacing.tick(delta);
      const __spacing = spacing.getPosition()

      for(let i=0;i<points.length;i++){
        const point = points[i];

        const delay = ((clock.getElapsedTime() - 0.1) * 1000) - (points.length - i) * 20;
        const appear = d3.easeQuadOut(unlerp(0,1200,delay,true));
        const ratio = (cube_position,position) => {
          return position * (Math.abs(position - cube_position * -1));
        };

        const delayed_scroll = d3.easeQuadIn(i / points.length * scroll + scroll);


        point.animation.x.tick(delta);
        point.animation.y.tick(delta);
        point.animation.z.tick(delta);

        const position = {
          x: point.animation.x.getPosition(),
          y: point.animation.y.getPosition(),
          z: point.animation.z.getPosition(),
        };

        point.meshes.forEach(mesh => {
          mesh.position.set(
              position.x * __spacing + ratio(position.x,direction.x) * 0.4 + up.x * (1 - appear) * -7 + up.x * delayed_scroll * 7,
              position.y * __spacing + ratio(position.y,direction.y) * 0.4 + up.y * (1 - appear) * -7 + up.y * delayed_scroll * 7,
              position.z * __spacing + ratio(position.z,direction.z) * 0.4 + up.z * (1 - appear) * -7 + up.z * delayed_scroll * 7
          );
        })

        cubeMaterial.uniforms.uOpacity.value = lerp(0,1,appear * (1 - delayed_scroll),true);
      }
    }
    // globalGroup.visible = props.cube;

    renderer.background.render(scene,camera);
    composer.render(delta);

    requestAnimationFrame(update);
  }
  update();

  /*
  const ready = () => {
    if (document.readyState !== "complete"){
      return;
    }

    document.removeEventListener("readystatechange",ready);
    update();
  };
  document.addEventListener("readystatechange",ready);
  ready();
   */
});
</script>
