import * as THREE from 'three';
import GPUComputer from './GPUComputationRenderer';

// Attach canvas to DOM element registered in Renderer
export default (containerElement, shaders) => {

    const canvas = createCanvas(document, containerElement);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);
    var gpuComputeInstance;

    var WIDTH = 64;
    var positionVar;
    var velocityVar;
    var particleUniforms;
    var velocityUniforms;

    const G = -6.674e-20;
    const maxRadius = 10000;
    const maxZ = 1000;
    const maxVelocity = 20;
    const maxMass = 1e20;

    bindEventListeners();
    render();

    // Run the Scene

    function bindEventListeners() {
        window.onresize = resizeCanvas;
        resizeCanvas();
    }

    function createSceneSubjects(scene) {
        //    Test Cube:
        const dens = 100;
        console.log(shaders);

        let geometry = new THREE.SphereGeometry(10, dens, dens);
        let material = new THREE.ShaderMaterial( {
            uniforms: {
                viewVector: new THREE.Vector3(),
                brightness: { value: 1.0 },
                falloffRate: { value: 5.0 },
                sharpness: { value: 5.0 },
                color: { value: new THREE.Vector3(0.3, 0.3, 0.2) },
            },
            vertexShader: shaders.sun.vert,
            fragmentShader: shaders.sun.frag,
        });
        let sphere = new THREE.Mesh( geometry, material );
        // let pointLight = new THREE.PointLight('FF', 1, 100);
        // pointLight.position.set(sphere.position);

        scene.add(sphere);
        return [sphere];
    }

    function animate(target) {
        requestAnimationFrame( animate );
        render();
        let sun = sceneSubjects[0];
        sun.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( camera.position, sun.getWorldPosition(target));
    }

    function render(time) {
        gpuComputeInstance.compute();
        particleUniforms["texturePosition"].value = gpuComputeInstance.getCurrentRenderTarget(positionVar).texture;
        particleUniforms["textureVelocity"].value = gpuComputeInstance.getCurrentRenderTarget(velocityVar).texture;
        renderer.render(scene, camera);
    }


    // Build the compute engine

    function initComputer() {

        gpuComputeInstance = new GPUComputer(WIDTH, WIDTH, renderer);

        var positionTex = gpuComputeInstance.createTexture();
        var velocityTex = gpuComputeInstance.createTexture();

        populateTextures(positionTex, velocityTex);

        velocityVar = gpuComputeInstance.addVariable('textureVelocity', shaders.velocity.frag, velocityTex );
        positionVar = gpuComputeInstance.addVariable('texturePosition', shaders.position.frag, positionTex );

        gpuComputeInstance.setVariableDependencies( velocityVar, [ positionVar, velocityVar ]);
        gpuComputeInstance.setVariableDependencies( positionVar, [ positionVar, velocityVar ]);

        var err = gpuComputeInstance.init();
        if (err != null) {
            console.error(err);
        }
    }

    function populateTextures(positionTexture, velocityTexture) {

        var posArr = positionTexture.image.data;
        var velArr = velocityTexture.image.data;

        // TODO:: Move this to an abstract method for different body distributions

        for (let body = 0; body < posArr.length; body += 4) {

            const angle = body / posArr.length * Math.PI * 2;
            const normRadius = Math.pow(Math.random(), 1.5);
            const velCoeff = (1 - Math.pow(Math.random(), 3)) * maxVelocity * normRadius;

            const unit = [Math.sin(angle), Math.cos(angle)];

            posArr[ body + 0 ] = unit[0] * normRadius * maxRadius;
            posArr[ body + 1 ] = unit[1] * normRadius * maxRadius;
            posArr[ body + 2 ] = maxZ / (1 + Math.pow(Math.random(), 2));
            posArr[ body + 3 ] = 1.0;

            velArr[ body + 0 ] = unit[1] * velCoeff;
            velArr[ body + 1 ] = -unit[0] * velCoeff;
            velArr[ body + 2 ] = Math.random() * 2 * normRadius;
            velArr[ body + 3 ] = Math.random() * maxMass;

        }
    }

    function restartSim() {
        var positionTex = gpuComputeInstance.createTexture();
        var velocityTex = gpuComputeInstance.createTexture();

        populateTextures( positionTex, velocityTex );

        gpuComputeInstance.renderTexture( positionTex, positionVar.renderTargets[0] );
        gpuComputeInstance.renderTexture( positionTex, positionVar.renderTargets[1] );
        gpuComputeInstance.renderTexture( velocityTex, positionVar.renderTargets[0] );
        gpuComputeInstance.renderTexture( velocityTex, positionVar.renderTargets[1] );
    }

    // Build the scene

    function createCanvas(document, containerElement) {
        const canvas = document.createElement('canvas');
        containerElement.appendChild(canvas);
        return canvas;
    }

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


    // Window resize utils

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        onWindowResize();
    }

    function onWindowResize() {
        const { width, height } = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

}