import React, { useEffect } from 'react';
import '../assets/css/monster.css';
import * as THREE from 'https://cdn.skypack.dev/three@0.124.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/GLTFLoader.js';

const Monster = () =>{
    const canvasRef = React.useRef();
    const camera = new THREE.PerspectiveCamera(165, window.innerWidth / window.innerHeight, 0.1, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    useEffect(() => {
        // Create a scene
        const scene = new THREE.Scene();

        // Create a group to add your camera and object
        const group = new THREE.Group();
        scene.add(group);

        // Set initial rotation angle
        let rotationAngle = 0;

        // Load the 3D model
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            './monster_energy_can_and_water_condensed/scene.gltf',
            (gltf) => {
                const mesh = gltf.scene.children[0];
                // Add a directional light from the front
                const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
                directionalLight.position.set(0, 0, 10);
                scene.add(directionalLight);
                mesh.scale.setScalar(0.02);
                mesh.position.set(0, -0.4, 0);
                group.add(mesh);

                // Animation update function
                function update() {
                    // Rotate the mesh in the Z axis
                    rotationAngle += 0.01;
                    mesh.rotation.z = rotationAngle;
                }

                // Animation loop
                function animate() {
                    update();
                    renderer.render(scene, camera);
                    requestAnimationFrame(animate);
                }

                // Start the animation loop
                requestAnimationFrame(animate);
            },
        );
        // Handle window resize
    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Set initial size
    onWindowResize();
    }, [canvasRef, renderer, camera]);

    return (
        <>
            <div className="headline-container">
                <div id="text-behind">Monster<p/> Energy</div>
                <div id="text-behind-blur">Monster<p/> Energy</div>
                <div id="text-front">Monster<p/> Energy</div>
            </div>

            <div className="canvas-container">
                <canvas ref={canvasRef}></canvas>
            </div>

            <div className="more-content"></div>

            <div className="text-container">
                <div className="title">Omar Alfonso Cruz Ramírez<p/><a href="https://www.instagram.com/ich_bin_omarrmz/" target="_blank" rel='noreferrer'>@ich_bin_omarrmz</a></div>
                <div className="socials">
                    <a href="https://www.instagram.com/ich_bin_omarrmz/" target="_blank" rel='noreferrer'></a>
                    <a href="https://www.omar-cruz-rmz.com" target="_blank" rel='noreferrer'></a>
                    <a href="https://www.facebook.com/Damanger/" target="_blank" rel='noreferrer'></a>
                </div>
            </div>
        </>
    )
}

export default Monster;
