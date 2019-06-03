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
        const dens = 1;

        let geometry = new THREE.SphereGeometry(10, dens, dens);
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let sphere = new THREE.Mesh( geometry, material );
        let lightAmbient = new THREE.AmbientLight(0x404040);
        let lightIn = new THREE.PointLight("#4CAF50", 1);





        scene.add(sphere, lightAmbient, lightIn);
        return [sphere, lightAmbient];
    }

    function update() {
        // requestAnimationFrame( update );
        sceneSubjects[0].rotation.x += 0.01;
        sceneSubjects[0].rotation.y += 0.02;
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