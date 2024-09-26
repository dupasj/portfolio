precision mediump float;

varying vec3 vNormal;
varying vec2 vScreenUv;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec4 clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vScreenUv = clipSpace.xy / clipSpace.w * 0.5 + 0.5;

  gl_Position = clipSpace;
}
