var theClicks = 1; //global variable to track click counter (which will also track order count in effect)
var outOfOrder = false; //global outOfOrder variable


function TheColor(color, colorIndex) 
{
    this.colorIndex = colorIndex; 
    this.color  = color; //color being highlighted
    this.order = []; //tracks real order of the squares to hit
    this.orderClicked = []; //tracks the actual order of boxes clicked
    this.assignSound = (colorIndex)=>
    {
        switch(colorIndex)
        { 
            case 0:
                this.audio = new Audio("../assets/sounds/green.mp3");
                return this.audio; 
            case 1:
                this.audio = new Audio("../assets/sounds/yellow.mp3");
                return this.audio; 
            case 2:
                this.audio = new Audio("../assets/sounds/red.mp3");
                return this.audio; 
            case 3:
                this.audio = new Audio("../assets/sounds/pink.mp3");
                return this.audio; 
            default: 
                console.log("Ayeee so you code to huh?");
            break;
        }
    };
    this.audio = this.assignSound(this.colorIndex); 
    this.playSound = ()=>
    { 
           this.audio.play();   
    };

    this.trackTheClicks = ()=>
    { 
      if(!outOfOrder)
      {
        console.log("There are currently " + theClicks + " clicks");
        this.orderClicked.push(theClicks);
        setTimeout(()=>
        {
            theClicks++;
        }, "25");
        
        console.log("Clicks incremented to " + theClicks + " clicks");
        setTimeout(()=>
        {
            this.checkTheClick(); 
        }, "50");
        
      }
       
    }


    this.checkTheClick = ()=>
    {
        for(var x = 0; x < this.orderClicked.length; x++)
        {
            if(this.orderClicked[x] != this.order[x] && !outOfOrder)
            {
                console.log("Order Clicked is " + this.orderClicked[x] + " and the order is " + this.order[x]);
                this.audio = new Audio("../assets/sounds/wrong.mp3");
                this.playSound();
                outOfOrder = true; 
                console.log("THIS IS OUT OF ORDER!");
                break; 
            }
        }
    }
    this.resetClicks = ()=>
    {
        this.orderClicked = [];
        console.log("There are order clicked is reset " + this.orderClicked);
        return this.orderClicked;
    }

    

    //function that plays out if click event took place 
    this.boxClick = ()=>
    {
        if(!outOfOrder)
        {
            this.color.addClass("the-press");
            this.playSound();
            setTimeout(()=>
            {
                this.color.removeClass("the-press");  
            }, "50");   
        }
    }

    this.activateAnimation = ()=>
    {
        this.color.on("click", this.trackTheClicks);
        this.color.on("click", this.boxClick);
    }
}

class NewGame
{
    constructor()
    {
       //variables!
       this.levelIntervalID; 
       this.levelUpIntervalID; 
       this.mainGameLoopIntervalID; 
       this.levelShown = false; 
       this.levelWon = true; //Bool to determine level win
       this.timer = new Timer(); 
       this.level = 1; 
       this.colors = $(".simon-says-box");
       this.allColors = [new TheColor($("#green-box"), 0), new TheColor($("#yellow-box"), 1), new TheColor($("#red-box"), 2), new TheColor($("#pink-box"), 3)];
       this.startColor = Math.floor(Math.random() * 4);
       this.newColor = 0; 
       this.colorIndex = 0; 
       this.colorBuffer = [this.startColor];
       this.running = false;


       //functions!!
       //when game over takes place
       this.gameOver = ()=>
       {
            $("#simon-says-instructions").text("Game Over!");
            this.running = false; 
            clearInterval(this.levelUpIntervalID); 
            clearInterval(this.mainGameLoopIntervalID); 
       }
       this.reroll = function()
       {
           var theNewColor = Math.floor(Math.random() * 4);
           return theNewColor; 
       }
       
        //adds numerical click order of boxes: logic should be if click count doesn't match, we donezo
        this.setBoxOrder = (x)=>
        {
            if(!this.allColors[this.colorBuffer[x]].order.includes(x + 1))
            {
                this.allColors[this.colorBuffer[x]].order.push(x + 1); 
            }
        }


//track clicks through boolean, and if the bool is true, 
//then that click index is added to order clicked. If the order clicked and order don't match...game over SON!
       
       
       //the indicator of what to press
       this.flash = function(x)
       {
            this.setBoxOrder(x);
            this.allColors[this.colorBuffer[x]].color.addClass("the-flash");
            setTimeout(()=>
            {
                this.allColors[this.colorBuffer[x]].color.removeClass("the-flash");  
            }, "100");
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

        this.resetTheClicks = ()=>
        {
            theClicks = 1; 
            return theClicks; 
        }
        
       //Did the player win? 
       this.verdict = ()=>
       {
         this.levelUpIntervalID = setInterval(()=>
         {
            if(!outOfOrder && !this.timer.timesUp && this.levelWon)
            {
                this.levelUp(); 
            }
            else
            {
                this.gameOver(); 
                
            }     
         }, "10000")           
       }

       this.levelUp = ()=>
       {
            for(var x = 0; x < this.allColors.length; x++)
            {
                this.allColors[x].resetClicks(); 
            } 
            theClicks = this.resetTheClicks();
            this.newColor = this.reroll()
            this.colorBuffer.push(this.newColor)
            this.level++;
            this.colorIndex = 0; 
            this.timer.resetTimer();  
            this.levelShown = false;
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
                    if(outOfOrder)
                    {
                        this.gameOver(); 
                        break;
                    }
                }
                    this.verdict();       
            }
        }
    }
}