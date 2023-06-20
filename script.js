
//trash icons shold be stored as an array and should be selected with math.random floor//
//mr. trash wheel will move up with up arrow and down with down arrow//
//trash will be generated and will move from right to left, the speed of which determined by the player's score//
//when trash intersects with mr. trash wheel, trash will disappear, points will increase//
//when trash intersects with the left side of the page, the trash disappears and the trash missed counter increases//
//when trash missed = 5, player loses//
//when score = 20, player wins//

window.addEventListener("load", function(){
    const canvas = document.getElementById("playspace");
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;

    class inputHandler{
        constructor(){
            this.keys = [];
            window.addEventListener("keydown", s => {
                if ((
                    s.key === "ArrowDown" || 
                    s.key === "ArrowUp" || 
                    s.key === "ArrowLeft" || 
                    s.key === "ArrowRight")
                
                && this.keys.indexOf(s.key) === -1){
                    this.keys.push(s.key);
                }
            });
            window.addEventListener("keyup", s => {
                if (s.key === "ArrowDown" ||
                    s.key === "ArrowUp" ||
                    s.key === "ArrowLeft" ||
                    s.key === "ArrowRight"){
                    this.keys.splice(this.keys.indexOf(s.key), 1);
                }
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById("trashWheel")
            this.speed = 0;
        }
        draw(context){
            context.fillStyle = "white";
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
        update(input){
            this.x += this.speed;
            if (input.keys.indexOf("ArrowRight") > -1){
                this.speed = 5;
            } else if (input.keys.indexOf("ArrowLeft") > -1){
                this.speed = -5;
            }
            else {
                this.speed = 0;
            }

            this.y += this.speed;
            if (input.keys.indexOf("ArrowUp") > -1){
                this.speed = 5;
            } else if (input.keys.indexOf("ArrowDown") > -1){
                this.speed = -5;
            }
            
            else {
                this.speed = 0;
            }
            
            
            //horizontal movement 
            
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            //vertical movement
            
            if (this.y < 0) this.y = 0;
            else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }


    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById("backgroundImage")
            this.x = 0;
            this.y = 0; 
            this.width = 2400;
            this.height = 720;
            this.speed = 20;
        
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }


    }

    class Trash {
        constructor(gameWidth, gameHeight){
            this.gamewidth = this.gamewidth;
            this.gameHeight = this.gameheight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementsByClassName('trash');
            this.x = 0;
            this.y = 0;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

    
    }

    function handleTrash(){


    }

    function displayStatusText(){


    }

    const input = new inputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const trash1 = new Trash(canvas.width, canvas.height);


    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        background.draw(ctx)
        //background.update();
        player.draw(ctx)
        player.update(input);
        trash1.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});