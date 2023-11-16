import * as THREE from 'three';
import { cm1,cm2 } from './common';

export class MapEdit
{
    constructor()
    {
        this.row = 7;
        this.col = 7;
        this.sizex = 10;
        this.sizez = 10;
        this.Maptile = new Array(this.row);
        for(var i =0;i<this.row;i++)
        {
            this.Maptile[i] = (new Array(this.col));
        }
        this.Texture = [];
    }

    applyArray(info)
    {
        // console.log(this.Maptile[1][2]);
        for(let i =0; i<this.col;i++)
        {
            this.Maptile[info.row][i] = this.addMaptile({
                num : info.col[i],
                x:i*10-30,
                z:info.row*10-30,
            });
        }
        
    }

    addMaptile(info)
    {
        // console.log(info.num);
        const sizex = this.sizex;
        const sizez = this.sizez;
        const lowmap = this.Texture[info.num].lowmap;
        // const normalmap = this.Texture[info.num].normalmap;
        // const lightmap = this.Texture[info.num].lightmap;
        const floorMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(sizex, sizez),
            new THREE.MeshStandardMaterial({
                map: lowmap,
                // normalMap : normalmap,
                // lightMap : lightmap
            })
        );
        floorMesh.name = 'floor';
        floorMesh.rotation.x = -Math.PI/2;
        floorMesh.position.x = info.x;
        floorMesh.position.z = info.z;
        floorMesh.receiveShadow = true;
        return floorMesh;
    }

    addTexture(info)
    {
        const normTex = cm1.TexLoader.load(info.normalmap);        
        const lowTex = cm1.TexLoader.load(info.lowmap);
        const lightmap = cm1.TexLoader.load(info.lightmap);
        // console.log(lightmap);
        this.Texture.push({
            lowmap : lowTex,
            normalmap : normTex,
            lightmap : lightmap,
        });
    }

    applyScene()
    {
        // console.log(this.Maptile);
        for(let i=0; i < 7; i++)
        {
            for(let j = 0;j < 7; j++)
            {
                cm1.scene.add(this.Maptile[i][j]);
                cm2.meshes.push(this.Maptile[i][j]);
            }
        }
    }
    


}

export function createMap(dest)
{
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load(dest);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10,10);
    // const meshes = [];
    const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({
            map: floorTexture
        })
    );
    floorMesh.name = 'floor';
    floorMesh.rotation.x = -Math.PI/2;
    floorMesh.receiveShadow = true;
    cm1.scene.add(floorMesh);
    cm2.meshes.push(floorMesh);
}
