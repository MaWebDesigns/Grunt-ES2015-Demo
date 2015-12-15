// Import from Constants
import {DEFAULT_GAME_CONFIG, AJAX_CONTENT_TYPE, AJAX_DATA_TYPE, AJAX_TIMEOUT} from "./constants.es2015.js";

export default class DrawGame {
	
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
	constructor(gameName = "DemoGame", configFilePath = DEFAULT_GAME_CONFIG) 
	{
		this.gameName = gameName;
		this.configFile = configFilePath;
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
		$.ajax( this.configFile, 
		{
			timeout : AJAX_TIMEOUT,
			context: game,
			jsonpCallback : 'details',
			crossDomain : true,
			contentType : AJAX_CONTENT_TYPE,
			dataType: AJAX_DATA_TYPE,
			success : setupGames(),
			error : function(request, errorType, errorMessage) {
				alert("error ${errorType} - ${errorMessage}");
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
	setupGames(response) {
		console.log("In SetupGames");
	}
}  // end DrawGame
