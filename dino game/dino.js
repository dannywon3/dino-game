var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
document.addEventListener("keydown", jump);

//gotta do collision next
// random spawn objects



// this makes obstacles that move to the left
class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }

    update() {
        this.x -= 6;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    collision(x, y, width, height) {
        return (this.x < x + width &&
            this.x + this.width > x &&
            this.y < y + height &&
            this.y + this.height > y)
    }


}


// variables
let x = 30;
let y = 0;
let w = 40;
let h = 40;
let speed = 0;
const g = 1;
framerate = 33
badbois = [];



// update function and jumping
function update() {

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.moveTo(0, 270);
    ctx.lineTo(500, 270);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(x, 230 - y, w, h);
    ctx.stroke();


    //gravity
    y -= speed;
    y = Math.max(y, 0);
    speed += g;

    for (let i of badbois) {
        i.update();
        i.draw(ctx);

        if (i.collision(x, 230 - y, w, h)) {
            stopGame();
        }

    }

};


//jumping
function jump(event) {

    if (event.code == "Space" && y == 0) {
        speed = -11;
    }
};


//magic stuff that aidan taught me
let gameLoop = setInterval(update, framerate);

function stopGame() {
    clearInterval(gameLoop)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function createObstacles() {
    let obH = randomInt(20, 30);
    badbois.push(new Obstacle(c.width, 270 - obH, randomInt(20, 30), obH))
    await sleep(randomInt(1000, 3000));
    console.log("poop");
    createObstacles();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

createObstacles();