window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let trashies = [];
    let missedTrash = 0;
    let score = 0;
    let gameOver = false
    
    class InputHandler {
            constructor(){
                this.keys = [];
                window.addEventListener("keydown", k => {
                    if (k.key === "ArrowDown" ||
                        k.key === 'ArrowUp'
                    
                    && this.keys.indexOf(k.key) === -1){
                        this.keys.push(k.key);
                    }
                window.addEventListener("keyup", k => {
                    if (k.key === 'ArrowDown' ||
                        k.key === 'ArrowUp'){
                        this.keys.splice(this.keys.indexOf(k.key), 1);
                    }
    
                })
                    
                    
                })
            }
    
    
    }
    
    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 20
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage')
            this.speed = 0;
        }
        draw(context){
            
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        udpate(input, deltaTime, trashies){
            // collision detection
            trashies.forEach(Trash => {
                const dx = Trash.x - this.x
                const dy = Trash.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < Trash.width/2 + this.width/2){
                    score++;
    
                }
    
    
            });
            //vertical movement
            this.y -= this.speed;
            if (input.keys.indexOf('ArrowUp') > -1){
                this.speed = 5;
            } else if(input.keys.indexOf('ArrowDown') > -1){
                this.speed = -5
            }else {
                this.speed = 0;
            }
            if(this.y < 0) this.y = 0;
            else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
    
    
    }
    
    class Background { 
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 3;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    
        }
        update(){
            this.x -= this.speed;
            if(this.x < 0 - this.width) this.x = 0;
        }
    
    }
    
    class Trash {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 32;
            this.height = 32;
            this.image = document.getElementById('trash');
            this.x = gameWidth;
            this.y = Math.random()*gameHeight - this.height - 30;
            this.speed = 2;
            this.speed = this.speed + Math.random()*2;
            this.markedForDeletion = false; 
        }
        draw(context){
            
            context.drawImage(this.image, this.x, this.y);
        }
        update(){
            this.x -= this.speed ;
            //this is how to mark trash not picked up!
            if (this.x < 0 - this.width){
                this.markedForDeletion = true
                missedTrash++;
            }
            if (missedTrash > 10){
                gameOver = true;
            }
        }
    
    }
    
    trashies.push(new Trash(canvas.width, canvas.height));
    
    function handleTrash(deltaTime) {
        if (trashTimer > trashInterval){
            trashies.push(new Trash(canvas.width, canvas.height));
            trashTimer = 0;
        } else {
            trashTimer += deltaTime;
        }
       
        trashies.forEach(trash => {
            trash.draw(ctx);
            trash.update();
        });
        trashies = trashies.filter(trashies => !trashies.markedForDeletion);
    
    }
    
    function displayScoreText(context){
        context.fillystyle = 'black';
        canvas.font = '80px Helvetica';
        context.fillText('Score: ' + score, 20, 50)
    }
    
    function displayMissedText(context){
        context.fillstyle = 'black';
        canvas.font = '80px Helvetica';
        context.fillText('Missed: ' + missedTrash, 20, 100)
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText("Game Over, better luck next time!", canvas.width/2, 100);
        }
    }
    
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const trash1 = new Trash(canvas.width, canvas.height);
    
    let lastTime = 0;
    let trashTimer = 0;
    let trashInterval = 2000;
    let randomTrashInterval = Math.random()*1000 + 750;
    
    function animate(timeStamp){
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.udpate(input, deltaTime, trashies);
        handleTrash(deltaTime);
        displayScoreText(ctx);
        displayMissedText(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
    
    });