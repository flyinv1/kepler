uniform vec2 resolution;
uniform float u_delta_time;

uniform sampler2D t_pos;
uniform sampler2D t_vel;
varying vec3 v_position;


void main() {

    //  Get texture map
    vec2 uv = gl_FragCoord.xy / resolution;

    //  Get position
    vec4 pos = texture2D( t_pos, uv );

    //  Get velocity
    vec4 vel = texture2D( t_vel, uv );


}

vec3 acceleration(vec4 bi, vec4 bj, vec3 ai) {

    // F = -G ( m1 m2 / |r12|**2 ) * r12

    //  Vector between bodies
    vec3 r = bj.xyz - bi.xyz;

    //  Squared distance (with softening)
    float ds2 = dot(r, r) + 10e-8;

    //  Direction of force
    vec3 unit = r / length(r);

    //  Change in acceleration
    vec3 da = -6.674e-20 * bj.w * ds2 * unit;

    return da;
}
