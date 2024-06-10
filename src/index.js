import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import "./index.scss";

console.log(THREE.REVISION);
console.log(THREE.KeyframeTrack);

const clock = new THREE.Clock();

// Initialize variables
let scene, camera, renderer;
let loader;
let controls;
var mouse, raycaster;

const url = new URL(document.currentScript.src);
console.log(url);
var special_path = url.pathname.substring(0, url.pathname.lastIndexOf('/'));
if (special_path == "") {
    special_path = url.origin;
}
console.log('# special_path: ', special_path);

// Interactions: Define the event handlers
// Function to set up mouse interaction
function setupMouseInteraction(model) {
    console.log(model);
    // Create a raycaster
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // Define the event handler for mouse move
    function model_mouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(scene.children, true);

        // console.log(intersects[0].object);
        // console.log(model);

        // Check if the model is intersected by the ray
        if (intersects.length > 0){ // && intersects[0].object === model) {
            var intersected = intersects[0].object;
            if (intersected instanceof THREE.Group) {
                // If intersected object is a group, handle its children
                intersected.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        // Perform actions on the intersected child
                        setOpacity(child, 0.5); // Example: Set opacity to 50%
                    }
                });
            } else if (intersected instanceof THREE.Mesh) {
                // If intersected object is a mesh, perform actions directly
                setOpacity(intersected, 0.5); // Example: Set opacity to 50%
            }
        } else {
            console.log("Mouse left object");
            setOpacity(model, 1)
        }
    }

    // Attach mouse move event listener
    document.addEventListener('mousemove', model_mouseMove, false);
    document.addEventListener('click', model_click, false);
}
function model_click() {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObject(scene, true);
  if (intersects.length > 0) {
        var object = intersects[0].object;
    object.material.color.set( Math.random() * 0xffffff );
  }
  animate(); //render();
}


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

// Function to initialize Three.js scene
function init() {


    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Initialize scene, camera, and renderer
    // Add lights, controls, etc.

    // via https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.position.set(20,15,10);
    camera.lookAt(new THREE.Vector3(-5,15,15))

    const light = new THREE.PointLight( 0xFFFFFF, 220, 20 );
    light.position.set( 5, 5, 5 );
    light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

    scene.add( light );

    var projectModelUrl = special_path + '/mastaba-doubled.glb';
    console.log(projectModelUrl);
    loader = new GLTFLoader();
    loader.load(
            projectModelUrl, // Path to your model file
            function ( gltf ) {
                console.log('_ loaded');
                // Retrieve the mesh from the loaded model
                var model = gltf.scene;
                model.name += '_' + Date.now();
                scene.add(model);
            },
            // onProgress callback function (optional)
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // onError callback function (optional)
            function ( error ) {
                console.error( 'An error happened', error );
            }
        );


    var container = document.getElementById("container");
    container.appendChild( renderer.domElement );
    controls = new OrbitControls( camera, renderer.domElement );
    animate();
}

// Call init function when the page loads
window.onload = init;