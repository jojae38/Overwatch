import * as THREE from 'three';
import {cm1,cm2} from './common'
import { Timer } from './Timer';

export class Event
{
    isPressed = false;
    // mouse = new THREE.Vector2();
    
    constructor(canvas,player,player2)
    {
        this.canvas = canvas;
        this.mouse = new THREE.Vector2();
        this.player = player;
        this.player2 = player2;
        this.turnplayer = false;
        this.timer = new Timer(3000);
        this.timer2 = new Timer(1000);
    }
    
    getPressed()
    {
        return this.isPressed;
    }

    getMouse()
    {
        return this.mouse;
    }

    getKey()
    {
        return this.key;
    }

    // Mouse
    MouseListener()
    {
        this.canvas.addEventListener('mousedown', e=> {
            this.isPressed = true;
            // console.log(e.button);
            this.calculateMousePosition(e);
        });
        this.canvas.addEventListener('mouseup', e=> {
            this.isPressed = false;
        });
        this.canvas.addEventListener('mousemove', e=> {
            if(this.isPressed)
            {
                this.calculateMousePosition(e);
            }
        });    
    }
    // Touch
    TouchListener()
    {
        this.canvas.addEventListener('touchstart', e => {
            this.isPressed = true;
            this.calculateMousePosition(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', () => {
            this.isPressed = false;
        });
        this.canvas.addEventListener('touchmove', e => {
            if (this.isPressed) {
                this.calculateMousePosition(e.touches[0]);
            }
        });
    }
    // KeyBoard
    KeyboardListener()
    {
        // window.onkeydown = (e)=>console.log(e);
        window.addEventListener('keydown',(e)=>{
            this.key = e.key
            // console.log(this.key);
            if(this.key == 'q')
            {
                this.timer2.start();
                if(this.timer2.isOver())
                {
                    this.timer2.reset();
                    if(this.turnplayer)
                    {
                        this.player2.playerAttack();
                    }
                    else
                    {
                        this.player.playerAttack();
                    }
                }
            }
            else if(this.key == 'w')
            {
                this.timer2.start();
                if(this.timer2.isOver())
                {
                    this.timer2.reset();
                    if(this.turnplayer)
                    {
                        this.player2.playerTaunt();
                    }
                    else
                    {
                        this.player.playerTaunt();
                    }
                }
            }
            else if (this.key == 'e')
            {
                this.timer2.start();
                if(this.timer2.isOver())
                {
                    this.timer2.reset();
                    if(this.turnplayer)
                    {
                        this.player2.playerDance();
                    }
                    else
                    {
                        this.player.playerDance();
                    }
                }
            }
            else if(this.key == 'r')
            {
                this.timer.start();
                if(this.timer.isOver())
                {
                    this.timer.reset();
                    this.turnplayer =!this.turnplayer;
                    if(this.turnplayer)
                    {
                        this.player.playerRide(!this.turnplayer);
                        this.player2.playerRide(this.turnplayer);
                    }
                    else
                    {
                        this.player.playerRide(!this.turnplayer);
                        this.player2.playerRide(this.turnplayer);
                    }
                }
            }

            this.key = undefined;
        });
        window.addEventListener('keyup',(e)=>this.key = undefined);
        
        // this.canvas.addEventListener('keydown',(e)=> {console.log(e)});
    }

    calculateMousePosition(e)
    {
        this.mouse.x = e.clientX / this.canvas.clientWidth * 2 - 1;
        this.mouse.y = -(e.clientY / this.canvas.clientHeight * 2 - 1);
    }

    raycasting() {
        
        cm1.raycaster.setFromCamera(this.mouse, cm1.camera);
        return checkIntersects();
    }
}

function checkIntersects() {
    // raycaster.setFromCamera(mouse, camera);

    const intersects = cm1.raycaster.intersectObjects(cm2.meshes);
    return intersects
    // for (const item of intersects) {
    //     return item.object.name;
    //     // if (item.object.name === 'floor') {
    //     //     destinationPoint.x = item.point.x;
    //     //     destinationPoint.y = 0.3;
    //     //     destinationPoint.z = item.point.z;
    //     //     player.modelMesh.lookAt(destinationPoint);

    //     //     player.moving = true;

    //     //     pointerMesh.position.x = destinationPoint.x;
    //     //     pointerMesh.position.z = destinationPoint.z;
    //     // }
    //     break;
    // }
}