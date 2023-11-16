import * as THREE from 'three';
import { cm1 } from "./common";

export class Light
{
    constructor()
    {



    }

    
}

export function createLight()
{
    //흐릿하지만 적어도 보이게 만드는 빛
    const ambientLight = new THREE.AmbientLight('white', 1);
    //직접적으로 내리 쬐는 빛
    const directionalLight = new THREE.DirectionalLight('white', 2);
    directionalLight.position.set(1,1,1);
    directionalLight.castShadow = true;
    
    // mapSize 세팅으로 그림자 퀄리티 설정
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    // 그림자 범위
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.near = -100;
    directionalLight.shadow.camera.far = 100;

    cm1.scene.add(ambientLight);
    cm1.scene.add(directionalLight);

}
