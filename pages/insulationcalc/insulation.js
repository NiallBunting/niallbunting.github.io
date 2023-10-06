/*
* WRITTEN BY NIALL BUNTING 2023
*/
/*
*
* These are my implementations of the physics equations
* Heat capacity - The energy required to change the temp of a material. Water = high, Copper = Low
* Heat Transfer - How fast heat can move between objects. Insulation reduces the speed heat can move.
*
*/

const AIRDENSITY = 1.276; // 0C 1 bara // https://www.engineeringtoolbox.com/air-properties-d_156.html
const AIRSPECIFICHEATCAPACITY = 717.1; // Constant volume specific heat capacity.

// kelvin, kelvin, meter2, K.m^2/W
function calculateWattsChange(tempOutside, tempInside, areaMeter, rvalue) {
  const tempDelta = tempInside - tempOutside;
  return ((tempDelta * areaMeter) / rvalue)
}


//function calculateTemperatureChangeAir(time, watts, airMass) {
//  return calculateTemperatureChange(time, watts, AIRSPECIFICHEATCAPACITY, airMass);
//}
//
//// seconds, Watts, J/(kg.K), kg
//function calculateTemperatureChange(time, watts, specificHeatCapacity, mass) {
//  return (time * watts)/(specificHeatCapacity * mass);
//}

// density 1.276 kg/m3
function calculateMassOfAir(volume) {
  return volume * AIRDENSITY;
}

// Use the heat capacity of the air
function newtonsLawOfCoolingAir(tempOutside, tempInside, transferAreas, seconds, massOfAirInRoom) {
  const heatCapacity = AIRSPECIFICHEATCAPACITY * calculateMassOfAir(massOfAirInRoom);
  return newtonsLawOfCooling(tempOutside, tempInside, transferAreas, seconds, heatCapacity);
}

// K, K, m2, K * m2 / w, seconds, J/K
function newtonsLawOfCooling(tempOutside, tempInside, transferAreas, seconds, heatCapacity) {

  // transferareas are : [{"area": 21, "rvalue": 2}]
  const areas = transferAreas.map(transArea => ((1 / transArea.rvalue) * transArea.area)).reduce((acc, item) => acc + item, 0);
  const coolingCoefficent = areas / heatCapacity;

  //const coolingCoefficent = ((1 / rvalue) * areaMeter) / heatCapacity;
  return tempOutside + ((tempInside - tempOutside) * Math.pow(Math.E, -1 * coolingCoefficent * seconds));
}

/*
*
*
* SET THE ROOM DATA
*
*/

let selectedWall = null;

const roomData = {
  width: 3,
  height: 2.4,
  depth: 5,
  outsideTemp: 5,
  insideTemp: 21,
  walls: [
    {"name": "East wall", "outside": false, "area": 0, "rvalue": 1.2},
    {"name": "West wall", "outside": false, "area": 0, "rvalue": 1.2},
    {"name": "Ceiling/roof", "outside": false, "area": 0, "rvalue": 0.1},
    {"name": "Floor", "outside": false, "area": 0, "rvalue": 0.5},
    {"name": "South wall", "outside": false, "area": 0, "rvalue": 1.2},
    {"name": "North wall", "outside": false, "area": 0, "rvalue": 1.2}
  ]
};


function calculateWallSizes(roomData) {
  roomData.walls[0].area = roomData.height * roomData.depth;
  roomData.walls[1].area = roomData.height * roomData.depth;
  roomData.walls[2].area = roomData.width * roomData.depth;
  roomData.walls[3].area = roomData.width * roomData.depth;
  roomData.walls[4].area = roomData.width * roomData.height;
  roomData.walls[5].area = roomData.width * roomData.height;
}

function calculateOutsideArea(roomData) {
  return roomData.walls.filter(wall => wall.outside).map(wall => wall.area).reduce((acc, item) => acc + item, 0);
}

function calculateWatts(roomData) {
  return roomData.walls.filter(wall => wall.outside).map(wall => {
    return calculateWattsChange(roomData.outsideTemp, roomData.insideTemp, wall.area, wall.rvalue)
  }).reduce((acc, item) => acc + item, 0);
}

function calculateTempOverTime(roomData, time) {
  const outsideWalls = roomData.walls.filter(wall => wall.outside);

  return newtonsLawOfCoolingAir(roomData.outsideTemp, roomData.insideTemp, outsideWalls, time, roomData.width * roomData.height * roomData.depth) 
}

/*
*
* UI handling code
*
*/

function populateRoomValues(roomData) {
  document.getElementById("roomheight").value = roomData.height.toFixed(2);
  document.getElementById("roomwidth").value = roomData.width.toFixed(2);
  document.getElementById("roomdepth").value = roomData.depth.toFixed(2);
  document.getElementById("roominsidetemp").value = roomData.insideTemp.toFixed(1);
  document.getElementById("roomoutsidetemp").value = roomData.outsideTemp.toFixed(1);
}

