let playerTwo_default_aim_Ani, playerTwo_default_shoot_Ani, playerTwo_default_walkR_Ani, playerTwo_default_walkL_Ani;
let bulletPosition = [];
let speed = 1.5;
let jump = 3;
let mouseDragged = false;
let gunLoaded = true;
let playerTurn = 1;  //PLayer One starting always
let showNoAmmo = false;
let noAmmoCounter = 0;

function preload() {
  playerOne_default_idle_Ani = loadAnimation("images/characters/idle_default_player_one_1.png", 2);
  playerOne_default_walkR_Ani = loadAnimation("images/characters/walkR_default_player_one_1.png", 4);
  playerOne_default_walkL_Ani = loadAnimation("images/characters/walkL_default_player_one_1.png", 4);
  playerOne_default_aim_Ani = loadAnimation("images/characters/aim_default_player_one_1.png", 2);
  playerOne_default_shoot_Ani = loadAnimation("images/characters/shoot_default_player_one_1.png", 2);

  playerTwo_default_idle_Ani = loadAnimation('images/characters/idle_default_player_two_1.png', 2);
  playerTwo_default_walkR_Ani = loadAnimation('images/characters/walkR_default_player_two_1.png', 4);
  playerTwo_default_walkL_Ani = loadAnimation('images/characters/walkL_default_player_two_1.png', 4);
  playerTwo_default_aim_Ani = loadAnimation('images/characters/aim_default_player_two_1.png', 2);
  playerTwo_default_shoot_Ani = loadAnimation('images/characters/shoot_default_player_two_1.png', 2);

  degreeDisplay = loadImage('images/others/circle.png');
  //degreeDisplay2 = loadImage('images/others/circle2.png');

  pistolShot = loadSound('media/sound_fx/pistol_shot.mp3');
  reload = loadSound('media/sound_fx/reload.mp3');
  noAmmo = loadSound('media/sound_fx/noAmmo.mp3');
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
  if (aimMode == false) {
    movement();
  }
  //mouseXY();

  //ellipse(mouseX,mouseY,20)

  textSize(50);
  if(playerTurn == 1) {
    text("Player One's Turn", width/2-200, 300);
  } else if (playerTurn ==2) {
    text("Player Two's Turn", width/2-200, 300);
  }


  //No Ammo Error Message
  if (showNoAmmo == true) {
    noAmmoCounter --;
    if(noAmmoCounter < 0){
      showNoAmmo = false;
    } else {
      text("No Ammo", width/2-200, 400);
    }
  }
}

function shootingSprites() {
  floor = new Sprite(width / 2, 550, width, 5, 's');

  bullet = new Sprite(-1000, -1000, 5, 's');
  bullet.visible = false;

  target = new Sprite();
  target.draw = function () {
    noFill();
    stroke('red')
    strokeWeight(3);
    ellipse(0, 0, 50);
    line(-25, 0, 25, 0);
    line(0, -25, 0, 25);
  }
  target.collider = 'n';
  target.color = 'none';
  target.visible = false;
  target.overlaps(floor);
  target.overlaps(bullet);
  /*  
    playerTwo = new Sprite();
    playerTwo.w = 30;
    playerTwo.h = 70;
    playerTwo.collider = 'd';
    playerTwo.overlaps(target);
    playerTwo.overlaps(bullet);
  */
  playerOne_default_idle_Ani.frameDelay = 60;
  playerOne_default_walkR_Ani.frameDelay = 7;
  playerOne_default_walkL_Ani.frameDelay = 7;
  playerOne_default_aim_Ani.frameDelay = 60;
  //playerOne_default_shoot_Ani.frameDelay = 120;

  playerTwo_default_idle_Ani.frameDelay = 60;
  playerTwo_default_walkR_Ani.frameDelay = 7;
  playerTwo_default_walkL_Ani.frameDelay = 7;
  playerTwo_default_aim_Ani.frameDelay = 60;
  //playerTwo_default_shoot_Ani.frameDelay = 120;

  playerOne = new Sprite(300, 450);
  playerOne.diameter = 1;
  playerOne.addAni('one_default_aim', playerOne_default_aim_Ani);
  playerOne.addAni('one_default_walkR', playerOne_default_walkR_Ani);
  playerOne.addAni('one_default_walkL', playerOne_default_walkL_Ani);
  playerOne.addAni('one_default_idle', playerOne_default_idle_Ani);
  //playerOne.addAni('one_default_shoot', playerOne_default_shoot_Ani);
  //playerOne.collider = 'd';
  playerOne.overlaps(target);
  playerOne.overlaps(bullet);
  playerOne.scale = 0.5;

  playerTwo = new Sprite(700, 450);
  playerTwo.diameter = 1;
  playerTwo.addAni('two_default_aim', playerTwo_default_aim_Ani);
  playerTwo.addAni('two_default_walkR', playerTwo_default_walkR_Ani);
  playerTwo.addAni('two_default_walkL', playerTwo_default_walkL_Ani);
  playerTwo.addAni('two_default_idle', playerTwo_default_idle_Ani);
  //playerTwo.addAni('two_default_shoot', playerTwo_default_shoot_Ani);
  //playerTwo.collider = 'd';
  playerTwo.overlaps(target);
  playerTwo.overlaps(bullet);
  playerTwo.scale = 0.5;
}

