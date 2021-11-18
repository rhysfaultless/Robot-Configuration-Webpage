//author:  Rhys Faultless
//email:   rfaultless@clearpathrobotics.com
//date:    2021-May
//purpose: robot configurator webpage for Dingo-Omni

// imports - three model and visualizer
import * as THREE from './three/build/three.module.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from './three/examples/jsm/loaders/STLLoader.js';

// imports - prices, lead times, robot component descriptions
import { constants } from "./constants.js";

// imports - PDF builder, quote
import { jsPDF } from "./jsPDF/src/jspdf.js";
import "./jsPDF/src/modules/fileloading.js";
import "./jsPDF/src/modules/addimage.js";
import "./jsPDF/src/modules/jpeg_support.js";

// imports - jQuery, for server PHP request
import "./jQuery/jquery-3.6.0.js";

// Pricing setup
const price_html_element = document.getElementById("price_on_page");

// Lead time setup
const lead_time_html_element = document.getElementById("lead_time_on_page");

// Pull data from index.HTML drop down menus, robot configuration
let userSelectedColour = document.getElementById('colour_selection');
let userSelectedComputer = document.getElementById('computer_selection');
let userSelectedBattery = document.getElementById('battery_selection');
let userSelectedBay1 = document.getElementById('bay_1_selection');
let userSelectedBay2 = document.getElementById('bay_2_selection');
let userSelectedAttachment1 = document.getElementById('attachment-1');
let userSelectedAttachment2 = document.getElementById('attachment-2');
let userSelectedAttachment3 = document.getElementById('attachment-3');
let userSelectedAttachment4 = document.getElementById('attachment-4');

// Remove LOADING price on webpage, and replace it with the initial configured value
htmlPriceTotalUpdate();

// Remove LOADING price on webpage, and replace it with the initial configured value
htmlLeadTimeUpdate();

// Pull data from index.HTML drop down menus, users information
let userInputNameFirst = document.getElementById('input-name-first');
let inputNameFirst = userInputNameFirst.value;
let userInputNameLast = document.getElementById('input-name-last');
let inputNameLast = userInputNameLast.value;
let userInputEmail = document.getElementById('input-email');
let inputEmail = userInputEmail.value;
let userInputCompany = document.getElementById('input-company');
let inputCompany = userInputCompany.value;
let userInputCountry = document.getElementById('list-countries');
let inputCountry = userInputCountry.value;
let userInputState = document.getElementById('list-states');
let inputState = userInputState.value;

// PDF setup - HTML button
// Button is disabled by default.
// Enable the button once all the input fields have data
let button = document.querySelector('button');
button.addEventListener('click', printPDF);
document.getElementById("button-quote").disabled = true;
function enableButtonPress() {
  if  (
	  ((typeof inputNameFirst) === 'string')&&(inputNameFirst.length > 0)&&
	  ((typeof inputNameLast) === 'string')&&(inputNameLast.length > 0)&&
	  ((typeof inputEmail) === 'string')&&(inputEmail.length > 0)&&
	  ((typeof inputCompany) === 'string')&&(inputCompany.length > 0)&&
		(!((inputCountry === "select")||(inputState === "select")))
  ){
		document.getElementById("button-quote").disabled = false;
  } else {
	  document.getElementById("button-quote").disabled = true;
	}
}
// Check if the button can be enabled. Check whenever User changes information in an Input or Select field.
userInputNameFirst.onchange = function() {
	inputNameFirst = userInputNameFirst.value;
  enableButtonPress();
}
userInputNameLast.onchange = function() {
	inputNameLast = userInputNameLast.value;
  enableButtonPress();
}
userInputEmail.onchange = function() {
	inputEmail = userInputEmail.value;
  enableButtonPress();
}
userInputCompany.onchange = function() {
	inputCompany = userInputCompany.value;
  enableButtonPress();
}
userInputCountry.onchange = function() {
	inputCountry = userInputCountry.value;
	enableButtonPress();
}
userInputState.onchange = function() {
	inputState = userInputState.value;
	enableButtonPress();
}








// THREE JS, pricing, lead time-----------------------------------------------------------------------------------

// THREE setup
let camera, controls, scene, renderer, mesh_panels;
let mesh_attachment1, mesh_attachment2, mesh_attachment3, mesh_attachment4;

// Three steup - these positions change the origin of the model
const model_pos_x = 0;
const model_pos_y = -30;
const model_pos_z = 0;

init();
animate();