function populateResults(roomData) {
  document.getElementById("resultarea").innerHTML = calculateOutsideArea(roomData).toFixed(2);
  document.getElementById("resultwatts").innerHTML = calculateWatts(roomData).toFixed(1);

  let data = [];
  for(let i = 0; i < 180; i++) {
    data.push(calculateTempOverTime(roomData, i * 60));
  }

  chart.data.datasets[0].data = data;
  chart.update();
}

function populateWallValues(roomData, index) {
     document.getElementById("wallname").innerHTML = roomData.walls[index].name;
     document.getElementById("wallsize").innerHTML = roomData.walls[index].area.toFixed(2);
     document.getElementById("wallisoutside").checked = roomData.walls[index].outside;
     document.getElementById("wallrvalue").value = roomData.walls[index].rvalue.toFixed(2);
}

function keyboardControls(e) {
    e = e || window.event;

    if (e.keyCode == '38') { // Up
        if(camera.rotation.x < 0.9) { camera.rotation.x += 0.1; }
    }
    else if (e.keyCode == '40') { // Down
        if(camera.rotation.x > -0.9) { camera.rotation.x -= 0.1; }
    }
    else if (e.keyCode == '37') { // Left
       camera.rotation.y += 0.1;
    }
    else if (e.keyCode == '39') { // Right
        camera.rotation.y -= 0.1;
    }

    requestAnimationFrame(() => renderer.render( scene, camera ));

    if(selectedWall && (e.keyCode === '38' || e.keyCode === '40')) {
      return false;
    }
}


// Make mouse drags work
const MOUSE_DELTA = 6;
let mouse_StartX = null;
let mouse_StartY = null;

function mouseControls(roomData, cubeMesh) {

  renderer.domElement.addEventListener("mousedown", event => {
     mouse_StartX = event.clientX;
     mouse_StartY = event.clientY;
  });

  document.addEventListener('mouseup', function (event) {

    // Ignore mouse up if not started in the canvas.
    if(mouse_StartX === null || mouse_StartY === null) {
      return;
    }

    const diffX = Math.abs(event.clientX - mouse_StartX);
    const diffY = Math.abs(event.clientY - mouse_StartY);
 
    if (diffX < MOUSE_DELTA && diffY < MOUSE_DELTA) {
       const domClientRect = renderer.domElement.getBoundingClientRect();
  
       var vector = new THREE.Vector3( 
          ( (event.clientX - domClientRect.left) / renderer.domElement.offsetWidth ) * 2 - 1, 
          - ( (event.clientY - domClientRect.top) / renderer.domElement.offsetHeight ) * 2 + 1, 0.5 );
       vector.unproject( camera );
       raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
  
       var intersects = raycaster.intersectObject( threeRoomMesh[0] );
       if ( intersects.length > 0 ) {
         var index = Math.floor( intersects[0].faceIndex / 2 );
         selectedWall = index;
  
         populateWallValues(roomData, index); 
       }
    } else {
      // This is a drag. We can ignore as is handled by mouse move.
    }

    document.activeElement.blur();

    mouse_StartX = null;
    mouse_StartY = null;
  });

  document.addEventListener('mousemove', function (event) {
    // Ignore mouse if not started in the canvas.
    if(mouse_StartX === null || mouse_StartY === null) {
      return;
    }

    const diffX = (event.clientX - mouse_StartX) / window.innerWidth;
    const diffY = (event.clientY - mouse_StartY) / window.innerHeight;

    camera.rotation.x += diffY * 0.1;
    camera.rotation.y += diffX * 0.1;

    if(camera.rotation.x > 0.9) { camera.rotation.x = 0.9; }
    if(camera.rotation.x < -0.9) { camera.rotation.x = -0.9; }

    requestAnimationFrame(() => renderer.render( scene, camera ));
        //if(camera.rotation.x < 0.8) { camera.rotation.x += 0.1; }

  });

  renderer.domElement.addEventListener('touchmove', function (event) {
     event.preventDefault();

    // Ignore mouse if not started in the canvas.
    if(mouse_StartX === null || mouse_StartY === null) {
      mouse_StartX = event.touches[0].clientX;
      mouse_StartY = event.touches[0].clientY;
    }

    const diffX = (event.touches[0].clientX - mouse_StartX) / window.innerWidth;
    const diffY = (event.touches[0].clientY - mouse_StartY) / window.innerHeight;

    camera.rotation.x += diffY * 0.1;
    camera.rotation.y += diffX * 0.1;

    if(camera.rotation.x > 0.9) { camera.rotation.x = 0.9; }
    if(camera.rotation.x < -0.9) { camera.rotation.x = -0.9; }

    requestAnimationFrame(() => renderer.render( scene, camera ));
        //if(camera.rotation.x < 0.8) { camera.rotation.x += 0.1; }

  });

  document.addEventListener('touchend', function(event) {
      mouse_StartX = null;
      mouse_StartY = null;
  });
}

