//Variables
const W = 1400,
  H = 800;
let loadingScreen1, loadingScreen2;

//Screens Change
let loadingTimer = 1;
let screen = {
  current: 0,
  loading: 0,
  intro: 1,
  menu: 2,
  game: 3,
  credit: 4
};
let loadNumber = 1; // detarmine loading screen path 1 for main menu 2 for game
let movePopUp = 0; // setting present in 2 screen but not in the same place

//Menu Variables
let settingsOpened = false, showLB = false, renamePlayers = false;
let highScores = new Array();
let ranks = new Array();

//Game Variables
let playerOne_default_idle_Ani, playerOne_default_walkR_Ani, playerOne_default_walkL_Ani, playerOne_default_aim_Ani;
let playerTwo_default_idle_Ani, playerTwo_default_walkR_Ani, playerTwo_default_walkL_Ani, playerTwo_default_aim_Ani;
let deathExplosion_Ani;
let speed = 2; //Movement Speed
let jump = 4;
let playerOne, playerTwo;
let PlayerOneX = 60; //Starting Position for Player One
let PlayerTwoX = 1330; //Starting Position for Player Two
let isGameReady = false;
let gameMenuOpened = false;
let bulletPosition = []; //Bullet Trail Array
let mouseDragged = false; //In hope of avoiding glitch and bugs
let gunLoaded = true; //Gun Reload every turn for all players
let boughtItem = false; //Can buy one item every turn for all players
let playerTurn = 1;  //PLayer One starting always
let turnNumber = 1; //Count and Display Turns in top right corner
let showNoAmmo = false; //No Ammo Error Message
let showNoGold = false; //Not enough gold to buy the item from shop
let showGunLoaded = false; //Cannot buy ammo if gun is loaded
let endTurnWarning = false; //End Turn Warning if the Gun is still loaded
let alreadyUsedShop = false; //already bought an item this turn
let noAmmoCounter = 0;
let gunLoadedErrorCounter = 0;
let noGoldErrorCounter = 0;
let shopErrorCounter = 0;
let turnCounter = 150; //Display Name at the start of every turn
let winningPlayer, losingPlayer;
let elevation = 0;
let P1canJump = true;
let P2canJump = true;
let upgraded = false;

//Player Starting Stats
let playerOneName = 'Ron';
let playerTwoName = 'Jake';
let playerOneGold = 50;
let playerTwoGold = 50;
let playerOneHP = 100;
let playerTwoHP = 100;
let bulletDamage1 = 5; //testing Damages
let bulletDamage2 = 5; //testing Damages
let power = 0;
let angle = 0;
let playerWins = false;

//Shop Item Prices
let ammoPrice = 150;
let ExplosivePrice = 300;
let pillPrice = 100;
let pillHeal = 20;

//_______________________________________________________Preload____________________________________________________//
function preload() {
  //Images //Source: AI Generated from NightCafe Creator
  menuScreen = loadImage("images/backgrounds/LS_2.jpg");
  loadingScreen2 = loadImage("images/backgrounds/LS_3.jpg");
  loadingScreen1 = loadImage("images/backgrounds/LS_1.jpg");
  backgroundUI = loadImage("images/backgrounds/UI_BG3.jpg");
  backgroundTopBar = loadImage("images/backgrounds/topBar_BG.png");
  battleBackground = loadImage("images/backgrounds/battle_BG.jpg");
  playerOneProfile = loadImage("images/characters/playerOne_profile.jpg");
  playerTwoProfile = loadImage("images/characters/playerTwo_profile.jpg");
  credit_BG = loadImage('images/backgrounds/credit_BG4.jpg')

  //Icons
  degreeDisplay = loadImage('images/others/protractor.png');
  bulletIcon = loadImage('images/others/bulletIcon.png');
  bulletIcon2 = loadImage('images/others/bulletIcon2.png');
  explosiveIcon = loadImage('images/others/explosiveIcon.png');
  explosiveIcon2 = loadImage('images/others/explosiveIcon2.png');
  healIcon = loadImage('images/others/healIcon.png');
  goldIcon = loadImage('images/others/gold/Gold_2.png');

  //Fonts
  titleFont = loadFont("fonts/robus.otf"); //Source: Robus by Toko Laris Djaja from fontspace.com
  gameFont = loadFont("fonts/zekton.otf"); //Source: Zekton by Raymond Larabie from 1001fonts.com

  //Texts
  leaderboardScores = loadStrings("texts/leaderboard.txt");

  //MP3
  introMusic = loadSound("media/music/intro.mp3"); //Source: LIL MORĪ – プラネットx from RoyaltyFreePlanet on YouTube
  battleMusic = loadSound("media/music/battle_music.mp3"); //Source: Edge of Tomorrow from TeknoAXE's Royalty Free Music on YouTube
  clickFx = loadSound("media/sound_fx/click.mp3"); //Source: following sound effects are from pixabay.com
  pistolShot = loadSound('media/sound_fx/pistol_shot.mp3');
  reload = loadSound('media/sound_fx/reload.mp3');
  noAmmo = loadSound('media/sound_fx/noAmmo.mp3');
  errorFx = loadSound('media/sound_fx/errorFx.mp3');
  healFx = loadSound('media/sound_fx/healed.mp3');
  explosionFx = loadSound('media/sound_fx/explosionFx.mp3');
  P1_hurt_soundFx = loadSound('media/sound_fx/P1_hurt_soundFx.mp3');
  P2_hurt_soundFx = loadSound('media/sound_fx/P2_hurt_soundFx.mp3');
  explosiveUpgradeFx = loadSound('media/sound_fx/damageCheat.mp3');
  goldCheatFx = loadSound('media/sound_fx/goldCheat.mp3');

  //MP4
  introVideo = createVideo("media/video/introVideo.mp4")

  //Character Sprites //Source: Tech Dungeon: Roguelite (Demo) by Trevor Pupkin from itch.io
  //Player One Images
  playerOne_default_idle_Ani = loadAnimation("images/characters/idle_default_player_one_1.png", 2);
  playerOne_default_walkR_Ani = loadAnimation("images/characters/walkR_default_player_one_1.png", 4);
  playerOne_default_walkL_Ani = loadAnimation("images/characters/walkL_default_player_one_1.png", 4);
  playerOne_default_aim_Ani = loadAnimation("images/characters/aim_default_player_one_1.png", 2);
  playerOne_default_hurt_Ani = loadAnimation("images/characters/hurt_default_player_one_1.png", 6);

  //Player Two Images
  playerTwo_default_idle_Ani = loadAnimation("images/characters/idle_default_player_two_1.png", 2);
  playerTwo_default_walkR_Ani = loadAnimation("images/characters/walkR_default_player_two_1.png", 4);
  playerTwo_default_walkL_Ani = loadAnimation("images/characters/walkL_default_player_two_1.png", 4);
  playerTwo_default_aim_Ani = loadAnimation("images/characters/aim_default_player_two_1.png", 2);
  playerTwo_default_hurt_Ani = loadAnimation("images/characters/hurt_default_player_two_1.png", 6);

  //Shared between players
  deathExplosion_Ani = loadAnimation("images/characters/explosion_1.png", 5); //death animation
  explosion_Ani = loadAnimation("images/others/bullet_explosion_8.png", 6);
  hugeExplosion_Ani = loadAnimation("images/others/bullet_explosion_8.png", 6);
  goldCoin_Ani = loadAnimation("images/others/gold/Gold_1.png", 10);
}

//_______________________________________________________SetUp____________________________________________________//
function setup() {
  new Canvas(W, H);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  world.gravity.y = 10;
  introVideo.hide();

  //Sprites
  popUpSprites();
  UI_Sprites();
  gameSprites();

  //Buttons
  menuButtons();
  gameButtons();

  //Data
  leaderboardData();
  defaultSettings(); //add more sounds into the setting
}

//_______________________________________________________Draw____________________________________________________//
function draw() {
  background(155);
  shootingPhysic();

  //Popup, Sliders and Checks positions change based on the current screen
  if (screen.current == 2) {
    movePopUp = 0;
    soundCheck.position(650, 533);
    musicCheck.position(650, 463);
    soundSlider.position(700, 530);
    musicSlider.position(700, 460);
  } else if (screen.current == 3) {
    movePopUp = -100;
    soundCheck.position(650, 533 - 100);
    musicCheck.position(650, 463 - 100);
    soundSlider.position(700, 530 - 100);
    musicSlider.position(700, 460 - 100);
  }

  //Screen Change System
  if (screen.current == screen.loading) {  ////// LOADING SCREEN
    loadingScreen();

  } else if (screen.current == screen.intro) { ////// INTRO VIDEO SCREEN
    image(introVideo, W / 2, H / 2, W, H);
    //Skip intro video
    stroke("black");
    fill("pearl");
    textSize(15);
    textFont(gameFont);
    text("Press space to skip intro...", W / 2, 750);
    introVideo.play();
    if (kb.presses('space')) {
      introVideo.stop();
      introEnded();
    }
    introVideo.onended(introEnded);

  } else if (screen.current == screen.menu) {  ////// MAIN MENU SCREEN
    drawMainMenu();

  } else if (screen.current == screen.game) {  ////// GAME SCREEN
    drawGame();

  } else if (screen.current == screen.credit) {
    drawCreditScreen();

  }

  popUp();

  //mouseXY(); //Show Mouse X and Y for testing
  if (kb.presses('p')) {
    console.log(check)
  }
}
//____________________________________________________Global Functions__________________________________________________//
function mouseXY() {
  // mouse x,y display
  fill("white");
  textSize(20);
  textFont(gameFont);
  text("x" + mouseX + "," + "y" + mouseY, mouseX, mouseY);
}

function leaderboardData() {
  for (let i = 0; i < leaderboardScores.length; i++) {
    let index = splitTokens(leaderboardScores[i]);
    ranks.push(index);
  }
  for (let i = 0; i < ranks.length; i++) {
    let index = {
      name: ranks[i][0],
      score: ranks[i][1],
      date: ranks[i][2],
    };
    highScores.push(index);
  }
}

