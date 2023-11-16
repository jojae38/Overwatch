export class Timer
{
    constructor(duration)
    {
        this.startTime = Date.now();
        this.duration = duration;
        this.endTime = this.startTime + this.duration;
        this.paused = false;
        this.elapsedTime = 0;
    }

    start(){
        if(this.paused)
        {
            this.startTime = Date.now() - this.elapsedTime;
            this.endTime = this.startTime + this.duration;
            this.paused = false;
        }
    }

    pause(){
        if(!this.paused)
        {
            this.elapsedTime = Date.now() - this.startTime;
            this.paused = true;
        }
    }

    isOver(){
        return Date.now() > this.endTime;
    }

    reset(){
        this.startTime = Date.now();
        this.endTime = this.startTime + this.duration;
        this.elapsedTime = 0;
        this.paused = false;
    }

    getEleapsedTime(){
        if(this.paused)
        {
            return this.elapsedTime;
        }
        else{
            return Date.now() - this.startTime;
        }
    }

    get TimerState()
    {
        return this.over;
    }

}