function init() {
	// set up the Three scene, colours, and perspective
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( (0.6*window.innerWidth), (0.9*window.innerHeight) );
  document.body.appendChild( renderer.domElement );
  camera = new THREE.PerspectiveCamera( 60, (0.6*window.innerWidth) / (0.9*window.innerHeight), 1, 1000 );
  camera.position.set( 2000, 800, 800 );

  // THREE script - orbit controls, lets user spin the model
  controls = new OrbitControls( camera, renderer.domElement );
  controls.listenToKeyEvents( window ); // optional
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 300;
  controls.maxDistance = 600;	
  controls.maxPolarAngle = Math.PI / 2;

  // THREE script - Binary file loader, using STLs so we can get models from Solidworks
  const loader = new STLLoader();

  // THREE script - Binary files - add Chassis to scene
  const material = new THREE.MeshPhongMaterial( { color: 0x242424, specular: 0x000000, shininess: 50 } );
	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-chassis_3.stl', function ( geometry ) {
	  const mesh = new THREE.Mesh( geometry, material );
	  mesh.position.set( model_pos_x, model_pos_y, model_pos_z );
	  mesh.rotation.set( - Math.PI/2, 0, 0 );
	  mesh.scale.set( 0.5, 0.5, 0.5 );
	  scene.add( mesh );
  } );

	// THREE script - Binary files - add Wheels to scene
  const material_wheels = new THREE.MeshPhongMaterial( { color: 0x606060, specular: 0x000000, shininess: 10 } );
  loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-wheels_1.stl', function ( geometry ) {
		const mesh_wheels = new THREE.Mesh( geometry, material_wheels );
		mesh_wheels.position.set( model_pos_x, model_pos_y, model_pos_z );
		mesh_wheels.rotation.set( - Math.PI/2, 0, 0 );
		mesh_wheels.scale.set( 0.5, 0.5, 0.5 );
		scene.add( mesh_wheels );
  } );

  // THREE script - Binary files - add Panels to scene
  let material_panels = new THREE.MeshPhongMaterial( { color: 0xFFA700, specular: 0x000000, shininess: 200 } );
  loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
		mesh_panels = new THREE.Mesh( geometry, material_panels );
		mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
		mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
		mesh_panels.scale.set( 0.5, 0.5, 0.5 );
		scene.add( mesh_panels );
  } );
  
	// THREE script - Binary files - Panels - Update colour when user changes selection
  userSelectedColour.onchange = function() {
		// Yellow
		// Black
		// White
		// Red
		// Orange
		// Navy Blue
		// Olive Drab
		if (userSelectedColour.value === "Yellow") {
	  	scene.remove( mesh_panels );
	  	material_panels = new THREE.MeshPhongMaterial( { color: 0xFFA700, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
				mesh_panels = new THREE.Mesh( geometry, material_panels );
				mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
				mesh_panels.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_panels );
	  	} );
		} else if (userSelectedColour.value === "Black"){
	  	scene.remove( mesh_panels );
	  	material_panels = new THREE.MeshPhongMaterial( { color: 0x303030, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
				mesh_panels = new THREE.Mesh( geometry, material_panels );
				mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
				mesh_panels.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_panels );
	  	} );
  	} else if (userSelectedColour.value === "White"){
	  	scene.remove( mesh_panels );
	  	material_panels = new THREE.MeshPhongMaterial( { color: 0xD6D6D6, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
	    	mesh_panels = new THREE.Mesh( geometry, material_panels );
	    	mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
	    	mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
	    	mesh_panels.scale.set( 0.5, 0.5, 0.5 );
	    	scene.add( mesh_panels );
	  	} );
  	} else if (userSelectedColour.value === "Red"){
	  	scene.remove( mesh_panels );
	  	material_panels = new THREE.MeshPhongMaterial( { color: 0xC92F24, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
	    	mesh_panels = new THREE.Mesh( geometry, material_panels );
	    	mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
	    	mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
	    	mesh_panels.scale.set( 0.5, 0.5, 0.5 );
	    	scene.add( mesh_panels );
	  	} );
  	} else if (userSelectedColour.value === "Orange"){
	  	scene.remove( mesh_panels );
	  	material_panels = new THREE.MeshPhongMaterial( { color: 0xFF6700, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
	    	mesh_panels = new THREE.Mesh( geometry, material_panels );
	    	mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
	    	mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
	    	mesh_panels.scale.set( 0.5, 0.5, 0.5 );
	    	scene.add( mesh_panels );
	  	} );
  	} else if (userSelectedColour.value === "Navy Blue"){
	  	scene.remove( mesh_panels );
	  	material_panels = new THREE.MeshPhongMaterial( { color: 0x536882, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
	    	mesh_panels = new THREE.Mesh( geometry, material_panels );
	    	mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
	    	mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
	    	mesh_panels.scale.set( 0.5, 0.5, 0.5 );
	    	scene.add( mesh_panels );
	  	} );
  	} else if (userSelectedColour.value === "Olive Drab"){
	  	scene.remove( mesh_panels );
	  	material_panels = new THREE.MeshPhongMaterial( { color: 0x3B4216, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-panels_1.stl', function ( geometry ) {
	    	mesh_panels = new THREE.Mesh( geometry, material_panels );
	    	mesh_panels.position.set( model_pos_x, model_pos_y, model_pos_z );
	    	mesh_panels.rotation.set( - Math.PI/2, 0, 0 );
	    	mesh_panels.scale.set( 0.5, 0.5, 0.5 );
	    	scene.add( mesh_panels );
	  	} );
  	}
		// Pricing script - Colour
		htmlPriceTotalUpdate();

		// Lead time script - Colour
		htmlLeadTimeUpdate();
  }

  // THREE script - Binary files - add Attachment 1 to scene
  let material_attachment1;
  // update parts of the model as user chooses components in the robot's dropdown menu
  // Attachment 1 starts with an empy STL ( dingo-o-attachment-none_1.stl )
	// this is a tiny sphere that the user will not notice
	// this sphere gets removed when the user selects a new component from the HTML Select dropdown
  material_attachment1 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
  loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
    mesh_attachment1 = new THREE.Mesh( geometry, material_attachment1 );
		mesh_attachment1.position.set( model_pos_x, model_pos_y, model_pos_z );
		mesh_attachment1.rotation.set( - Math.PI/2, 0, 0 );
		mesh_attachment1.scale.set( 0.5, 0.5, 0.5 );
		scene.add( mesh_attachment1 );
  } );
  userSelectedAttachment1.onchange = function() {
		// None
		// 3D Lidar | Velodyne, Puck, VLP-16
		// 2D Lidar | Hokuyo, UST-10
		// IMU | LORD Microstrain, 3DM-GX5-25
		// Camera | Intel, Realsense D435
		// Manipulator | Kinova, Gen3
		scene.remove( mesh_attachment1 ); // removing the 
		if (userSelectedAttachment1.value === "None") {
	  	material_attachment1 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
	    	mesh_attachment1 = new THREE.Mesh( geometry, material_attachment1 );
				mesh_attachment1.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment1.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment1.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment1 );
	  	} );
		} else if (userSelectedAttachment1.value === "3D Lidar | Velodyne, Puck, VLP-16") {
	  	material_attachment1 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-velodyne_1.stl', function ( geometry ) {
	   	  mesh_attachment1 = new THREE.Mesh( geometry, material_attachment1 );
				mesh_attachment1.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment1.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment1.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment1 );
	  	} );
		} else if (userSelectedAttachment1.value === "2D Lidar | Hokuyo, UST-10") {
	  	material_attachment1 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-hokuyo_1.stl', function ( geometry ) {
	    	mesh_attachment1 = new THREE.Mesh( geometry, material_attachment1 );
				mesh_attachment1.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment1.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment1.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment1 );
	  	});
		} else if (userSelectedAttachment1.value === "IMU | LORD Microstrain, 3DM-GX5-25") {
	  	material_attachment1 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-microstrain_1.stl', function ( geometry ) {
				mesh_attachment1 = new THREE.Mesh( geometry, material_attachment1 );
				mesh_attachment1.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment1.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment1.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment1 );
	  	} );
		} else if (userSelectedAttachment1.value === "Camera | Intel, Realsense D435") {
	  	material_attachment1 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-realsense-horizontal_1.stl', function ( geometry ) {
				mesh_attachment1 = new THREE.Mesh( geometry, material_attachment1 );
				mesh_attachment1.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment1.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment1.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment1 );
	  	} );
		}
		// Pricing script - Attachment 1
    htmlPriceTotalUpdate();
		// Lead time script - Attachment 1
		htmlLeadTimeUpdate();
  }

	// THREE script - Binary files - add Attachment 2 to scene
  let material_attachment2;
  // update parts of the model as user chooses components in the robot's dropdown menu
  // Attachment 2 starts with an empy STL ( dingo-o-attachment-none_1.stl )
	// this is a tiny sphere that the user will not notice
	// this sphere gets removed when the user selects a new component from the HTML 
  material_attachment2 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
  loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
    mesh_attachment2 = new THREE.Mesh( geometry, material_attachment1 );
		mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
		mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
		mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
		scene.add( mesh_attachment2 );
  } );
  userSelectedAttachment2.onchange = function() {
		// None
		// 3D Lidar | Velodyne, Puck, VLP-16
		// 2D Lidar | Hokuyo, UST-10
		// IMU | LORD Microstrain, 3DM-GX5-25
		// Camera | Intel, Realsense D435
		// Manipulator | Kinova, Gen3
		scene.remove( mesh_attachment2 );
		if (userSelectedAttachment2.value === "None") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
	    	mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	} );
		} else if (userSelectedAttachment2.value === "3D Lidar, Lower | Velodyne, Puck, VLP-16") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-mid-velodyne-lower_1.stl', function ( geometry ) {
	   	  mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	} );
		} else if (userSelectedAttachment2.value === "3D Lidar, Upper | Velodyne, Puck, VLP-16") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-mid-velodyne-upper_1.stl', function ( geometry ) {
	   	  mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	} );
		} else if (userSelectedAttachment2.value === "3D Lidar, Vertical | Velodyne, Puck, VLP-16") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-mid-velodyne-vertical_1.stl', function ( geometry ) {
	   	  mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	} );
		} else if (userSelectedAttachment2.value === "2D Lidar, Lower | Hokuyo, UST-10") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-mid-hokuyo-lower_1.stl', function ( geometry ) {
	    	mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	});
		} else if (userSelectedAttachment2.value === "2D Lidar, Upper | Hokuyo, UST-10") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-mid-hokuyo-upper_1.stl', function ( geometry ) {
	    	mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	});
		} else if (userSelectedAttachment2.value === "IMU | LORD Microstrain, 3DM-GX5-25") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-mid-microstrain_1.stl', function ( geometry ) {
				mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	} );
		} else if (userSelectedAttachment2.value === "Manipulator | Kinova, Gen3") {
	  	material_attachment2 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-front-mid-kinova_1.stl', function ( geometry ) {
				mesh_attachment2 = new THREE.Mesh( geometry, material_attachment2 );
				mesh_attachment2.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment2.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment2.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment2 );
	  	} );
		}
		// Pricing script - Attachment 2
    htmlPriceTotalUpdate();
		// Lead time script - Attachment 2
		htmlLeadTimeUpdate();
  }

	// THREE script - Binary files - add Attachment 3 to scene
  let material_attachment3;
  // update parts of the model as user chooses components in the robot's dropdown menu
  // Attachment 3 starts with an empy STL ( dingo-o-attachment-none_1.stl )
	// this is a tiny sphere that the user will not notice
	// this sphere gets removed when the user selects a new component from the HTML 
  material_attachment3 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
  loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
    mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
		mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
		mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
		mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
		scene.add( mesh_attachment3 );
  } );
  userSelectedAttachment3.onchange = function() {
		// None
		// 3D Lidar | Velodyne, Puck, VLP-16
		// 2D Lidar | Hokuyo, UST-10
		// IMU | LORD Microstrain, 3DM-GX5-25
		// Camera | Intel, Realsense D435
		// Manipulator | Kinova, Gen3
		scene.remove( mesh_attachment3 );
		if (userSelectedAttachment3.value === "None") {
	  	material_attachment3 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
	    	mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
				mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment3 );
	  	} );
		} else if (userSelectedAttachment3.value === "3D Lidar, Lower | Velodyne, Puck, VLP-16") {
	  	material_attachment3 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-mid-velodyne-lower_1.stl', function ( geometry ) {
	   	  mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
				mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment3 );
	  	} );
		} else if (userSelectedAttachment3.value === "3D Lidar, Upper | Velodyne, Puck, VLP-16") {
	  	material_attachment3 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-mid-velodyne-upper_1.stl', function ( geometry ) {
	   	  mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
				mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment3 );
	  	} );
		} else if (userSelectedAttachment3.value === "3D Lidar, Vertical | Velodyne, Puck, VLP-16") {
	  	material_attachment3 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-mid-velodyne-vertical_1.stl', function ( geometry ) {
	   	  mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
				mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment3 );
	  	} );
		} else if (userSelectedAttachment3.value === "2D Lidar, Lower | Hokuyo, UST-10") {
	  	material_attachment3 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-mid-hokuyo-lower_1.stl', function ( geometry ) {
	    	mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
				mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment3 );
	  	});
		} else if (userSelectedAttachment3.value === "2D Lidar, Upper | Hokuyo, UST-10") {
	  	material_attachment3 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-mid-hokuyo-upper_1.stl', function ( geometry ) {
	    	mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
				mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment3 );
	  	});
		} else if (userSelectedAttachment3.value === "IMU | LORD Microstrain, 3DM-GX5-25") {
	  	material_attachment3 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-mid-microstrain_1.stl', function ( geometry ) {
				mesh_attachment3 = new THREE.Mesh( geometry, material_attachment3 );
				mesh_attachment3.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment3.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment3.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment3 );
	  	} );
		}
		// Pricing script - Attachment 3
    htmlPriceTotalUpdate();
		// Lead time script - Attachment 3
		htmlLeadTimeUpdate();
  }

	// THREE script - Binary files - add Attachment 4 to scene
  let material_attachment4;
  // update parts of the model as user chooses components in the robot's dropdown menu
  // Attachment 4 starts with an empy STL ( dingo-o-attachment-none_1.stl )
	// this is a tiny sphere that the user will not notice
	// this sphere gets removed when the user selects a new component from the HTML 
  material_attachment4 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
  loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
    mesh_attachment4 = new THREE.Mesh( geometry, material_attachment4 );
		mesh_attachment4.position.set( model_pos_x, model_pos_y, model_pos_z );
		mesh_attachment4.rotation.set( - Math.PI/2, 0, 0 );
		mesh_attachment4.scale.set( 0.5, 0.5, 0.5 );
		scene.add( mesh_attachment4 );
  } );
  userSelectedAttachment4.onchange = function() {
		// None
		// 3D Lidar | Velodyne, Puck, VLP-16
		// 2D Lidar | Hokuyo, UST-10
		// IMU | LORD Microstrain, 3DM-GX5-25
		// Camera | Intel, Realsense D435
		// Manipulator | Kinova, Gen3
		scene.remove( mesh_attachment4 );
		if (userSelectedAttachment4.value === "None") {
	  	material_attachment4 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-none_1.stl', function ( geometry ) {
	    	mesh_attachment4 = new THREE.Mesh( geometry, material_attachment4 );
				mesh_attachment4.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment4.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment4.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment4 );
	  	} );
		} else if (userSelectedAttachment4.value === "3D Lidar | Velodyne, Puck, VLP-16") {
	  	material_attachment4 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-velodyne_1.stl', function ( geometry ) {
	   	  mesh_attachment4 = new THREE.Mesh( geometry, material_attachment4 );
				mesh_attachment4.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment4.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment4.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment4 );
	  	} );
		} else if (userSelectedAttachment4.value === "2D Lidar | Hokuyo, UST-10") {
	  	material_attachment4 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-hokuyo_1.stl', function ( geometry ) {
	    	mesh_attachment4 = new THREE.Mesh( geometry, material_attachment4 );
				mesh_attachment4.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment4.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment4.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment4 );
	  	});
		} else if (userSelectedAttachment4.value === "IMU | LORD Microstrain, 3DM-GX5-25") {
	  	material_attachment4 = new THREE.MeshPhongMaterial( { color: 0x282828, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-microstrain_1.stl', function ( geometry ) {
				mesh_attachment4 = new THREE.Mesh( geometry, material_attachment4 );
				mesh_attachment4.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment4.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment4.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment4 );
	  	} );
		} else if (userSelectedAttachment4.value === "Camera | Intel, Realsense D435") {
	  	material_attachment4 = new THREE.MeshPhongMaterial( { color: 0xABABAB, specular: 0x000000, shininess: 200 } );
	  	loader.load( './javascript/robot_definition/dingo-o/meshes/dingo-o-attachment-rear-realsense-horizontal_1.stl', function ( geometry ) {
				mesh_attachment4 = new THREE.Mesh( geometry, material_attachment4 );
				mesh_attachment4.position.set( model_pos_x, model_pos_y, model_pos_z );
				mesh_attachment4.rotation.set( - Math.PI/2, 0, 0 );
				mesh_attachment4.scale.set( 0.5, 0.5, 0.5 );
				scene.add( mesh_attachment4 );
	  	} );
		}
		// Pricing script - Attachment 4
    htmlPriceTotalUpdate();
		// Lead time script - Attachment 4
		htmlLeadTimeUpdate();
  }

  // THREE script - Lights
  const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  dirLight1.position.set( 1, 1, 1 );
  scene.add( dirLight1 );
  
  const dirLight2 = new THREE.DirectionalLight( 0x002288 );
  dirLight2.position.set( - 1, - 1, - 1 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
  scene.add( ambientLight );



  // Pricing script - Computer
	userSelectedComputer.onchange = function() {
    htmlPriceTotalUpdate();
		// Lead time script
		htmlLeadTimeUpdate();
	}

	// Pricing script - Battery
	userSelectedBattery.onchange = function() {
    htmlPriceTotalUpdate();
		// Lead time script
		htmlLeadTimeUpdate();
	}
	
	// Pricing script - Bay 1
	userSelectedBay1.onchange = function() {
    htmlPriceTotalUpdate();
		// Lead time script
		htmlLeadTimeUpdate();
	}
	
	// Pricing script - Bay 2
	userSelectedBay2.onchange = function() {
    htmlPriceTotalUpdate();
		// Lead time script
		htmlLeadTimeUpdate();
	}

  //
  window.addEventListener( 'resize', onWindowResize );
}

