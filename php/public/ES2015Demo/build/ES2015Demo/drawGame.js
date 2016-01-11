(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
						value: true
});
var AJAX_TIMEOUT = 3000,
    // Timeout for AJAX calls
DEFAULT_GAME_CONFIG = "data/defaultGames.json?callback=?",
    DEFAULT_GAME_CALLBACK = "gameDetails",
    AJAX_CONTENT_TYPE = "application/json",
    AJAX_DATA_TYPE = "jsonp",
    GAMES_URL = "data/games.json?callback=?",
    DEFAULT_LOGO = "games/powerball.png";

exports.AJAX_TIMEOUT = AJAX_TIMEOUT;
exports.DEFAULT_GAME_CONFIG = DEFAULT_GAME_CONFIG;
exports.AJAX_CONTENT_TYPE = AJAX_CONTENT_TYPE;
exports.AJAX_DATA_TYPE = AJAX_DATA_TYPE;
exports.GAMES_URL = GAMES_URL;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Import from Constants

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DrawGame = undefined;

var _constantsEs = require("./constants.es2015.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawGame = exports.DrawGame = function () {

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

	function DrawGame() {
		var gameName = arguments.length <= 0 || arguments[0] === undefined ? "DemoGame" : arguments[0];
		var configFilePath = arguments.length <= 1 || arguments[1] === undefined ? _constantsEs.DEFAULT_GAME_CONFIG : arguments[1];
		var callback = arguments.length <= 2 || arguments[2] === undefined ? _constantsEs.DEFAULT_GAME_CALLBACK : arguments[2];
		var logo = arguments.length <= 3 || arguments[3] === undefined ? _constantsEs.DEFAULT_LOGO : arguments[3];

		_classCallCheck(this, DrawGame);

		this.gameName = gameName;
		this.configFile = configFilePath;
		this.callBack = callback;
		this.gameLogo = logo;

		this.pickedNumbers = new Set();
		this.bonusNumber = "-";

		console.log("In DrawGame Ctor for " + this.gameName);
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

	_createClass(DrawGame, [{
		key: "getGameConfiguration",
		value: function getGameConfiguration() {
			var game = this;
			// console.log(`In DrawGame.getGameConfiguration`)
			$.ajax(this.configFile, {
				timeout: _constantsEs.AJAX_TIMEOUT,
				jsonpCallback: this.callBack,
				context: game,
				crossDomain: true,
				contentType: _constantsEs.AJAX_CONTENT_TYPE,
				dataType: _constantsEs.AJAX_DATA_TYPE,
				success: game.setupGames,
				error: function error(request, errorType, errorMessage) {
					alert("error " + errorType + " - " + errorMessage);
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

	}, {
		key: "setupGames",
		value: function setupGames(data) {
			console.log("In SetupGames " + data.gameName);

			this.numberOfPicks = data.numberOfPicks;
		}
	}, {
		key: "updateDrawNumbers",
		value: function updateDrawNumbers() {
			console.log("in UpdateDrawNumbers");
			//	this.pickedNumbers.sort();
			var i = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.pickedNumbers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var num = _step.value;

					$('.drawNumber').eq(i).val(num);
					i++;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "updateBonusNumbers",
		value: function updateBonusNumbers() {
			console.log("In updateBonusNumbers");
			$('.bonusNumber').val(this.bonusNumber);
		}
	}]);

	return DrawGame;
}(); // end DrawGame

},{"./constants.es2015.js":1}]},{},[2]);
