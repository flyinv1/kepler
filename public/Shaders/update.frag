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

    //  Calculate acceleration
}

vec3 acceleration(vec4 bi, vec4 bj, vec3 ai) {

    //  Vector between bodies
    vec3 r = bj.xyz - bi.xyz;

    //  Squared distance (with softening)
    float ds2 = length(r) + 10e-8;

    //  Inverted cubed
    float inv = inversesqrt(pow(ds2, 3));

    //  Change in acceleration
    float da = bj.w * inv;

    //  Total acceleration
    ai = ai + da * r;

    return ai;
}
