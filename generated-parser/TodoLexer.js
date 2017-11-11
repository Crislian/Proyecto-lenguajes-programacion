// Generated from Todo.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0002\u0007\u001c\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0003",
    "\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003",
    "\u0005\u0003\u0006\u0003\u0006\u0007\u0006\u0018\n\u0006\f\u0006\u000e",
    "\u0006\u001b\u000b\u0006\u0002\u0002\u0007\u0003\u0003\u0005\u0004\u0007",
    "\u0005\t\u0006\u000b\u0007\u0003\u0002\u0005\u0004\u0002\f\f\u000f\u000f",
    "\u0006\u00022;C\\aac|\b\u0002\u000b\u000b\"\"2;C\\aac|\u001c\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0003\r\u0003\u0002\u0002\u0002\u0005\u000f",
    "\u0003\u0002\u0002\u0002\u0007\u0011\u0003\u0002\u0002\u0002\t\u0013",
    "\u0003\u0002\u0002\u0002\u000b\u0015\u0003\u0002\u0002\u0002\r\u000e",
    "\u0007,\u0002\u0002\u000e\u0004\u0003\u0002\u0002\u0002\u000f\u0010",
    "\u0007\"\u0002\u0002\u0010\u0006\u0003\u0002\u0002\u0002\u0011\u0012",
    "\u0007\u000b\u0002\u0002\u0012\b\u0003\u0002\u0002\u0002\u0013\u0014",
    "\t\u0002\u0002\u0002\u0014\n\u0003\u0002\u0002\u0002\u0015\u0019\t\u0003",
    "\u0002\u0002\u0016\u0018\t\u0004\u0002\u0002\u0017\u0016\u0003\u0002",
    "\u0002\u0002\u0018\u001b\u0003\u0002\u0002\u0002\u0019\u0017\u0003\u0002",
    "\u0002\u0002\u0019\u001a\u0003\u0002\u0002\u0002\u001a\f\u0003\u0002",
    "\u0002\u0002\u001b\u0019\u0003\u0002\u0002\u0002\u0004\u0002\u0019\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function TodoLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

TodoLexer.prototype = Object.create(antlr4.Lexer.prototype);
TodoLexer.prototype.constructor = TodoLexer;

TodoLexer.EOF = antlr4.Token.EOF;
TodoLexer.T__0 = 1;
TodoLexer.T__1 = 2;
TodoLexer.T__2 = 3;
TodoLexer.NL = 4;
TodoLexer.CONTENT = 5;


TodoLexer.modeNames = [ "DEFAULT_MODE" ];

TodoLexer.literalNames = [ null, "'*'", "' '", "'\t'" ];

TodoLexer.symbolicNames = [ null, null, null, null, "NL", "CONTENT" ];

TodoLexer.ruleNames = [ "T__0", "T__1", "T__2", "NL", "CONTENT" ];

TodoLexer.grammarFileName = "Todo.g4";



exports.TodoLexer = TodoLexer;

