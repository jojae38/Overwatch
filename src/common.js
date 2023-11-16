import { Scene,Raycaster,Camera,TextureLoader } from 'three';
import { World} from'cannon-es';
import { Loader } from './Loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// import { World, Material} from 'cannon-es';

export const cm1 = 
{
    camera: new Camera(),
    scene: new Scene(),
    gltfLoader: new GLTFLoader(),
    raycaster : new Raycaster(),
    World: new World(),
    Loader: new Loader(),
    TexLoader: new TextureLoader(),
}

export const cm2 =
{
    meshes: [],
    // loader: new Loader(),
    renderer: undefined,
    audio: undefined,
    herovoice : undefined,
    impactsound : undefined,
}