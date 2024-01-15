
class Timer
{
    constructor()
    {
        this.timeCount = 10; 
        this.timesUp = false; 
        this.runTimer = ()=>
        {
            this.showTimer(); 
            $("#timer").text("Time Remaining: " + this.timeCount);
            if(this.timeCount >= 0 && !outOfOrder)
            {
                this.timeCount--; 
            }
            else
            {
                this.stopTimer();
                this.hideTimer(); 
                $("#simon-says-instructions").text("Game Over!");
            }
        }

        this.resetTimer = ()=>
        {
            this.timeCount = 10; 
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