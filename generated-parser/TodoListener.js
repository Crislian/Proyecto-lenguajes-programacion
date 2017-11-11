// Generated from Todo.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by TodoParser.
function TodoListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

TodoListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
TodoListener.prototype.constructor = TodoListener;

// Enter a parse tree produced by TodoParser#elements.
TodoListener.prototype.enterElements = function(ctx) {
};

// Exit a parse tree produced by TodoParser#elements.
TodoListener.prototype.exitElements = function(ctx) {
};


// Enter a parse tree produced by TodoParser#element.
TodoListener.prototype.enterElement = function(ctx) {
};

// Exit a parse tree produced by TodoParser#element.
TodoListener.prototype.exitElement = function(ctx) {
};


// Enter a parse tree produced by TodoParser#emptyLine.
TodoListener.prototype.enterEmptyLine = function(ctx) {
};

// Exit a parse tree produced by TodoParser#emptyLine.
TodoListener.prototype.exitEmptyLine = function(ctx) {
};



exports.TodoListener = TodoListener;