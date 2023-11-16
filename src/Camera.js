import * as THREE from 'three';


export function changeCamerapos(camera, pos3 , zoom)
{
    if(camera.isOrthographicCamera)
    {
        camera.position.set(pos3.x,pos3.y,pos3.z);
        camera.zoom = zoom;
    }
    else if(camera.isPerspectiveCamera)
    {
        camera.position.set(pos3.x,pos3.y,pos3.z);
        camera.zoom = zoom;
    }
    camera.updateProjectionMatrix();
}

