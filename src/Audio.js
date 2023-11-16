import { cm1 } from "./common";
import * as THREE from 'three';

export class Audio{
    constructor()
    {
        this.listener = new THREE.AudioListener();
        this.audioList = [];
        this.audioNum = 0;

        this.onNum = 0;
        cm1.camera.add(this.listener);
        this.sound = new THREE.Audio(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        // console.log(this.sound);
        //this.audioList.push('/sounds/Overwatch.mp3');
        this.audioNum++;
        this.settingvolume = 0.025;
        this.volume = 0.05;
    }

    playAudio(src,loop,volume,func)
    {
        const tmpsound = this.sound;
        const tmpvolume = volume;
        this.src = src;
        this.audioLoader.load( src, function( buffer ) {
            tmpsound.setBuffer( buffer );
            tmpsound.setLoop( loop );
            tmpsound.setVolume( tmpvolume );
            tmpsound.onEnded(func);
            tmpsound.play();
        });
        
        // console.log(src);
    }

    // checkAudio()
    // {
    //     this.audioLoader.onEnded(console.log('aa'));
    // }

    offAudio()
    {
        const tmpsound = this.sound;
        this.audioLoader.load( this.src, function( buffer ) {
            tmpsound.setBuffer( buffer );
            tmpsound.setLoop( true );
            tmpsound.setVolume( 0 );
            // tmpsound.play();
        });
    }

    onAudio()
    {
        const tmpsound = this.sound;
        const tmpvolume = this.volume;
        this.audioLoader.load( this.src, function( buffer ) {
            tmpsound.setBuffer( buffer );
            tmpsound.setLoop( true );
            tmpsound.setVolume( tmpvolume );
            // tmpsound.play();
        });
    }

}