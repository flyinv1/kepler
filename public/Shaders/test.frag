varying float intensity;

void main() {
    vec3 glow = vec3(0.2, 0.89, 0.4) * intensity;
    gl_FragColor = vec4(glow, 1.0);
}