function popUp() {
  //Gold Coing Animation Settings
  goldCoin_Ani.loop();
  goldCoin_Ani.scale = 0.04;
  goldCoin_Ani.frameDelay = 10;

  //leaderboard
  if (showLB == true) {
    //Hide All Buttons
    newGame.hide();
    leaderboard.hide();
    menuSettings.hide();
    creditButton.hide();
    leaderboardPop.visible = true;
  }

  if (settingsOpened == true) {
    //Hide All Buttons
    newGame.hide();
    leaderboard.hide();
    menuSettings.hide();
    creditButton.hide();
    settingPop.visible = true;
    gameMenuBG.visible = false;
  }

  if (renamePlayers == true) {
    //Hide All Buttons
    renamePop.visible = true;
    gameMenuBG.visible = false;
  }

  if (gameMenuOpened == true) {
    gameMenuBG.visible = true;
  }

  if (endTurnWarning == true) {
    endTurnPop.visible = true;
  } else if (endTurnWarning == false) {
    endTurnPop.visible = false;
  }


  //Winner Display
  if (playerWins == true) {
    winPopUp.visible = true;

    pauseButton.attribute("disabled", "");
    aimButton.attribute("disabled", "");
    cancelButton.attribute("disabled", "");
    shopButton.attribute("disabled", "");
    closeButton.attribute("disabled", "");
    endButton.attribute("disabled", "");

    shadeScreen.visible = true;

    quitButton.show();
  }
}

function popUpSprites() {
  //Leaderboard Pop Up
  leaderboardPop = new Sprite(W / 2, H / 2 + 100);
  leaderboardPop.draw = function () {
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0, 500, 375);

    fill("white");
    textFont(gameFont);
    textSize(40);
    text("Leaderboard", 0, -160);
    textSize(20);
    text("Rank", -180, -105);
    text("Name", -80, -105);
    text("Turns", 20, -105);
    text("Date", 140, -105);
    for (let i = 0; i < highScores.length; i++) {
      text(i + 1, -180, -65 + 40 * i);
      text(highScores[i].name, -80, -65 + 40 * i);
      text(highScores[i].score, 20, -65 + 40 * i);
      text(highScores[i].date, 140, -65 + 40 * i);
    }
  };
  leaderboardPop.collider = "n";
  leaderboardPop.visible = false;
  leaderboardPop.layer = 1000;

  //Settings Pop Up
  settingPop = new Sprite(W / 2, H / 2 + 100);
  settingPop.draw = function () {
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0 + movePopUp, 500, 375);

    fill("white");
    textFont(gameFont);
    textSize(40);
    text("Settings", 0, -130 + movePopUp);

    //Volume Display
    textSize(20);
    text("MUSIC", -180, -30 + movePopUp);
    text("SOUND", -180, 40 + movePopUp);
    if (musicCheck.checked()) {
      introMusic.setVolume(0);
      battleMusic.setVolume(0);
      text('0%', -100, -30 + movePopUp);
    } else {
      introMusic.setVolume(musicSlider.value());
      battleMusic.setVolume(musicSlider.value());
      text(Math.floor(musicSlider.value() * 100) + '%', -100, -30 + movePopUp);
    }

    if (soundCheck.checked()) {
      clickFx.setVolume(0);
      pistolShot.setVolume(0);
      noAmmo.setVolume(0);
      reload.setVolume(0);
      text('0%', -100, 40 + movePopUp);
    } else {
      clickFx.setVolume(soundSlider.value());
      pistolShot.setVolume(soundSlider.value());
      noAmmo.setVolume(soundSlider.value() + 1);
      reload.setVolume(soundSlider.value());
      errorFx.setVolume(soundSlider.value());
      healFx.setVolume(soundSlider.value());
      explosionFx.setVolume(soundSlider.value() + 1);
      P1_hurt_soundFx.setVolume(soundSlider.value() + 1);
      P2_hurt_soundFx.setVolume(soundSlider.value() + 1);
      explosiveUpgradeFx.setVolume(soundSlider.value() + 0.5);
      goldCheatFx.setVolume(soundSlider.value() + 0.5);
      text(Math.floor(soundSlider.value() * 100) + '%', -100, 40 + movePopUp);
    }
  };
  settingPop.collider = "n";
  settingPop.visible = false;
  settingPop.layer = 1000;

  //Game Menu PopUp
  gameMenuBG = new Sprite(W / 2, H / 2);
  gameMenuBG.draw = function () {
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0, 300, 460);
    fill("white");
    textFont(gameFont);
    textSize(40);
    text("Paused", 0, -190);
  };
  gameMenuBG.collider = "n";
  gameMenuBG.visible = false;
  gameMenuBG.layer = 999;

  //Rename Player PopUp
  renamePop = new Sprite(W / 2, H / 2);
  renamePop.draw = function () {
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0, 800, 400);

    fill("white");
    textFont(gameFont);
    textSize(40);
    text("Rename", 0, -130);

    //Rename Input Boxes
    fill("white");
    textFont(gameFont);
    textSize(20);
    text('Player One Name', -250, -40);
    text('Player Two Name', -250, 30);
  }
  renamePop.collider = 'n';
  renamePop.visible = false;
  renamePop.layer = 1000;

  //End Turn Warning PopUp
  endTurnPop = new Sprite(W / 2, H / 2);
  endTurnPop.draw = function () {
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0, 600, 300);

    fill("white");
    textFont(gameFont);
    textSize(40);
    text("Skip Turn??", 0, -110);

    fill("white");
    textFont(gameFont);
    textSize(20);
    text("You haven't used your bullet yet!", 0, -30);
    text("Are you sure you want to skip your turn?", 0, 10);
  }
  endTurnPop.collider = 'n';
  endTurnPop.visible = false;
  endTurnPop.layer = 1000;

  winPopUp = new Sprite(W / 2, H / 2);
  winPopUp.draw = function () {
    noStroke();
    fill(0, 0, 0, 150);
    rect(0, 0, 600, 400);

    fill("white");
    textFont(gameFont);
    textSize(40);
    text(winningPlayer + "  Wins", 0, -110);
    textSize(30);
    text('Turn : ' + turnNumber, 0, -30);
    text(losingPlayer + "... you sucks, lol.", 0, 40);

    if (losingPlayer == "James" || losingPlayer == "James Baker") {
      textSize(15);
      text("Just kidding. Sorry, please don't mark me down.", 0, 80);
    }
  }
  winPopUp.collider = 'n';
  winPopUp.visible = false;
}

//_______________________________________________________Loading Screen____________________________________________________//
function loadingScreen() {
  stroke("black");
  fill("pearl");
  textSize(30);
  textFont(gameFont);

  //Loading Screen
  if (loadNumber == 1) {
    image(loadingScreen1, W / 2, H / 2, W, H);
    text("Loading...", 110, 750);
  } else if (loadNumber == 2) {
    image(loadingScreen2, W / 2, H / 2, W, H);
    text("Loading...", 110, 750);
  }

  loadingTimer--;
  if (loadingTimer < 0) {
    if (loadNumber == 1) {
      image(loadingScreen1, W / 2, H / 2, W, H);
      text("Press space to continue...", 220, 750);
      if (kb.presses("space") || mouse.presses()) {
        clickFx.play();
        screen.current = 1; // first loading screen goes into intro video
      }
    } else if (loadNumber == 2) {
      image(loadingScreen2, W / 2, H / 2, W, H);
      text("Press space to continue...", 220, 750);
      if (kb.presses("space") || mouse.presses()) {
        clickFx.play();
        battleMusic.play();
        battleMusic.loop();
        introMusic.stop();
        isGameReady = true;
        screen.current = 3; // second loading screen goes into the game
      }
    }
  }
}

function introEnded() {
  introVideo.stop();
  introMusic.play();
  introMusic.loop();
  screen.current = 2; // Main Menu after intro video ends
}

//_______________________________________________________Main Menu____________________________________________________//
function drawMainMenu() {
  //Show all Menu Buttons
  newGame.show();
  leaderboard.show();
  menuSettings.show();
  creditButton.show();

  //Main Menu
  image(menuScreen, W / 2, H / 2, W, H);

  //Title Text
  stroke("black");
  textSize(200);
  textFont(titleFont);
  fill(255);
  text("Blast You", W / 2 - 3, 150 - 3);
  fill(4, 9, 38);
  text("Blast You", W / 2, 150);
}

function defaultSettings() {
  //Default Volume Settings
  introMusic.setVolume(musicSlider.value());
  battleMusic.setVolume(musicSlider.value());
  clickFx.setVolume(soundSlider.value());
  noAmmo.setVolume(soundSlider.value() + 0.5);
  reload.setVolume(soundSlider.value());
  pistolShot.setVolume(soundSlider.value());
  healFx.setVolume(soundSlider.value());
  explosionFx.setVolume(soundSlider.value() + 1);
  errorFx.setVolume(soundSlider.value());
  P1_hurt_soundFx.setVolume(soundSlider.value() + 1);
  P2_hurt_soundFx.setVolume(soundSlider.value() + 1);
  explosiveUpgradeFx.setVolume(soundSlider.value() + 0.5);
  goldCheatFx.setVolume(soundSlider.value() + 0.5);
}

