class NewGame
{
    constructor()
    {
       //intervalIDs
       this.levelIntervalID; 
       this.levelUpIntervalID; 
       this.mainGameLoopIntervalID; 
       this.levelWon = true; //Bool to determine level win
       this.timer = new Timer(); 
       this.level = 1; 
       this.colors = $(".simon-says-box");
       this.allColors = [$("#green-box"), $("#yellow-box"), $("#red-box"), $("#pink-box")];
       this.startColor = (Math.floor(Math.random() * 4));
       this.newColor = 0; 
       this.colorIndex = 0; 
       this.colorBuffer = [this.startColor, 2];
       this.running = false;

       this.reroll = function()
       {
           var theNewColor = (Math.floor(Math.random() * 4));
           return theNewColor; 
       }
       this.checkForWin = function()
       {
           this.levelWon = true; 
       }



       this.theLevel = function (x)
       {
            this.allColors[x].addClass("the-flash");     
       }    
        

       this.verdict = ()=>
       {
         this.levelUpIntervalID = setInterval(()=>
         {
            if(!this.timer.timesUp && this.levelWon)
            {
                this.levelUp();
                this.newColor = this.reroll()
                this.colorBuffer.push(this.newColor)
                this.colorIndex++; 
                this.timer.resetTimer();  
            }
            else
            {
                this.running = false; 
                clearInterval(this.levelUpIntervalID); 
                clearInterval(this.mainGameLoopIntervalID); 
            }     
         }, "7000")           
       }

       this.levelUp = ()=>
       {
         this.level++; 
       }
       
       //level incrememt logic
       this.mainGameLoop = function ()
       { 
            this.mainGameLoopIntervalID = setInterval(()=>
            {
                    $("#simon-says-instructions").text("level " + this.level);
                    this.theLevel(this.colorIndex);
                    this.timer.runTimer();
                    //set timeout for timer count
            }, "1000");   
       }
    
       this.begin = function ()
       {
           this.timer.hideTimer(); 
           $("#simon-says-instructions").css({"fontSize": "3rem"});
           $("#simon-says-instructions").text("3");
           this.running = true;

           setTimeout(function ()
           {
               $("#simon-says-instructions").text("2");
           }, "1000");
           setTimeout(function ()
           { 
               $("#simon-says-instructions").text("1");
           },"2000");
        }
        
        this.run = function ()
        {
            if(this.running)
            {
                this.mainGameLoop(); 
                this.verdict(); 
            }
            else
            {
                alert("Game Over");
            }
            
        }
    }
}