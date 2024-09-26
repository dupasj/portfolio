precision mediump float;

varying vec2 vScreenUv;

void main() {
  vec4 clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vScreenUv = clipSpace.xy / clipSpace.w * 0.5 + 0.5;

  gl_Position = clipSpace;
}