function menuButtons() {
  //New Game Button
  newGame = createButton("New Game");
  newGame.position(W / 2 - 100, H / 2);
  newGame.style("width", "200px");
  newGame.style("height", "50px");
  newGame.style("background-color", "#040926");
  newGame.style("color", "white");
  newGame.style("font-size", "20px");
  newGame.mouseClicked(prepareGame);
  newGame.hide();

  //Leaderboard Button
  leaderboard = createButton("Leaderboard");
  leaderboard.position(W / 2 - 100, H / 2 + 100);
  leaderboard.style("width", "200px");
  leaderboard.style("height", "50px");
  leaderboard.style("background-color", "#040926");
  leaderboard.style("color", "white");
  leaderboard.style("font-size", "20px");
  leaderboard.mouseClicked(showLeaderboard);
  leaderboard.hide();

  //Close Leaderboard and Settings Button
  closePopUp = createButton("Close");
  closePopUp.position(W / 2 - 75, H / 2 + 230);
  closePopUp.style("width", "150px");
  closePopUp.style("height", "30px");
  closePopUp.style("background-color", "#040926");
  closePopUp.style("color", "white");
  closePopUp.style("font-size", "20px");
  closePopUp.mouseClicked(closeMenuPopUp);
  closePopUp.hide();

  //Setting Button // already exist in the game please combine them together
  menuSettings = createButton("Settings");
  menuSettings.position(W / 2 - 100, H / 2 + 200);
  menuSettings.style("width", "200px");
  menuSettings.style("height", "50px");
  menuSettings.style("background-color", "#040926");
  menuSettings.style("color", "white");
  menuSettings.style("font-size", "20px");
  menuSettings.mouseClicked(showSetting);
  menuSettings.hide();

  //Setting Sliders
  //Music Volume Control
  musicSlider = createSlider(0, 1, 0.05, 0.01);
  musicSlider.style("width", "200px");
  musicSlider.hide();

  //Sound Volume Control
  soundSlider = createSlider(0, 1, 0.1, 0.01);
  soundSlider.style("background-color", "black");
  soundSlider.style("width", "200px");
  soundSlider.hide();

  //Setting Check Boxes
  //Music Checker
  musicCheck = createCheckbox("", false);
  musicCheck.hide();

  //Sound Checker
  soundCheck = createCheckbox("", false);
  soundCheck.hide();

  //Credits
  creditButton = createButton("Credits");
  creditButton.position(W / 2 - 100, H / 2 + 300);
  creditButton.style("width", "200px");
  creditButton.style("height", "50px");
  creditButton.style("background-color", "#040926");
  creditButton.style("color", "white");
  creditButton.style("font-size", "20px");
  creditButton.mouseClicked(showCredits);
  creditButton.hide();

  closeCreditsScreen = createButton("Close");
  closeCreditsScreen.position(W / 2 - 100, H / 2 + 300);
  closeCreditsScreen.style("width", "200px");
  closeCreditsScreen.style("height", "50px");
  closeCreditsScreen.style("background-color", "#040926");
  closeCreditsScreen.style("color", "white");
  closeCreditsScreen.style("font-size", "20px");
  closeCreditsScreen.mouseClicked(closeCredits);
  closeCreditsScreen.hide();
}

function showLeaderboard() {
  clickFx.play();
  showLB = true;
  closePopUp.show();
}

function showSetting() {
  clickFx.play();
  musicSlider.show();
  soundSlider.show();
  soundCheck.show();
  musicCheck.show();

  //Main Menu Or Game Menu
  if (screen.current == 2) {
    settingsOpened = true;
    closePopUp.show();
  }
  if (screen.current == 3) {
    settingsOpened = true;
    gameMenuOpened = false;
    backButton.show();
  }

  //Hide Other Game Menu Buttons
  unpauseButton.hide();
  gameSetting.hide();
  quitButton.hide();
  renameButton.hide();
  creditButton.hide();
}

function closeMenuPopUp() {
  clickFx.play();
  closePopUp.hide();
  settingPop.visible = false;
  leaderboardPop.visible = false;

  //Close Leaderboard
  showLB = false;

  //Close Setting
  settingsOpened = false;
  musicSlider.hide();
  soundSlider.hide();
  soundCheck.hide();
  musicCheck.hide();

  //Show the Menu
  newGame.show();
  leaderboard.show();
  menuSettings.show();
  creditButton.show();
}

function showCredits() {
  clickFx.play();
  screen.current = 4;

  //Hide the Menu
  newGame.hide();
  leaderboard.hide();
  menuSettings.hide();
  creditButton.hide();

  //Show Close Button
  closeCreditsScreen.show();
}

function closeCredits() {
  clickFx.play();
  screen.current = 2;

  //Show the Menu
  newGame.show();
  leaderboard.show();
  menuSettings.show();
  creditButton.show();

  //Hide Close Button
  closeCreditsScreen.hide();
}

//_______________________________________________________Credits_______________________________________________________//
function drawCreditScreen() {
  textFont(gameFont);
  fill(44, 44, 84);
  rect(W / 2, H / 2, W, H)
  tint(255, 100);
  image(credit_BG, W / 2, H / 2, W, H);
  tint(255, 255);

  fill('white');
  textSize(55);
  text("Credits", W / 2, 70);

  //Left
  textAlign(RIGHT, CENTER);
  textSize(25);
  text("Background Images", 650, 160);
  text("Font Styles", 650, 260);
  text("Character Sprites", 650, 360);
  text("Explosion Sprites", 650, 460);
  text("Images and Sprite Editing", 650, 560);
  textSize(15);
  text("AI Generated from NightCafe Creator", 650, 190);
  text("Robus by Toko Laris Djaja from fontspace.com", 650, 290);
  text("Zekton by Raymond Larabie from 1001fonts.com", 650, 310);
  text("Tech Dungeon: Roguelite (Demo) by Trevor Pupkin from itch.io", 650, 390);
  text("Explosion Animation by Jetrel from OpenGameArt.Org", 650, 490);
  text("Photoshop 2019 by Adobe Inc.", 650, 590);



  //Right
  textAlign(LEFT, CENTER);
  textSize(25);
  text("Main Menu Music", 750, 160);
  text("Game Music", 750, 260);
  text("Sound Effects", 750, 360);
  text("Intro Video", 750, 460);
  text("Music and Sound Effects Editing", 750, 560);
  textSize(15);
  text("LIL MORĪ from RoyaltyFreePlanet on YouTube", 750, 190);
  text("Edge of Tomorrow from TeknoAXE's Royalty Free Music on YouTube", 750, 290);
  text("All of the free sound effects are downloaded from pixabay.com", 750, 390);
  text("Created using Canva on www.canva.com", 750, 490);
  text("FL Studio 21 by Image-Line", 750, 590);


  textAlign(CENTER, CENTER);
}

//_______________________________________________________Game Start____________________________________________________//
function prepareGame() {
  clickFx.play();
  loadingTimer = 100;
  loadNumber = 2;
  screen.current = 0;

  //Hide the Menu
  newGame.hide();
  leaderboard.hide();
  menuSettings.hide();
  creditButton.hide();

  //Reset Everything
  playerTurn = 1;
  gunLoaded = true;
  boughtItem = false;
  playerOneName = 'Ron';
  playerTwoName = 'Jake';
  playerOneGold = 50;
  playerTwoGold = 50;
  playerOneHP = 100;
  playerTwoHP = 100;
  bulletDamage1 = 5;
  bulletDamage2 = 5;
  playerOne.x = random(30, 130);
  playerOne.y = 450;
  playerTwo.x = random(1250, 1350);
  playerTwo.y = 450;
  playerWins = false;
  upgraded = false;

  playerOne.changeAni('one_default_idle');
  playerTwo.changeAni('two_default_idle');

  pauseButton.removeAttribute("disabled");
  aimButton.removeAttribute("disabled");
  cancelButton.removeAttribute("disabled");
  shopButton.removeAttribute("disabled");
  closeButton.removeAttribute("disabled");
  endButton.removeAttribute("disabled");

  redrawTerrain();
}

