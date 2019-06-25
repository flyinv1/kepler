import * as THREE from 'three';

export default (canvas, shaders) => {

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
        console.log(shaders);

        let geometry = new THREE.SphereGeometry(10, dens, dens);
        let material = new THREE.ShaderMaterial( {
            uniforms: {
                viewVector: new THREE.Vector3()
            },
            vertexShader: shaders.test.vert,
            fragmentShader: shaders.test.frag,
        });
        let sphere = new THREE.Mesh( geometry, material );
        // let lightAmbient = new THREE.AmbientLight(0xFFFFFF);
        let lightIn = new THREE.PointLight("#FAFAFA", 1);

        const sphere2 = new THREE.Mesh( geometry, material );

        scene.add(sphere, sphere2, lightIn);
        return [sphere, sphere2];
    }

    function update() {
        // requestAnimationFrame( update );
        let sun = sceneSubjects[0];
        // sun.position.x += 0.1 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
        // sun.position.y += 0.11 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
        // sceneSubjects[1].position.x += 0.1 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
        // sceneSubjects[1].position.y += 0.11 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
        sun.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( camera.position, sun.getWorldPosition());
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