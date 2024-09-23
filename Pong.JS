let score = 0;
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, canvas.width - 100, 20);
}


const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Spel variabelen
let paddleHeight = 100, paddleWidth = 10;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2, dy = -2;
let paddleY = (canvas.height - paddleHeight) / 2;
let speedMultiplier = 1.02; // Zorgt ervoor dat de trip sterker wordt
let tripFactor = 0; // Hoe ver in de trip we zijn

// Invoer via toetsenbord
let upPressed = false;
let downPressed = false;

// Luisteren naar toetsgebeurtenissen
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "ArrowDown") {
        downPressed = false;
    }
}

// De paddle tekenen
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "rgba(0, 255, 255, 0.8)"; // Lichtblauwe paddle met transparantie
    ctx.shadowBlur = 20;
    ctx.shadowColor = "cyan";
    ctx.fill();
    ctx.closePath();
}

// De bal tekenen
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 165, 0, 0.9)"; // Oranje bal
    ctx.shadowBlur = 20;
    ctx.shadowColor = "orange";
    ctx.fill();
    ctx.closePath();
}


// Beweeg de bal
function moveBall() {
    x += dx;
    y += dy;

    // Stuiteren tegen boven- en onderrand
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
        dx *= speedMultiplier;
        dy *= speedMultiplier;
    }

    // Stuiteren tegen de paddle of rechterrand
    if (x + dx < ballRadius) {
        if (y > paddleY && y < paddleY + paddleHeight) {
            dx = -dx * speedMultiplier;
            tripFactor += 0.05; // De trip wordt sterker
        } else {
            resetBall(); // Bal resetten als de paddle wordt gemist
        }
    }

    if (x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
}

// De achtergrond tekenen met steeds intensere effecten
function drawBackground() {
    ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Paddles bewegen
function movePaddle() {
    if (upPressed && paddleY > 0) {
        paddleY -= 7;
    } else if (downPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 7;
    }
}

// Bal resetten na gemiste paddle
function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2 + tripFactor;
    dy = -2 - tripFactor;
    score--;  // Verlaag de score als de bal gemist wordt
}


// Het spel animeren en de trip versterken
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawPaddle();
    drawBall();
    drawScore();  // Score weergeven
    moveBall();
    movePaddle();

    canvas.style.transform = `rotate(${Math.random() * tripFactor}deg)`;

    requestAnimationFrame(gameLoop);
}

// Spel starten
gameLoop();
