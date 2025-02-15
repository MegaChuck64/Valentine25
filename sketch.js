let stars = [];
let landPoints = [];
let landPoints2 = [];
let landPoints3 = [];
let flowers = [];
let trees = [];
let heartBalloon;
let penguins = [];
let smallHearts = [];

let moonX = 0;
let moonY = 0;

let conversationPairs = [
  ["Would you be my valentine?", "Yes!"],
  ["I love you.", "I love you too."],
  ["I love you more.", "No, I love you more."],
  ["No, I am the one who loves you more.", "Nu-uh, It is I. I love you more."],
  ["I love you most.", "I love you mostest."],
  ["I love you mostestest.", "I love you mostestestest."],
  ["I would I were thy bird.", "Sweet, so would I!"]
];

let currentPhraseIndex = 0;
let phraseTimer = 0;
let phraseInterval = 2000; // Change phrase every 2 seconds
let showQuestion = true;

let draggingPenguin = null;
let draggingHeart = false;
let offsetX, offsetY;
let playing = false;

function setup() {
  // Set the canvas' width and height
  // using the display's dimensions.
  createCanvas(windowWidth, windowHeight);

  // Create the stars
  for (let i = 0; i < 100; i++) {
    // Create a star
    let star = {
      x: random(width),
      y: random(height)
    };

    // Add the star to the array
    stars.push(star);
  }

  // Add landscape
  for (let i = 0; i < 100; i++) {
    // Height map moving across the screen left to right
    let landPoint = createLandPoint(i, 0.02, 0.5);
    landPoints.push(landPoint);

    let landPoint2 = createLandPoint(i, 0.01, 0.6);
    landPoints2.push(landPoint2);

    let landPoint3 = createLandPoint(i, 0.005, 0.75);
    landPoints3.push(landPoint3);
  }

  // Create flowers
  for (let i = 0; i < 30; i++) {
    // Create a flower
    let flower = createFlower();
    flowers.push(flower);
  }

  // Create trees along landPoints2
  for (let i = 0; i < 10; i++) {
    let tree = createTree();
    trees.push(tree);
  }

  // Create a single heart balloon
  heartBalloon = createHeart();

  // Create a pair of penguins
  penguins.push(createPenguin());
  penguins.push(createPenguin());

  // Set the frame rate
  frameRate(30);

  // Set the background color
  background(0);

  // Initialize the first phrase
  currentPhraseIndex = int(random(conversationPairs.length));


}

function createFlower() {
	// Only create flowers on the bottom land created by landpoints3
	let x = random(0, width);
	let y = random(landPoints3[landPoints3.length - 1].y, height);
  
	// Precompute flower properties
	let numPetals = int(random(5, 10));
	let petalSizes = [];
	for (let i = 0; i < numPetals; i++) {
	  petalSizes.push(random(0.5, 1));
	}
	let centerColor = color(random(200, 255), random(150, 200), 0);
  
	let flower = {
	  x: x,
	  y: y,
	  color: color(random(100, 255), random(100, 255), random(100, 255)),
	  size: random(10, 20),
	  numPetals: numPetals,
	  petalSizes: petalSizes,
	  centerColor: centerColor
	};
  
	return flower;
  }
  
  function createTree() {
	// Randomly select a land point from landPoints2
	let landPoint = random(landPoints2);
	return {
	  x: landPoint.x,
	  y: random(landPoint.y, height), // Spread trees throughout the entire range of landPoints2
	  trunkHeight: random(40, 80),
	  trunkWidth: random(10, 20),
	  canopySize: random(50, 70),
	  canopyColor: color(random(0, 100), random(100, 150), random(0, 100)),
	  leafShape: random(['ellipse', 'circle', 'oval']) // Random leaf shape
	};
  }
  
  function createHeart() {
	let x = random(width);
	let y = random(height * 0.5); // Hearts in the upper half of the canvas
	let size = random(110, 150);
	let clr = color(random(200, 255), random(0, 100), random(100, 150));
	let speedY = random(0.5, 1.5); // Speed of the balloon
	let speedX = random(-0.5, 0.5); // Horizontal speed of the balloon
	return { x: x, y: y, size: size, color: clr, speedY: speedY, speedX: speedX };
  }
  
  function createPenguin() {
	let x = random(width);
	let y = random(height * 0.75, height); // Penguins in the lower part of the canvas
	let size = random(100, 120);
	return { x, y, size };
  }
  
  function createSmallHeart(x, y) {
	let size = random(5, 10);
	let clr = color(random(200, 255), random(0, 100), random(100, 150));
	let speedX = random(-2, 2);
	let speedY = random(-2, 2);
	return { x: x, y: y, size: size, color: clr, speedX: speedX, speedY: speedY };
  }
  
  function createLandPoint(ndx, noiseScale, heightScale) {
	let x = map(ndx, 0, 100, 0, width);
	let y = map(noise(ndx * noiseScale), 0, 1, height * heightScale, height);
	let landPoint = {
	  x: x,
	  y: y
	};
  
	return landPoint;
  }
  
