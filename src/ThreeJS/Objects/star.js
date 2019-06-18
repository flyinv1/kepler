import * as THREE from 'three';

export default (radius, shader) => {

    function createGeometry() {
        var sphere = new THREE.SphereBufferGeometry(radius, 10, 10);
        return sphere;
    }

    function createMesh() {

    }

}