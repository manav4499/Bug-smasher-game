
// Initialize variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800 ;
canvas.height = 450 ;
var bugX = 50;
var bugY = 50;
var bugSpeed = 5000; // Initial speed to change position every 5 seconds
var score = 0;
var scoreValue = document.getElementById("scoreValue");
var resetSpeed = document.getElementById("resetSpeed");
var resetScore = document.getElementById("resetScore");
var intervalId = null;

// Draw the bug on the canvas
function drawBug() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bugImage = new Image();
    bugImage.onload = function() {
        // Resize the bug image as needed (e.g., to 40x40 pixels)
        ctx.drawImage(bugImage, bugX, bugY, 60, 60); // Draw the image at bugX, bugY with a width and height of 40 pixels
    };
    bugImage.src = "Bug.png"; // Replace "path_to_your_bug_image.png" with the actual path to your bug image
}

// Move the bug randomly
function moveBug() {
    var newX = Math.floor(Math.random() * (canvas.width - 40)) + 20;
    var newY = Math.floor(Math.random() * (canvas.height - 40)) + 20;
    bugX = newX;
    bugY = newY;
    drawBug();
}

// Start moving the bug in regular intervals
function startMovingBug() {
    intervalId = setInterval(moveBug, bugSpeed);
}

// Stop moving the bug
function stopMovingBug() {
    clearInterval(intervalId);
}

// Check if the player clicked on the bug
function checkClick(event) {
    var rect = canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
    var mouseX = event.clientX - rect.left; // Calculate the x-coordinate relative to the canvas
    var mouseY = event.clientY - rect.top; // Calculate the y-coordinate relative to the canvas
    var distance = Math.sqrt(Math.pow(mouseX - bugX, 2) + Math.pow(mouseY - bugY, 2));
    if (mouseX >= bugX && mouseX <= bugX + 40 && mouseY >= bugY && mouseY <= bugY + 40) {
        score++;
        scoreValue.innerText = score;
        bugSpeed -= 200; // Decrease the speed by 20 milliseconds on successful click
        moveBug(); // Move bug to a new location after click
        clearInterval(intervalId); // Stop the current interval
        startMovingBug(); // Start a new interval with updated speed
    }
}

// Reset the bug speed to the initial value
resetSpeed.addEventListener("click", function () {
    bugSpeed = 5000; // Reset bug speed to change position every 5 seconds
    clearInterval(intervalId); // Stop the current interval
    startMovingBug(); // Start moving the bug again
});

// Reset the score to zero
resetScore.addEventListener("click", function () {
    score = 0;
    scoreValue.innerText = score;
    bugSpeed = 5000; // Reset bug speed to change position every 5 seconds  
    clearInterval(intervalId); // Stop the current interval
    startMovingBug(); // Start moving the bug again
});

// Start the game
drawBug();
startMovingBug();
canvas.addEventListener("click", checkClick);
