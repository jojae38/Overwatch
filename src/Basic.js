import { cm1,cm2 } from "./common";

export class Basic {
    constructor()
    {
    }

    basicInit()
    {
        window.addEventListener('resize', setSize);
    }
}

export function setSize() {
    cm1.camera.left = -(window.innerWidth / window.innerHeight);
    cm1.camera.right = window.innerWidth / window.innerHeight;
    cm1.camera.top = 1;
    cm1.camera.bottom = -1;

    cm1.camera.updateProjectionMatrix();
    cm2.renderer.setSize(window.innerWidth, window.innerHeight);
    cm2.renderer.render(cm1.scene, cm1.camera);
}
