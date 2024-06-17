
let playerOne_default_idle_Ani;
let playerTwo_default_idle_Ani, playerTwo_default_aim_Ani, playerTwo_default_shoot_Ani;
let speed = 2;
let X1 = 30;
let X2 = 870;

function preload() {
  //Player One Images
  playerOne_default_idle_Ani = loadAnimation('images/characters/idle_default_player_one_1.png', 2);
  playerOne_default_walkR_Ani = loadAnimation('images/characters/walkR_default_player_one_1.png', 4);
  playerOne_default_walkL_Ani = loadAnimation('images/characters/walkL_default_player_one_1.png', 4);
  playerOne_default_aim_Ani = loadAnimation('images/characters/aim_default_player_one_1.png', 2);
  playerOne_default_shoot_Ani = loadAnimation('images/characters/shoot_default_player_one_1.png', 2);
  
  //Player Two Images
  playerTwo_default_idle_Ani = loadAnimation('images/characters/idle_default_player_two_1.png', 2);
  playerTwo_default_walkR_Ani = loadAnimation('images/characters/walkR_default_player_two_1.png', 4);
  playerTwo_default_walkL_Ani = loadAnimation('images/characters/walkL_default_player_two_1.png', 4);
  playerTwo_default_aim_Ani = loadAnimation('images/characters/aim_default_player_two_1.png', 2);
  playerTwo_default_shoot_Ani = loadAnimation('images/characters/shoot_default_player_two_1.png', 2);
}

function setup() {
  new Canvas(900,600);

  playerOne_default_idle_Ani.frameDelay = 60;
  playerOne_default_walkR_Ani.frameDelay = 10;
  playerOne_default_walkL_Ani.frameDelay = 10;
  playerOne_default_aim_Ani.frameDelay = 60;
  //playerOne_default_shoot_Ani.frameDelay = 120;
  
  playerTwo_default_idle_Ani.frameDelay = 60;
  playerTwo_default_walkR_Ani.frameDelay = 10;
  playerTwo_default_walkL_Ani.frameDelay = 10;
  playerTwo_default_aim_Ani.frameDelay = 60;
  //playerTwo_default_shoot_Ani.frameDelay = 120;
  
  playerOne = new Sprite(30, 450);
  playerOne.addAni('one_default_aim', playerOne_default_aim_Ani);
  playerOne.addAni('one_default_walkR', playerOne_default_walkR_Ani);
  playerOne.addAni('one_default_walkL', playerOne_default_walkL_Ani);
  playerOne.addAni('one_default_idle', playerOne_default_idle_Ani);
  playerOne.scale = 0.7;
  playerOne.x = X1;
  
  playerTwo = new Sprite(870, 450);
  playerTwo.addAni('two_default_aim', playerTwo_default_aim_Ani);
  playerTwo.addAni('two_default_walkR', playerTwo_default_walkR_Ani);
  playerTwo.addAni('two_default_walkL', playerTwo_default_walkL_Ani);
  playerTwo.addAni('two_default_idle', playerTwo_default_idle_Ani);
  //playerTwo.addAni('two_default_shoot', playerTwo_default_shoot_Ani);
  playerTwo.scale = 0.7;
  playerTwo.x = X2;
  
  // Bedrock
  world.gravity.y = 1; 
  floor = new Sprite(width/2, 490);
  floor.w = width;
  floor.h = 20;
  floor.color = 'brown';
  floor.collider = 's';
  
  aimMenu();
  shopMenu();
  optionMenu();
  endTurn();
}

function draw() {
  background(127);
  noStroke();
  movement();
  //Top Bar
  text('Player 1', 10, 20);
  text('HP - ' + 30, 10, 40);
  text('Coin - ' + 200, 10, 60);
  text('Player 2', 835, 20);
  text('HP - ' + 30, 835, 40);
  text('Coin - ' + 130, 835, 60);
  text('Wind ' + 20 + ' UP', 400, 20);
  
  //Buttons Background
  fill('red');
  rect(90,500, 110, 100);

  //Menu Background
  fill('yellow')
  rect(200, 500, 500, 100);
  
  if(aimMode == true) {
    //Power Background
    fill('brown');
    rect(210, 510, 30, 80); //slider
    rect(210, 510, 100, 40); //text
    //Aim Background
    fill('red');
    rect(310, 510, 30, 80); //slider
    rect(240, 550, 100, 40); //text
    fill('white');
    text('Aim ' + (aimSlider.value()), 260, 573); //aim text
    text('Power ' + (powerSlider.value()), 250, 534); //power text
    //Inventory Background
    fill('red');
    rect(350, 510, 250, 80); //box
    fill('white');
    text('Inventory', 353, 522); //headings
    //Lock-in Background
    fill('red');
    rect(610, 510, 80, 80);
  }
  
  //End-Turn Background
  fill('red');
  rect(700, 500, 110, 100);
  
  fill('black');
  text('x'+ mouseX + ',' + 'y' + mouseY, mouseX, mouseY);
}

