let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')


//Declare all golbal variables here
let playerOneMoveUp = false;
let playerOneMoveDown = false;
let playerTwoMoveDown = false;
let playerTwoMoveUp = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneReady = false;
let playerTwoReady = false;

//Player paddle objects
let playerOnePaddle = {
    x: 10,
    y: 300,
    height: 70,
    width: 10
};

let playerTwoPaddle = {
    x: canvas.width - 20,
    y: 300,
    height: 70,
    width: 10
};

//Ball object
let pongBall = {
    x: 400,
    y: 300,
    radius: 5,
    moveX: 1,
    moveY: 0
}

const moveStartDirection = () => {
    pongBall.x = 400;
    pongBall.y = 300;
    var startDirectionX = Math.floor(Math.random() * 2) + 1;
    console.log(startDirectionX);
    if (startDirectionX == 1) {
        pongBall.moveX = -pongBall.moveX;
    }
    var startDirectionY = Math.floor(Math.random() * 2) + 1;
    var startAdjustmentY = Math.floor(Math.random() * 5) + 1;
    //Determines the start angle for Y 
    if (startAdjustmentY == 1) {
        pongBall.moveY = 0.3;
    } else if (startAdjustmentY == 2) {
        pongBall.moveY = 0.6;
    } else if (startAdjustmentY == 3) {
        pongBall.moveY = 0.9;
    } else if (startAdjustmentY == 4) {
        pongBall.moveY = 1.2;
    } else if (startAdjustmentY == 5) {
        pongBall.moveY = 1.5;
    }
    //CURRENTLY UNUSED
    else if (startAdjustmentY == 6) {
        pongBall.moveY = 1.8;
    } else if (startAdjustmentY == 7) {
        pongBall.moveY = 2.1;
    } else if (startAdjustmentY == 8) {
        pongBall.moveY = 2.4;
    }
    //Determine +/-
    if (startDirectionY == 1) {
        pongBall.moveY = -pongBall.moveY;
    }
}

//Draws the Player 1 Paddle at the appropriate position, also contains the movement limiters to stop it going of the screen
const drawPlayerOnePaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerOnePaddle.x, playerOnePaddle.y, playerOnePaddle.width, playerOnePaddle.height);
    ctx.fill();
    ctx.closePath();
    if (playerOneMoveUp == true && playerOnePaddle.y >= 0) {
        playerOnePaddle.y -= 3;
    } else if (playerOneMoveDown == true && playerOnePaddle.y + playerOnePaddle.height <= canvas.height) {
        playerOnePaddle.y += 3;
    }
};
//Draws the Player 2 Paddle at the appropriate position, also contains the movement limiters to stop it going of the screen
const drawPlayerTwoPaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerTwoPaddle.x, playerTwoPaddle.y, playerTwoPaddle.width, playerTwoPaddle.height);
    ctx.fill();
    ctx.closePath();
    if (playerTwoMoveUp == true && playerTwoPaddle.y >= 0) {
        playerTwoPaddle.y -= 3;
    } else if (playerTwoMoveDown == true && playerTwoPaddle.y + playerTwoPaddle.height <= canvas.height) {
        playerTwoPaddle.y += 3;
    }
};

