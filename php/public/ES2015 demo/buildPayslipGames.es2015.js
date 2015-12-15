// Import from Constants
import {DEFAULT_GAME_CONFIG, AJAX_CONTENT_TYPE, AJAX_DATA_TYPE, AJAX_TIMEOUT} from './constants.js';
import {PayslipGame} from './playslipgame.js';

$(function() {
	$.ajax( this.configFile, 
	{
		timeout : AJAX_TIMEOUT,
		context: game,
		jsonpCallback : 'details',
		crossDomain : true,
		contentType : AJAX_CONTENT_TYPE,
		dataType: AJAX_DATA_TYPE,
		success : function(data) {
			for (let i=0; i< data.games.length; i++)
			{
				let paySlip =  new PlayslipGame(data.games[i].gamename, data.games[i].configFile);
			}
		
		},
		error : function(request, errorType, errorMessage) {
				alert("error ${errorType} - ${errorMessage}");
		}
	});
});