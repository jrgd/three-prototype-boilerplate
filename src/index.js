import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import "./index.scss";

// Initialize variables
let scene, camera, renderer;
let currentModel = null;


let insert_at_x_position = 0, insert_at_y_position = 0, insert_at_z_position = 0;
let loader;

let controls;

const jrgd_material = new THREE.MeshPhongMaterial( {
                    color: 0xFFFFFF,
                    shininess: 100,
                    specular: 0x111111,
                    // side: THREE.BackSide
                } );
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

// Function to initialize Three.js scene
function init() {
    // Initialize scene, camera, and renderer
    // Add lights, controls, etc.

    // via https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.position.z = 5;

    const light = new THREE.PointLight( 0xFFFFFF, 220, 20 );
    light.position.set( 5, 5, 5 );
    light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

    scene.add( light );


    var container = document.getElementById("container");
    if (!container) {
        container = document.createElement('div');
        container.id = 'container';
        document.body.appendChild(container);
    }
    container.appendChild( renderer.domElement );

    console.log('WOWSER');

    controls = new OrbitControls( camera, renderer.domElement );

    animate();
}

// Function to load 3D model
function loadModel(modelPath) {
    // Load 3D model and add it to the scene
}

// Function to switch projects
function switchProject(project) {
    // Remove current model from the scene
    // Load and add new model based on selected project
    var geometry,cube, material;

    insert_at_x_position++;
    if (insert_at_x_position > 5) {
        insert_at_x_position = 1;
        insert_at_y_position--;
    }

    if (insert_at_y_position < -5) {
        insert_at_x_position = 1;
        insert_at_y_position = 1;
        insert_at_z_position--;
    }


    switch(true) {
        case project == 'project1':
            geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
            material = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
            cube = new THREE.Mesh( geometry, material );
            cube.position.x = insert_at_x_position;
            cube.position.y = insert_at_y_position;
            cube.position.z = insert_at_z_position;
            scene.add( cube );
            controls.target.set(insert_at_x_position,0,-5).applyQuaternion(camera.quaternion).add(camera.position)
            console.log('_ inserted')
            break;
        case project == 'project2':
            geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
            material = new THREE.MeshBasicMaterial( { color: 0xff1d8e } );
            cube = new THREE.Mesh( geometry, material );
            cube.position.x = insert_at_x_position;
            cube.position.y = insert_at_y_position;
            cube.position.z = insert_at_z_position;
            scene.add( cube );
            controls.target.set(insert_at_x_position,0,-5).applyQuaternion(camera.quaternion).add(camera.position)
            console.log('_ inserted')
            break;
        case project == 'project3':
            geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
            material = new THREE.MeshBasicMaterial( { color: 0x94812B } );
            cube = new THREE.Mesh( geometry, material );
            cube.position.x = insert_at_x_position;
            cube.position.y = insert_at_y_position;
            cube.position.z = insert_at_z_position;
            scene.add( cube );
            controls.target.set(insert_at_x_position,0,-5).applyQuaternion(camera.quaternion).add(camera.position)
            console.log('_ inserted')
            break;
        case project == 'project4':
            geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
                        material = new THREE.MeshBasicMaterial( { color: 0x000080 } );
                        cube = new THREE.Mesh( geometry, material );
                        cube.position.x = insert_at_x_position;
                        cube.position.y = insert_at_y_position;
                        cube.position.z = insert_at_z_position;
                        scene.add( cube );
                        controls.target.set(insert_at_x_position,0,-5).applyQuaternion(camera.quaternion).add(camera.position)
                        console.log('_ inserted')
                        break;
        case project == 'project5':
            geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
                        material = new THREE.MeshBasicMaterial( { color: 0x444444 } );
                        cube = new THREE.Mesh( geometry, material );
                        cube.position.x = insert_at_x_position;
                        cube.position.y = insert_at_y_position;
                        cube.position.z = insert_at_z_position;
                        scene.add( cube );
                        controls.target.set(insert_at_x_position,0,-5).applyQuaternion(camera.quaternion).add(camera.position)
                        console.log('_ inserted')
                        break;
        case project == 'project6':
            geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
            material = new THREE.MeshBasicMaterial( { color: 0xAAAAAA } );
            cube = new THREE.Mesh( geometry, material );
            cube.position.x = insert_at_x_position;
            cube.position.y = insert_at_y_position;
            cube.position.z = insert_at_z_position;
            scene.add( cube );
            controls.target.set(insert_at_x_position,0,-5).applyQuaternion(camera.quaternion).add(camera.position)
            console.log('_ inserted')
            break;
            // // TypeError: undefined is not a constructor (evaluating 'new THREE.GLTFLoader()')
            // loader = new GLTFLoader();
            // loader.load(
            //         'assets/models/stool.gltf', // Path to your model file
            //         function ( gltf ) {
            //             // Retrieve the mesh from the loaded model
            //             var model = gltf.scene;
            //             model.position.set(insert_at_x_position, 0, 0); // Adjust position as needed
            //             model.scale.set(0.025, 0.025, 0.025);
            //             scene.add(model);
            //             console.log('_ inserted');
            //         },
            //         // onProgress callback function (optional)
            //         function ( xhr ) {
            //             console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            //         },
            //         // onError callback function (optional)
            //         function ( error ) {
            //             console.error( 'An error happened', error );
            //         }
            //     );
            // console.log('_ loading')
            // break;

    }


    controls.enabled = false;           //disable orbitControls
    // controls.reset();
    const vect3 = new THREE.Vector3(insert_at_x_position/2,insert_at_y_position/2,insert_at_z_position/2); //define any vector (here we just point at 0,0,0)
    controls.target = vect3;            //update orbitControls target
    camera.lookAt(vect3);               
    camera.lookAt(vect3);               //optional pre-rotation (in case orbit is not updated in render loop)
    controls.enabled = true;    
}

// Function to handle project switching events
function handleProjectSwitch(event) {
    const projectId = event.target.id;
    console.log(projectId);
    switchProject(projectId);
}

// Event listeners for project switch buttons
document.getElementById("project1").addEventListener("click", handleProjectSwitch);
document.getElementById("project2").addEventListener("click", handleProjectSwitch);
document.getElementById("project3").addEventListener("click", handleProjectSwitch);
document.getElementById("project4").addEventListener("click", handleProjectSwitch);
document.getElementById("project5").addEventListener("click", handleProjectSwitch);
document.getElementById("project6").addEventListener("click", handleProjectSwitch);
// Call init function when the page loads
window.onload = init;