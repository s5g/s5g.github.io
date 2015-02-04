var FruitGame = FruitGame || {
};

var particleSystem;
var fruitSystem;
var bladeSystem;
var gravity;

var timer=1;
var interval=2.8;

var bladeColor;
var bladeWidth;

var cutResult = 0;
var missResult = 0;

//start game ui
var gameStart = false;
var ui_scoreIcon;

var ui_gameTitle;
var ui_manualGame;
var ui_manualFruit;
var ui_autoGame;
var ui_autoFruit;
