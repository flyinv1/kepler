
uniform vec2 resolution;
uniform float delta;

const float width = resolution.x;
const float height = resolution.y;

void main() {

    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 tempos = texture2D( texturePosition, uv );
    vec3 pos = tempos.xyz;

    vec4 tempvel = texture2D( textureVelocity, uv );
    vec3 vel = tempvel.xyz;

    gl_FragColor = vec4(pos + vel * delta, 0.0);

}
