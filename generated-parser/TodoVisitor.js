// Generated from Todo.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by TodoParser.

function TodoVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

TodoVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
TodoVisitor.prototype.constructor = TodoVisitor;

// Visit a parse tree produced by TodoParser#elements.
TodoVisitor.prototype.visitElements = function(ctx) {
};


// Visit a parse tree produced by TodoParser#element.
TodoVisitor.prototype.visitElement = function(ctx) {
};


// Visit a parse tree produced by TodoParser#emptyLine.
TodoVisitor.prototype.visitEmptyLine = function(ctx) {
};



exports.TodoVisitor = TodoVisitor;