function drawGame() {
  tint(255, 150);
  image(battleBackground, W / 2, H / 2 - 100, W, H);
  tint(255, 255);
  if (isGameReady == true) {
    defaultMode();
    isGameReady = false;
    playerOneScreen.visible = true;
    playerTwoScreen.visible = true;
  }

  bedrock.visible = true;
  UI.visible = true;
  topBar.visible = true;
  playerTwo.visible = true;
  playerOne.visible = true;
  playerOneStats.visible = true;
  playerTwoStats.visible = true;
  playerOneShortcut.visible = true;
  playerTwoShortcut.visible = true;
  terrain.visible = true;
  pauseButton.show();
  endButton.show();
  shootingPhysic();

  //Stop Players from moving when they aim
  if (aimMode == false && shadeScreen.visible == false) {
    movement();
  }

  //Turn Display
  stroke('black');
  strokeWeight(1);
  fill(44, 44, 84);
  textSize(70);
  if (playerTurn == 1) {
    playerOneTurn.visible = true;
    playerTwoTurn.visible = false;

    turnCounter--;
    if (turnCounter > 0) {
      text(playerOneName + "'s Turn", W / 2, H / 2 - 100);
    }
  } else if (playerTurn == 2) {
    playerOneTurn.visible = false;
    playerTwoTurn.visible = true;
    turnCounter--;
    if (turnCounter > 0) {
      text(playerTwoName + "'s Turn", W / 2, H / 2 - 100);
    }
  }

  //No Ammo Error Message
  if (showNoAmmo == true) {
    noAmmoCounter--;
    if (noAmmoCounter < 0) {
      showNoAmmo = false;
    } else {
      stroke('black');
      strokeWeight(1);
      fill(44, 44, 84);
      textSize(70);
      text("No Ammo", W / 2, H / 2 - 100);
    }
  }

  //No Gold Error Message
  if (showNoGold == true) {
    noGoldErrorCounter--;
    if (noGoldErrorCounter < 0) {
      showNoGold = false;
    } else {
      stroke('black');
      strokeWeight(1);
      fill(44, 44, 84);
      textSize(70);
      text("Not Enough Gold", W / 2, H / 2 - 100);
    }
  }

  //Gun Already Loaded Error Message
  if (showGunLoaded == true) {
    gunLoadedErrorCounter--;
    if (gunLoadedErrorCounter < 0) {
      showGunLoaded = false;
    } else {
      stroke('black');
      strokeWeight(1);
      fill(44, 44, 84);
      textSize(70);
      text("Gun is Already Loaded", W / 2, H / 2 - 100);
    }
  }

  //Already Bought Item This Turn
  if (alreadyUsedShop == true) {
    shopErrorCounter--;
    if (shopErrorCounter < 0) {
      alreadyUsedShop = false;
    } else {
      stroke('black');
      strokeWeight(1);
      fill(44, 44, 84);
      textSize(70);
      text("Cannot buy anymore this turn!", W / 2, H / 2 - 100);
    }
  }
}
//______________________________________________Game UI Sprites___________________________________________//
function UI_Sprites() {
  //Bedrock
  bedrock = new Sprite(W / 2, 650);
  bedrock.w = W;
  bedrock.h = 5;
  bedrock.color = "black";
  bedrock.collider = "s";
  bedrock.visible = false;
  bedrock.layer = 100;

  //UI
  UI = new Sprite(W / 2, 725); //change color
  UI.draw = function () {
    noStroke();
    fill(52, 73, 94);
    rect(0, -35, W, 75);
    fill(44, 62, 80);
    rect(0, 40, W, 75);

    //UI Background Image
    tint(255, 50);
    image(backgroundUI, 0, 0, width, 150);

    //Profile Pictures
    stroke('black');
    strokeWeight(1);
    tint(255, 255);
    fill("darkblue"); // change color
    rect(-610, 0, 140, 140);
    image(playerOneProfile, -610, 0, 130, 130);
    fill("darkred"); // change color
    rect(610, 0, 140, 140);
    image(playerTwoProfile, 610, 0, 130, 130);
  }
  UI.collider = "n";
  UI.visible = false;
  UI.layer = 101;

  //Top Bar
  topBar = new Sprite(W / 2, 0);
  topBar.draw = function () {

    stroke("black");
    strokeWeight(3);
    fill(44, 62, 80);
    rect(0, 0, W + 20, 20); //small middle bars
    quad(-710, -10, -550, -10, -600, 50, -710, 50); //left Shape
    quad(710, -10, 550, -10, 600, 50, 710, 50); //Right Shape
    quad(-250, -10, 250, -10, 200, 50, -200, 50); //Middle Shape
    noStroke();
    rect(0, -1.5, W + 20, 20); //small middle bars

    tint(255, 50);
    image(backgroundTopBar, 0, 24, width, 50);
    tint(255, 255);
  }
  topBar.collider = "n";
  topBar.layer = 499;
  topBar.visible = false;

  //Shade The Screen on Pause
  shadeScreen = new Sprite();
  shadeScreen.draw = function () {
    fill(0, 0, 0, 50);
    rect(0, 0, W, H);
  }
  shadeScreen.collider = 'n';
  shadeScreen.visible = false;
  shadeScreen.layer = 500;

  //Turn Display
  playerOneTurn = new Sprite(W / 2, 30);
  playerOneTurn.draw = function () {
    textSize(30);
    fill('white');
    text(playerOneName + "'s Turn", 0, -10);

    textSize(20);
    text('Turn: ' + turnNumber, 640, -5);
  }
  playerOneTurn.collider = 'n';
  playerOneTurn.visible = false;

  playerTwoTurn = new Sprite(W / 2, 30);
  playerTwoTurn.draw = function () {
    textSize(30);
    fill('white');
    text(playerTwoName + "'s Turn", 0, -10);

    textSize(20);
    text('Turn: ' + turnNumber, 640, -5);
  }
  playerTwoTurn.collider = 'n';
  playerTwoTurn.visible = false;

  //Stats Display
  playerOneStats = new Sprite(300, 50);
  playerOneStats.draw = function () {
    stroke("black");
    strokeWeight(1);
    fill(0, 0, 0, 50);
    quad(-160, 50, 160, 50, 245, -60, -245, -60); //Left Stats Screen

    animation(goldCoin_Ani, 10, -15);

    noStroke();
    fill('white');
    textSize(20);
    text(playerOneName, -70, -20);
    text('Gold: ' + playerOneGold, 70, -18);
    text('HP: ' + playerOneHP + '%', -100, 20);

    stroke('black');
    strokeWeight(1);
    if (playerOneHP <= 60 && playerOneHP > 31) { //HP Bar change color based on HP left
      fill('yellow');
    } else if (playerOneHP <= 30) {
      fill('red');
    } else {
      fill('green');
    }
    rectMode(CORNER);
    rect(-50, 20, playerOneHP * 2, 10);
    rectMode(CENTER);
  }
  playerOneStats.collider = "n";
  playerOneStats.layer = 498;
  playerOneStats.visible = false;

  playerTwoStats = new Sprite(1100, 50);
  playerTwoStats.draw = function () {
    stroke("black");
    strokeWeight(1);
    fill(0, 0, 0, 100);
    quad(-160, 50, 160, 50, 245, -60, -245, -60); //Right Stats Screen

    animation(goldCoin_Ani, 10, -15);

    noStroke();
    fill('white');
    textSize(20);
    text(playerTwoName, -70, -20);
    text('Gold: ' + playerTwoGold, 70, -18);
    text('HP: ' + playerTwoHP + '%', -100, 20);

    stroke('black');
    strokeWeight(1);
    if (playerTwoHP <= 60 && playerTwoHP > 31) { //HP Bar change color based on HP left
      fill('yellow');
    } else if (playerTwoHP <= 30) {
      fill('red');
    } else {
      fill('green');
    }
    rectMode(CORNER);
    rect(-50, 20, playerTwoHP * 2, 10);
    rectMode(CENTER);
  }
  playerTwoStats.collider = "n";
  playerTwoStats.layer = 498;
  playerTwoStats.visible = false;

  //Keyboard Shortcut Display
  playerOneShortcut = new Sprite(50,100);
  playerOneShortcut.draw = function () {
    fill('white');
    stroke('white');
    strokeWeight(0.5);
    textSize(13);
    text('Move - A, D', 0, -30);
    text('Jump - W', -6, -10);
    text('Aim - Mouse Drag', 18, 10);
    text('Shoot -  Release Mouse', 35, 30);
  }
  playerOneShortcut.collider = "n";
  playerOneShortcut.layer = 497;
  playerOneShortcut.visible = false;

  playerTwoShortcut = new Sprite(1350,100);
  playerTwoShortcut.draw = function () {
    fill('white');
    stroke('white');
    strokeWeight(0.5);
    textSize(13);
    text('J, L - Move', 5, -30);
    text('I - Jump', 14, -10);
    text('Mouse Drag - Aim', -18, 10);
    text('Release Mouse - Shoot', -35, 30);
  }
  playerTwoShortcut.collider = "n";
  playerTwoShortcut.layer = 497;
  playerTwoShortcut.visible = false;

  //Upgrades, Power and Angle
  playerOneScreen = new Sprite(360, 725);
  playerOneScreen.draw = function () {
    fill(0, 0, 0, 100);
    rect(0, 0, 350, 140);
    fill('white');
    rect(-82, 0, 150, 120); 
    rect(82, 0, 150, 120); 
    if (playerTurn == 1 && gunLoaded == true && upgraded == false) {
      fill('darkblue');
      rect(-82, 0, 145, 115);
      image(bulletIcon, -82, -20, 10,30);
      fill('white');
      textSize(20);
      text('Normal Shot', -82, 20);
    } else {
      fill('gray');
      rect(-82, 0, 145, 115);
    }
    if (playerTurn == 1 && gunLoaded == true && upgraded == true) {
      fill('darkblue');
      rect(82, 0, 145, 115);
      image(explosiveIcon, 82, -20, 10, 50);
      fill('white');
      textSize(20);
      text('Explosive Shot', 82, 20);
    } else {
      fill('gray');
      rect(82, 0, 145, 115);
    }
  }
  playerOneScreen.collider = 'n';
  playerOneScreen.visible = false;

  playerTwoScreen = new Sprite(1040, 725);
  playerTwoScreen.draw = function () {
    fill(0, 0, 0, 100);
    rect(0, 0, 350, 140);
    fill('white');
    rect(-82, 0, 150, 120); 
    rect(82, 0, 150, 120); 
    if (playerTurn == 2 && gunLoaded == true && upgraded == false) {
      fill('darkred');
      rect(-82, 0, 145, 115);
      image(bulletIcon, -82, -20, 10,30);
      fill('white');
      textSize(20);
      text('Normal Shot', -82, 20);
    } else {
      fill('gray');
      rect(-82, 0, 145, 115);
    }
    if (playerTurn == 2 && gunLoaded == true && upgraded == true) {
      fill('darkred');
      rect(82, 0, 145, 115);
      image(explosiveIcon, 82, -20, 10, 50);
      fill('white');
      textSize(20);
      text('Explosive Shot', 82, 20);
    } else {
      fill('gray');
      rect(82, 0, 145, 115);
    }
  }
  playerTwoScreen.collider = 'n';
  playerTwoScreen.visible = false;

  //Shop Mode
  playerOneShop = new Sprite(360, 725);
  playerOneShop.draw = function () {
    fill(0, 0, 0, 100);
    rect(0, 0, 350, 140);
    //Outlines
    fill('white');
    rect(-82, -32, 150, 61);
    rect(82, -32, 150, 61);
    rect(-82, 33, 150, 61);
    rect(82, 33, 150, 61);
    //BG
    fill(200);
    rect(-82, -32, 145, 55);
    rect(82, -32, 145, 55);
    rect(-82, 33, 145, 55);
    rect(82, 33, 145, 55);

    //Icons
    image(bulletIcon2, -122, -35, 30, 10);
    image(explosiveIcon2, -122, 32, 50, 10);
    image(healIcon, 42, -32, 28, 28);
    image(goldIcon, 42, 32, 28, 28);

    //Gold Cost
    textSize(12);
    noStroke();
    fill('red');
    text('Gold -' + ammoPrice, -122, -20);
    text('Gold -' + ExplosivePrice, -122, 45);
    text('Gold -' + pillPrice, 42, -13);
    text('Cheat', 42, 10);
    fill('green');
    text('Heal +20', 42, -53);
    text('Gold +100', 42, 53);
  }
  playerOneShop.collider = 'n';
  playerOneShop.visible = false;

  playerTwoShop = new Sprite(1040, 725);
  playerTwoShop.draw = function () {
    fill(0, 0, 0, 100);
    rect(0, 0, 350, 140);
    
    //Outlines
    fill('white');
    rect(-82, -32, 150, 61);
    rect(82, -32, 150, 61);
    rect(-82, 33, 150, 61);
    rect(82, 33, 150, 61);
    //BG
    fill(200);
    rect(-82, -32, 145, 55);
    rect(82, -32, 145, 55);
    rect(-82, 33, 145, 55);
    rect(82, 33, 145, 55);

    //Icons
    image(bulletIcon2, -122, -35, 30, 10);
    image(explosiveIcon2, -122, 32, 50, 10);
    image(healIcon, 42, -32, 28, 28);
    image(goldIcon, 42, 32, 28, 28);

    //Gold Cost
    textSize(12);
    noStroke();
    fill('red');
    text('Gold -' + ammoPrice, -122, -20);
    text('Gold -' + ExplosivePrice, -122, 45);
    text('Gold -' + pillPrice, 42, -13);
    text('Cheat', 42, 10);
    fill('green');
    text('Heal +20', 42, -53);
    text('Gold +100', 42, 53);
  }
  playerTwoShop.collider = 'n';
  playerTwoShop.visible = false;
}

