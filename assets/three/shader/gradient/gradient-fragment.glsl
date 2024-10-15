uniform sampler2D tDiffuse;
uniform float uTo;
uniform float uFrom;
uniform vec2 uResolution;
varying vec2 vScreenUv;
varying vec2 vUv;

void main() {
    vec2 uv = vScreenUv.xy * uResolution;
    uv.y = uResolution.y - uv.y;

    float alpha = smoothstep(1.,0.,(uv.y-uFrom)/(uTo-uFrom));
    vec4 color = texture2D(tDiffuse, vUv);

    gl_FragColor = vec4(color.rgb*alpha, alpha);
}