//____________Keyboard Movement____________//
function movement() {
  if(kb.pressing('a')) {
    playerOne.changeAni('one_default_walkL');
    playerOne.x -= speed;
    kbpressedOne = true;
  } else if(kb.pressing('d')) {
    playerOne.changeAni('one_default_walkR');
    playerOne.x += speed;
    kbpressedOne = true;
  } else {
    kbpressedOne = false;
  }
  if(kbpressedOne == false) {
    playerOne.changeAni('one_default_idle');
  }
  
  if(kb.pressing('j')) {
    playerTwo.changeAni('two_default_walkL');
    playerTwo.x -= speed;
    kbpressedTwo = true;
  } else if(kb.pressing('l')) {
    playerTwo.changeAni('two_default_walkR');
    playerTwo.x += speed;
    kbpressedTwo = true;
  } else {
    kbpressedTwo = false;
  }
  if(kbpressedTwo == false) {
    //playerTwo.changeAni('two_default_idle');
  }
}


//__________________GUI________________//
function aimMenu() {
  //Aim Button
  aimButton = createButton('Aim');
  aimButton.position(100,510);
  aimButton.mouseClicked(aimMode);
  aimButton.style('width', '90px');
  aimButton.style('height', '20px');
  
  //Cancel Button
  cancelButton = createButton('Cancel');
  cancelButton.position(100,510);
  cancelButton.mouseClicked(defaultMode);
  cancelButton.style('width', '90px');
  cancelButton.style('height', '20px');
  cancelButton.hide();
  
  //Power Slider
  powerSlider = createSlider(0, 100, 0);
  powerSlider.position(188,538);
  powerSlider.style('width', '70px');
  powerSlider.style('transform', 'rotate(270deg)');
  powerSlider.hide();
  
  //Aim Slider
  aimSlider = createSlider(0, 100, 0);
  aimSlider.position(288,538);
  aimSlider.style('width', '70px');
  aimSlider.style('transform', 'rotate(270deg)');
  aimSlider.hide();

}

function shopMenu() {
  //Shop Button
  shopButton = createButton('Shop');
  shopButton.position(100, 540);
  shopButton.mouseClicked(shopMode);
  shopButton.style('width', '90px');
  shopButton.style('height', '20px');
  
  //Close Button
  closeButton = createButton('Close');
  closeButton.position(100, 540);
  closeButton.mouseClicked(defaultMode);
  closeButton.style('width', '90px');
  closeButton.style('height', '20px');
  closeButton.hide();
}

function optionMenu() {
  //Option Button
  optionButton = createButton('Option');
  optionButton.position(100, 570);
  optionButton.mouseClicked(optionMode);
  optionButton.style('width', '90px');
  optionButton.style('height', '20px');

  //Resume Button
  resumeButton = createButton('Resume');
  resumeButton.position(100, 570);
  resumeButton.mouseClicked(defaultMode);
  resumeButton.style('width', '90px');
  resumeButton.style('height', '20px');
  resumeButton.hide();
}

function defaultMode() {
  aimMode = false;
  shopMode = false;
  optionMode = false;
  playerOne.changeAni('one_default_idle');
  playerOne.x = X1;
  playerTwo.changeAni('two_default_idle');
  playerTwo.x = X2;

  //Aim Menu
  aimButton.show();
  cancelButton.hide();
  aimSlider.hide();
  powerSlider.hide();

  //Shop Menu
  shopButton.show();
  closeButton.hide();

  //Option Menu
  optionButton.show();
  resumeButton.hide();

  //Add stats like wind/ power and aim from previous turns in the gui
}

function aimMode() {
  aimMode = true;
  playerTwo.changeAni('two_default_aim');
  playerTwo.x = X2-5;

  //Aim Menu
  aimButton.hide();
  cancelButton.show();
  aimSlider.show();
  powerSlider.show();

  //Shop Menu
  shopButton.hide();
  closeButton.hide();

  //Option Menu
  optionButton.hide();
  resumeButton.hide();
}

function shopMode() {
  shopMode = true;

  //Aim Menu
  aimSlider.hide();
  powerSlider.hide();
  cancelButton.hide();
  aimButton.hide();

  //Shop Menu
  shopButton.hide();
  closeButton.show();

  //Option Menu
  optionButton.hide();
  resumeButton.hide();
}

function optionMode() {
  optionMode = true;

  //Aim Menu
  aimSlider.hide();
  powerSlider.hide();
  cancelButton.hide();
  aimButton.hide();

  //Shop Menu
  shopButton.hide();
  closeButton.hide();

  //Option Menu
  optionButton.hide();
  resumeButton.show();
}

function endTurn() {
  endButton = createButton('END');
  endButton.position(710, 510);
  //endButton.mouseClicked();
  endButton.style('width', '90px');
  endButton.style('height', '80px');
}

/*
function aimmingKB() {
  playerTwo.changeAni('two_default_idle');
  let showAim = false;
  playerTwo.x = 870;

  // press u to activate aim
  if (kb.pressing('u')) {
    showAim = true;
    playerTwo.changeAni('two_default_aim');
    playerTwo.x = 865;
  }
  if (showAim == true) {
    //aim direction
    if (kb.pressing('j')) {
      aimLine -= 1;
    } else if (kb.pressing('l')) {
      aimLine += 1;
    }

    //power
    if (kb.pressing('i')) {
      power += 1;
    } else if (kb.pressing('k')) {
      power -= 1;
    }

    //shoot
    if (kb.pressing('o')) {
      //shoot
    }
  }  
}
*/