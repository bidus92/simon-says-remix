class NewGame
{
    constructor()
    {
        this.level = 1; 
        this.colors = $(".simon-says-box");
        this.startColor = (Math.floor(Math.random() * 4));
        this.newColor = 0; 
        this.colorBuffer = [];
        this.reroll = ()=>
        {
            this.newColor = (Math.floor(Math.random() * 4));
            return this.newColor; 
        }
        
        this.gameInMotion = false;
        this.begin = ()=>
        {
            this.colorBuffer.push(this.startColor);

            $("#simon-says-instructions").text("3");
        
            setTimeout(()=>
            {
            $("#simon-says-instructions").text("2");
            },"1000");

            setTimeout(()=>
            {
            $("#simon-says-instructions").text("1");
            },"2000");

            setTimeout(()=>
            {
               this.run();
            },"3000");
        
        }

        this.run = ()=>
        {  
            $("#simon-says-instructions").text("Level " + this.level);
            $(this.colors[0]).addClass("flash");
         
        }   
    }
}