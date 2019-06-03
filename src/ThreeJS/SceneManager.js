import * as THREE from 'three';

export default canvas => {

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const origin = THREE.Vector3(0, 0, 10);

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    function buildScene() {
        var scn = new THREE.Scene();
        return scn;
    }

    function buildRender({ width, height}) {
        var renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.setPixelRatio(1);
        renderer.setSize(width, height);
        return renderer;
    }

    function buildCamera({ width, height}) {
        let aspectRatio = width / height;
        var camera = new THREE.PerspectiveCamera(60, aspectRatio, 4, 100);
        camera.position.z = 40;
        return camera;
    }

    function createSceneSubjects(scene) {
    //    Test Cube:
        const dens = 100;

        let geometry = new THREE.SphereGeometry(10, dens, dens);
        let material = new THREE.ShaderMaterial( {
            uniforms: {
                viewVector: new THREE.Vector3()
            },
            vertexShader: vShader,
            fragmentShader: fShader,
        });
        let sphere = new THREE.Mesh( geometry, material );
        let lightAmbient = new THREE.AmbientLight(0xFFFFFF);
        let lightIn = new THREE.PointLight("#FAFAFA", 1);

        scene.add(sphere, lightAmbient, lightIn);
        return [sphere, lightAmbient];
    }

    function update() {
        // requestAnimationFrame( update );
        let sun = sceneSubjects[0];
        sceneSubjects[0].rotation.x += 0.01;
        sceneSubjects[0].rotation.y += 0.02;
        let viewVector = new THREE.Vector3().subVectors( camera.position, sun.getWorldPosition());
        sun.material.uniforms.viewVector.value = viewVector;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const { width, height } = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    return {
        update,
        onWindowResize
    }
}

var vShader = `
    uniform vec3 viewVector;
    varying float intensity;
    void main() {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
        vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
        intensity = pow( dot(normalize(viewVector), actual_normal), 2.0 );
    }`;

var fShader = `
    varying float intensity;
    void main() {
        vec3 glow = vec3(1, 1, 0) * intensity;
        gl_FragColor = vec4( glow, 1.0 );
    }
`;