// Three.js
function onWindowResize() {
	//camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth * 0.6, window.innerHeight * 1.2);
	renderer.setPixelRatio(window.devicePixelRatio);
  camera.aspect = ( 0.5 * window.innerWidth ) / window.innerHeight;
  camera.updateProjectionMatrix();
}

// Three.js
function animate() {
	requestAnimationFrame( animate );
	controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
	render();
}

// Three.js
function render() {
	renderer.render( scene, camera );
}

function priceTotalUpdate() {
	return constants.price_dingo + constants.price_colour[ userSelectedColour.value ] + constants.price_computer[ userSelectedComputer.value ] 
	  + constants.price_battery[ userSelectedBattery.value ] + constants.price_bay_1[ userSelectedBay1.value ] 
		+ constants.price_bay_2[ userSelectedBay2.value ] + constants.price_attachment_1[ userSelectedAttachment1.value ] 
		+ constants.price_attachment_2[ userSelectedAttachment2.value ] + constants.price_attachment_3[ userSelectedAttachment3.value ]
		+ constants.price_attachment_4[ userSelectedAttachment4.value ];
}

function leadTimeUpdate() {
	return Math.max( constants.lead_time_dingo, constants.lead_time_colour[ userSelectedColour.value ], 
		constants.lead_time_computer[ userSelectedComputer.value ], constants.lead_time_battery[ userSelectedBattery.value ], 
		constants.lead_time_bay_1[ userSelectedBay1.value ], constants.lead_time_bay_2[ userSelectedBay2.value ], 
		constants.lead_time_attachment_1[ userSelectedAttachment1.value ], constants.lead_time_attachment_2[ userSelectedAttachment2.value ], 
		constants.lead_time_attachment_3[ userSelectedAttachment3.value ], constants.lead_time_attachment_4[ userSelectedAttachment4.value ] );
}

