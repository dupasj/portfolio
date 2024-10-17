precision mediump float;

varying vec2 vScreenUv;
varying vec3 vNormal;

uniform float uTime;
uniform float uAspect;
uniform float uIntensity;
uniform float uWhite;
uniform vec2 uOffset;
uniform float uOpacity;

uniform sampler2D uFbm;

uniform float uIor;
uniform float uThickness;

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

  return texture2D(uFbm, scaledCoords).r;
}

vec4 diffuse(vec2 st,float intensity){
  st.x *= uAspect;
  st -= uOffset;
  st *= 3.;

  vec2 r = vec2(0.);
  r.x = fbm(st + 1.0 + vec2(1.7,9.2)+ 0.15*uTime);
  r.y = fbm(st + 1.0 + vec2(8.3,2.8)+ 0.126*uTime);

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

  return mix(
    vec4(color*uIntensity*intensity,1.),
    vec4(24./255.,27./255.,63./255.,1.),
    smoothstep(0.,1.,uWhite)
  );
}

void main() {
  vec3 normal = normalize(vNormal);
  float iorEffect = 1.0 / uIor;
  vec2 uvDistorted = vScreenUv + normal.xy * uThickness * iorEffect;

  gl_FragColor = mix(
    diffuse(vScreenUv,0.9),
    diffuse(uvDistorted,1.05),
    uOpacity
  );
}
