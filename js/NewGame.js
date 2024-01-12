class NewGame
{
    constructor()
    {
       this.level = 1; 
       this.AllColors = [$("#green-box"), $("#yellow-box"), $("#red-box"), $("#pink-box")];
       this.startColor = (Math.floor(Math.random() * 4));
       this.previousLength = 0; 
       this.newColor = 0; 
       this.colorBuffer = [this.startColor];
       this.running = false;
       this.reroll = function()
       {
           this.newColor = (Math.floor(Math.random() * 4));
           return this.newColor; 
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
               $("#simon-says-instructions").text("level "+ this.level);
               this.AllColors[2].addClass("the-flash");    
        }    
    }
}