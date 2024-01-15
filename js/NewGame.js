function TheColor(color) 
{
    this.color  = color; //color being highlighted
    this.boxClicked = false; //bool to activate/deactivate animation
    this.clickCount = 0; //used to track nmber of clicks

    //function that plays out if click event took place 
    this.boxClickAnimation = ()=>
    {
        this.color.addClass("the-press");
        setTimeout(()=>
        {
            this.color.removeClass("the-press");  
        }, "50");   
         
    }

    this.activateAnimation = ()=>
    {
        this.color.on("click", this.boxClickAnimation)
    }
}


class NewGame
{
    constructor()
    {
       //intervalIDs
       this.levelIntervalID; 
       this.levelUpIntervalID; 
       this.mainGameLoopIntervalID; 
       this.levelShown = false; 
       this.levelWon = true; //Bool to determine level win
       this.timer = new Timer(); 
       this.level = 1; 
       this.colors = $(".simon-says-box");
       this.allColors = [new TheColor($("#green-box")), new TheColor($("#yellow-box")), new TheColor($("#red-box")), new TheColor($("#pink-box"))];
       this.startColor = Math.floor(Math.random() * 4);
       this.newColor = 0; 
       this.colorIndex = 0; 
       this.colorBuffer = [this.startColor];
       this.running = false;

       this.reroll = function()
       {
           var theNewColor = Math.floor(Math.random() * 4);
           return theNewColor; 
       }
       

        this.boxClicked = (x)=>
        {
            this.allColors[x].boxClicked = true; 
            this.allColors[x].clickCount++; 
            console.log(this.allColors[x].color + "has been clicked " + this.allColors[x].clickCount + " times.");
        }

        //sets bools to false
        this.resetBoxClicks = ()=>
        {
            for(var x = 0; x < this.allColors.length; x++)
            {
                this.allColors[x].boxClicked = false; 
            }
        }
       
       
       //the indicator of what to press
       this.flash = function(x)
       {
            this.allColors[this.colorBuffer[x]].color.addClass("the-flash");
            setTimeout(()=>
            {
                this.allColors[this.colorBuffer[x]].color.removeClass("the-flash");  
            }, "500");
       }
       
       //the level logic
       this.theLevel = function (x)
       {
            if(x < this.colorBuffer.length)
            {
                this.flash(x);
                this.colorIndex++; 
            }
            else
            {
                this.colorIndex = 0;
                this.levelShown = true;
            }  
        } 
        
       //Did the player win? 
       this.verdict = ()=>
       {
         this.levelUpIntervalID = setInterval(()=>
         {
            if(!this.timer.timesUp && this.levelWon)
            {
                this.levelUp();
                this.newColor = this.reroll()
                this.colorBuffer.push(this.newColor)
                this.colorIndex = 0; 
                this.timer.resetTimer();  
                this.levelShown = false;
            }
            else
            {
                this.running = false; 
                clearInterval(this.levelUpIntervalID); 
                clearInterval(this.mainGameLoopIntervalID); 
            }     
         }, "10000")           
       }

       this.levelUp = ()=>
       {
         this.level++; 
       }
       
       //main game loop
       this.mainGameLoop = function ()
       { 
            this.mainGameLoopIntervalID = setInterval(()=>
            {
                    $("#simon-says-instructions").text("level " + this.level);
                    if(!this.levelShown)
                    {
                        this.theLevel(this.colorIndex);
                    }
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
                for(var x = 0; x < this.allColors.length; x++)
                {
                    this.allColors[x].activateAnimation();
                }
                this.verdict(); 
            }
            else
            {
                alert("Game Over");
            }
            
        }
    }
}