function draw() {
  // Set the background color
  background(0);

  // Draw the stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(255);
    noStroke();
    ellipse(star.x, star.y, 2, 2);
    
    // Move the stars in the direction of the moon but slower
    star.x += 0.3;
    if (star.x > width) {
      star.x = 0;
    }

    star.y += 0.125;
    if (star.y > height) {
      star.y = 0;
    }
  }

  // Draw the moon
  fill(255);
  noStroke();
  ellipse(moonX, moonY, 50, 50);

  // Move the moon
  moonX += .5;
  if (moonX > width) {
    moonX = 0;
  }

  moonY += 0.2;
  if (moonY > height) {
    moonY = 0;
  }

  // Draw landscape as a shape
  beginShape();
  fill(0, 35, 0);
  noStroke();
  for (let i = 0; i < landPoints.length; i++) {
    let landPoint = landPoints[i];
    vertex(landPoint.x, landPoint.y);
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Draw landscape as a shape
  beginShape();
  fill(0, 75, 0);
  noStroke();
  for (let i = 0; i < landPoints2.length; i++) {
    let landPoint2 = landPoints2[i];
    vertex(landPoint2.x, landPoint2.y);
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Sort trees by y coordinate in ascending order
  trees.sort((a, b) => a.y - b.y);

  // Draw trees
  for (let tree of trees) {
    drawTree(tree.x, tree.y, tree.trunkHeight, tree.trunkWidth, tree.canopySize, tree.canopyColor, tree.leafShape);
  }

  // Draw landscape as a shape
  beginShape();
  fill(0, 120, 0);
  noStroke();
  for (let i = 0; i < landPoints3.length; i++) {
    let landPoint3 = landPoints3[i];
    vertex(landPoint3.x, landPoint3.y);
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Sort flowers by y coordinate in ascending order
  flowers.sort((a, b) => a.y - b.y);

  // Create flower shapes
  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];
    
    // Draw brown stems
    fill(139, 69, 19);
    noStroke();
    rect(flower.x, flower.y, 2, 30);

    // Draw flowers
    drawFlower(flower.x, flower.y, flower.size, flower.color, flower.numPetals, flower.petalSizes, flower.centerColor);
  }

  // Draw the heart balloon
  drawHeart(heartBalloon);

  // Draw the penguins holding the string
  for (let penguin of penguins) {
    drawPenguin(penguin);
  }

  // Draw and animate small hearts
  for (let i = smallHearts.length - 1; i >= 0; i--) {
    let heart = smallHearts[i];
    drawSmallHeart(heart);
    heart.x += heart.speedX;
    heart.y += heart.speedY;

    // Remove hearts that go off the screen
    if (heart.x < 0 || heart.x > width || heart.y < 0 || heart.y > height) {
      smallHearts.splice(i, 1);
    }
  }

  // Draw the conversation
  drawConversation();
}

function drawTree(x, y, trunkHeight, trunkWidth, canopySize, canopyColor, leafShape) {
  // Draw the trunk
  fill(101, 67, 33); // Darker brown color for the trunk
  rect(x - trunkWidth / 2, y, trunkWidth, trunkHeight); // Trunk

  // Draw the canopy
  noStroke();
  fill(canopyColor); // Randomized green color for the canopy
  if (leafShape === 'ellipse') {
    ellipse(x, y - trunkHeight / 2, canopySize, canopySize); // Main canopy
    ellipse(x - 10, y - trunkHeight / 2 - 5, canopySize * 0.7, canopySize * 0.7); // Left canopy
    ellipse(x + 10, y - trunkHeight / 2 - 5, canopySize * 0.7, canopySize * 0.7); // Right canopy
    ellipse(x, y - trunkHeight / 2 - 15, canopySize * 0.8, canopySize * 0.8); // Top canopy
  } else if (leafShape === 'circle') {
    ellipse(x, y - trunkHeight / 2, canopySize, canopySize); // Main canopy
  } else if (leafShape === 'oval') {
    ellipse(x, y - trunkHeight / 2, canopySize * 1.2, canopySize * 0.8); // Main canopy
  }
}

function drawFlower(x, y, size, clr, numPetals, petalSizes, centerColor) {
  fill(clr);
  noStroke();

  // Draw petals with precomputed variety
  let angle = TWO_PI / numPetals;
  for (let i = 0; i < numPetals; i++) {
    let petalSize = size * petalSizes[i]; // Use precomputed petal size variation
    let petalX = x + cos(angle * i) * petalSize;
    let petalY = y + sin(angle * i) * petalSize;
    ellipse(petalX, petalY, petalSize, petalSize * 1.5);
  }

  // Draw center of the flower with precomputed color
  fill(centerColor);
  ellipse(x, y, size * 0.5, size * 0.5); // Smaller center
}

