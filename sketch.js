let stars = [];
let landPoints = [];
let landPoints2 = [];
let landPoints3 = [];
let flowers = [];

let moonX = 0;
let moonY = 0;

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

  //add landscape
  for (let i = 0; i < 100; i++) {
	//height map moving across the screen left to right
	let landPoint = createLandPoint(i, 0.02, 0.5);
	landPoints.push(landPoint);

	let landPoint2 = createLandPoint(i, 0.01, 0.6);
	landPoints2.push(landPoint2);

	let landPoint3 = createLandPoint(i, 0.005, 0.75);
	landPoints3.push(landPoint3);
	
  }

  // Create flowers
  for (let i = 0; i < 65; i++) {

		// Create a flower
		let flower = createFlower();
		flowers.push(flower);
		
  }
  // Set the frame rate
  frameRate(30);

  // Set the background color
  background(0);


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
    color: color(random(255 / 2), random(255 / 2), random(255 / 2)),
    size: random(5, 10),
    numPetals: numPetals,
    petalSizes: petalSizes,
    centerColor: centerColor
  };

  return flower;
}

function createLandPoint(ndx, noiseScale, heightScale)
{
	let x = map(ndx, 0, 100, 0, width);
	let y = map(noise(ndx * noiseScale), 0, 1, height * heightScale, height);
	let landPoint = {
	  x: x,
	  y: y
	};

	return landPoint;
}

//slow moving stars and slow moving moon across the night sky


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