function shootingPhysic() {
  if (aimMode == true && gunLoaded == true) {
    target.x = mouse.x;
    target.y = mouse.y;
    if (playerOne.mouse.dragging() && playerTurn == 1) {
      target.visible = true;

      bullet.x = playerOne.x - 10; //////////////////////////////////////////////////////made this dynamic
      bullet.y = playerOne.y + 2;

      /////////////////////////////////////////////////// This is just text display
      noFill();
      stroke('black');
      strokeWeight(2);
      image(degreeDisplay, playerOne.x - 10, playerOne.y + 2, 300, 300);
      //image(degreeDisplay, playerOne.x -10, playerOne.y +2, 150,150);
      line(playerOne.x - 10, playerOne.y + 2, target.x, target.y);
      distance = dist(playerOne.x - 10, playerOne.y, target.x, target.y)
      stroke('black');
      if (distance > 150) {
        distance = 150;
        stroke('red');
      }
      strokeWeight(1);
      let power = Math.floor((distance / 150) * 100);
      let angle = 0;
      if (bullet.angleTo(target) > 0) {
        angle = Math.floor(bullet.angleTo(target)) - 180; //just add minus in front for player one
      } else if (bullet.angleTo(target) < 0) {
        angle = Math.floor(bullet.angleTo(target)) + 180; //just add minus in front for player one
      }

      //Power and Angle Display
      textSize(10);
      text(power, playerOne.x + 10, playerOne.y);
      stroke('black');
      text(angle, playerOne.x + 10, playerOne.y - 20);
      stroke('black');

      mouseDragged = true;
    }
    
    if (playerTwo.mouse.dragging() && playerTurn == 2) {
      target.visible = true;

      bullet.x = playerTwo.x - 10; //////////////////////////////////////////////////////made this dynamic
      bullet.y = playerTwo.y + 2;

      /////////////////////////////////////////////////// This is just text display
      noFill();
      stroke('black');
      strokeWeight(2);
      image(degreeDisplay, playerTwo.x - 10, playerTwo.y + 2, 300, 300);
      //image(degreeDisplay, playerTwo.x -10, playerTwo.y +2, 150,150);
      line(playerTwo.x - 10, playerTwo.y + 2, target.x, target.y);
      distance = dist(playerTwo.x - 10, playerTwo.y, target.x, target.y)
      stroke('black');
      if (distance > 150) {
        distance = 150;
        stroke('red');
      }
      strokeWeight(1);
      let power = Math.floor((distance / 150) * 100);
      let angle = 0;
      if (bullet.angleTo(target) > 0) {
        angle = Math.floor(bullet.angleTo(target)) - 180; //just add minus in front for player one
      } else if (bullet.angleTo(target) < 0) {
        angle = Math.floor(bullet.angleTo(target)) + 180; //just add minus in front for player one
      }

      //Power and Angle Display
      textSize(10)
      text(power, playerTwo.x + 10, playerTwo.y);
      stroke('black');
      text(angle, playerTwo.x + 10, playerTwo.y - 20);
      stroke('black');

      mouseDragged = true;
    }

    if (mouse.released() && mouseDragged == true) {
      pistolShot.play();
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
      defaultMode();
      mouseDragged = false;
      gunLoaded = false;
    }
  }

  //Bullet Trail
  bulletPosition.push({ x: bullet.x, y: bullet.y });

  if (bulletPosition.length > 20) {
    bulletPosition.shift();
  }
  if (bullet.visible == true) {
    for (let i = 1; i < bulletPosition.length; i += 1) {
      fill('black');
      ellipse(bulletPosition[i].x, bulletPosition[i].y, i / 2);
    }
  }

  //Explosion
  if (bullet.collides(floor)) {
    //explosion = new Sprite(bullet.x, bullet.y, 80, 's');
    bullet.x = playerTwo.x; ////////////////////////////////////////////Make it work or Change here
    bullet.y = playerTwo.y;
    bullet.collider = 's';
    bullet.visible = false;
  }

  //if(bullet.x >) ///////////May be add rules for outofbound bullet????
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

  //End Turn Button
  endButton = createButton('END');
  endButton.position(825,660);
  endButton.mouseClicked(endTurn);
  endButton.style("width", "150px");
  endButton.style("height", "60px");
  endButton.style("background-color", "#bdc3c7");
  endButton.style("border-color", "#ecf0f1");
  endButton.style("color", "#2c3e50");
  endButton.style("font-size", "30px");
  endButton.style("border-radius", "50px");
  endButton.show();
}