function htmlPriceTotalUpdate() {
	// creates the text to be added to the HTML
	price_html_element.innerHTML = "Price: $" + priceTotalUpdate() + " USD";
}

function htmlLeadTimeUpdate() {
	// creates the text to be added to the HTML
	lead_time_html_element.innerHTML = "Ships: " + leadTimeUpdate() + " weeks";
}













// Generate PDF ----------------------------------------------------------------------------------------
// update item descriptions, prices, and lead times in file constants.js
// refer to JSPDF documentation for how the PDF elements are positioned
// units are millimetres.

// Page 1
function printPDF(){
  // PDF setup - create PDF
  const doc = new jsPDF();

  // PFD setup - date for naming quote
  const date = new Date();
	const quote_name = "Quote-RCW-" + String(date.getFullYear()) + "-" 
	  + String(date.getMonth() + 1) + "-" + String(date.getDate()) + "-" 
	  + String(date.getHours()) + "-" + String(date.getMinutes()) + "-" 
	  + String(date.getSeconds()); // month is zero indexed
	const quote_date = String(date.getFullYear()) + "-" 
	  + String(date.getMonth() + 1) + "-" + String(date.getDate()) 
		+ "   |   " + String(date.getHours()) + ":" + String(date.getMinutes()) 
		+ ":" + String(date.getSeconds()); // month is zero indexed

  // PDF setup - CPR header image
  var img_cpr = new Image();
	img_cpr.src = "images/clearpath_robotics_color.jpg";

  // set font
  doc.setFont("helvetica");

  doc.addImage(img_cpr, 'JPEG', 135, 16, 1479/25, 375/25 );

  // page 1 - header - quote number
  doc.setFontSize(12);
  doc.text(135, 48, quote_name);

  // page 1 - header - quote date
  doc.setFontSize(8);
  doc.text(20, 20, "Quote Date: ");
	doc.text(40, 20, quote_date);

  // page 1 - header - quote prepared by
  doc.text(20, 24.5, "Prepared By: ");
  doc.text(40, 24.5, "Robot Configuration Webpage   |   sales@clearpathrobotics.com");

  // page 1 - header - seller
  doc.text(20, 29, "Seller: ");
  doc.text(40, 29, "Clearpath Robotics, Inc.");
  doc.text(40, 33, "1425 Strasburg Road Unit 2A, Kitchener, Ontario, N2R 1H2");
  doc.text(40, 37, "Tel: 1 (800) 301-3863 x122 / Fax: 1 (888) 374-0091");
  doc.text(40, 41, "www.clearpathrobotics.com");

  // page 1 - header - title
  doc.setFontSize(12);
  doc.text(20, 48, "Title: ");
  doc.text(40, 48, "Dingo-O, Robot Configuration Webpage");

  // page 1 - horizontal line separating header and columns
  doc.setLineWidth(0.2);
  doc.line(20, 50, 200, 50);

  // page 1 - columns
  doc.setFontSize(8);
  doc.text(21, 53, "ID");
  doc.text(27, 53, "Part #");
  doc.text(40, 53, "Description");
  doc.text(141, 53, "Qty");
  doc.text(149, 53, "Price ($ USD )");
  doc.text(174, 53, "Ext. Price ($ USD )");
  
  // page 1 - horizontal line separating columns and body
  doc.line(20, 54, 200, 54 );

  // page 1 - grey rectangle background - robot hardware
  doc.setDrawColor(0);
  doc.setFillColor(69, 69, 69);
  doc.rect(20, 54, 180, 5, "F");
  doc.setTextColor(255); // make text white
  doc.text(40, 57.5, "Robot Hardware");
  doc.setTextColor(0); // make text black

  // page 1 - grey rectangle background - quote ID 1
  doc.setFillColor(206, 206, 206);
  doc.rect(20, 59, 180, 41, "F");
  // page 1 - body - quote ID 1 - base robot
  doc.text(21, 63, "1");
  doc.text(27, 63, "022609");
  doc.text(141, 63, "1");
  doc.text(149, 63, "$" + String(constants.price_dingo));
  doc.text(174, 63, "$" + String(constants.price_dingo));

  doc.text(40, 63, constants.text_dingo[0]);
  doc.text(40, 67, constants.text_dingo[1]);
  doc.text(40, 71, constants.text_dingo[2]);
  doc.text(40, 75, constants.text_dingo[3]);
  doc.text(40, 79, constants.text_dingo[4]);
  doc.text(40, 83, constants.text_dingo[5]);
  doc.text(40, 87, constants.text_dingo[6]);
  doc.text(40, 91, constants.text_dingo[7]);
  doc.text(40, 95, constants.text_dingo[8]);
  doc.text(40, 99, " "); //intentionally left blank


  // page 1 - body - quote ID 2 - colour
  doc.text(21, 103, "2");
  doc.text(27, 103, "042000");
  doc.text(141, 103, "1");
  doc.text(149, 103, "$" + String(constants.price_colour[ userSelectedColour.value ]));
  doc.text(174, 103, "$" + String(constants.price_colour[ userSelectedColour.value ]));

  doc.text(40, 103, constants.text_colour[ userSelectedColour.value ][0]);
  doc.text(40, 107, constants.text_colour[ userSelectedColour.value ][1]);
  doc.text(40, 111, constants.text_colour[ userSelectedColour.value ][2]);
  doc.text(40, 115, constants.text_colour[ userSelectedColour.value ][3]);
  doc.text(40, 119, constants.text_colour[ userSelectedColour.value ][4]);
  doc.text(40, 123, constants.text_colour[ userSelectedColour.value ][5]);
  doc.text(40, 127, constants.text_colour[ userSelectedColour.value ][6]);
  doc.text(40, 131, constants.text_colour[ userSelectedColour.value ][7]);
  doc.text(40, 135, constants.text_colour[ userSelectedColour.value ][8]);
  doc.text(40, 139, " "); //intentionally left blank


  // page 1 - grey rectangle background - quote ID 3
	doc.setFillColor(206, 206, 206);
  doc.rect(20, 139, 180, 41, "F");
  // page 1 - body - quote ID 3 - computer
  doc.text(21, 143, "3");
  doc.text(27, 143, "042000");
  doc.text(141, 143, "1");
  doc.text(149, 143, "$" + String(constants.price_computer[ userSelectedComputer.value ]));
  doc.text(174, 143, "$" + String(constants.price_computer[ userSelectedComputer.value ]));
  
  doc.text(40, 143, constants.text_computer[ userSelectedComputer.value ][0]);
  doc.text(40, 147, constants.text_computer[ userSelectedComputer.value ][1]);
  doc.text(40, 151, constants.text_computer[ userSelectedComputer.value ][2]);
  doc.text(40, 155, constants.text_computer[ userSelectedComputer.value ][3]);
  doc.text(40, 159, constants.text_computer[ userSelectedComputer.value ][4]);
  doc.text(40, 163, constants.text_computer[ userSelectedComputer.value ][5]);
  doc.text(40, 167, constants.text_computer[ userSelectedComputer.value ][6]);
  doc.text(40, 171, constants.text_computer[ userSelectedComputer.value ][7]);
  doc.text(40, 175, constants.text_computer[ userSelectedComputer.value ][8]);
  doc.text(40, 179, " "); //intentionally left blank
  

  // page 1 - body - quote ID 4 - battery
  doc.text(21, 183, "4");
  doc.text(27, 183, "042000");
  doc.text(141, 183, "1");
  doc.text(149, 183, "$" + String(constants.price_battery[ userSelectedBattery.value ]));
  doc.text(174, 183, "$" + String(constants.price_battery[ userSelectedBattery.value ]));
  
  doc.text(40, 183, constants.text_battery[ userSelectedBattery.value ][0]);
  doc.text(40, 187, constants.text_battery[ userSelectedBattery.value ][1]);
  doc.text(40, 191, constants.text_battery[ userSelectedBattery.value ][2]);
  doc.text(40, 195, constants.text_battery[ userSelectedBattery.value ][3]);
  doc.text(40, 199, constants.text_battery[ userSelectedBattery.value ][4]);
  doc.text(40, 203, constants.text_battery[ userSelectedBattery.value ][5]);
  doc.text(40, 207, constants.text_battery[ userSelectedBattery.value ][6]);
  doc.text(40, 211, constants.text_battery[ userSelectedBattery.value ][7]);
  doc.text(40, 215, constants.text_battery[ userSelectedBattery.value ][8]);
  doc.text(40, 219, " "); //intentionally left blank


  // page 1 - grey rectangle background - quote ID 5
	doc.setFillColor(206, 206, 206);
  doc.rect(20, 219, 180, 41, "F");
  // page 1 - body - quote ID 5 - internal bay 1
  doc.text(21, 223, "5");
  doc.text(27, 223, "042000");
  doc.text(141, 223, "1");
  doc.text(149, 223, "$" + String(constants.price_bay_1[ userSelectedBay1.value ])); 
  doc.text(174, 223, "$" + String(constants.price_bay_1[ userSelectedBay1.value ])); 
  
  doc.text(40, 223, constants.text_bay_1[ userSelectedBay1.value ][0]);
  doc.text(40, 227, constants.text_bay_1[ userSelectedBay1.value ][1]);
  doc.text(40, 231, constants.text_bay_1[ userSelectedBay1.value ][2]);
  doc.text(40, 235, constants.text_bay_1[ userSelectedBay1.value ][3]);
  doc.text(40, 239, constants.text_bay_1[ userSelectedBay1.value ][4]);
  doc.text(40, 243, constants.text_bay_1[ userSelectedBay1.value ][5]);
  doc.text(40, 247, constants.text_bay_1[ userSelectedBay1.value ][6]);
  doc.text(40, 251, constants.text_bay_1[ userSelectedBay1.value ][7]);
  doc.text(40, 255, constants.text_bay_1[ userSelectedBay1.value ][8]);
  doc.text(40, 259, " "); //intentionally left blank

	// page 1 - footer
	doc.text(21, 287, "Purchaser Initials ___________");
	doc.text(190, 287, "1/3");







  // Generate PDF ----------------------------------------------------------------------------------------
  // Page 2
  doc.addPage();
  
	doc.addImage(img_cpr, 'JPEG', 135, 16, 1479/25, 375/25 );

  // page 2 - header - quote number
  doc.setFontSize(12);
  doc.text(135, 48, quote_name);

  // page 2 - header - quote date
  doc.setFontSize(8);
  doc.text(20, 20, "Quote Date: ");
  doc.text(40, 20, quote_date);

  // page 2 - header - quote prepared by
  doc.text(20, 24.5, "Prepared By: ");
  doc.text(40, 24.5, "Robot Configuration Webpage   |   sales@clearpathrobotics.com");

  // page 2 - header - seller
  doc.text(20, 29, "Seller: ");
  doc.text(40, 29, "Clearpath Robotics, Inc.");
  doc.text(40, 33, "1425 Strasburg Road Unit 2A, Kitchener, Ontario, N2R 1H2");
  doc.text(40, 37, "Tel: 1 (800) 301-3863 x122 / Fax: 1 (888) 374-0091");
  doc.text(40, 41, "www.clearpathrobotics.com");

  // page 2 - header - title
  doc.setFontSize(12);
  doc.text(20, 48, "Title: ");
  doc.text(40, 48, "Dingo-O, Robot Configuration Webpage");

  // page 2 - horizontal line separating header and columns
  doc.line(20, 50, 200, 50);

  // page 2 - columns
  doc.setFontSize(8);
  doc.text(21, 53, "ID");
  doc.text(27, 53, "Part #");
  doc.text(40, 53, "Description");
  doc.text(141, 53, "Qty");
  doc.text(149, 53, "Price ($ USD )");
  doc.text(174, 53, "Ext. Price ($ USD )");
  
  // page 2 - horizontal line separating columns and body
  doc.line(20, 54, 200, 54 );

  // page 2 - grey rectangle background - robot hardware
  doc.rect(20, 54, 180, 5, "F");
  doc.setTextColor(255); // make text white
  doc.text(40, 57.5, "Robot Hardware - Continued");
  doc.setTextColor(0); // make text black

  // page 2 - grey rectangle background - quote ID 6
  doc.setFillColor(206, 206, 206);
  doc.rect(20, 59, 180, 41, "F");
  // page 2 - body - quote ID 6 - internal bay 2
  doc.text(21, 63, "6");
  doc.text(27, 63, "042000");  // should update this
  doc.text(141, 63, "1");
  doc.text(149, 63, "$" + String(constants.price_bay_2[ userSelectedBay2.value ]));
  doc.text(174, 63, "$" + String(constants.price_bay_2[ userSelectedBay2.value ]));

  doc.text(40, 63, constants.text_bay_2[ userSelectedBay2.value ][0]);
  doc.text(40, 67, constants.text_bay_2[ userSelectedBay2.value ][1]);
  doc.text(40, 71, constants.text_bay_2[ userSelectedBay2.value ][2]);
  doc.text(40, 75, constants.text_bay_2[ userSelectedBay2.value ][3]);
  doc.text(40, 79, constants.text_bay_2[ userSelectedBay2.value ][4]);
  doc.text(40, 83, constants.text_bay_2[ userSelectedBay2.value ][5]);
  doc.text(40, 87, constants.text_bay_2[ userSelectedBay2.value ][6]);
  doc.text(40, 91, constants.text_bay_2[ userSelectedBay2.value ][7]);
  doc.text(40, 95, constants.text_bay_2[ userSelectedBay2.value ][8]);
  doc.text(40, 99, " "); //intentionally left blank


  // page 2 - body - quote ID 7 - attachment 1
  doc.text(21, 103, "7");
  doc.text(27, 103, "042000");  // should update this
  doc.text(141, 103, "1");
  doc.text(149, 103, "$" + String(constants.price_attachment_1[ userSelectedAttachment1.value ]));
  doc.text(174, 103, "$" + String(constants.price_attachment_1[ userSelectedAttachment1.value ]));

  doc.text(40, 103, constants.text_attachment_1[ userSelectedAttachment1.value ][0]);
  doc.text(40, 107, constants.text_attachment_1[ userSelectedAttachment1.value ][1]);
  doc.text(40, 111, constants.text_attachment_1[ userSelectedAttachment1.value ][2]);
  doc.text(40, 115, constants.text_attachment_1[ userSelectedAttachment1.value ][3]);
  doc.text(40, 119, constants.text_attachment_1[ userSelectedAttachment1.value ][4]);
  doc.text(40, 123, constants.text_attachment_1[ userSelectedAttachment1.value ][5]);
  doc.text(40, 127, constants.text_attachment_1[ userSelectedAttachment1.value ][6]);
  doc.text(40, 131, constants.text_attachment_1[ userSelectedAttachment1.value ][7]);
  doc.text(40, 135, constants.text_attachment_1[ userSelectedAttachment1.value ][8]);
  doc.text(40, 139, " "); //intentionally left blank


  // page 2 - grey rectangle background - quote ID 2
	doc.setFillColor(206, 206, 206);
  doc.rect(20, 139, 180, 41, "F");
  // page 2 - body - quote ID 8 - attachment 2
  doc.text(21, 143, "8");
  doc.text(27, 143, "042000");  // should update this
  doc.text(141, 143, "1");
  doc.text(149, 143, "$" + String(constants.price_attachment_2[ userSelectedAttachment2.value ]));
  doc.text(174, 143, "$" + String(constants.price_attachment_2[ userSelectedAttachment2.value ]));
  
  doc.text(40, 143, constants.text_attachment_2[ userSelectedAttachment2.value ][0]);
  doc.text(40, 147, constants.text_attachment_2[ userSelectedAttachment2.value ][1]);
  doc.text(40, 151, constants.text_attachment_2[ userSelectedAttachment2.value ][2]);
  doc.text(40, 155, constants.text_attachment_2[ userSelectedAttachment2.value ][3]);
  doc.text(40, 159, constants.text_attachment_2[ userSelectedAttachment2.value ][4]);
  doc.text(40, 163, constants.text_attachment_2[ userSelectedAttachment2.value ][5]);
  doc.text(40, 167, constants.text_attachment_2[ userSelectedAttachment2.value ][6]);
  doc.text(40, 171, constants.text_attachment_2[ userSelectedAttachment2.value ][7]);
  doc.text(40, 175, constants.text_attachment_2[ userSelectedAttachment2.value ][8]);
  doc.text(40, 179, " "); //intentionally left blank


	// page 2 - body - quote ID 9 - attachment 3
  doc.text(21, 183, "9");
  doc.text(27, 183, "042000");  // should update this
  doc.text(141, 183, "1");
  doc.text(149, 183, "$" + String(constants.price_attachment_3[ userSelectedAttachment3.value ]));
  doc.text(174, 183, "$" + String(constants.price_attachment_3[ userSelectedAttachment3.value ]));
  
  doc.text(40, 183, constants.text_attachment_3[ userSelectedAttachment3.value ][0]);
  doc.text(40, 187, constants.text_attachment_3[ userSelectedAttachment3.value ][1]);
  doc.text(40, 191, constants.text_attachment_3[ userSelectedAttachment3.value ][2]);
  doc.text(40, 195, constants.text_attachment_3[ userSelectedAttachment3.value ][3]);
  doc.text(40, 199, constants.text_attachment_3[ userSelectedAttachment3.value ][4]);
  doc.text(40, 203, constants.text_attachment_3[ userSelectedAttachment3.value ][5]);
  doc.text(40, 207, constants.text_attachment_3[ userSelectedAttachment3.value ][6]);
  doc.text(40, 211, constants.text_attachment_3[ userSelectedAttachment3.value ][7]);
  doc.text(40, 215, constants.text_attachment_3[ userSelectedAttachment3.value ][8]);
  doc.text(40, 219, " "); //intentionally left blank


  // page 1 - grey rectangle background - quote ID 10
	doc.setFillColor(206, 206, 206);
  doc.rect(20, 219, 180, 41, "F");
  // page 1 - body - quote ID 10 - attachment 4
  doc.text(21, 223, "10");
  doc.text(27, 223, "042000");  // should update this
  doc.text(141, 223, "1");
  doc.text(149, 223, "$" + String(constants.price_attachment_4[ userSelectedAttachment4.value ])); 
  doc.text(174, 223, "$" + String(constants.price_attachment_4[ userSelectedAttachment4.value ])); 
  
  doc.text(40, 223, constants.text_attachment_4[ userSelectedAttachment4.value ][0]);
  doc.text(40, 227, constants.text_attachment_4[ userSelectedAttachment4.value ][1]);
  doc.text(40, 231, constants.text_attachment_4[ userSelectedAttachment4.value ][2]);
  doc.text(40, 235, constants.text_attachment_4[ userSelectedAttachment4.value ][3]);
  doc.text(40, 239, constants.text_attachment_4[ userSelectedAttachment4.value ][4]);
  doc.text(40, 243, constants.text_attachment_4[ userSelectedAttachment4.value ][5]);
  doc.text(40, 247, constants.text_attachment_4[ userSelectedAttachment4.value ][6]);
  doc.text(40, 251, constants.text_attachment_4[ userSelectedAttachment4.value ][7]);
  doc.text(40, 255, constants.text_attachment_4[ userSelectedAttachment4.value ][8]);
  doc.text(40, 259, " "); //intentionally left blank

  // page 2 - footer
	doc.setFontSize(8);
	doc.text(21, 287, "Purchaser Initials ___________");
	doc.text(190, 287, "2/3");














	// Generate PDF ----------------------------------------------------------------------------------------
  // Page 3
  doc.addPage();
  
	doc.addImage(img_cpr, 'JPEG', 135, 16, 1479/25, 375/25 );

  // page 3 - header - quote number
  doc.setFontSize(12);
  doc.text(135, 48, quote_name);

  // page 3 - header - quote date
  doc.setFontSize(8);
  doc.text(20, 20, "Quote Date: ");
  doc.text(40, 20, quote_date);

  // page 3 - header - quote prepared by
  doc.text(20, 24.5, "Prepared By: ");
  doc.text(40, 24.5, "Robot Configuration Webpage   |   sales@clearpathrobotics.com");

  // page 3 - header - seller
  doc.text(20, 29, "Seller: ");
  doc.text(40, 29, "Clearpath Robotics, Inc.");
  doc.text(40, 33, "1425 Strasburg Road Unit 2A, Kitchener, Ontario, N2R 1H2");
  doc.text(40, 37, "Tel: 1 (800) 301-3863 x122 / Fax: 1 (888) 374-0091");
  doc.text(40, 41, "www.clearpathrobotics.com");

  // page 3 - header - title
  doc.setFontSize(12);
  doc.text(20, 48, "Title: ");
  doc.text(40, 48, "Dingo-O, Robot Configuration Webpage");

  // page 3 - horizontal line separating header and columns
  doc.line(20, 50, 200, 50);

	// page 3 - total price
	doc.setFontSize(12);
	doc.text(149, 190, "Total");
	doc.text(174, 190, "$" + priceTotalUpdate());
  
	// page 3 - horizontal lines above and below the total price
  doc.line(20, 185, 200, 185);
	doc.line(20, 192, 200, 192);

	// page 3 - legal stuff
	doc.setFontSize(8);
	doc.text(21, 200, "1) 50% payable upon signed quote, 50% Due Net 30 Days OAC upon Delivery (Credit preapproved).");
	doc.text(21, 204, "2) All prices are in American Dollars. All payments due in American Dollars.");
	doc.text(21, 208, "3) Estimated time to ship " + leadTimeUpdate() + " weeks after receipt of order (ARO), and receipt of acceptable End Use Certificate, if required.");
	doc.text(24.5, 212, "Subject to 3rd party component availability and length of work queue at time of receipt of P.O.");
	doc.text(21, 216, "4) Clearpath Robotics Inc. Terms and Conditions of Sale apply to this quotation and govern the legal relationship between Buyer and Seller.");
  doc.text(24.5, 220, "Terms and Conditions are located at this link");
	doc.text(21, 224, "5) Unless otherwise specified, price does not include any applicable duties, taxes, or any import/export related costs for which the Buyer is");
	doc.text(24.5, 228, "solely responsible.");
	doc.text(21, 232, "6) A 3% processing fee will be added to all credit card purchases over USD $5,000");
	doc.text(21, 236, "7) HST or GST will be charged to all Canadian customers over and above the costs shown in this quote.");
  doc.text(21, 240, "8) We reserve the right to cancel your Purchase Order without liability in the event that an Export Permit (if required) is not granted or");
	doc.text(24.5, 244, "is revoked.");
	doc.text(21, 248, "9) Destination of Goods will be the address shown on the face of this Quotation. Diversion, re-direction, or re-shipment of Goods by Buyer");
	doc.text(24.5, 252, "contrary to U.S. and Canadian Export Control laws is prohibited.");

  // page 3 - signature section
	doc.setFillColor(206, 206, 206);
  doc.rect(20, 255, 180, 26, "FD");
	doc.text(27, 260, "Agreed to and accepted by:");
	doc.text(80, 268, "Authorized Signature");
	doc.line(80, 265, 140, 265);
	doc.text(149, 268, "Date");
	doc.line(149, 265, 189, 265);
	doc.text(80, 278, "Print Name");
	doc.line(80, 275, 140, 275);
	doc.text(149, 278, "Title");
	doc.line(149, 275, 189, 275);
	

  // page 3 - footer
	doc.text(21, 287, "Purchaser Initials ___________");
	doc.text(190, 287, "3/3");




	
  // Generate PDF ----------------------------------------------------------------------------------------
  // Save - server
	
	var pdfUpload = btoa(doc.output());
	var finalPrice = priceTotalUpdate();
	var finalLead = leadTimeUpdate();
	$.ajax({
		method: "POST",
		url: "php/main.php" ,
		data: {
			pdfData: pdfUpload,
			pdfName: quote_name,
			inputNameFirst,
			inputNameLast,
			inputEmail,
			inputCompany,
			finalPrice,
			finalLead,
			inputCountry,
			inputState
		}
	});

	// Generate PDF ----------------------------------------------------------------------------------------
  // Save - client
  doc.save(quote_name); // quote_name just names the file with the time generated above
}