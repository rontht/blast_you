let screen = {
	current: 0,
	loading: 0,
	menu: 1,
	game: 2
}

function draw() {
	if (screen.current == screen.loading) {
		//draw loading screen here
		drawLoading();

		//this is to change screen
		if (kb.presses("space")) {
			screen.current = 1;
		}
	} else if (screen.current == screen.menu) {
		//draw menu screen here
		drawMenu();

		//this is to change screen
		if (kb.presses("space")) {
			screen.current = 2;
		}
	} else if (screen.current == screen.game) {
		//draw game here
		drawGame();
	}
}

function drawLoading() {

}

function drawMenu() {

}

function drawGame() {
	
}