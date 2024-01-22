
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
                console.log(this.timeCount);
                this.timeCount--; 
            }
            else
            {
                this.stopTimer();
            }
        }

        this.resetTimer = (count)=>
        {
            this.timeCount = count; 
        }

        this.stopTimer = ()=>
        {
            this.timesUp = true;
            gameIsOver = true;
            $("#timer").css("color", "black");
            width <= 430 ? $("#timer").text("Tap Screen to Retry!") : $("#timer").text("Press 'enter' to Retry!");    
            $("body").css("background", "red");
            $("#simon-says-instructions").css("color", "black"); 
            $(".background-simon-says-box").css("background", "black");
            $("#simon-says-instructions").text("Game Over!");
            return;
            
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