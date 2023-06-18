
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
            this.y = 0;
        }
        draw(context){
            context.fillStyle = "white";
            context.fillRect(this.x, this.y, this.width, this.height);
        }


    }

    class Background {


    }

    class Trash {

    
    }

    function handleTrash(){


    }

    function displayStatusText(){


    }

    const input = new inputHandler();

    function animate(){


    }
});