//_________________________________________Game Screen Buttons & Inputs System_________________________________________________//
function gameButtons() {
  //Aim Button
  aimButton = createButton("AIM");
  aimButton.position(545, 660);
  aimButton.mouseClicked(aimMode);
  aimButton.style("width", "150px");
  aimButton.style("height", "60px");
  aimButton.style("background-color", "#2c2c54");
  aimButton.style("border-color", "#ecf0f1");
  aimButton.style("color", "white");
  aimButton.style("font-size", "20px");
  aimButton.style("border-radius", "50px");
  aimButton.hide();

  //Cancel Button
  cancelButton = createButton("CANCEL");
  cancelButton.position(545, 660);
  cancelButton.mouseClicked(defaultMode);
  cancelButton.style("width", "150px");
  cancelButton.style("height", "60px");
  cancelButton.style("background-color", "#40407a");
  cancelButton.style("border-color", "#ecf0f1");
  cancelButton.style("color", "white");
  cancelButton.style("font-size", "20px");
  cancelButton.style("border-radius", "50px");
  cancelButton.hide();

  //Shop Button
  shopButton = createButton("SHOP");
  shopButton.position(545, 730);
  shopButton.mouseClicked(shopMode);
  shopButton.style("width", "150px");
  shopButton.style("height", "60px");
  shopButton.style("background-color", "#2c2c54");
  shopButton.style("border-color", "#ecf0f1");
  shopButton.style("color", "white");
  shopButton.style("font-size", "20px");
  shopButton.style("border-radius", "50px");
  shopButton.hide();

  //Close Button
  closeButton = createButton("CLOSE");
  closeButton.position(545, 730);
  closeButton.mouseClicked(defaultMode);
  closeButton.style("width", "150px");
  closeButton.style("height", "60px");
  closeButton.style("background-color", "#40407a");
  closeButton.style("border-color", "#ecf0f1");
  closeButton.style("color", "white");
  closeButton.style("font-size", "20px");
  closeButton.style("border-radius", "50px");
  closeButton.hide();

  //Pause Button
  pauseButton = createButton("Pause");
  pauseButton.position(5, 5);
  pauseButton.mouseClicked(openGameMenu);
  pauseButton.style("width", "90px");
  pauseButton.style("height", "40px");
  pauseButton.style("background-color", "rgb(0, 0, 0, 0)");
  pauseButton.style("color", "white");
  pauseButton.style("font-size", "20px");
  pauseButton.style("border", "0px");
  pauseButton.hide();

  //Unpause Button
  unpauseButton = createButton("Unpause");
  unpauseButton.position(W / 2 - 100, H / 2 - 130);
  unpauseButton.mouseClicked(unpauseGame);
  unpauseButton.style("width", "200px");
  unpauseButton.style("height", "50px");
  unpauseButton.style("background-color", "#040926");
  unpauseButton.style("color", "white");
  unpauseButton.style("font-size", "20px");
  unpauseButton.hide();

  //In-game Setting Button
  gameSetting = createButton("Settings");
  gameSetting.position(W / 2 - 100, H / 2 + 50);
  gameSetting.mouseClicked(showSetting);
  gameSetting.style("width", "200px");
  gameSetting.style("height", "50px");
  gameSetting.style("background-color", "#040926");
  gameSetting.style("color", "white");
  gameSetting.style("font-size", "20px");
  gameSetting.hide();

  //Leaderboard Button
  renameButton = createButton("Rename");
  renameButton.position(W / 2 - 100, H / 2 - 40);
  renameButton.mouseClicked(renameMenu);
  renameButton.style("width", "200px");
  renameButton.style("height", "50px");
  renameButton.style("background-color", "#040926");
  renameButton.style("color", "white");
  renameButton.style("font-size", "20px");
  renameButton.hide();

  //Quit Game Button
  quitButton = createButton("Quit Game");
  quitButton.position(W / 2 - 100, H / 2 + 140);
  quitButton.mouseClicked(quitGame);
  quitButton.style("width", "200px");
  quitButton.style("height", "50px");
  quitButton.style("background-color", "#040926");
  quitButton.style("color", "white");
  quitButton.style("font-size", "20px");
  quitButton.hide();

  //Back Game Menu Button
  backButton = createButton("Back");
  backButton.position(W / 2 - 75, H / 2 + 130);
  backButton.style("width", "150px");
  backButton.style("height", "30px");
  backButton.style("background-color", "#040926");
  backButton.style("color", "white");
  backButton.style("font-size", "20px");
  backButton.mouseClicked(backGameMenu);
  backButton.hide();

  //End Turn Button
  endButton = createButton('END');
  endButton.position(705, 660);
  endButton.mouseClicked(endTurn);
  endButton.style("width", "150px");
  endButton.style("height", "130px");
  endButton.style("background-color", "#2c2c54");
  endButton.style("border-color", "#ecf0f1");
  endButton.style("color", "white");
  endButton.style("font-size", "50px");
  endButton.style("border-radius", "50px");
  endButton.hide();

  //Player One Name Input
  playerOneInput = createInput();
  playerOneInput.position(W / 2 - 120, H / 2 - 50);
  playerOneInput.style("width", "300px");
  playerOneInput.style("height", "30px");
  playerOneInput.style("background-color", "white");
  playerOneInput.style("color", "black");
  playerOneInput.style("font-size", "20px");
  playerOneInput.hide();

  //Player One Name Confirm Button
  confirm1 = createButton('Confirm');
  confirm1.position(W / 2 + 210, H / 2 - 50);
  confirm1.mouseClicked(renamePlayerOne);
  confirm1.style("width", "150px");
  confirm1.style("height", "37px");
  confirm1.style("background-color", "#040926");
  confirm1.style("color", "white");
  confirm1.style("font-size", "20px");
  confirm1.hide();

  //Player Two Name Input
  playerTwoInput = createInput();
  playerTwoInput.position(W / 2 - 120, H / 2 + 20);
  playerTwoInput.style("width", "300px");
  playerTwoInput.style("height", "30px");
  playerTwoInput.style("background-color", "white");
  playerTwoInput.style("color", "black");
  playerTwoInput.style("font-size", "20px");
  playerTwoInput.hide();

  //Player Two Name Confirm Button
  confirm2 = createButton('Confirm');
  confirm2.position(W / 2 + 210, H / 2 + 19);
  confirm2.mouseClicked(renamePlayerTwo);
  confirm2.style("width", "150px");
  confirm2.style("height", "37px");
  confirm2.style("background-color", "#040926");
  confirm2.style("color", "white");
  confirm2.style("font-size", "20px");
  confirm2.hide();

  //Confirmation on End Turn if player haven't use their shot yet
  confirmEndButton = createButton('Confirm');
  confirmEndButton.position(W / 2 + 50, H / 2 + 75);
  confirmEndButton.mouseClicked(confirmEndTurn);
  confirmEndButton.style("width", "150px");
  confirmEndButton.style("height", "37px");
  confirmEndButton.style("background-color", "#040926");
  confirmEndButton.style("color", "white");
  confirmEndButton.style("font-size", "20px");
  confirmEndButton.hide();

  cancelEndButton = createButton('Cancel');
  cancelEndButton.position(W / 2 - 200, H / 2 + 75);
  cancelEndButton.mouseClicked(cancelEndTurn);
  cancelEndButton.style("width", "150px");
  cancelEndButton.style("height", "37px");
  cancelEndButton.style("background-color", "#040926");
  cancelEndButton.style("color", "white");
  cancelEndButton.style("font-size", "20px");
  cancelEndButton.hide();

  //Shop Item Buttons
  P1_item1 = createButton('Normal Ammo');
  P1_item1.position(273, 663);
  P1_item1.mouseClicked(buyAmmo);
  P1_item1.style("width", "80px");
  P1_item1.style("height", "60px");
  P1_item1.style("background-color", "darkblue");
  P1_item1.style("border-color", "white");
  P1_item1.style("color", "white");
  P1_item1.style("font-size", "15px");
  P1_item1.hide();

  P1_item2 = createButton('Healing Pill');
  P1_item2.position(437, 663);
  P1_item2.mouseClicked(buyPills);
  P1_item2.style("width", "80px");
  P1_item2.style("height", "60px");
  P1_item2.style("background-color", "darkblue");
  P1_item2.style("border-color", "white");
  P1_item2.style("color", "white");
  P1_item2.style("font-size", "15px");
  P1_item2.hide();

  P1_item3 = createButton('Explosive Ammo');
  P1_item3.position(273, 728);
  P1_item3.mouseClicked(buyExplosive);
  P1_item3.style("width", "80px");
  P1_item3.style("height", "60px");
  P1_item3.style("background-color", "darkblue");
  P1_item3.style("border-color", "white");
  P1_item3.style("color", "white");
  P1_item3.style("font-size", "15px");
  P1_item3.hide();

  P1_item4 = createButton('Bribe James');
  P1_item4.position(437, 728);
  P1_item4.mouseClicked(cheatGold);
  P1_item4.style("width", "80px");
  P1_item4.style("height", "60px");
  P1_item4.style("background-color", "darkblue");
  P1_item4.style("border-color", "white");
  P1_item4.style("color", "white");
  P1_item4.style("font-size", "15px");
  P1_item4.hide();

  P2_item1 = createButton('  Normal  Ammo');
  P2_item1.position(953, 663);
  P2_item1.mouseClicked(buyAmmo);
  P2_item1.style("width", "80px");
  P2_item1.style("height", "60px");
  P2_item1.style("background-color", "darkred");
  P2_item1.style("border-color", "white");
  P2_item1.style("color", "white");
  P2_item1.style("font-size", "15px");
  P2_item1.style("border-radius", "5px");
  P2_item1.hide();

  P2_item2 = createButton('Healing Pill');
  P2_item2.position(1117, 663);
  P2_item2.mouseClicked(buyPills);
  P2_item2.style("width", "80px");
  P2_item2.style("height", "60px");
  P2_item2.style("background-color", "darkred");
  P2_item2.style("border-color", "white");
  P2_item2.style("color", "white");
  P2_item2.style("font-size", "15px");
  P2_item2.style("border-radius", "5px");
  P2_item2.hide();

  P2_item3 = createButton('Explosive Ammo');
  P2_item3.position(953, 728);
  P2_item3.mouseClicked(buyExplosive);
  P2_item3.style("width", "80px");
  P2_item3.style("height", "60px");
  P2_item3.style("background-color", "darkred");
  P2_item3.style("border-color", "white");
  P2_item3.style("color", "white");
  P2_item3.style("font-size", "15px");
  P2_item3.style("border-radius", "5px");
  P2_item3.hide();

  P2_item4 = createButton('Bribe James');
  P2_item4.position(1117, 728);
  P2_item4.mouseClicked(cheatGold);
  P2_item4.style("width", "80px");
  P2_item4.style("height", "60px");
  P2_item4.style("background-color", "darkred");
  P2_item4.style("border-color", "white");
  P2_item4.style("color", "white");
  P2_item4.style("font-size", "15px");
  P2_item4.style("border-radius", "5px");
  P2_item4.hide();
}

