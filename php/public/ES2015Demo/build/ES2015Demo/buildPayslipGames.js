(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _constantsEs = require('./constants.es2015.js');

var _playslipgameEs = require('./playslipgame.es2015.js');

// Import from Constants

$(function () {
	$.ajax(_constantsEs.GAMES_URL, {
		timeout: _constantsEs.AJAX_TIMEOUT,
		jsonpCallback: 'payslipGames',
		crossDomain: true,
		contentType: _constantsEs.AJAX_CONTENT_TYPE,
		dataType: _constantsEs.AJAX_DATA_TYPE,
		success: function success(data) {
			for (var i = 0; i < data.games.length; i++) {
				var playSlip = new _playslipgameEs.PlayslipGame(data.games[i].gameName, data.games[i].configFile, data.games[i].callback, data.games[i].gameLogo);
				playSlip.getGameConfiguration();
			}
		},
		error: function error(request, errorType, errorMessage) {
			alert('error ' + errorType + ' - {$errorMessage}');
		}
	});
});

},{"./constants.es2015.js":2,"./playslipgame.es2015.js":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./constants.es2015.js":2}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PlayslipGame = undefined;

var _drawGameEs = require("./drawGame.es2015.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayslipGame = function (_DrawGame) {
	_inherits(PlayslipGame, _DrawGame);

	function PlayslipGame() {
		var gameName = arguments.length <= 0 || arguments[0] === undefined ? "DemoGame" : arguments[0];
		var configFilePath = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_GAME_CONFIG : arguments[1];
		var callback = arguments.length <= 2 || arguments[2] === undefined ? DEFAULT_GAME_CALLBACK : arguments[2];
		var logo = arguments.length <= 3 || arguments[3] === undefined ? DEFAULT_LOGO : arguments[3];

		_classCallCheck(this, PlayslipGame);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayslipGame).call(this, gameName, configFilePath, callback, logo)); // call parent ctor.	
		// 	console.log(`In Playslip Ctor for ${this.gameName}`);
	}

	_createClass(PlayslipGame, [{
		key: "setupGames",
		value: function setupGames(data) {
			// console.log(`in Playslip SetupGames for ${this.gameName}`);
			this.numberOfPicks = data.numberOfPicks;
			// Build the tab for the game
			var tab = $("<li id=\"" + this.gameName + "\"><img src=\"" + this.gameLogo + "\"  alt=\"" + this.gameName + "\" /></li>");
			tab.click(this.changeGame);
			$("#gameTabs").append(tab);

			// build the gameDetails
			this.buildGame(data);
			$('.gameDetails').first().show();
		} // end setupGames

	}, {
		key: "changeGame",
		value: function changeGame() {
			// console.log(`In Change Game for ${$(this).attr("id")}`);
			// Hide all the other GameDetails, and just show the one that we clicked for.
			$('.gameDetails').hide();
			var detailsName = $(this).attr("id") + "Details";
			$("#" + detailsName).show();
		} // End changeGame

	}, {
		key: "buildGame",
		value: function buildGame(gameInfo) {
			// console.log(`In Build Game for ${this.gameName}`);

			// Build the container for the game details
			var tabContent = $("<div class=\"gameDetails\" id=\"" + this.gameName + "Details\"></div>");
			tabContent.append("<img src=\"img/" + gameInfo.gameLogo + "\" alt=\"" + gameInfo.gameName + "\"/>");

			// setup the numbers pick
			var drawNumbers = $('<div class="drawNumbers"></div>');
			tabContent.append(drawNumbers);
			for (var i = 0; i < gameInfo.numberOfPicks; i++) {
				var drawNumber = $("<input type=\"text\" value=\"\" placeholder=\"-\" size=\"2\" class=\"drawNumber\" id=\"drawNumber" + i + "\"/>");
				drawNumbers.append(drawNumber);
			}

			// set up the game buttons array
			var drawPool = $('<div class="drawPool"></div>');
			tabContent.append(drawPool);
			for (var i = 1; i <= gameInfo.numberPool; i++) {
				var numberPoolBtn = $("<button class=\"poolButton\" value=\"" + i + "\">" + i + "</button>");
				$('.poolButton').click(this, this.drawpoolClicked);
				drawPool.append(numberPoolBtn);
			}
			$('#gamesArea').append(tabContent);

			if (gameInfo.bonusBall) {
				var bonusNumber = $("<input type=\"text\" value=\"\" placeholder=\"-\" size=\"2\" class=\"bonusNumber\" id=\"bonusNumber1\"/>");
				drawNumbers.append(bonusNumber);

				var bonusPool = $('<div class="bonusPool"></div>');
				tabContent.append(bonusPool);
				for (var i = 1; i <= gameInfo.bonusBallPool; i++) {
					var bonusPoolBtn = $("<button class=\"bonusPoolButton\" value=\"" + i + "\">" + i + "</button>");
					$('.bonusPoolButton').click(this, this.bonusPoolClicked);
					bonusPool.append(bonusPoolBtn);
				}
			}
		} // end buildGame

	}, {
		key: "drawpoolClicked",
		value: function drawpoolClicked(thisGame) {
			var gameData = thisGame.data;
			// console.log("in drawpoolClicked");
			// Change the class of the clicked item
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
				gameData.pickedNumbers.delete($(this).val());
			} else {
				if (gameData.pickedNumbers.size < gameData.numberOfPicks) {
					$(this).addClass("selected");
					// Add the value to the corrisponding drawNumbers field		
					gameData.pickedNumbers.add($(this).val());
				} else {
					console.warn("All picks are used up, please delete one before adding more");
				}
			}
			thisGame.stopPropagation();
			gameData.updateDrawNumbers();
		} // end drawpoolClicked

	}, {
		key: "bonusPoolClicked",
		value: function bonusPoolClicked(thisGame) {
			var gameData = thisGame.data;
			console.log("in bonusPoolClicked");
			// Change the class of the clicked item
			$('.bonusPoolButton').removeClass("bonusSelected");
			$(this).addClass("bonusSelected");
			gameData.bonusNumber = $(this).val();

			gameData.updateBonusNumbers();
		} // end

	}]);

	return PlayslipGame;
}(_drawGameEs.DrawGame); // end Payslip Game

exports.PlayslipGame = PlayslipGame;

},{"./drawGame.es2015.js":3}]},{},[1]);
