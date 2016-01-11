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

},{}]},{},[1]);
