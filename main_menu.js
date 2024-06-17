const W = 900;
const H = 600;

let rankings = new Array();
let ranks = new Array();


function preload() {
  menuScreen =  loadImage('images/loading_screens/LS_6.jpg');
  titleFont = loadFont('fonts/robus.otf');
  leaderboardScores = loadStrings('texts/leaderboard.txt');
}

function setup() {
  createCanvas(W,H);

  mainMenu();

  leaderboardData();
}

function draw() {
  background(155);


  //Main Menu
  image(menuScreen, 0,0,900,600);

  //Title Text
  stroke('black');
  fill('white');
  textSize(170);
  textFont(titleFont);
  text("Blast You", 160, 200);

  textSize(40);
  text("by ron", 700, 250);

  //leaderboard
  if (showLeaderboard == true) {
    fill('gray');
    rect(280, 320, 330, 200);

    for (let i = 0; i < ranks.length; i++) {
      fill('white');
      noStroke();
      textFont('Arial');
      textSize(20);
      text('Leaderboard', 380, 350);
      textSize(20); 
      text(i+1, 300, 400 + 25*i);
      text(ranks[i].name, 320, 400 + 25*i);
      text(ranks[i].score, 400, 400 + 25*i);
      text(ranks[i].date, 480, 400 + 25*i);
    }
    newGame.hide();
    leaderboard.hide();
    optionButton.hide();
  }
}

function mainMenu() {
  //New Game Button
  newGame = createButton('New Game');
  newGame.position(400,400);
  newGame.style('width', '90px');
  
  //Leaderboard Button
  leaderboard = createButton('Leaderboard');
  leaderboard.position(400,430);
  leaderboard.style('width', '90px');
  leaderboard.mouseClicked(showLeaderboard);

  //Close Leaderboard Button
  closeLB = createButton('X');
  closeLB.position(570,330);
  closeLB.style('width', '30px');
  closeLB.style('height', '30px');
  closeLB.mouseClicked(closeLeaderboard);
  closeLB.hide();
  
  //Option Button // already exist in the game please combine them together
  optionButton = createButton('Options');
  optionButton.position(400,460);
  optionButton.style('width', '90px');
}

function showLeaderboard() {
  showLeaderboard = true;
  closeLB.show();
}

function closeLeaderboard() {
  showLeaderboard = false;
  closeLB.hide();
  newGame.show();
  leaderboard.show();
  optionButton.show();
}

function leaderboardData() {
  for (let i = 0; i < leaderboardScores.length; i++) {
    let index = splitTokens(leaderboardScores[i]);
    rankings.push(index);
  }

  for (let i = 0; i < rankings.length; i++) {
    let index = {
      name: rankings[i][0],
      score: rankings[i][1],
      date: rankings[i][2]
    }
    
    ranks.push(index);
  }
}