function handleRoomUpdate() {
  calculateWallSizes(roomData);
  populateResults(roomData);
  scene.remove(threeRoomMesh[0]);
  scene.remove(threeRoomMesh[1]);
  threeRoomMesh[0].geometry.dispose();
  threeRoomMesh[0].material.dispose();
  threeRoomMesh = createRoom(roomData.width, roomData.depth, roomData.height);
}

function addEventHandlers() {

  document.getElementById("roomheight").addEventListener("input", evt => {
    roomData.height = parseFloat(evt.target.value);
    handleRoomUpdate();
  });
  document.getElementById("roomwidth").addEventListener("input", evt => {
    roomData.width = parseFloat(evt.target.value);
    handleRoomUpdate();
  });
  document.getElementById("roomdepth").addEventListener("input", evt => {
    roomData.depth = parseFloat(evt.target.value);
    handleRoomUpdate();
  });
  document.getElementById("roominsidetemp").addEventListener("input", evt => {
    roomData.insideTemp = parseFloat(evt.target.value);
    populateResults(roomData);
  });
  document.getElementById("roomoutsidetemp").addEventListener("input", evt => {
    roomData.outsideTemp = parseFloat(evt.target.value);
    populateResults(roomData);
  });
  document.getElementById("wallisoutside").addEventListener("change", evt => {
    roomData.walls[selectedWall].outside = evt.target.checked;
    populateResults(roomData);
  });
  document.getElementById("wallrvalue").addEventListener("input", evt => {
    roomData.walls[selectedWall].rvalue = parseFloat(evt.target.value);
    populateResults(roomData);
  });
}

/*
*
* RENDERING CODE
*
*/


// Init empty THREEJS sceen
const width = document.getElementById("animation").offsetWidth;
const height = document.getElementById("animation").offsetWidth * 0.66; // window.innerWidth
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;
camera.rotation.order = 'YXZ';
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height);
document.getElementById("animation").appendChild( renderer.domElement );
const raycaster = new THREE.Raycaster();

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

function createRoom(width, depth, height) {
  // Create the cube that will serve as the room
  const cubeGeometry = new THREE.BoxGeometry( width, height, depth ).toNonIndexed();
  const cubeMaterial = new THREE.MeshStandardMaterial( { 
    color: 0xf2e8d7,
    side: THREE.BackSide, // We are in the cube
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    vertexColors: true
  });


  const positionAttribute = cubeGeometry.getAttribute('position');
  const colors = [];

  const color = new THREE.Color();

  for (let i = 0; i < positionAttribute.count; i += 6) {

    color.setHex(0xf2e8d7);
    if(i === 12) { // 3rd is celiing
      color.setHex(0xffffff);
    }
    if(i === 18) { // 4th is floor
      color.setHex(0xbbbbbb);
    }

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  }

  cubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // Solid mesh for the cube
  const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );

  cubeMesh.receiveShadow = true;
  scene.add( cubeMesh )
  // Wires around the corners
  const cubeWireGeometry = new THREE.EdgesGeometry( cubeGeometry );
  const cubeWireMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );
  const cubeWireFrame = new THREE.LineSegments( cubeWireGeometry, cubeWireMaterial );
  cubeMesh.add( cubeWireFrame );

  // Create a ceiling pointlight
  const pointLight = new THREE.PointLight( 0xffffff, 0.5 , 0, 1);
  pointLight.position.set( 0, (-1 * (height / 2)) + 1.8, 0 );
  scene.add( pointLight );

  // Set to normal height
  camera.position.y = (-1 * (height / 2)) + 1.8;

  return [cubeMesh, pointLight];
}

/*
*
* INIT CODE
*
*/

// Load data from URL if there

calculateWallSizes(roomData);

let threeRoomMesh = createRoom(roomData.width, roomData.depth, roomData.height);
renderer.render( scene, camera );

populateRoomValues(roomData);

document.onkeydown = keyboardControls;
addEventHandlers(roomData);
mouseControls(roomData, threeRoomMesh[0]);

const ctx = document.getElementById('chartOfTempChange');

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array.apply(null, Array(180)).map(function (x, i) { return i; }),
    datasets: [{
      label: 'Temperature',
      data: Array.apply(null, Array(180)).map(function (x, i) { return 21; }),
      borderWidth: 3,
      pointStyle: false
    }]
  },
  options: {
   plugins: {
     legend: {
       display: false
     },
     title: {
       display: true,
       text: "Temperature change over time once heating has stopped."
     }
   },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          text: "Temperature",
          display: true
        }
      },
      x: {
        title: {
          text: "Minutes",
          display: true
        },
        //ticks: {
        //        min: 0,
        //        steps: 20,
        //        stepSize: 10,
        //        autoSkip: false,
        //        callback: function(val, index) {
        //          return index % 10 === 0 ? val : '';
        //        }
        //   }
      }
    }
  }
});

populateResults(roomData);
