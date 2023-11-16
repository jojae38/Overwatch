import * as THREE from 'three';
import { Mesh,actionList } from "./Mesh";
import { cm1,cm2 } from './common';
import gsap from 'gsap';

import { DVAMECH_list, DVA_list } from './hero';
import { Timer } from './Timer';

export class Player extends Mesh
{
    constructor(info)
    {
        super(info.pos3,info.rot3,info.siz3,info.speed,info.modelSrc,info.name);
        this.loadnum = cm1.Loader.addLoad(this.name);
        this.prevstate = this.Stand0;
        this.state = this.Stand0;
        this.Object3D = undefined;
        this.skinnedMesh = undefined;
        this.heroList = info.heroList;
        this.on = info.on;
        this.desarea = info.desarea;

        this.timer = new Timer(1000);
        this.voicetimer = new Timer(1500);
        this.voicetimer_mech = new Timer(1500);

        this.explodelight = new THREE.PointLight(0x58FA58,100,10);
        this.explodelight.position.y = 2;
        
        // cm1.scene.add(this.explodelight);
        this.playerActionset();

        // 플레이어 가는 방향 보여주는 헬퍼 제거 가능
        this.pointerMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1,1),
            new THREE.MeshBasicMaterial({
                color: 'crimson',
                transparent : true,
                opacity: 0.5,
            }));
        this.pointerMesh.rotation.x = -Math.PI/2;
        this.pointerMesh.position.y = 0.01;
        this.pointerMesh.receiveShadow = true;

        this.destinationPoint = new THREE.Vector3();
        console.log(this.name + ' 로드중');
        // cm1.gltfLoader.parse();
        
        this.playerLoad(this.modelSrc);
    }

    playerActionset()
    {   
        this.speed = 0.05;
        this.walk = this.heroList.Walk_A;
        this.Stand0 = this.heroList.Stand;
        this.Stand1 = this.heroList.Stand_1;
        this.Stand2 = this.heroList.Stand_2;
        this.Stand3 = this.heroList.Stand_3;
        this.Attack = this.heroList.Attack;
        if(this.heroList == DVA_list)
        {
            
            this.Attack = this.heroList.Spell_C;
        }
        
        this.Dance = this.heroList.Stand_Dance;
        this.Taunt = this.heroList.Taunt;
        this.Stun = this.heroList.Stun;
    }

    playerInit()
    {   
        // cm1.scene.add(this.pointerMesh);
        this.state = this.Stand0;
        this.init = true;
    }
    
    playerAlways(info)
    {
        if(this.init&&this.load)
        {   
            this.mixer.update(info.delta);
            
            if(this.on)
            {   
                cm1.camera.position.x = 1 + this.Object3D.position.x;
                cm1.camera.position.z = 5 + this.Object3D.position.z;
                cm1.camera.lookAt(this.Object3D.position);
            }
            if (info.event.getPressed()) {
                const intersects = info.event.raycasting()
                for(const item of intersects)
                {
                    if(item.object.name ==='floor')
                    {
                        this.destinationPoint.x = item.point.x;
                        this.destinationPoint.y = 0.3;
                        this.destinationPoint.z = item.point.z;
                    }
                }
            }
            
            switch(this.playerStatecheck()){
                case this.Stand0:
                    this.playerStop();
                    break;
                case this.walk:
                    this.playerWalk();
                    break;
                case this.Attack:
                    this.playerAttack();
                    break;
                case this.Dance:
                    this.playerDance();
                    break;
            }
            // console.log(this.state);
        }
    }
    
    playerLoad(modelSrc)
    {
        this.modelSrc = modelSrc;
        cm1.gltfLoader.load(
            modelSrc,
            glb => {
                glb.scene.traverse(child => {
                    if(child.isMesh)
                    {
                        child.castShadow = true;
                    }
                });
                this.actions = [];

                this.Object3D = glb.scene.children[0];
                if(glb.scene.children[1]!=undefined)
                {
                    this.skinnedMesh = glb.scene.children[1];
                }
                this.playerPosition();
                this.playerScale();
                this.Object3D.name = this.name;
                
                
                this.skinnedMesh.alphaHash = true;
                
                if(this.on)
                {
                    cm1.scene.add(this.Object3D);
                    cm1.scene.add(this.skinnedMesh);
                }
                
                cm2.meshes.push(this.Object3D);
                cm2.meshes.push(this.skinnedMesh);


                this.mixer = new THREE.AnimationMixer(this.Object3D);
                this.mixer.addEventListener('finished',(e)=>{
                    // if(this.state == this.Stand0)
                    // {
                    //     const random = Math.floor(Math.random()*3+1);
                    //     this.actions[this.state].stop();
                    //     switch(random)
                    //     {
                    //         case 1:
                    //             this.state = this.Stand1;
                    //             break;
                    //         case 2:
                    //             this.state = this.Stand2;
                    //             break;
                    //         case 3:
                    //             this.state = this.Stand3;
                    //             break;
                    //     }
                    //     this.actions[this.state].setLoop(THREE.LoopOnce);
                    //     this.actions[this.state].play();
                    //     console.log(random);
                    // }
                    // else if(this.state == this.Stand1||this.state == this.Stand2||this.state == this.Stand3)
                    // {
                    //     // this.actions[this.state].stop();
                    //     this.prevstate = this.state;
                    //     this.state = this.Stand0;
                    //     // this.actions[this.state].play();
                    // }
                    if(e.action._clip.name == 'Armature Object.001Spell A')
                    {
                        this.actions[this.heroList.Spell_A_End].stop();
                        this.state = this.Stand0;

                        cm1.scene.remove(this.Object3D);
                        cm1.scene.remove(this.skinnedMesh);

                    }

                    if(e.action._clip.name == 'Armature Object.001Spell A End')
                    {
                        this.actions[this.heroList.Spell_A].stop();
                        this.state = this.Stand0;
                    }

                    if(e.action._clip.name == 'Armature Object.001Spell C')
                    {
                        this.actions[this.heroList.Spell_C].stop();
                        this.state = this.Stand0;
                    }

                    if(e.action._clip.name == 'Armature Object.001Spell E')
                    {
                        this.actions[this.heroList.Spell_E].stop();
                        this.actions[this.heroList.Spell_E_End].play();
                    }

                    if(e.action._clip.name == 'Armature Object.001Spell E End')
                    {
                        this.playerImpactAudio('/sounds/dva_mech_selfdestruct_explosion01.mp3');
                        this.actions[this.heroList.Spell_E_End].stop();
                        this.state = this.Stand0;
                        // this.Object3D.position.x = this.destinationPoint.x;
                        // this.Object3D.position.z = this.destinationPoint.z;

                        // console.log(this.Object3D.position);
                        cm1.scene.remove(this.Object3D);
                        cm1.scene.remove(this.skinnedMesh);
                        this.Object3D.position.x = this.destinationPoint.x+Math.cos(this.angle)*2;
                        this.Object3D.position.z = this.destinationPoint.z+Math.sin(this.angle)*2;
                        this.skinnedMesh.position.x = this.Object3D.position.x;
                        this.skinnedMesh.position.z = this.Object3D.position.z;
                        this.state = this.Stand0;
                        cm1.scene.remove(this.explodelight);


                    }

                    if(this.state == this.Dance)
                    {
                        this.state = this.Stand0;
                    }
                    if(this.state == this.Attack)
                    {
                        this.state = this.Stand0;
                    }
                    if(this.state == this.Taunt)
                    {
                        this.state = this.Stand0;
                    }
                    

                })

				for(let i=0;i<glb.animations.length;i++)
				{
					this.actions[i] = this.mixer.clipAction(glb.animations[i]);                    
				}
                this.actions[this.Dance].setLoop(THREE.LoopOnce);
                this.actions[this.Attack].setLoop(THREE.LoopOnce);
                this.actions[this.Taunt].setLoop(THREE.LoopOnce);
                if(this.Object3D.name == 'dvamech')
                {
                    this.actions[this.heroList.Spell_C].setLoop(THREE.LoopOnce);
                    this.actions[this.heroList.Spell_E].setLoop(THREE.LoopOnce);
                    this.actions[this.heroList.Spell_E_End].setLoop(THREE.LoopOnce);
                }

                if(this.Object3D.name == 'dva')
                {
                    this.actions[this.heroList.Spell_A].setLoop(THREE.LoopOnce);
                    this.actions[this.heroList.Spell_A_End].setLoop(THREE.LoopOnce);
                }
                // this.actions[this.state].setLoop(THREE.LoopRepeat,5);
                this.actions[this.state].play();
                // for(let i = 0; i<glb.animations.length;i++)
                // {
                //     console.log(this.actions[i]._clip.name);
                //     // if(this.actions[i].clipAction)
                // }
                
                // console.log(this.actions);
                // this.setCannonBody();
                cm1.Loader.EndLoad(this.loadnum);
                console.log(this.name + ' 로드 완료');
                this.load = true;
            }
        )
    }

    playerStatecheck()
    {
        this.prevstate = this.state;
        if(Math.abs(this.destinationPoint.x - this.Object3D.position.x)<this.desarea &&
        Math.abs(this.destinationPoint.z - this.Object3D.position.z)<this.desarea)
        {
            this.state = this.Stand0;
        }
        else
        {
            this.state = this.walk;
        }
        
        if(this.voicetimer.isOver()&&this.prevstate==this.Stand0&&this.state == this.walk&&this.name =='dva')
        {
            this.voicetimer.reset();
            this.voicetimer.start();
            const random = Math.floor(Math.random()*3+1);
            switch(random)
            {
                case 1:
                    this.playerAudio('/sounds/dvabase_yes01.ogg');
                    break;
                case 2: 
                    this.playerAudio('/sounds/dvabase_yes02.ogg');
                    break;
                case 3:
                    this.playerAudio('/sounds/dvabase_yes03.ogg');
                    break;
            }
    
        }

        // if(this.prevstate!=this.state)
        // {
        //     this.actions[this.prevstate].stop();
        // }
        // console.log(prevstate);
        return this.state;
    }

    PlayerStopAnimation()
    {
        if(this.prevstate != this.state)
        {
            this.actions[this.prevstate].stop();
        }
    }

    playerStop()
    {
        this.PlayerStopAnimation()
        this.actions[this.Stand0].play();
    }
    playerWalk()
    {
        this.prevstate = this.state;
        this.pointerMesh.position.x = this.destinationPoint.x;
        this.pointerMesh.position.z = this.destinationPoint.z;
        this.Object3D.lookAt(this.destinationPoint);
        this.angle = Math.atan2(
            this.destinationPoint.z - this.Object3D.position.z,
            this.destinationPoint.x - this.Object3D.position.x
        );
        this.Object3D.position.x+=Math.cos(this.angle)*this.speed;
        this.Object3D.position.z+=Math.sin(this.angle)*this.speed;

        this.pos3.x = this.Object3D.position.x;
        this.pos3.z = this.Object3D.position.z;

        if(this.skinnedMesh!=undefined)
        {
            this.skinnedMesh.position.x = this.Object3D.position.x;
            this.skinnedMesh.position.z = this.Object3D.position.z;
        }
        // this.PlayerStopAnimation();
        this.actions[this.walk].play();
        // cm2.audio.playAudio('/sounds/Overwatch.mp3',false,0.05);
    }

    playerAttack()
    {

        if(this.voicetimer.isOver()&&this.name =='dva')
        {
            this.voicetimer.reset();
            this.voicetimer.start();
            const random = Math.floor(Math.random()*3+1);
            switch(random)
            {
                case 1:
                    this.playerAudio('/sounds/dvabase_attack_p00.ogg');
                    break;
                case 2: 
                    this.playerAudio('/sounds/dvabase_attack01.ogg');
                    break;
                case 3:
                    this.playerAudio('/sounds/dvabase_attack02.ogg');
                    break;
            }
    
        }
        else if(this.voicetimer.isOver()&&this.name =='dvamech')
        {
            this.voicetimer.reset();
            this.voicetimer.start();
            const random = Math.floor(Math.random()*3+1);
            switch(random)
            {
                case 1:
                    this.playerAudio('/sounds/dvabase_attack_p00.ogg');
                    break;
                case 2: 
                    this.playerAudio('/sounds/dvabase_attack01.ogg');
                    break;
                case 3:
                    this.playerAudio('/sounds/dvabase_attack02.ogg');
                    break;
            }
        }
        // this.playerAudio('/sounds/dvabase_attack_p00.ogg');
        this.actions[this.Attack].stop();
        this.actions[this.Attack].play();
    }

    playerTaunt()
    {
        if(this.voicetimer.isOver()&&this.name =='dva')
        {
            this.voicetimer.reset();
            this.voicetimer.start();
            const random = Math.floor(Math.random()*3+1);
            switch(random)
            {
                case 1:
                    this.playerAudio('/sounds/dvabase_taunt00.ogg');
                    break;
                case 2: 
                    this.playerAudio('/sounds/dvabase_taunt01.ogg');
                    break;
                case 3:
                    this.playerAudio('/sounds/dvabase_taunt02.ogg');
                    break;
            }
    
        }
        else if(this.voicetimer_mech.isOver()&&this.name =='dvamech')
        {
            this.voicetimer_mech.reset();
            this.voicetimer_mech.start();
            this.playerAudio('/sounds/dvabase_ultimate1used00.ogg');
        }
        this.actions[this.Taunt].stop();
        this.actions[this.Taunt].play();
    }

    playerRide(on)
    {
        if(on)
        {
            cm1.scene.add(this.Object3D);
            cm1.scene.add(this.skinnedMesh);
            if(this.Object3D.name == 'dvamech')
            {
                this.Object3D.lookAt(this.destinationPoint);
                this.actions[this.heroList.Spell_C].play();
                // this.speed = 0.05;
            }
            
            if(this.Object3D.name == 'dva')
            {
                this.actions[this.heroList.Spell_A_End].play();
                if(this.voicetimer.isOver())
                {
                    this.voicetimer.reset();
                    this.voicetimer.start();

                    const random = Math.floor(Math.random()*2+1);
                    switch(random)
                    {
                        case 1:
                            this.playerAudio('/sounds/dvabase_selfdestruct00.ogg');
                            break;
                        case 2: 
                            this.playerAudio('/sounds/dvabase_selfdestructenemy00.ogg');
                            break;
                    }
            
                }
                this.actions[this.heroList.Spell_A].play();
            }
        }
        else
        {
            if(this.Object3D.name == 'dvamech')
            {
                this.playerImpactAudio('/sounds/dva_mech_selfdestruct_charge01.mp3');
                // const tmppos = new THREE.Vector3(30*Math.cos(this.angle),0.3,30*Math.sin(this.angle));
                this.actions[this.heroList.Spell_E].play();
                // this.speed = 10;
                this.explodelight.position.x = this.Object3D.position.x;
                this.explodelight.position.z = this.Object3D.position.z;
                cm1.scene.add(this.explodelight);
                gsap.to(
                    this.Object3D.position,
                    {
                        duration: 1.5,
                        x: 30*Math.cos(this.angle),
                        z: 30*Math.sin(this.angle),
                    }

                );
                gsap.to(
                    this.explodelight,
                    {
                        duration :1.5,
                        intensity: 1000,
                    }  
                );
                gsap.to(
                    this.explodelight.position,
                    {
                        duration :1.5,
                        x: 30*Math.cos(this.angle),
                        z: 30*Math.sin(this.angle),
                    }  
                );
            }

            if(this.Object3D.name == 'dva')
            {
                if(this.voicetimer.isOver())
                {
                    this.voicetimer.reset();
                    this.voicetimer.start();
                    const random = Math.floor(Math.random()*3+1);
                    switch(random)
                    {
                        case 1:
                            this.playerAudio('/sounds/dvabase_callmech00.ogg');
                            break;
                        case 2: 
                            this.playerAudio('/sounds/dvabase_callmech01.ogg');
                            break;
                        case 3:
                            this.playerAudio('/sounds/dvabase_callmech02.ogg');
                            break;
                    }
            
                }
                this.actions[this.heroList.Spell_A].play();
            }
        }
    }

    playerDance()
    {
        if(this.voicetimer.isOver()&&this.Object3D.name == 'dva')
        {
            this.voicetimer.reset();
            this.voicetimer.start();
            this.playerAudio('/sounds/dvabase_healed01.ogg');
        }
        else if(this.voicetimer_mech.isOver()&&this.Object3D.name == 'dvamech')
        {
            this.voicetimer_mech.reset();
            this.voicetimer_mech.start();
            this.playerAudio('/sounds/dvabase_healed01.ogg');
        }
        this.actions[this.Dance].stop();
        this.actions[this.Dance].play();
    }

    playerAudio(src)
    {
        cm2.herovoice
        if(this.timer.isOver)
        {
            this.timer.reset();
            this.timer.start();
            cm2.herovoice.playAudio(src,false,0.15);
        }
    }

    playerImpactAudio(src)
    {
        cm2.impactsound
        if(this.timer.isOver)
        {
            this.timer.reset();
            this.timer.start();
            cm2.impactsound.playAudio(src,false,0.15);
        }
    }

    playerScale()
    {
        this.Object3D.scale.set(this.siz3,this.siz3,this.siz3);
    }

    playerPosition()
    {
        this.Object3D.position.set(this.pos3.x,this.pos3.y,this.pos3.z);
        this.Object3D.rotation.set(this.rot3.x,this.rot3.y,this.rot3.z);
    }
}