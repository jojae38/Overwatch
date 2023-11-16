import * as THREE from 'three';
import { Mesh } from "./Mesh";
import { cm1,cm2 } from "./common";

export class People extends Mesh
{
    constructor(info)
    {
        super(info.pos3,info.rot3,info.siz3,info.speed,info.modelSrc,info.name);
        // cm1.Loader.addLoad(this.name);
        // this.state = 
        this.loadnum = cm1.Loader.addLoad(this.name);
        this.Object3D  = undefined;
        this.skinnedMesh = undefined;
        this.heroList = info.heroList;

        this.walk = this.heroList.Walk_A;

        
        this.Stand0 = this.heroList.Stand;
        this.Stand1 = this.heroList.Stand_1;
        this.Stand2 = this.heroList.Stand_2;
        this.Stand3 = this.heroList.Stand_3;
        
        this.Attack = this.heroList.Attack;
        this.Dance = this.heroList.Stand_Dance;
        this.Taunt = this.heroList.Taunt;
        this.Stun = this.heroList.Stun;

        this.currentAction = this.Stand0;
        console.log(this.name + ' 로드중')
        this.peopleLoad({});
    }

    peopleInit()
    {
        this.init = true;

    }

    peopleAlways(info)
    {
        if(this.init&&this.load)
        {   
            this.mixer.update(info.delta);
        }
    }

    peopleLoad(info)
    {
        cm1.gltfLoader.load(
            this.modelSrc,
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


                this.peoplePosition();
                this.peopleScale();
                this.Object3D.name = this.name;
                
                
                this.skinnedMesh.alphaHash = true;

                cm1.scene.add(this.Object3D);
                cm2.meshes.push(this.Object3D);

                cm1.scene.add(this.skinnedMesh);
                cm2.meshes.push(this.skinnedMesh);

                this.mixer = new THREE.AnimationMixer(this.Object3D);
                this.mixer.addEventListener('finished',()=>{
                    if(this.currentAction == this.Stand0)
                    {
                        const random = Math.floor(Math.random()*3+1);
                        this.actions[this.currentAction].stop();
                        switch(random)
                        {
                            case 1:
                                this.currentAction = this.Stand1;
                                break;
                            case 2:
                                this.currentAction = this.Stand2;
                                break;
                            case 3:
                                this.currentAction = this.Stand3;
                                break;
                        }
                        this.actions[this.currentAction].setLoop(THREE.LoopOnce);
                        this.actions[this.currentAction].play();
                    }
                    else
                    {
                        this.actions[this.currentAction].stop();
                        this.currentAction = this.Stand0;
                        this.actions[this.currentAction].play();
                    }

                })
				for(let i=0;i<glb.animations.length;i++)
				{
					this.actions[i] = this.mixer.clipAction(glb.animations[i]);                    
				}
                // console.log(this.Stand)
                this.actions[this.currentAction].setLoop(THREE.LoopRepeat,5);
                this.actions[this.currentAction].play();
                
                // for(let i = 0; i<glb.animations.length;i++)
                // {
                //     console.log(this.actions[i]._clip.name);
                //     // if(this.actions[i].clipAction)
                // }
                
                // console.log(this.actions);
                // this.setCannonBody();
                cm1.Loader.EndLoad(this.loadnum);
                console.log(this.name + ' 로드완료');
                this.load = true;
            }
        )
    }

    peoplePosition()
    {
        this.Object3D.position.set(this.pos3.x,this.pos3.y,this.pos3.z);
        this.Object3D.rotation.set(this.rot3.x,this.rot3.y,this.rot3.z);
    }

    peopleScale()
    {
        this.Object3D.scale.set(this.siz3,this.siz3,this.siz3);
    }
}