function defaultMode() {
  //Aim Menu
  aimButton.show();
  cancelButton.hide();

  //Change Animation of the players
  if (aimMode == true && playerTurn == 1) {
    playerOne.changeAni('one_default_idle');
    playerOne.x = playerOne.x - 6;
  } else if (aimMode == true && playerTurn == 2) {
    playerTwo.changeAni('two_default_idle');
    playerTwo.x = playerTwo.x + 6;
  }
  aimMode = false;
}

function aimMode() {
  if (gunLoaded == false) {
    noAmmo.play();
    noAmmo.setLoop(false);
    showNoAmmo = true;
    noAmmoCounter = 50;
  }
  
  if (gunLoaded == true) {
    //Aim Menu
    aimButton.hide();
    cancelButton.show();
    
    if (playerTurn == 1) {
      playerOne.changeAni('one_default_aim');
      playerOne.x = playerOne.x + 6;
    } else if (playerTurn == 2) {
      playerTwo.changeAni('two_default_aim');
      playerTwo.x = playerTwo.x - 6;
    }
    aimMode = true;
  }
}

function movement() { ///////////////////////////////////////////// Also add turn noAmmoCounter here
  if(playerTurn == 1) {
    playerOne.changeAni('one_default_idle');
    if (kb.pressing('a') && aimMode == false) {
      playerOne.changeAni('one_default_walkL');
      playerOne.x -= speed;
    } else if (kb.pressing('d') && aimMode == false) {
      playerOne.changeAni('one_default_walkR');
      playerOne.x += speed;
    }
    if (kb.presses('w') && aimMode == false) {
      playerOne.vel.y -= jump;
    }
  }

  if(playerTurn == 2) {
    playerTwo.changeAni('two_default_idle');
    if (kb.pressing('j') && aimMode == false) {
      playerTwo.changeAni('two_default_walkL');
      playerTwo.x -= speed;
    } else if (kb.pressing('l') && aimMode == false) {
      playerTwo.changeAni('two_default_walkR');
      playerTwo.x += speed;
    }
    if (kb.presses('i') && aimMode == false) {
      playerTwo.vel.y -= jump;
    }
  }
}

function endTurn() {
  if (playerTurn == 1) {
    gunLoaded = true;
    reload.play();
    playerTurn = 2;
  } else if (playerTurn == 2) {
    gunLoaded = true;
    reload.play();
    playerTurn = 1;
  }
}