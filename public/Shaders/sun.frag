varying float intensity;
uniform float brightness;
uniform float sharpness;
uniform float falloffRate;
uniform vec3 color;

void main() {
    float falloff = pow(intensity, falloffRate);
    vec3 glow = (vec3(1.0, 1.0, 1.0) * brightness * intensity + color) * sharpness * falloff;
    gl_FragColor = vec4(glow, falloff);
}