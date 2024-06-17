let playerTwo_default_aim_Ani, playerTwo_default_shoot_Ani, playerTwo_default_walkR_Ani, playerTwo_default_walkL_Ani;
let bulletPosition = [];
let speed = 1.5;
let jump = 5;
let mouseDragged = false;

function preload() {
  playerTwo_default_idle_Ani = loadAnimation('images/characters/idle_default_player_two_1.png', 2);
  playerTwo_default_walkR_Ani = loadAnimation('images/characters/walkR_default_player_two_1.png', 4);
  playerTwo_default_walkL_Ani = loadAnimation('images/characters/walkL_default_player_two_1.png', 4);
  playerTwo_default_aim_Ani = loadAnimation('images/characters/aim_default_player_two_1.png', 2);
  playerTwo_default_shoot_Ani = loadAnimation('images/characters/shoot_default_player_two_1.png', 2);

  degreeDisplay = loadImage('images/others/circle.png');
  //degreeDisplay2 = loadImage('images/others/circle2.png');
}

function setup() {
  createCanvas(1400, 800);
  imageMode(CENTER);
  world.gravity.y = 10;
  shootingSprites();
  gameButtons();
  defaultMode();
}

function draw() {
  background(220);
  noStroke();
  shootingPhysic();
  if(aimMode == false) {
    movement();
  }
  mouseXY();
}

function shootingSprites() {
  floor = new Sprite(width / 2, 550, width, 5, 's');

  bullet = new Sprite(-1000, -1000, 5, 's');
  bullet.visible = false;
  
  target = new Sprite();
  target.draw = function() {
    noFill();
    stroke('red')
    strokeWeight(3);
    ellipse(0,0,50);
    line(-25,0, 25,0);
    line(0,-25, 0,25);
  }
  target.collider = 'n';
  target.color = 'none';
  target.visible = false;
  target.overlaps(floor);
  target.overlaps(bullet);
/*  
  P1 = new Sprite();
  P1.w = 30;
  P1.h = 70;
  P1.collider = 'd';
  P1.overlaps(target);
  P1.overlaps(bullet);
*/
  playerTwo_default_idle_Ani.frameDelay = 60;
  playerTwo_default_walkR_Ani.frameDelay = 10;
  playerTwo_default_walkL_Ani.frameDelay = 10;
  playerTwo_default_aim_Ani.frameDelay = 60;
  //playerTwo_default_shoot_Ani.frameDelay = 120;
  
  P1 = new Sprite(700, 450);
  P1.diameter = 1;
  P1.addAni('two_default_aim', playerTwo_default_aim_Ani);
  P1.addAni('two_default_walkR', playerTwo_default_walkR_Ani);
  P1.addAni('two_default_walkL', playerTwo_default_walkL_Ani);
  P1.addAni('two_default_idle', playerTwo_default_idle_Ani);
  //P1.addAni('two_default_shoot', playerTwo_default_shoot_Ani);
  //P1.collider = 'd';
  P1.overlaps(target);
  P1.overlaps(bullet);
  P1.scale = 0.5;
}

