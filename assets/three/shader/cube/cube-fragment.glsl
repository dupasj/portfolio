precision mediump float;

varying vec2 vUv;
varying vec2 vScreenUv;
varying vec3 vNormal;

uniform float u_time;
uniform float u_aspect;
uniform float u_intensity;
uniform float u_white;
uniform vec2 u_offset;

uniform sampler2D u_fbm;
uniform sampler2D u_normal;

uniform float u_ior;
uniform float u_thickness;

vec4 applyGammaCorrection(vec4 color, float gamma) {
  return vec4(pow(color.rgb, vec3(1.0 / gamma)), color.a);
}

vec2 triangleWave(vec2 x) {
  return vec2(
  abs(mod(x.x, 2.0)*(-1.) + 1.)*(-1.) + 1.,
  abs(mod(x.y, 2.0)*(-1.) + 1.)*(-1.) + 1.
  );
}

float fbm (vec2 x) {
  vec2 scaledCoords = triangleWave(x/20.);

  return texture2D(u_fbm, scaledCoords).r;
}

vec4 diffuse(vec2 st){
  st.x *= u_aspect;
  st -= u_offset;
  st *= 3.;

  vec2 r = vec2(0.);
  r.x = fbm(st + 1.0 + vec2(1.7,9.2)+ 0.15*u_time);
  r.y = fbm(st + 1.0 + vec2(8.3,2.8)+ 0.126*u_time);

  float f = fbm(st+r);

  vec3 color = mix(
    vec3(33./255., 10./255., 38./255.),
    vec3(64./255., 11./255., 60./255.),
    clamp((f*f)*3.,0.0,1.0)
  );

  color = mix(
    color,
    vec3(0,0,0.164706),
    clamp(length(r),0.0,1.0)
  );

  color = mix(
    color,
    vec3(21./255.,29./255.,42./255.),
    clamp(length(r.x),0.0,1.0)
  );

  float intensity = clamp(1. - u_offset.y,0.,1.);

  return mix(
    vec4(color*u_intensity*1.05,1.),
    vec4(1.,1.,1.,1.),
    smoothstep(0.,1.,u_white)
  );
}

void main() {
  vec3 normal = normalize(vNormal);
  float iorEffect = 1.0 / u_ior;
  vec2 uvDistorted = vScreenUv + normal.xy * u_thickness * iorEffect;

  gl_FragColor = diffuse(uvDistorted);
}
