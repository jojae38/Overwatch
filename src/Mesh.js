import {Box,Vec3,Body} from 'cannon-es'
import { cm1 } from './common';

export class Mesh
{
    constructor(pos3,rot3,siz3,speed,modelSrc,name)
    {
        this.name = name || undefined;
        this.pos3 = pos3;
        this.rot3 = rot3;
        this.siz3 = siz3;
        this.speed = speed;
        this.modelSrc = modelSrc;
        this.init = false;
        this.load = false;

        // console.log(this.size);
    }

    setCannonBody()
    {
        const material = this.cannonMaterial;
        const shape = new Box(new Vec3(this.size.x/2,this.size.y,this.size.z/2));
        this.cannonBody = new Body({
            mass : 10,
            position : new Vec3(this.pos3.x,this.pos3.y,this.pos3.z),
            shape,
            material
        });
        this.cannonBody.quaternion.setFromAxisAngle(
            new Vec3(0,1,0),
            this.rotationY
        );
        cm1.World.addBody(this.cannonBody);
    }
}

export const actionList = {
    stop: 0,
    walk: 1,
    run: 2,
    jump: 3,
    hello: 4,
}