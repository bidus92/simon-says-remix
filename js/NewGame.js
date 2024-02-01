var theClicks = 1; //global variable to track click counter (which will also track order count in effect)
var outOfOrder = false; //global outOfOrder variable
var gameIsOver = false; 
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
                this.audio = new Audio("./assets/sounds/green.mp3");
                return this.audio; 
            case 1:
                this.audio = new Audio("./assets/sounds/yellow.mp3");
                return this.audio; 
            case 2:
                this.audio = new Audio("./assets/sounds/red.mp3");
                return this.audio; 
            case 3:
                this.audio = new Audio("./assets/sounds/pink.mp3");
                return this.audio; 
            default: 
                console.log("Ayeee so you code to huh?");
            break;
        }
    };
    this.audio = this.assignSound(this.colorIndex); 


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
                this.audio.play();
                $("body").css("background", "red");
                $("#timer").show(); 
                $("#timer").css("color", "black"); 
                width <= 430 ? $("#timer").text("Tap Screen to Retry!") : $("#timer").text("Press 'enter' to Retry!"); 
                $("#simon-says-instructions").text("Game Over!"); 
                $("#simon-says-instructions").css("color", "black"); 
                $(".background-simon-says-box").css("background", "black");            
                outOfOrder = true; 
                gameIsOver = true;
                console.log("THIS IS OUT OF ORDER!");
                break; 
            }
            else
            {
                console.log("The order clicked is " + this.orderClicked[x] + " and the order is " + this.order[x])
            }
            
        }
    }
    this.resetClicks = ()=>
    {
        this.orderClicked = [];
        console.log("The order clicked is reset ");
        return this.orderClicked;
    }

    this.resetOrder = ()=>
    {
        this.order = []; 
        console.log("The order is reset ");
        return this.order; 
    }


    //function that plays out if click event took place 
    this.boxClick = ()=>
    {
        if(!outOfOrder)
        {
            this.color.addClass("the-press");
            this.audio.play();
            setTimeout(()=>
            {
                this.color.removeClass("the-press");  
            }, "50");   
        }
    }

    this.deactivateAnimation = ()=>
    {
        this.color.off("click", this.trackTheClicks);
        this.color.off("click", this.boxClick);
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
       this.timer = new Timer(); 
       this.level = 1; 
       this.colors = $(".simon-says-box");
       this.allColors = [new TheColor($("#green-box"), 0), new TheColor($("#yellow-box"), 1), new TheColor($("#red-box"), 2), new TheColor($("#pink-box"), 3)];
       this.startColor = Math.floor(Math.random() * 4);
       this.newColor = 0; 
       this.colorIndex = 0; 
       this.colorBuffer = [this.startColor];
       this.running = false;
       this.newDifficulty = true; 
       //functions!!
       this.resetColorBuffer = ()=>
       {
           this.colorBuffer = [];
           console.log("Color Buffer Reset")
           return this.colorBuffer; 
       }

       this.resetGame = ()=>
       {
            if(gameIsOver)
            {
                for(var x = 0; x < this.allColors.length; x++)
                {
                    this.allColors[x].resetClicks();
                    this.allColors[x].resetOrder(); 
                }
                gameIsOver = false; 
                outOfOrder = false;
                theClicks = this.resetTheClicks(); 
                
                this.levelShown = false; 
                this.level = 1; 
                
                this.timer.timesUp = false; 
                this.timer.resetTimer(10);

                this.startColor = this.reroll(); 
                this.colorBuffer = this.resetColorBuffer(); 
                this.colorBuffer.push(this.startColor);
                this.colorIndex = 0; 


                $("#timer").css("color", "white");
                $("body").css("background", "blue");
                $("#simon-says-instructions").css("color", "white"); 
                $(".background-simon-says-box").css("background", "white");
            }
       }

       //when game over takes place
       this.gameOver = ()=>
       { 
            this.timer.stopTimer(); 
            this.running = false; 
            gameIsOver = true;
            clearInterval(this.levelUpIntervalID); 
            console.log("game over run");
       }
       this.reroll = ()=>
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
                console.log("the order that has been pushed is pushed to " + this.allColors[(this.colorBuffer[x])]);
            }
        }


        this.levelWon = ()=>
        {
            if(theClicks > this.level && !outOfOrder)
            {
                this.levelUp(); 
            }
        }
            
        //the indicator of what to press
        this.flash = function(x)
        {
            if(!outOfOrder)
            {
                this.setBoxOrder(x);
                this.allColors[this.colorBuffer[x]].color.addClass("the-flash");
                setTimeout(()=>
                {
                    this.allColors[this.colorBuffer[x]].color.removeClass("the-flash");  
                }, "500");
            }
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
        

       this.levelUp = ()=>
       {
            if(this.level >= 8 && this.newDifficulty)
            { 
                 this.enterNewDifficulty();
            }
            else if(this.level >= 8 && !this.newDifficulty)
            {
                this.timer.resetTimer(15);
            }
            else
            {
                this.timer.resetTimer(10);
            }
            for(var x = 0; x < this.allColors.length; x++)
            {
                this.allColors[x].resetClicks(); 
            } 
            theClicks = this.resetTheClicks();
            this.newColor = this.reroll()
            this.colorBuffer.push(this.newColor)
            this.level++;
            this.colorIndex = 0;  
            this.levelShown = false;
       }

       this.enterNewDifficulty = ()=>
       {
                this.timer.resetTimer(15); 
                this.newDifficulty = false; 
       }
       
       //main game loop
       this.mainGameLoop = function ()
       { 
            this.mainGameLoopIntervalID = setInterval(()=>
            {
                    
                    if(!outOfOrder && !this.timer.timesUp)
                    {
                        $("#simon-says-instructions").text("Level " + this.level);
                    }
                    else
                    {
                        for(var x = 0; x < this.allColors.length; x++)
                        {
                            this.allColors[x].deactivateAnimation(); 
                        } 
                        console.log("animations deactivated");
                        this.gameOver(); 
                        clearInterval(this.mainGameLoopIntervalID);
                        return;
                    }
                    if(!this.levelShown)
                    { 
                        this.timer.hideTimer(); 
                        this.theLevel(this.colorIndex);
                    }
                    else
                    {
                        this.timer.runTimer();
                        this.levelWon();
                    }
                    //set timeout for timer count
            }, "1000");   
       }
    
       this.begin = function ()
       {
           this.resetGame(); 
           this.running = true;
           this.timer.hideTimer(); 
           $("#simon-says-instructions").css({"fontSize": "3rem"});
           $("#simon-says-instructions").text("3");

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
            for(var x = 0; x < this.allColors.length; x++)
            {
                this.allColors[x].activateAnimation();
                console.log("Reached this point");    
            }

            if(this.running)
            {
                this.mainGameLoop(); 
            }
        }
    }
}