//____________________________________________Game Screen Buttons' Functions_________________________________________________//
function defaultMode() {
  clickFx.play();

  //Change Animation of the players
  if (aimMode == true && playerTurn == 1) {
    playerOne.changeAni('one_default_idle');
    playerOne.x = playerOne.x - 6;
  } else if (aimMode == true && playerTurn == 2) {
    playerTwo.changeAni('two_default_idle');
    playerTwo.x = playerTwo.x + 6;
  }


  //Shop Menu
  shopMode = false;
  playerTwoShop.visible = false;
  playerOneShop.visible = false;
  shopButton.show();
  closeButton.hide();

  //Hide Shop Items
  P1_item1.hide();
  P1_item2.hide();
  P1_item3.hide();
  P1_item4.hide();
  P2_item1.hide();
  P2_item2.hide();
  P2_item3.hide();
  P2_item4.hide();

  //Aim Menu
  playerOneScreen.visible = true;
  playerTwoScreen.visible = true;
  aimButton.show();
  cancelButton.hide();
  aimMode = false;
}

function autoDefault() {
  //Change Animation of the players
  if (aimMode == true && playerTurn == 1) {
    playerOne.changeAni('one_default_idle');
    playerOne.x = playerOne.x - 6;
  } else if (aimMode == true && playerTurn == 2) {
    playerTwo.changeAni('two_default_idle');
    playerTwo.x = playerTwo.x + 6;
  }


  //Shop Menu
  shopMode = false;
  playerTwoShop.visible = false;
  playerOneShop.visible = false;
  shopButton.show();
  closeButton.hide();

  //Hide Shop Items
  P1_item1.hide();
  P1_item2.hide();
  P1_item3.hide();
  P1_item4.hide();
  P2_item1.hide();
  P2_item2.hide();
  P2_item3.hide();
  P2_item4.hide();

  //Aim Menu
  playerOneScreen.visible = true;
  playerTwoScreen.visible = true;
  aimButton.show();
  cancelButton.hide();
  aimMode = false;
}

function aimMode() {

  //Close Shop Menu
  shopMode = false;
  shopButton.show();
  closeButton.hide();

  //Check if gun is loaded or not
  if (gunLoaded == false) {
    noAmmo.play();
    noAmmo.setLoop(false);
    showNoAmmo = true;

    //all counters off
    noAmmoCounter = 50;
    turnCounter = -1;
    gunLoadedErrorCounter = -1;
    noGoldErrorCounter = -1;
    shopErrorCounter = -1;

    //Hide Shop Items
    P1_item1.hide();
    P1_item2.hide();
    P1_item3.hide();
    P1_item4.hide();
    P2_item1.hide();
    P2_item2.hide();
    P2_item3.hide();
    P2_item4.hide();
    if (playerTurn == 1) {
      playerOneShop.visible = false;
      playerOneScreen.visible = true;
    }
    if (playerTurn == 2) {
      playerTwoShop.visible = false;
      playerTwoScreen.visible = true;
    }
  }
  if (gunLoaded == true) {
    //Aim Menu
    clickFx.play();
    aimButton.hide();
    cancelButton.show();

    if (playerTurn == 1) {
      playerOne.changeAni('one_default_aim');
      playerOne.x = playerOne.x + 6;
      playerOneShop.visible = false;
      playerOneScreen.visible = true;

      //Hide Shop Items
      P1_item1.hide();
      P1_item2.hide();
      P1_item3.hide();
      P1_item4.hide();
      P2_item1.hide();
      P2_item2.hide();
      P2_item3.hide();
      P2_item4.hide();
    } else if (playerTurn == 2) {
      playerTwo.changeAni('two_default_aim');
      playerTwo.x = playerTwo.x - 6;
      playerTwoShop.visible = false;
      playerTwoScreen.visible = true;

      //Hide Shop Items
      P1_item1.hide();
      P1_item2.hide();
      P1_item3.hide();
      P1_item4.hide();
      P2_item1.hide();
      P2_item2.hide();
      P2_item3.hide();
      P2_item4.hide();
    }
    aimMode = true;
  }
}

function shopMode() {
  clickFx.play();

  //Shop Menu
  shopMode = true;
  shopButton.hide();
  closeButton.show();

  //Disable Aim Menu
  aimButton.show();
  cancelButton.hide();
  if (aimMode == true && playerTurn == 1) {
    playerOne.changeAni('one_default_idle');
    playerOne.x = playerOne.x - 6;
  } else if (aimMode == true && playerTurn == 2) {
    playerTwo.changeAni('two_default_idle');
    playerTwo.x = playerTwo.x + 6;
  }
  if (playerTurn == 1) {
    playerOneShop.visible = true;
    playerOneScreen.visible = false;
    P1_item1.show();
    P1_item2.show();
    P1_item3.show();
    P1_item4.show();
  } else if (playerTurn == 2) {
    playerTwoShop.visible = true;
    playerTwoScreen.visible = false;
    P2_item1.show();
    P2_item2.show();
    P2_item3.show();
    P2_item4.show();
  }
  aimMode = false;
}

function openGameMenu() {
  clickFx.play();
  gameMenuOpened = true;
  unpauseButton.show();
  renameButton.show();
  quitButton.show();
  gameSetting.show();

  pauseButton.attribute("disabled", "");
  aimButton.attribute("disabled", "");
  cancelButton.attribute("disabled", "");
  shopButton.attribute("disabled", "");
  closeButton.attribute("disabled", "");
  endButton.attribute("disabled", "");

  shadeScreen.visible = true;
}

function unpauseGame() {
  clickFx.play();
  gameMenuBG.visible = false;
  gameMenuOpened = false;
  unpauseButton.hide();
  gameSetting.hide();
  renameButton.hide();
  quitButton.hide();
  pauseButton.show();

  pauseButton.removeAttribute("disabled");
  aimButton.removeAttribute("disabled");
  cancelButton.removeAttribute("disabled");
  shopButton.removeAttribute("disabled");
  closeButton.removeAttribute("disabled");
  endButton.removeAttribute("disabled");

  shadeScreen.visible = false;
}

function backGameMenu() {
  clickFx.play();
  backButton.hide();
  renamePop.visible = false;
  settingPop.visible = false;
  gameMenuBG.visible = true;

  //Close Setting
  settingsOpened = false;
  musicSlider.hide();
  soundSlider.hide();
  soundCheck.hide();
  musicCheck.hide();

  //Close Rename
  renamePlayers = false;
  playerOneInput.hide();
  playerTwoInput.hide();
  confirm1.hide();
  confirm2.hide();


  //Show the Game Menu
  gameMenuOpened = true;
  pauseButton.hide();
  unpauseButton.show();
  renameButton.show();
  quitButton.show();
  gameSetting.show();
}


function endTurn() {
  //remove all announcement texts
  turnCounter = -1;
  noAmmoCounter = -1;
  noGoldErrorCounter = -1;
  gunLoadedErrorCounter = -1;
  shopErrorCounter = -1;

  if (gunLoaded == true) {
    clickFx.play();
    endTurnWarning = true;
    confirmEndButton.show();
    cancelEndButton.show();

    //Pause game while on warning
    pauseButton.attribute("disabled", "");
    aimButton.attribute("disabled", "");
    cancelButton.attribute("disabled", "");
    shopButton.attribute("disabled", "");
    closeButton.attribute("disabled", "");
    endButton.attribute("disabled", "");

    shadeScreen.visible = true;
  } else if (gunLoaded == false) {
    defaultMode();
    if (playerTurn == 1) {
      gunLoaded = true;
      boughtItem = false;
      reload.play();
      playerTurn = 2;
      turnCounter = 150;
    } else if (playerTurn == 2) {
      gunLoaded = true;
      boughtItem = false;
      reload.play();
      playerTurn = 1;
      turnNumber++;
      turnCounter = 150;
    }
    if (aimMode == true && playerTurn == 1) {
      playerOne.changeAni('one_default_idle');
      playerOne.x = playerOne.x - 6;
    } else if (aimMode == true && playerTurn == 2) {
      playerTwo.changeAni('two_default_idle');
      playerTwo.x = playerTwo.x + 6;
    } else {
      playerOne.changeAni('one_default_idle');
      playerTwo.changeAni('two_default_idle');
    }
  }
}

function confirmEndTurn() {
  endTurnWarning = false;
  confirmEndButton.hide();
  cancelEndButton.hide();

  gunLoaded = false;
  endTurn();

  //Unpause Game
  unpauseGame();
}

function cancelEndTurn() {
  endTurnWarning = false;
  confirmEndButton.hide();
  cancelEndButton.hide();

  //Unpause Game
  unpauseGame();
}

