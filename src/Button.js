import { Audio } from "./Audio";
import { cm2 } from "./common";
export class Buttons
{
    constructor()
    {
        this.buttonWrapper = document.createElement('div');
        this.buttonlist = [];
        this.buttonNum = 0;
        this.buttonWrapper.addEventListener('click',(e)=>{this.buttonPress(e,this.buttonlist)});
        
        // document.body.append(this.buttonWrapper);
    }
    
    addButton(info)
    {
        this.buttonlist.push(new Button(info));
        this.buttonWrapper.append(this.buttonlist[this.buttonNum].getbutton());
        this.buttonNum++;
        document.body.append(this.buttonWrapper);
    }
    deleteButton()
    {


    }
    //쩔수 없이 하드코딩
    buttonPress(e,buttonlist)
    {
        switch(e.target.dataset.type)
        {
            case buttonlist[0].type:
                setAudio(buttonlist[0]);
                break;
        }
    }
}

class Button
{
    constructor(info)
    {
        this.button = document.createElement(info.btnname);
        this.activate = true;
        
        
        this.type = info.type;
        this.cssText = info.cssText;
        this.innerHTML = info.innerHTML;
        this.imageSrc = info.imageSrc;

        this.button_x = info.button_x;
        this.button_y = info.button_y;

        this.button.id = info.type;
        this.button.dataset.type = this.type;
        this.button.style.cssText = this.cssText;
        this.button.innerHTML = this.innerHTML;
        this.button.src = info.imageSrc;
        this.button.draggable = false;

        window.addEventListener('resize',(e) => setButtonsize(e,this));

        this.button.height = window.innerWidth/this.button_x;
        this.button.width = window.innerWidth/this.button_y;
    }

    gettype()
    {
        return this.type;
    }
    getbutton()
    {
        return this.button;
    }

    // setButtonsize(e,button)
    // {
    //     console.log('h');
    //     button.button.height = window.innerWidth/25;
    //     button.button.width = window.innerWidth/25;
    // }
}

function setButtonsize(e,button)
{
    // console.log('h');
    button.button.height = window.innerWidth/button.button_x;
    button.button.width = window.innerWidth/button.button_y;
}


function setAudio(button)
{
    if(button.activate == false)
    {
        button.activate = true;
        button.imageSrc = './images/sound_on.png';
        document.getElementById('audio').src = button.imageSrc;
        cm2.audio.onAudio();
        // button.button.s
    }
    else
    {
        button.activate = false;
        button.imageSrc = './images/sound_off.png';
        document.getElementById('audio').src = button.imageSrc;
        cm2.audio.offAudio();
    }
    // console.log(button.activate);
}