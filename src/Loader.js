
export class Loader
{
    constructor()
    {
        this.loadlist = [];
        this.loadnum = 0;
        this.addComplete = false;        
    }

    addLoad(name)
    {
        this.loadlist.push({
            name: name,
            state: false,
        });
        // console.log(this.loadlist);
        this.loadnum++;
        return this.loadnum-1
    }

    addLoadComplete()
    {
        this.addComplete = true;
    }

    EndLoad(loadnum)
    {
        this.loadlist[loadnum].state = true;
        // console.log(this.loadlist);
    }

    loading()
    {

    }

    loadingComplete()
    {

    }
}