const drawPongBall = () => {
    ctx.beginPath();
    ctx.arc(pongBall.x, pongBall.y, pongBall.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

const movePongBall = () => {
    if (playerOneReady && playerTwoReady) {
        pongBall.x += pongBall.moveX;
        pongBall.y += pongBall.moveY;
    }

}

const pongBallBorderCollisions = () => {
    if (pongBall.y + pongBall.radius <= 0 || pongBall.y + pongBall.radius >= canvas.height) {
        pongBall.moveY = -pongBall.moveY
    }
    //LEFT
    if (pongBall.x + pongBall.radius <= 0) {
        playerTwoScore++;
        setTimeout(moveStartDirection, 1000);
    }
    //RIGHT
    else if (pongBall.x + pongBall.radius >= canvas.width) {
        playerOneScore++;
        setTimeout(moveStartDirection, 1000);
    }
}

const pongBallPlayerOnePaddleCollision = () => {
    if (pongBall.y + pongBall.radius >= playerOnePaddle.y && pongBall.y + pongBall.radius <= playerOnePaddle.y + playerOnePaddle.height && pongBall.x + pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x + pongBall.radius >= playerOnePaddle.x) {
        pongBall.moveX = -pongBall.moveX
    }
}

const pongBallPlayerTwoPaddleCollision = () => {
    if (pongBall.y + pongBall.radius >= playerTwoPaddle.y && pongBall.y + pongBall.radius <= playerTwoPaddle.y + playerTwoPaddle.height && pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x) {
        pongBall.moveX = -pongBall.moveX
        console.log(true)
    }
}

//Key Handlers to move paddles when key are down and stops movemewnt when key is released
const playerKeyDownHandlers = (e) => {
    if (e.keyCode == 87) {
        playerOneMoveUp = true;
    } else if (e.keyCode == 83) {
        playerOneMoveDown = true;
    }
    if (e.keyCode == 38) {
        playerTwoMoveUp = true;
    } else if (e.keyCode == 40) {
        playerTwoMoveDown = true;
    }

    if (e.keyCode == 72) {
        setTimeout(function() {
            playerTwoReady = true;
        }, 2000)
    }
    if (e.keyCode == 71) {
        setTimeout(function() {
            playerOneReady = true;
        }, 2000)
    }
};

const playerKeyUpHandlers = (e) => {
    if (e.keyCode == 87) {
        playerOneMoveUp = false;
    } else if (e.keyCode == 83) {
        playerOneMoveDown = false;
    };
    if (e.keyCode == 38) {
        playerTwoMoveUp = false;
    } else if (e.keyCode == 40) {
        playerTwoMoveDown = false;
    };
};

//Calling our key handlers on our document
document.addEventListener("keydown", playerKeyDownHandlers, false);
document.addEventListener("keyup", playerKeyUpHandlers, false);


//Basic drawGame function and interval, set for change to integrate menus 
const drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pongBallBorderCollisions();
    pongBallPlayerOnePaddleCollision();
    pongBallPlayerTwoPaddleCollision();
    drawPlayerOnePaddle();
    drawPlayerTwoPaddle();
    drawPongBall();
    movePongBall();
}

//CALLING ACTIONS WHEN PAGE IS LOADED

moveStartDirection();
let game = setInterval(drawGame, 10);

document.getElementById('pinkTheme').addEventListener('click', function () {
    $('.main').removeClass('activeTheme')
    $('#pinkTheme').addClass('activeTheme')
    $('body').animate({
        backgroundColor: '#fd79a8'
    }, 2000)
    $('.title').animate({
        opacity: '0'
    }, 1000)
    $('.pongCanvas').animate({
        backgroundColor: '#f8a5c2',
        borderColor: 'white'
    }, 2000)
    $('.net').animate({
        borderLeftColor: 'white'
    })
    setTimeout(function() {
        $('.title').text('PINK PONG')
        $('.title').css('color', '#e84393')
        $('.title').animate({
            opacity: '1'
        }, 1000)
    }, 1000)

})

document.getElementById('kingTheme').addEventListener('click', function () {
    $('.main').removeClass('activeTheme')
    $('#kingTheme').addClass('activeTheme')
    $('body').animate({
        backgroundColor: '#ffb142'
    }, 2000)
    $('.title').animate({
        color: 'black'
    }, 2000)
    $('.title').text('KING PONG')
    $('.pongCanvas').animate({
        backgroundColor: '#2f3542',
        borderColor: '#ffeaa7'
    }, 2000)
    $('.net').animate({
        borderLeftColor: 'white'
    }, 2000)
})


document.getElementById('pondTheme').addEventListener('click', function(){
    $('.main').removeClass('activeTheme')
    $('#pondTheme').addClass('activeTheme')
    $('body').animate({
        backgroundColor: '#22a6b3'
    },2000)
    $('.title').text ('POND PONG')
    $('.pongCanvas').animate({
        backgroundColor: '#78e08f'
    })
})