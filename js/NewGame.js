class NewGame
{
    constructor()
    {
       this.level = 1; 
       this.colors = $(".simon-says-box");
       this.allColors = [$("#green-box"), $("#yellow-box"), $("#red-box"), $("#pink-box")];
       this.startColor = (Math.floor(Math.random() * 4));
       this.previousLength = 0; 
       this.newColor = 0; 
       this.colorBuffer = [this.startColor];
       this.running = false;
       this.reroll = function()
       {
           var theNewColor = (Math.floor(Math.random() * 4));
           return theNewColor; 
       }
       this.round = function ()
       {
            this.allColors[this.newColor].toggleClass("the-flash");
       }

       this.levelUp = function ()
       {
            this.level+=1; 
       }

       this.begin = function ()
       {
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
            
            while(this.running)
            {
                for(var i = 0; i < 4; i++)
                {   
                    $("#simon-says-instructions").text("level " + this.level);
                    for(var x = 0; x < this.colorBuffer.length; x++)
                    {
                       this.newColor = this.reroll();
                       setTimeout(this.round(),"3000")
                    }
                    
                     this.colorBuffer.push(this.newColor); 
                     
                     this.levelUp();
                }  
                this.running = false;  
            }

            
        }    
    }
}