function drawHeart(heart) {
  fill(heart.color);
  noStroke();
  beginShape();
  vertex(heart.x, heart.y);
  bezierVertex(heart.x - heart.size / 2, heart.y - heart.size / 2, heart.x - heart.size, heart.y + heart.size / 3, heart.x, heart.y + heart.size);
  bezierVertex(heart.x + heart.size, heart.y + heart.size / 3, heart.x + heart.size / 2, heart.y - heart.size / 2, heart.x, heart.y);
  endShape(CLOSE);
  
  // Update penguins' positions if not dragging
  if (!draggingPenguin && !draggingHeart) {
  // Move the heart upwards and horizontally if not dragging
  if (!draggingHeart) {
    heart.y -= heart.speedY;
    heart.x += heart.speedX;

    // Wrap around the screen
    if (heart.y < 0) {
      heart.y = height;
    }
    if (heart.x > width) {
      heart.x = 0;
    } else if (heart.x < 0) {
      heart.x = width;
    }

    penguins[0].x = heart.x - 64;
    penguins[0].y = heart.y + heart.size + 100;
    penguins[1].x = heart.x + 64;
    penguins[1].y = heart.y + heart.size + 100;
  }


  }
  // Draw the string
  stroke(255);
  strokeWeight(4);
  line(heart.x, heart.y + heart.size, heart.x, heart.y + heart.size + 110);
  strokeWeight(1);

}

function drawPenguin(penguin) {
  let { x, y, size } = penguin;

  // Draw the body
  fill(0);
  ellipse(x, y, size, size * 1.5);

  // Draw the belly
  fill(255);
  ellipse(x, y + size * 0.1, size * 0.6, size * 1.1);

  // Draw the eyes
  fill(255);
  ellipse(x - size * 0.2, y - size * 0.3, size * 0.2, size * 0.2);
  ellipse(x + size * 0.2, y - size * 0.3, size * 0.2, size * 0.2);
  fill(0);
  ellipse(x - size * 0.2, y - size * 0.3, size * 0.1, size * 0.1);
  ellipse(x + size * 0.2, y - size * 0.3, size * 0.1, size * 0.1);

  // Draw the beak
  fill(255, 165, 0);
  triangle(x, y - size * 0.2, x - size * 0.1, y - size * 0.1, x + size * 0.1, y - size * 0.1);

  // Draw the feet
  fill(255, 165, 0);
  ellipse(x - size * 0.2, y + size * 0.75, size * 0.2, size * 0.1);
  ellipse(x + size * 0.2, y + size * 0.75, size * 0.2, size * 0.1);
}

function drawSmallHeart(heart) {
  fill(heart.color);
  noStroke();
  beginShape();
  vertex(heart.x, heart.y);
  bezierVertex(heart.x - heart.size / 2, heart.y - heart.size / 2, heart.x - heart.size, heart.y + heart.size / 3, heart.x, heart.y + heart.size);
  bezierVertex(heart.x + heart.size, heart.y + heart.size / 3, heart.x + heart.size / 2, heart.y - heart.size / 2, heart.x, heart.y);
  endShape(CLOSE);
}

function drawConversation() {
  let currentPair = conversationPairs[currentPhraseIndex];
  let penguin1 = penguins[0];
  let penguin2 = penguins[1];

  fill(255);
  textSize(32);
  textAlign(CENTER);
  if (showQuestion) {
    text(currentPair[0], penguin1.x, penguin1.y - penguin1.size * 1.5);
  } else {
    text(currentPair[1], penguin2.x, penguin2.y - penguin2.size * 1.5);
  }

  // Update the phrase timer
  phraseTimer += deltaTime;
  if (phraseTimer > phraseInterval) {
    phraseTimer = 0;
    if (showQuestion) {
      showQuestion = false;
    } else {
      showQuestion = true;
      currentPhraseIndex = int(random(conversationPairs.length));
    }
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, heartBalloon.x, heartBalloon.y);
  if (d < heartBalloon.size) {
    draggingHeart = true;
    offsetX = heartBalloon.x - mouseX;
    offsetY = heartBalloon.y - mouseY;
  } else {
    for (let penguin of penguins) {
      let d = dist(mouseX, mouseY, penguin.x, penguin.y);
      if (d < penguin.size) {
        draggingPenguin = penguin;
        offsetX = penguin.x - mouseX;
        offsetY = penguin.y - mouseY;
        break;
      }
    }
  }
}

function mouseDragged() {
  if (draggingHeart) {
    heartBalloon.x = mouseX + offsetX;
    heartBalloon.y = mouseY + offsetY;
    penguins[0].x = heartBalloon.x - 64;
    penguins[0].y = heartBalloon.y + heartBalloon.size + 100;
    penguins[1].x = heartBalloon.x + 64;
    penguins[1].y = heartBalloon.y + heartBalloon.size + 100;
  } else if (draggingPenguin) {
    draggingPenguin.x = mouseX + offsetX;
    draggingPenguin.y = mouseY + offsetY;
  }
}

function mouseReleased() {
  draggingPenguin = null;
  draggingHeart = false;
  // Create a buncha small heart when the mouse is released
  for (let i = 0; i < 10; i++) {
    let smallHeart = createSmallHeart(mouseX, mouseY);
    smallHearts.push(smallHeart);
    
  }

  if (!playing) {
    playing = true;
    new Audio('A-Very-Tokyo-Valentines.mp3').play();

  }

}
