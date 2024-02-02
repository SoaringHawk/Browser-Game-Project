/*

The Game Project 4 - Side scrolling

Week 6

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y+5;

	trees_x = [450, 550, 700, 900]
	clouds = [{
		x_pos: 200,
		y_pos: 100,
		size: 40
	},
	{
		x_pos: 350,
		y_pos: 180,
		size: 40
	},
	{
		x_pos: 680,
		y_pos: 100,
		size: 40
	},
	{
		x_pos: 1280,
		y_pos: 100,
		size: 40
	}];

	mountains = [{
		x_pos: 420,
		y_pos: 500,
		scale: 1.0,
	},
	{
		x_pos: 680,
		y_pos: 500,
		scale: 1.0,
	},
	{
		x_pos: 820,
		y_pos: 500,
		scale: 1.0,
	},
	{
		x_pos: 1320,
		y_pos: 500,
		scale: 1.0,
	}];

	canyons = [{
		x_pos: 1190,
		width:80,
	},
	{
		x_pos: 120,
		width:70,
	},
	{
		x_pos: 340,
		width:80,
	}];

	collectables = [{
		x_pos: 300, 
		y_pos: floorPos_y-25, 
		size: 20},
	{
		x_pos: 450, 
		y_pos: floorPos_y-25, 
		size: 20
	},
	{	
		x_pos: 550, 
		y_pos: floorPos_y-25, 
		size: 20
	}];

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Initialise arrays of scenery objects.
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	push();//save state of the canvas
	translate(scrollPos,0);//move object on the canvas

	// Draw clouds.
	for(var i=0; i<clouds.length; i++ ){
		fill(255,255,255);
		ellipse(clouds[i].x_pos+30,clouds[i].y_pos, clouds[i].size+10, clouds[i].size+10 )
		fill(255,255,255);
		ellipse(clouds[i].x_pos,clouds[i].y_pos+5, clouds[i].size, clouds[i].size )
		fill(255,255,255);
		ellipse(clouds[i].x_pos+60,clouds[i].y_pos+5, clouds[i].size, clouds[i].size )
	}
	// Draw mountains.
	for(var i = 0; i<mountains.length; i++){
		fill(72,72,42);
		triangle((mountains[i].x_pos)*mountains[i].scale,(mountains[i].y_pos-68)*mountains[i].scale, (mountains[i].x_pos+100)*mountains[i].scale,(mountains[i].y_pos-244)*mountains[i].scale, (mountains[i].x_pos+200)*mountains[i].scale, (mountains[i].y_pos-68)*mountains[i].scale);
		fill(72,72,42);
		triangle((mountains[i].x_pos+70*mountains[i].scale),(mountains[i].y_pos-68)*mountains[i].scale, (mountains[i].x_pos+170)*mountains[i].scale,(mountains[i].y_pos-274)*mountains[i].scale, (mountains[i].x_pos+270)*mountains[i].scale, (mountains[i].y_pos-68)*mountains[i].scale);
	}

	// Draw trees.
	for(var i=0; i < trees_x.length; i++){

		fill(165,42,42);
		rect(trees_x[i],floorPos_y-60,60, 60)

		fill(0,155,0);
		triangle(trees_x[i]-50,floorPos_y-60, trees_x[i]+30,floorPos_y-160, trees_x[i]+110,floorPos_y-60);

		fill(0,155,0);
		triangle(trees_x[i]-50,floorPos_y-110, trees_x[i]+30,floorPos_y-210, trees_x[i]+110,floorPos_y-110);

	}

	// Draw canyons
	for(var i=0; i<canyons.length; i++){
		fill(100,155,255);
		rect(canyons[i].x_pos,432, canyons[i].width, 144)
	}

	// Draw collectable items
	for(var i=0; i<collectables.length;i++){
		fill(255,115,0);
		ellipse(collectables[i].x_pos, collectables[i].y_pos, collectables[i].size,collectables[i].size + 10)
		fill(255,215,0);
		ellipse(collectables[i].x_pos-2, collectables[i].y_pos, collectables[i].size-2,collectables[i].size+10)
	}

	pop()//return to saved state to avoid moving the game character

	// Draw the game character - this must be last

	fill(0,0,205)
	ellipse(gameChar_x, gameChar_y-28, 20)

	fill(195, 149, 130)
	ellipse(gameChar_x, gameChar_y-45, 25)

	fill(0,0,0)
	rect(gameChar_x-6, gameChar_y-20, 3, 15)
	rect(gameChar_x+3, gameChar_y-20, 3, 15)

	fill(0,0,0)
	ellipse(gameChar_x-4, gameChar_y-45, 3)
	ellipse(gameChar_x+6, gameChar_y-45, 3)

	fill(0,0,0)
	rect(gameChar_x-10, gameChar_y-28, 3, 12)
	rect(gameChar_x+7, gameChar_y-28, 3, 12)

	//////// Game character logic ///////
	// Logic to move

	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}

	}
}

function keyPressed()
{

	if(key == 'A' || keyCode == 37)
	{
		isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = true;
	}

}

function keyReleased()
{
	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}
}
