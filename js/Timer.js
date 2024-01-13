class Timer
{
    constructor()
    {
        this.timeCount = 7; 
        this.timesUp = false; 
        this.runTimer = ()=>
        {
            this.showTimer(); 
            $("#timer").text("Time Remaining: " + this.timeCount);
            if(this.timeCount > 0)
            {
                this.timeCount--; 
            }
            else
            {
                this.stopTimer();
            }
        }

        this.resetTimer = ()=>
        {
            this.timeCount = 7; 
        }

        this.stopTimer = ()=>
        {
            this.timesUp = true; 
        }

        this.hideTimer = ()=>
        {
            $("#timer").hide(); 
            $(".simon-says-instrucion-flex").css({"marginLeft": "0px"});
        }

        this.showTimer = ()=>
        {
            $("#timer").show(); 
            $(".simon-says-instrucion-flex").css({"marginLeft": "100px"});
        }
    }
}