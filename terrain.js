let player, grenade, explosion, pillars, Explosion, explosion_Ani;
let playerHP = 100;
let greanadeImg;
let elevation = 0;
let aoe = 50;
let loaded = false;
let upgraded = false;
let splitting = false;
let canJump = false;
let damage = 10;

function preload() {
  explosion_Ani = loadAnimation("images/others/bullet_explosion_8.png", 6)
  hugeExplosion_Ani = loadAnimation("images/others/bullet_explosion_8.png", 6)
}

function setup() {
  new Canvas(800, 450);
  noStroke();
  world.gravity.y = 10;

  pillars = new Group();
  pillars.w = 3;
  pillars.h = 500;
  pillars.draw = function () {
    noStroke();
    fill(34, 135, 39);
    rect(0,-250,3,4); // Grass
    fill(48, 32, 20);
    rect(0, 0, 3, 497); // Soil
  }
  pillars.x = (i) => i * 3
  pillars.amount = 270;
  //pillars.color = 'red', 50;
  pillars.collider = 's';
  for (let i = 0; i < pillars.length; i++) {
    pillars[i].y = 500+ 100 * noise(elevation);
    elevation += 0.05
  }

  player = new Sprite(width / 2, 10, 30, 'd');
  player.collides(pillars);
  player.rotationLock = true;

  //grenade = new Group();
  //grenade.d = 5;
  //grenade.collides(pillars);

  
	water = new Group();
	water.color = 'blue';
	water.mass = 3;
	water.vel.y = -100;
	water.life = 60;
  
  
  grenade = new Sprite(-1000, -1000);
  grenade.d = 5;

  grenade.collider = 'n';
  grenade.overlaps(player);
  grenade.rotation = grenade.direction;
  grenade.debug = true;
  

  explosion = new Group();
  explosion.draw = function () {
    noStroke();
    fill(0,0,0,0);
    ellipse(0,0, aoe);
  }
  explosion.life = 8;
  explosion.color = 'black';
  explosion.vel.y -= 1;
  
  Explosion = new Group();
  Explosion.draw = function () {
    noStroke();
    fill(0,0,0,250);
    ellipse(0,0,aoe);
    animation(explosion_Ani);
    explosion_Ani.loop();
    explosion_Ani.frameDelay = 11;
  }
  Explosion.life = 30;
  Explosion.collider = 'n';
  Explosion.vel.y -= 3;

  hugeExplosion = new Explosion.Group();
  hugeExplosion.draw = function () {
    noStroke();
    fill(0,0,0,250);
    ellipse(0,0,aoe*2);
    animation(hugeExplosion_Ani);
    hugeExplosion_Ani.loop();
    hugeExplosion_Ani.frameDelay = 11;
    hugeExplosion_Ani.scale = 2;
  }
  hugeExplosion.vel.y -= 3;
  
  player.overlaps(explosion);
  player.overlaps(Explosion);
  player.overlaps(grenade);
  
  buttons();
}

function draw() {
  background('white');
  
  if(mouse.pressing()) {
    //new water.Sprite(mouse.x, mouse.y, 10);
    grenade.life = 1000;
  }
  
  
  if (kb.presses('s') && loaded == true) {
    grenade.x = mouse.x;
    grenade.y = mouse.y;
    grenade.visible = true;
    grenade.collider = 'd';

    if(upgraded == true) {
      explosion.d = aoe*2;
      damage = 40;
    } else if (upgraded == false) {
      explosion.d = aoe;
      damage = 10;
    }
    loaded = false;
  }

  if (grenade.collides(pillars)) { 
    new explosion.Sprite(grenade.x, grenade.y)
    if (upgraded == true) {
      new hugeExplosion.Sprite(grenade.x, grenade.y)
    } else {
      new Explosion.Sprite(grenade.x, grenade.y)
    }
    upgraded = false;

    grenade.x = mouse.x;
    grenade.y = mouse.y;
    grenade.visible = false;
    grenade.collider = 'n';
  }
  
  for (let i = 0; i < pillars.length; i++){
    if (explosion.overlapping(pillars[i])) {
      pillars[i].y +=3;
    }
  }
  
  if (explosion.overlaps(player)) {
    playerHP = playerHP - damage;
  }
  
  player.vel.y += 0.00001;
  
  if (player.collides(pillars)) {
    canJump = true;
  }

  if (kb.presses('a')) {
    player.vel.x -= 3;
  } else if (kb.presses('d')) {
    player.vel.x += 3;
  } else if (kb.presses('w')) {
    if (canJump == true) {
      player.vel.y -= 3;
      canJump = false;
    }
  }
  
  text('Player Hit Point:  ' + playerHP, 50, 50);
  text('Loaded: ' + loaded, 200,50);
  text('Upgraded: ' + upgraded, 300,50);
  text('SplitShot: ' + splitting, 400,50);
}

function buttons() {
  reloading = createButton('Reload');
  reloading.mouseClicked(reloadGrenade);
  reloading.position(200, 70);
  
  upgrading = createButton('Upgrade');
  upgrading.mouseClicked(upgrade);
  upgrading.position(300, 70);
  
  splitshot = createButton('Splitshot');
  splitshot.mouseClicked(splitshoting);
  splitshot.position(400, 70);
}

function reloadGrenade() {
  loaded = true;
}

function upgrade() {
  upgraded = true;
}

function splitshoting() {
  splitting = true;
}