function shootingPhysic() {
  if(aimMode == true) {
    target.x = mouse.x;
    target.y = mouse.y;
    if (P1.mouse.dragging()) {
      target.visible = true;
      bullet.x = P1.x -10;
      bullet.y = P1.y +2;
      
      noFill();
      stroke('black');
      strokeWeight(2);
      image(degreeDisplay, P1.x -10, P1.y +2, 300,300);
      //image(degreeDisplay, P1.x -10, P1.y +2, 150,150);
      line(P1.x -10, P1.y +2, target.x, target.y);
      distance = dist(P1.x -10, P1.y, target.x, target.y)
      stroke('black');
      if (distance > 150) {
        distance = 150;
        stroke('red');
      }
      strokeWeight(1);
      let power = Math.floor((distance/150)*100);
      let angle = 0;
      if (bullet.angleTo(target) > 0) {
        angle = Math.floor(bullet.angleTo(target)) -180; //just add minus in front for player one
      } else if (bullet.angleTo(target) < 0) {
        angle = Math.floor(bullet.angleTo(target)) +180; //just add minus in front for player one
      }
      text(power, P1.x +10, P1.y);
      stroke('black');
      text(angle, P1.x +10, P1.y-20);
      stroke('black');
      
      strokeWeight(0);
      target.collider = 'k';
      //target.moveTowards(mouse.x, mouse.y, 1);
      mouseDragged = true;
    }
    
    if (mouse.released() && mouseDragged == true) {
      target.visible = false;
      bullet.visible = true;

      bullet.collider = 'd';
      bullet.moveTowards(target.x, target.y);

      //Bullet Max Speed
      bulletMaxSpeed = 10;
      if (bullet.vel.x > bulletMaxSpeed) {
          bullet.vel.x = bulletMaxSpeed
      } else if (bullet.vel.x < -bulletMaxSpeed) {
          bullet.vel.x = -bulletMaxSpeed;
      }
      if (bullet.vel.y > bulletMaxSpeed) {
          bullet.vel.y = bulletMaxSpeed;
      } else if (bullet.vel.y < -bulletMaxSpeed) {
          bullet.vel.y = -bulletMaxSpeed;
      }
      //defaultMode();
      console.log(bullet.angleTo(target));
      mouseDragged = false;
    }
  }

  //Bullet Trail
  bulletPosition.push({x: bullet.x, y: bullet.y});
  
  if (bulletPosition.length > 20) {
     bulletPosition.shift();
  }
  if (bullet.visible == true) {
    for (let i = 1; i < bulletPosition.length; i += 1) {
      fill('black');
      ellipse(bulletPosition[i].x, bulletPosition[i].y, i/2);
    }
  }
  
  //Explosion
  if (bullet.collides(floor)) {
    //explosion = new Sprite(bullet.x, bullet.y, 80, 's');
    bullet.x = P1.x;
    bullet.y = P1.y;
    bullet.collider = 's';
    bullet.visible = false;
    //shot = false;
  }

  //if(bullet.x >)
}

function mouseXY() {
  // mouse x,y display
  fill("black");
  textSize(20);
  text("x" + Math.floor(mouseX) + "," + "y" + Math.floor(mouseY), mouseX, mouseY);
}

function gameButtons() {
  //Aim Button
  aimButton = createButton("AIM");
  aimButton.position(625, 660);
  aimButton.mouseClicked(aimMode);
  aimButton.style("width", "150px");
  aimButton.style("height", "60px");
  aimButton.style("background-color", "#bdc3c7");
  aimButton.style("border-color", "#ecf0f1");
  aimButton.style("color", "#2c3e50");
  aimButton.style("font-size", "30px");
  aimButton.style("border-radius", "50px");
  aimButton.show();
  
  //Cancel Button
  cancelButton = createButton("CANCEL");
  cancelButton.position(625, 660);
  cancelButton.mouseClicked(defaultMode);
  cancelButton.style("width", "150px");
  cancelButton.style("height", "60px");
  cancelButton.style("background-color", "#95a5a6");
  cancelButton.style("border-color", "#ecf0f1");
  cancelButton.style("color", "#2c3e50");
  cancelButton.style("font-size", "30px");
  cancelButton.style("border-radius", "50px");
  cancelButton.hide();
}

function defaultMode() {
  aimMode = false;
  P1.changeAni('two_default_idle');
  P1.x = P1.x + 6;
  
  //Aim Menu
  aimButton.show();
  cancelButton.hide();

  bullet.visible = false;
  target.visible = false;
}

function aimMode() {
  aimMode = true;
  P1.changeAni('two_default_aim');
  P1.x = P1.x - 6;
  
  //Aim Menu
  aimButton.hide();
  cancelButton.show();
}

function movement() {
  P1.changeAni('two_default_idle');
  if(kb.pressing('a') && aimMode == false) {
    P1.changeAni('two_default_walkL');
    P1.x -= speed;
  } else if(kb.pressing('d') && aimMode == false) {
    P1.changeAni('two_default_walkR');
    P1.x += speed;
  }
  if(kb.presses('w') && aimMode == false) {
    P1.vel.y -= jump;
  }
}