function quitGame() {
  //figure out how to disable everything when quitting
  clickFx.play();
  loadingTimer = 150;
  loadNumber = 1;
  screen.current = 0;

  //turn everything off
  defaultMode();
  playerOneScreen.visible = false;
  playerTwoScreen.visible = false;
  bedrock.visible = false;
  UI.visible = false;
  topBar.visible = false;
  playerTwo.visible = false;
  playerOne.visible = false;
  playerOneStats.visible = false;
  playerTwoStats.visible = false;
  playerOneShortcut.visible = false;
  playerTwoShortcut.visible = false;
  endButton.hide();
  pauseButton.hide();
  shopButton.hide();
  aimButton.hide();
  winPopUp.visible = false;
  shadeScreen.visible = false;
  terrain.visible = false;

  //Hide Pause Button
  unpauseGame();
  pauseButton.hide();

  //Hide Turn Display
  playerOneTurn.visible = false;
  playerTwoTurn.visible = false;

  //Stop Battle Music
  battleMusic.stop();
  playerWins = false;
  quitButton.hide();
}

function renameMenu() {
  clickFx.play();
  playerOneInput.show();
  playerTwoInput.show();
  confirm1.show();
  confirm2.show();

  //Change the menu layout
  renamePlayers = true;
  gameMenuOpened = false;
  backButton.show();

  //Hide Other Game Menu Buttons
  unpauseButton.hide();
  gameSetting.hide();
  quitButton.hide();
  renameButton.hide();
}

function renamePlayerOne() {
  clickFx.play();
  playerOneName = playerOneInput.value();
}

function renamePlayerTwo() {
  clickFx.play();
  playerTwoName = playerTwoInput.value();
}

//Shop Item Effects

function buyAmmo() {
  if (gunLoaded == true) {
    gunLoadedErrorCounter = 50;
    showGunLoaded = true;
    errorFx.play();

    //Turn off other errors
    noAmmoCounter = -1;
    turnCounter = -1;
    shopErrorCounter = -1;
    noGoldErrorCounter = -1;

  } else if (gunLoaded == false && boughtItem == false) {
    if (playerTurn == 1) {
      if (playerOneGold >= ammoPrice) {
        playerOneGold = playerOneGold - ammoPrice;
        gunLoaded = true;
        boughtItem = true;
        reload.play();
      } else {
        noGoldErrorCounter = 50;
        showNoGold = true;
        errorFx.play();

        //Turn off other errors
        noAmmoCounter = -1;
        turnCounter = -1;
        shopErrorCounter = -1;
        gunLoadedErrorCounter = -1;
      }
    }
    if (playerTurn == 2) {
      if (playerTwoGold >= ammoPrice) {
        playerTwoGold = playerTwoGold - ammoPrice;
        gunLoaded = true;
        boughtItem = true;
        reload.play();
      } else {
        noGoldErrorCounter = 50;
        showNoGold = true;
        errorFx.play();

        //Turn off other errors
        noAmmoCounter = -1;
        turnCounter = -1;
        shopErrorCounter = -1;
        gunLoadedErrorCounter = -1;
      }
    }
  } else if (boughtItem == true) {
    errorFx.play();
    alreadyUsedShop = true;
    shopErrorCounter = 50;

    //Turn off other errors
    noAmmoCounter = -1;
    turnCounter = -1;
    gunLoadedErrorCounter = -1;
    noGoldErrorCounter = -1;
  }
}

function buyExplosive() {
  if (gunLoaded == true) {
    gunLoadedErrorCounter = 50;
    showGunLoaded = true;
    errorFx.play();

    //Turn off other errors
    noAmmoCounter = -1;
    turnCounter = -1;
    shopErrorCounter = -1;
    noGoldErrorCounter = -1;

  } else if (gunLoaded == false && boughtItem == false) {
    if (playerTurn == 1) {
      if (playerOneGold >= ExplosivePrice) {
        playerOneGold = playerOneGold - ExplosivePrice;
        gunLoaded = true;
        upgraded = true;
        boughtItem = true;
        reload.play();
      } else {
        noGoldErrorCounter = 50;
        showNoGold = true;
        errorFx.play();

        //Turn off other errors
        noAmmoCounter = -1;
        turnCounter = -1;
        shopErrorCounter = -1;
        gunLoadedErrorCounter = -1;
      }
    }
    if (playerTurn == 2) {
      if (playerTwoGold >= ExplosivePrice) {
        playerTwoGold = playerTwoGold - ExplosivePrice;
        gunLoaded = true;
        upgraded = true;
        boughtItem = true;
        reload.play();
      } else {
        noGoldErrorCounter = 50;
        showNoGold = true;
        errorFx.play();

        //Turn off other errors
        noAmmoCounter = -1;
        turnCounter = -1;
        shopErrorCounter = -1;
        gunLoadedErrorCounter = -1;
      }
    }
  } else if (boughtItem == true) {
    errorFx.play();
    alreadyUsedShop = true;
    shopErrorCounter = 50;

    //Turn off other errors
    noAmmoCounter = -1;
    turnCounter = -1;
    gunLoadedErrorCounter = -1;
    noGoldErrorCounter = -1;
  }
}

function buyPills() {
  if (boughtItem == false) {
    if (playerTurn == 1) {
      if (playerOneGold >= pillPrice) {
        playerOneGold = playerOneGold - pillPrice;
        boughtItem = true;
        healFx.play();
        if ((playerOneHP + pillHeal) > 100) {
          playerOneHP = 100;
        } else {
          playerOneHP = playerOneHP + pillHeal;
        }
      } else {
        noGoldErrorCounter = 50;
        showNoGold = true;
        errorFx.play();

        //Turn off other errors
        noAmmoCounter = -1;
        turnCounter = -1;
        shopErrorCounter = -1;
        gunLoadedErrorCounter = -1;
      }
    }
    if (playerTurn == 2) {
      if (playerTwoGold >= pillPrice) {
        playerTwoGold = playerTwoGold - pillPrice;
        boughtItem = true;
        healFx.play();
        if ((playerTwoHP + pillHeal) > 100) {
          playerTwoHP = 100;
        } else {
          playerTwoHP = playerTwoHP + pillHeal;
        }
      } else {
        noGoldErrorCounter = 50;
        showNoGold = true;
        errorFx.play();

        //Turn off other errors
        noAmmoCounter = -1;
        turnCounter = -1;
        shopErrorCounter = -1;
        gunLoadedErrorCounter = -1;
      }
    }
  } else if (boughtItem == true) {
    errorFx.play();
    alreadyUsedShop = true;
    shopErrorCounter = 50;

    //Turn off other errors
    noAmmoCounter = -1;
    turnCounter = -1;
    gunLoadedErrorCounter = -1;
    noGoldErrorCounter = -1;
  }
}

function cheatGold() {
  goldCheatFx.play();
  if (playerTurn == 1) {
    playerOneGold = playerOneGold + 100;
  } else if (playerTurn == 2) {
    playerTwoGold = playerTwoGold + 100;
  }
}

function redrawTerrain() {
  for (let i = 0; i < terrain.length; i++) {
    terrain[i].y = 700 + 100 * noise(elevation);
    elevation += 0.03
  }
}

//________________________________________________Game Sprites___________________________________________________//
function gameSprites() {
  //Animation Rules
  playerOne_default_idle_Ani.frameDelay = 60;
  playerOne_default_walkR_Ani.frameDelay = 7;
  playerOne_default_walkL_Ani.frameDelay = 7;
  playerOne_default_aim_Ani.frameDelay = 60;

  playerTwo_default_idle_Ani.frameDelay = 60;
  playerTwo_default_walkR_Ani.frameDelay = 7;
  playerTwo_default_walkL_Ani.frameDelay = 7;
  playerTwo_default_aim_Ani.frameDelay = 60;

  deathExplosion_Ani.noLoop();

  //Sprites
  terrain = new Group();
  terrain.w = 2;
  terrain.h = 500;
  terrain.draw = function () {
    noStroke();
    fill(34, 135, 39);
    rect(0, -250, 3, 4); // Grass
    fill(48, 32, 20);
    rect(0, 0, 3, 497); // Soil
  }
  terrain.x = (i) => i * 2;
  terrain.amount = 702;
  terrain.collider = 's';
  terrain.layer = 2;
  terrain.visible = false;
  redrawTerrain();

  bullet = new Sprite(-1000, -1000, 5, 'n');
  bullet.color = 'black';
  bullet.visible = false;

  target = new Sprite();
  target.collider = 'n';
  target.color = 'none';
  target.visible = false;

  playerOne = new Sprite(random(30, 130), 450);
  playerOne.diameter = 1;
  playerOne.w = 40;
  playerOne.h = 40;
  playerOne.addAni('one_death_ani', deathExplosion_Ani);
  playerOne.addAni('one_default_hurt', playerOne_default_hurt_Ani);
  playerOne.addAni('one_default_aim', playerOne_default_aim_Ani);
  playerOne.addAni('one_default_walkR', playerOne_default_walkR_Ani);
  playerOne.addAni('one_default_walkL', playerOne_default_walkL_Ani);
  playerOne.addAni('one_default_idle', playerOne_default_idle_Ani);
  playerOne.rotationLock = true;
  playerOne.visible = false;
  playerOne.layer = 300;

  playerTwo = new Sprite(random(1250, 1350), 450);
  playerTwo.diameter = 1;
  playerTwo.w = 40;
  playerTwo.h = 40;
  playerTwo.addAni('two_death_ani', deathExplosion_Ani);
  playerTwo.addAni('two_default_hurt', playerTwo_default_hurt_Ani);
  playerTwo.addAni('two_default_aim', playerTwo_default_aim_Ani);
  playerTwo.addAni('two_default_walkR', playerTwo_default_walkR_Ani);
  playerTwo.addAni('two_default_walkL', playerTwo_default_walkL_Ani);
  playerTwo.addAni('two_default_idle', playerTwo_default_idle_Ani);
  playerTwo.rotationLock = true;
  playerTwo.visible = false;
  playerTwo.layer = 300;

  explosion = new Group();
  explosion.d = 80;
  explosion.draw = function () {
    noStroke();
    fill(0, 0, 0, 0)
    ellipse(0, 0, 80);
  }
  explosion.life = 8;
  explosion.vel -= 1;

  normalExplosion = new Group();
  normalExplosion.d = 80;
  normalExplosion.draw = function () {
    noStroke();
    fill(0, 0, 0, 0);
    ellipse(0, 0, 80);
    animation(explosion_Ani);
    explosion_Ani.loop();
    explosion_Ani.frameDelay = 11;
  }
  normalExplosion.life = 30;
  normalExplosion.collider = 'n';
  normalExplosion.vel.y -= 3;

  hugeExplosion = new normalExplosion.Group();
  hugeExplosion.draw = function () {
    noStroke();
    fill(0, 0, 0, 0);
    ellipse(0, 0, 160);
    animation(hugeExplosion_Ani);
    hugeExplosion_Ani.loop();
    hugeExplosion_Ani.frameDelay = 11;
    hugeExplosion_Ani.scale = 2;
  }
  hugeExplosion.vel.y -= 3;

  //Overlapping Rules
  target.overlaps(bedrock);
  target.overlaps(terrain);
  target.overlaps(bullet);
  playerOne.overlaps(bullet);
  playerTwo.overlaps(bullet);
  playerOne.overlaps(explosion);
  playerTwo.overlaps(explosion);
  playerOne.overlaps(normalExplosion);
  playerTwo.overlaps(normalExplosion);
}

