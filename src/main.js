import * as THREE from 'three';

import { mapsetting_0,mapsetting_1,mapsetting_2,mapsetting_3 } from './Mapsetting';
import { cm1,cm2 } from './common'
import { Timer} from './Timer';
import { createLight } from './Light';
import { Basic } from './Basic';
import { changeCamerapos } from './Camera';
// import { Loader } from './Loader';
import { Event } from './Event';
import { Player } from './Player';
import { House } from './House';
import gsap from 'gsap';
import { MapEdit, createMap } from './Map';
import { Buttons } from './Button';
import { Audio } from './Audio';
import { People } from './People';
import { ANA_list,DVAMECH_list, DVA_list,GENJI_list,HANZO_list,JUNKRAT_list,LUCIO_list,PROBI_TERRAN_list,PROBI_list,TRACER_list,ZARYA_list } from './hero';

// Texture
// cm1.Loader.onStart = () =>{console.log('로드 시작');};
// cm1.Loader.onProgress = glb => {console.log(glb + '로드');};
// cm1.Loader.onLoad = () => {console.log('로드 완료');};
// cm1.Loader.onError = () => {console.log('에러');};
// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const basic = new Basic();
// const event = new Event(canvas);
cm2.renderer = renderer;
// const loader = new Loader();
const map = new MapEdit();
map.addTexture(mapsetting_0);
map.addTexture(mapsetting_1);
map.addTexture(mapsetting_2);
map.addTexture(mapsetting_3);

map.applyArray({
	row: 0,
	col: [2,2,2,2,2,2,2],
});

map.applyArray({
	row: 1,
	col: [2,2,2,0,2,2,2],
});

map.applyArray({
	row: 2,
	col: [2,2,0,0,0,2,2],
});

map.applyArray({
	row: 3,
	col: [2,0,0,1,0,0,2],
});

map.applyArray({
	row: 4,
	col: [2,2,0,3,0,2,2],
});

map.applyArray({
	row: 5,
	col: [2,2,2,0,2,2,2],
});

map.applyArray({
	row: 6,
	col: [2,2,2,2,2,2,2],
});

map.applyScene();
// Scene

// Camera
cm1.camera = new THREE.OrthographicCamera(
	-(window.innerWidth / window.innerHeight), // left
	window.innerWidth / window.innerHeight, // right,
	1, // top
	-1, // bottom
	-1000,
	1000
);

const cameraPosition = new THREE.Vector3(1, 4, 5);
changeCamerapos(cm1.camera,cameraPosition,0.2);
cm1.scene.add(cm1.camera);

// Light
createLight();
// createMap('/textures/storm_hanamura_1_low.png');
// createMap('/images/test.png');


cm2.audio = new Audio();
cm2.audio.playAudio('/sounds/Overwatch.mp3',true,0.025);
cm2.herovoice = new Audio();
cm2.impactsound = new Audio();

const charsize = 0.8;
//플레이어 추가
const player = new Player(
	{
		pos3: new THREE.Vector3(0,0.3,0),
		rot3: new THREE.Vector3(0,0,0),
		siz3 : charsize,
		name : 'dva',
		speed: 0.05,
		desarea : 0.03,
		modelSrc : '/models/dva_test.glb',
		heroList : DVA_list,
		on : true,
	}
);

const player2 = new Player(
	{
		pos3: new THREE.Vector3(0,0.3,0),
		rot3: new THREE.Vector3(0,0,0),
		siz3 : charsize,
		name : 'dvamech',
		speed: 0.1,
		desarea : 0.05,
		modelSrc : '/models/dvamech_test.glb',
		heroList : DVAMECH_list,
		on : false,
	}
);
player.playerInit();
player2.playerInit();
const event = new Event(canvas,player,player2);
//사람 추가
const peopleArray = [];
const people_0 = new People(
	{
		pos3 : new THREE.Vector3(0,0.3,-5),
		rot3 : new THREE.Vector3(0,0,0),
		siz3 : charsize,
		name : 'dvamech',
		speed : 0.05,
		modelSrc : '/models/dvamech_test.glb',
		heroList : DVAMECH_list,
	}
);

const people_1 = new People(
	{
		pos3 : new THREE.Vector3(12,0.3,-1),
		rot3 : new THREE.Vector3(0,-0.5,0),
		siz3 : charsize,
		name : 'genji',
		speed : 0.05,
		modelSrc : '/models/genji_test.glb',
		heroList : GENJI_list,
	}
);

