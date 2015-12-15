import {DrawGame} from './drawgame.js';

class PayslipGame extends DrawGame
{
	constructor(gameName, configFile)
	{
		super(gameName, configFile);  // call parent ctor.	
		this.gameName = gameName;
		this.configFile = configFile;
	}
	
	buildGame() 
	{
		/* this.tab = tab;
		let tabContent =  $('<div class="gameDetails" id="${gameInfo.gameName}Details"></div>');
	
		tabContent.append('<img src="img/${gameInfo.gameLogo}" alt="${gameInfo.gameName}"/>');
	
		// setup the numbers pick
		let drawNumbers = $('<div class="drawNumbers"></div>');
		tabContent.append(drawNumbers);
		for (var i=0; i < gameInfo.numberOfPicks; i++) {
			var drawNumber = $('<input type="text" value="" placeholder="-" size="2" class="drawNumber" id="drawNumber${i}"/>');
			drawNumbers.append(drawNumber);
		}
		if (gameInfo.bonusBall) {
			var bonusNumber = $('<input type="text" value="" placeholder="-" size="2" class="drawNumber" id="bonusNumber"/>');
			drawNumbers.append(bonusNumber);
		}
		
		// set up the game buttons array
		let drawPool = $('<div class="drawPool"></div>');
		tabContent.append(drawPool);
		for (var i = 1; i <= gameInfo.numberPool; i++) {
			var numberPoolBtn = $('<button class="poolButton" value="${i}">${i}</button>');
			drawPool.append(numberPoolBtn);
			
		}
		$('#gamesArea').append(tabContent);
		
		*/
	}  // end buildGame
	
		
} // end Payslip Game

export {PayslipGame};