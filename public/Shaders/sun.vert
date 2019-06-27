uniform vec3 viewVector;
varying float intensity;
uniform float falloffRate;

uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;

uniform float cameraConst;

void main() {

    vec4 tempos = texture2D( texturePosition, uv );
    vec3 pos = tempos.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

//    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

//    gl_PointSize = radius * cameraConst / (- mvPosition.z)

    vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
    intensity = pow(dot(normalize(viewVector), actual_normal), falloffRate);

}
