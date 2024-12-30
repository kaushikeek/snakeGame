let direction = { x: 0, y: 0 };
const gameStartSound = new Audio("start.mp3");
const foodSound = new Audio("hiss.mp3");
const gameOverSound = new Audio("over.mp3");
const musicSound = new Audio("bgm.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 10 };
let hiscoreval = 0;
let game = document.getElementById("game");
let highScore = document.getElementById("highScore");

// functions
function main(ctime) {
	window.requestAnimationFrame(main);
	//console.log(ctime);
	if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
		return;
	}
	lastPaintTime = ctime;
	gameEngine();
}

function isCollide(Arr) {
	//bump in itself
	for (let index = 1; index < Arr.length; index++) {
		if (Arr[index].x === Arr[0].x && Arr[index].y === Arr[0].y) {
			return true;
		}
	}

	//collides with wall
	if (Arr[0].x >= 18 || Arr[0].x <= 0 || Arr[0].y >= 18 || Arr[0].y <= 0) {
		return true;
	}
}

function gameEngine() {
	//when snake collides
	if (isCollide(snakeArr)) {
		gameOverSound.play();
		musicSound.pause();
		inputDir = { x: 0, y: 0 };
		alert("Game Over. Press any key to play once more!");
		snakeArr = [{ x: 13, y: 15 }];
		score = 0;
	}

	//when snake eats the food (score is incremented and food is regenerated)
	if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
		score += 1;
		scoreBox.innerHTML = "Score: " + score;
		foodSound.play();
		snakeArr.unshift({
			x: snakeArr[0].x + snakeDir.x,
			y: snakeArr[0].y + snakeDir.y,
		});
		let a = 2;
		let b = 16;
		food = {
			x: Math.round(a + (b - a) * Math.random()),
			y: Math.round(a + (b - a) * Math.random()),
		};
	}

	//Movement of Snake
	for (let i = snakeArr.length - 2; i >= 0; i--) {
		snakeArr[i + 1] = { ...snakeArr[i] };
	}

	snakeArr[0].x += snakeDir.x;
	snakeArr[0].y += snakeDir.y;

	//Snake
	game.innerHTML = " ";

	snakeArr.forEach((e, index) => {
		let snakeElement = document.createElement("div");
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;

		if (index === 0) {
			snakeElement.classList.add("head");
		} else {
			snakeElement.classList.add("snake");
		}
		game.appendChild(snakeElement);
	});

	//Food
	let foodElement = document.createElement("div");
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add("food");
	game.appendChild(foodElement);
}

// main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
	musicSound.play();
	snakeDir = { x: 0, y: 1 }; //Start
	gameStartSound.play();
	switch (e.key) {
		case "ArrowUp":
			console.log("ArrowUp");
			snakeDir.x = 0;
			snakeDir.y = -1;
			break;

		case "ArrowDown":
			console.log("ArrowDown");
			snakeDir.x = 0;
			snakeDir.y = 1;
			break;

		case "ArrowLeft":
			console.log("ArrowLeft");
			snakeDir.x = -1;
			snakeDir.y = 0;
			break;

		case "ArrowRight":
			console.log("ArrowRight");
			snakeDir.x = 1;
			snakeDir.y = 0;
			break;

		default:
			break;
	}
});
