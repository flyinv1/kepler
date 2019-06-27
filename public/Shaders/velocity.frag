
uniform vec2 resolution;
uniform float G;
uniform float delta;

const float width = resolution.x;
const float height = resolution.y;

void main() {

    vec2 uv = gl_Fragcoord.xy / resolution.xy;

    vec4 tempos = texture2D( texturePosition, uv );
    vec3 pos = tempos.xyz;

    vec4 tempvel = texture2D( textureVelocity, uv );
    vec3 vel = tempvel.xyz;

    vec3 acc = vec3( 0.0, 0.0, 0.0 );

    float body_id = uv.y * resolution.x + uv.x;

    for (float x = 0; x < width; x++ ) {
        for (float y = 0; y < height; y++ ) {

            vec2 secondcoords = vec2( x + 0.5, y + 0.5 ) / resolution.xy;

            if (body_id == secondcoords.y * resolution.x + secondcoords.x) {
                continue;
            }

            vec3 other_pos = texture2D( texturePosition, secondcoords ).xyz;
            float other_mass = texture2D( textureVelocity, secondcoords ).w;

            vec3 r = other_pos - pos;
            float ds2 = dot(r, r) + 10e-8;

            acc += G * other_mass / ds2 * normalize( r );

        }
    }

    gl_FragColor = vec4( vel + acc * delta, vel.w);

}