const people_2 = new People(
	{
		pos3 : new THREE.Vector3(10,0.3,-2),
		rot3 : new THREE.Vector3(0,-0.5,0),
		siz3 : charsize,
		name : 'hanzo',
		speed : 0.05,
		modelSrc : '/models/hanzo_test.glb',
		heroList : HANZO_list,
	}
);

// const people_3 = new People(
// 	{
// 		pos3 : new THREE.Vector3(4,0.3,5),
// 		rot3 : new THREE.Vector3(0,0,0),
// 		siz3 : charsize,
// 		name : 'junkrat',
// 		speed : 0.05,
// 		modelSrc : '/models/junkrat_test.glb',
// 		heroList : JUNKRAT_list,
// 	}
// );

const people_4 = new People(
	{
		pos3 : new THREE.Vector3(2,0.3,-10),
		rot3 : new THREE.Vector3(0,0,0),
		siz3 : charsize,
		name : 'lucio',
		speed : 0.05,
		modelSrc : '/models/lucio_test.glb',
		heroList : LUCIO_list,
	}
);

const people_5 = new People(
	{
		pos3 : new THREE.Vector3(-4,0.3,-5),
		rot3 : new THREE.Vector3(0,0.5,0),
		siz3 :charsize,
		name : 'probi_terran',
		speed : 0.05,
		modelSrc : '/models/probi_terran_test.glb',
		heroList : PROBI_TERRAN_list,
	}
);

const people_6 = new People(
	{
		pos3 : new THREE.Vector3(4,0.3,-5),
		rot3 : new THREE.Vector3(0,-0.5,0),
		siz3 : charsize,
		name : 'probi',
		speed : 0.05,
		modelSrc : '/models/probi_test.glb',
		heroList : PROBI_list,
	}
);

const people_7 = new People(
	{
		pos3 : new THREE.Vector3(-2,0.3,-10),
		rot3 : new THREE.Vector3(0,0,0),
		siz3 : charsize,
		name : 'zarya',
		speed : 0.05,
		modelSrc : '/models/zarya_test.glb',
		heroList : ZARYA_list,
	}
);

const people_8 = new People(
	{
		pos3 : new THREE.Vector3(-10,0.3,0),
		rot3 : new THREE.Vector3(0,0.5,0),
		siz3 : charsize,
		name : 'tracer',
		speed : 0.05,
		modelSrc : '/models/tracer_test.glb',
		heroList : TRACER_list,
	}
);

const people_9 = new People(
	{
		pos3 : new THREE.Vector3(-12,0.3,0),
		rot3 : new THREE.Vector3(0,0.5,0),
		siz3 : charsize,
		name : 'ana',
		speed : 0.05,
		modelSrc : '/models/ana_test.glb',
		heroList : ANA_list,
	}
);

peopleArray.push(people_0);
peopleArray.push(people_1);
peopleArray.push(people_2);
// peopleArray.push(people_3);
peopleArray.push(people_4);
peopleArray.push(people_5);
peopleArray.push(people_6);
peopleArray.push(people_7);
peopleArray.push(people_8);
peopleArray.push(people_9);

for(let i=0;i<peopleArray.length;i++)
{
	peopleArray[i].peopleInit();
}

console.log('로딩 리스트 생성');
// 그리기

// loader.checkPrograss();

const buttons = new Buttons;
buttons.addButton({
	btnname : 'img',
	type : 'audio',
	cssText : 'position: absolute; right: 20px; top: 20px',
	innerHTML : 'audio',
	imageSrc: './images/sound_on.png',
	button_x: 30,
	button_y: 30,
});


cm1.Loader.addLoadComplete();
const clock = new THREE.Clock();
function draw() {

	const delta = clock.getDelta();
	
	player.playerAlways({
		delta: delta,
		event: event,
	})

	player2.playerAlways({
		delta: delta,
		event: event,
	})

	for(let i=0;i<peopleArray.length;i++)
	{
		peopleArray[i].peopleAlways({delta: delta, event: event});
	}

	renderer.render(cm1.scene, cm1.camera);
	renderer.setAnimationLoop(draw);
}

basic.basicInit();
event.MouseListener();
event.TouchListener();
event.KeyboardListener();
draw();