// Import from Constants
import {DEFAULT_GAME_CONFIG, AJAX_CONTENT_TYPE, AJAX_DATA_TYPE, AJAX_TIMEOUT, GAMES_URL} from './constants.es2015.js';
import {PlayslipGame} from './playslipgame.es2015.js';

$(function() {
	$.ajax( GAMES_URL, 
	{
		timeout : AJAX_TIMEOUT,
		jsonpCallback : 'payslipGames',
		crossDomain : true,
		contentType : AJAX_CONTENT_TYPE,
		dataType: AJAX_DATA_TYPE,
		success : function(data) {
			for (let i=0; i< data.games.length; i++)
			{
				let playSlip =  new PlayslipGame(data.games[i].gameName, data.games[i].configFile, data.games[i].callback, data.games[i].gameLogo);
				playSlip.getGameConfiguration();
			}
		},
		error : function(request, errorType, errorMessage) {
				alert(`error ${errorType} - {$errorMessage}`);
		}
	});
});