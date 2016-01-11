// Import from Constants
import {DEFAULT_GAME_CONFIG, DEFAULT_GAME_CALLBACK, AJAX_CONTENT_TYPE, AJAX_DATA_TYPE, AJAX_TIMEOUT, DEFAULT_LOGO} from "./constants.es2015.js";

export class DrawGame {
	
	/*************************************************
	// Ctor
	//
	// Description:  Builds an instance of drawGame
	//
	// Inputs:  
	//   gameName - name of the game
	//   configFilePath - path to config file that holds 
	//                    game information
	//
	// Returns:  None
	*/
	constructor(gameName = "DemoGame", configFilePath = DEFAULT_GAME_CONFIG, callback = DEFAULT_GAME_CALLBACK, logo = DEFAULT_LOGO) 
	{
		this.gameName = gameName;
		this.configFile = configFilePath;
		this.callBack = callback;
		this.gameLogo =  logo;
		
		this.pickedNumbers = new Set(); 
		this.bonusNumber = "-";
		
		console.log(`In DrawGame Ctor for ${this.gameName}`);
	}
		
	/*************************************************
	// getGameConfiguration()
	//
	// Description:  Reads in configuration file for the game
	//
	// Inputs:  None
	//
	// Returns:  None
	*/
	getGameConfiguration()
	{
		let game =  this;
		// console.log(`In DrawGame.getGameConfiguration`)
		$.ajax( this.configFile, 
		{
			timeout : AJAX_TIMEOUT,
			jsonpCallback : this.callBack,
			context: game,
			crossDomain : true,
			contentType : AJAX_CONTENT_TYPE,
			dataType: AJAX_DATA_TYPE,
			success : game.setupGames,
			error : function(request, errorType, errorMessage) {
				alert(`error ${errorType} - ${errorMessage}`);
			}
		});
			
	}
	
	/*************************************************
	// setupGames(response)
	//
	// Description:  Set up tabs for the games defined in the 
	//               JSON file.
	//
	// Inputs:  response - responce from AJAX calls
	//
	// Returns:  None
	*/
	setupGames(data) {
		console.log(`In SetupGames ${data.gameName}`);
		
		this.numberOfPicks = data.numberOfPicks;
	}
	
	updateDrawNumbers() 
	{
		console.log("in UpdateDrawNumbers");
	//	this.pickedNumbers.sort();
		let i = 0;
		for (let num of this.pickedNumbers)
		{
			$('.drawNumber').eq(i).val(num);
			i++;
		}
	}
	
	updateBonusNumbers()
	{
		console.log("In updateBonusNumbers");
		$('.bonusNumber').val(this.bonusNumber);
	}
}  // end DrawGame