//________________________________________________Game Physics___________________________________________________//
function shootingPhysic() {
  if (aimMode == true && gunLoaded == true) {
    target.x = mouse.x;
    target.y = mouse.y;

    if (playerOne.mouse.dragging() && playerTurn == 1) {
      bullet.x = playerOne.x + 20;
      bullet.y = playerOne.y + 2;

      //Power and Angle Text System
      noFill();
      stroke('black');
      strokeWeight(2);
      image(degreeDisplay, playerOne.x + 20, playerOne.y + 2, 300, 300);
      line(playerOne.x + 20, playerOne.y + 2, target.x, target.y);

      stroke('darkblue');
      strokeWeight(3);
      ellipse(target.x, target.y, 50);
      line(target.x - 25, target.y, target.x + 25, target.y);
      line(target.x, target.y - 25, target.x, target.y + 25);

      distance = dist(playerOne.x + 20, playerOne.y, target.x, target.y)
      if (distance > 150) {
        distance = 150;
      }
      let power = Math.floor((distance / 150) * 100);
      let angle = 0;
      if (bullet.angleTo(target) > 0) {
        angle = -Math.floor(bullet.angleTo(target));
      } else if (bullet.angleTo(target) < 0) {
        angle = -Math.floor(bullet.angleTo(target));
      }

      //Power and Angle Display
      strokeWeight(3);
      stroke(44, 62, 80);
      fill('darkblue');
      rect(W / 2, 70, 340, 100, 30);
      textSize(25);
      noStroke();
      fill('white');
      text("Angle: " + angle, W / 2 - 80, 80);
      text("Power: " + power, W / 2 + 80, 80);

      mouseDragged = true;
    }

    if (playerTwo.mouse.dragging() && playerTurn == 2) {
      bullet.x = playerTwo.x - 20;
      bullet.y = playerTwo.y + 2;

      //Power and Angle Text System
      noFill();
      stroke('black');
      strokeWeight(2);
      image(degreeDisplay, playerTwo.x - 20, playerTwo.y + 2, 300, 300);
      line(playerTwo.x - 20, playerTwo.y + 2, target.x, target.y);

      stroke('darkred');
      strokeWeight(3);
      ellipse(target.x, target.y, 50);
      line(target.x - 25, target.y, target.x + 25, target.y);
      line(target.x, target.y - 25, target.x, target.y + 25);

      distance = dist(playerTwo.x - 20, playerTwo.y, target.x, target.y)
      if (distance > 150) {
        distance = 150;
      }
      let power = Math.floor((distance / 150) * 100);
      let angle = 0;
      if (bullet.angleTo(target) > 0) {
        angle = Math.floor(bullet.angleTo(target)) - 180;
      } else if (bullet.angleTo(target) < 0) {
        angle = Math.floor(bullet.angleTo(target)) + 180;
      }

      //Power and Angle Display
      strokeWeight(3);
      stroke(44, 62, 80);
      fill('darkred');
      rect(W / 2, 70, 340, 100, 30);
      textSize(25);
      noStroke();
      fill('white');
      text("Angle: " + angle, W / 2 - 80, 80);
      text("Power: " + power, W / 2 + 80, 80);

      mouseDragged = true;
    }

    if (mouse.released() && mouseDragged == true) {
      pistolShot.play();
      bullet.collider = 'd';
      bullet.moveTowards(target.x, target.y);

      //Bullet Max Speed
      bulletMaxSpeed = 10.5;
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
      autoDefault();
      bullet.visible = true;
      mouseDragged = false;
      gunLoaded = false;
      endButton.attribute("disabled", "");
    }
  }

  //Bullet Trail
  bulletPosition.push({ x: bullet.x, y: bullet.y }); //Continuously push bullet's position into array

  if (bulletPosition.length > 20) {
    bulletPosition.shift(); //delete older indexes
  }
  if (bullet.visible == true) {
    for (let i = 1; i < bulletPosition.length; i += 1) {
      fill('black');
      ellipse(bulletPosition[i].x, bulletPosition[i].y, i / 2); //draw ellipses as bullet trail
    }
  }

  //Bullet out of screen 
  if (bullet.x < 0 || bullet.x > W) {
    bullet.collider = 's';
    bullet.visible = false;
    endButton.removeAttribute("disabled");
  }

  //Player out of Screen
  if (playerOne.x < 0) {
    playerOne.x = 0;
  }
  if (playerOne.x > W) {
    playerOne.x = W;
  }
  if (playerTwo.x < 0) {
    playerTwo.x = 0;
  }
  if (playerTwo.x > W) {
    playerTwo.x = W;
  }

  //Explosion
  if (bullet.collides(terrain) || bullet.collides(bedrock)) {
    explosionFx.play();
    new explosion.Sprite(bullet.x, bullet.y);

    //Upgraded or Not
    if (upgraded == true && playerTurn == 1) {
      explosion.d = 160;
      bulletDamage2 = 100;
      new hugeExplosion.Sprite(bullet.x, bullet.y);
    } else if (upgraded == false && playerTurn == 1) {
      explosion.d = 80;
      bulletDamage2 = 5;
      new normalExplosion.Sprite(bullet.x, bullet.y);
    }
    if (upgraded == true && playerTurn == 2) {
      explosion.d = 160;
      bulletDamage1 = 100;
      new hugeExplosion.Sprite(bullet.x, bullet.y);
    } else if (upgraded == false && playerTurn == 2) {
      explosion.d = 80;
      bulletDamage1 = 5;
      new normalExplosion.Sprite(bullet.x, bullet.y);
    }

    upgraded = false;

    //Remove bullet
    bullet.x = 1000;
    bullet.y = 1000;
    bullet.collider = 's';
    bullet.visible = false;

    endButton.removeAttribute("disabled");
  }

  //Destroy Terrain
  for (let i = 0; i < terrain.length; i++) {
    if (explosion.overlapping(terrain[i])) {
      terrain[i].y += 5;
    }
  }

  //Damage when players get caught in explosion
  if (explosion.overlaps(playerOne)) {
    //Deal Damage
    playerOneHP = playerOneHP - bulletDamage1;
    playerOne.changeAni(['one_default_hurt', 'one_default_idle']);
    P1_hurt_soundFx.play();

    //Earn Gold
    if (playerTurn == 2) {
      playerTwoGold = playerTwoGold + 25;
    }

    //Player Death
    if (playerOneHP <= 0) {
      playerOneHP = 0;
      winningPlayer = playerTwoName;
      losingPlayer = playerOneName;
      playerWins = true;
      playerOne.changeAni(['one_default_hurt', 'one_death_ani']);
    }
  }
  if (explosion.overlaps(playerTwo)) {
    //Deal Damage
    playerTwoHP = playerTwoHP - bulletDamage2;
    playerTwo.changeAni(['two_default_hurt', 'two_default_idle'])
    P2_hurt_soundFx.play();

    //Earn Gold
    if (playerTurn == 1) {
      playerOneGold = playerOneGold + 25;
    }

    //Player Death
    if (playerTwoHP <= 0) {
      playerTwoHP = 0;
      winningPlayer = playerOneName;
      losingPlayer = playerTwoName;
      playerWins = true;
      playerTwo.changeAni(['two_default_hurt', 'two_death_ani']);
    }
  }

  //to Keep players grounded
  playerOne.vel.y += 0.000001;
  playerTwo.vel.y += 0.000001;
}


//____________________________________________________Player Movement______________________________________________//
function movement() {
  if (playerOne.collides(terrain) || playerOne.collides(bedrock)) {
    P1canJump = true;
  }
  if (playerTwo.collides(terrain) || playerTwo.collides(bedrock)) {
    P2canJump = true;
  }

  if (playerTurn == 1) {
    playerOne.changeAni('one_default_idle');
    if (kb.pressing('a') && aimMode == false) {
      playerOne.changeAni('one_default_walkL');
      playerOne.x -= speed;
    } else if (kb.pressing('d') && aimMode == false) {
      playerOne.changeAni('one_default_walkR');
      playerOne.x += speed;
    }
    if (kb.presses('w') && aimMode == false && P1canJump == true) {
      playerOne.vel.y -= jump;
      P1canJump = false;
    }
  }

  if (playerTurn == 2) {
    playerTwo.changeAni('two_default_idle');
    if (kb.pressing('j') && aimMode == false) {
      playerTwo.changeAni('two_default_walkL');
      playerTwo.x -= speed;
    } else if (kb.pressing('l') && aimMode == false) {
      playerTwo.changeAni('two_default_walkR');
      playerTwo.x += speed;
    }
    if (kb.presses('i') && aimMode == false && P2canJump == true) {
      playerTwo.vel.y -= jump;
      P2canJump = false;
    }
  }
}