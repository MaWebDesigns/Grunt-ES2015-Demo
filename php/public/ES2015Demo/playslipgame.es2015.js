import {DrawGame} from './drawGame.es2015.js';

class PlayslipGame extends DrawGame
{
	constructor(gameName = "DemoGame", configFilePath = DEFAULT_GAME_CONFIG, callback = DEFAULT_GAME_CALLBACK, logo = DEFAULT_LOGO)
	{
		super(gameName, configFilePath, callback, logo);  // call parent ctor.	
	// 	console.log(`In Playslip Ctor for ${this.gameName}`);
		
		
	}
	
	setupGames(data)
	{
		// console.log(`in Playslip SetupGames for ${this.gameName}`);
		this.numberOfPicks = data.numberOfPicks;
		// Build the tab for the game
		let tab = $(`<li id="${this.gameName}"><img src="${this.gameLogo}"  alt="${this.gameName}" /></li>`);
		tab.click(this.changeGame);
		$("#gameTabs").append(tab);
		
		// build the gameDetails
		this.buildGame(data);
		$('.gameDetails').first().show();
		
	} // end setupGames
	
	changeGame()
	{
		// console.log(`In Change Game for ${$(this).attr("id")}`);
		// Hide all the other GameDetails, and just show the one that we clicked for. 
		$('.gameDetails').hide();
		let detailsName = `${$(this).attr("id")}Details`;
		$(`#${detailsName}`).show();
		
	} // End changeGame
	
	buildGame(gameInfo) 
	{
		// console.log(`In Build Game for ${this.gameName}`);
		
		// Build the container for the game details
		let tabContent =  $(`<div class="gameDetails" id="${this.gameName}Details"></div>`);
		tabContent.append(`<img src="img/${gameInfo.gameLogo}" alt="${gameInfo.gameName}"/>`);
	
		// setup the numbers pick
		let drawNumbers = $('<div class="drawNumbers"></div>');
		tabContent.append(drawNumbers);
		for (let i=0; i < gameInfo.numberOfPicks; i++) 
		{
			let drawNumber = $(`<input type="text" value="" placeholder="-" size="2" class="drawNumber" id="drawNumber${i}"/>`);
			drawNumbers.append(drawNumber);
		}
		
		// set up the game buttons array
		let drawPool = $('<div class="drawPool"></div>');
		tabContent.append(drawPool);
		for (let i = 1; i <= gameInfo.numberPool; i++) 
		{
			let numberPoolBtn = $(`<button class="poolButton" value="${i}">${i}</button>`);
			$('.poolButton').click(this, this.drawpoolClicked);
			drawPool.append(numberPoolBtn);
			
		}
		$('#gamesArea').append(tabContent);
		
		if (gameInfo.bonusBall) 
		{
			let bonusNumber = $(`<input type="text" value="" placeholder="-" size="2" class="bonusNumber" id="bonusNumber1"/>`);
			drawNumbers.append(bonusNumber);
			
			let bonusPool = $('<div class="bonusPool"></div>');
			tabContent.append(bonusPool);
			for (let i = 1; i <= gameInfo.bonusBallPool; i++) 
			{
				let bonusPoolBtn = $(`<button class="bonusPoolButton" value="${i}">${i}</button>`);
				$('.bonusPoolButton').click(this, this.bonusPoolClicked);
				bonusPool.append(bonusPoolBtn);
				
			}
		}
		
	
	}  // end buildGame
	
	drawpoolClicked(thisGame)
	{
		let gameData = thisGame.data;
		// console.log("in drawpoolClicked");
		// Change the class of the clicked item
		if ( $(this).hasClass("selected") ) 
		{
			$(this).removeClass("selected");
			gameData.pickedNumbers.delete($(this).val());
		}
		else 
		{
			if (gameData.pickedNumbers.size < gameData.numberOfPicks)
			{
				$(this).addClass("selected");
				// Add the value to the corrisponding drawNumbers field		
				gameData.pickedNumbers.add($(this).val());
			}
			else
			{
				console.warn("All picks are used up, please delete one before adding more");
			}
		
		}
		thisGame.stopPropagation();
		gameData.updateDrawNumbers();
	} // end drawpoolClicked
	
	bonusPoolClicked(thisGame)
	{
		let gameData = thisGame.data;
		console.log("in bonusPoolClicked");
		// Change the class of the clicked item
		$('.bonusPoolButton').removeClass("bonusSelected");
		$(this).addClass("bonusSelected");
		gameData.bonusNumber = $(this).val();
		
		gameData.updateBonusNumbers();
	} // end 
		
} // end Payslip Game



export {PlayslipGame};