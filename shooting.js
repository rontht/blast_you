let water;
function setup() {
	new Canvas(500, 192);
	noCursor();
	world.gravity.y = 10;

	water = new Group();
	water.color = 'blue';
	water.mass = 3;
	water.vel.y = -6;
	water.life = 60;
}
function draw() {
	clear();
	new water.Sprite(mouse.x, mouse.y, 10);

	if (mouse.presses()) new Sprite(250, -200, 40);
}