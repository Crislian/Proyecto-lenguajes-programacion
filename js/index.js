var $ = require("lib/jquery.min.js");
var CodeMirror = require("lib/codemirror");
require("lib/codemirror/clike");
var mode = "Java";

var editor;
initEditor();

var initialCode = "public class Main{\n" +
    " public static void main(String []args){\n" +
    "  \t\n" +
    " }\n" +
    "}";

function initEditor() {
    editor = CodeMirror(document.getElementById("input"), {
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true,
        indentUnit:4,
        mode: "text/x-" + mode.toLowerCase(),
        value: "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\t\n}",
        smartIdent:true
    });
}

var typingTimer;                //timer identifier
var doneTypingInterval = 1000; // tiempo de espera
// Code to put timer
editor.on("keyup", function () {
    clearTimeout(typingTimer);
    if (editor.getValue()) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});

function doneTyping() {
    for (l of lines) {
        var gutter = $(".CodeMirror-code:first")[0].children[l].firstChild.firstChild;
        gutter.className = "CodeMirror-linenumber CodeMirror-gutter-elt";
    }
    lines = [];
    console.clear();
    code = editor.getValue();
    console.log(code);
    setTimeout(() => {
        visit(code);
    }, 1);
}

// Error advice
var gutter = document.querySelectorAll('.CodeMirror-linenumber');
for (lineNumber of gutter) {
    lineNumber.addEventListener('mouseover', function (e) {
        if (this.error != undefined)
            alert(this.error)
    });
}

// Error managment
var lines = [];
var err = console.error;
console.error = function (e) {
    err(e);
    var [line, col] = e.split(" ")[1].split(":").map(Number);

    lines.push(line - 1);
    var gutter = document.getElementsByClassName("CodeMirror-code")[0].children[line - 1].firstChild.firstChild;
    gutter.className += " gutter-error";
    gutter.error = "At:" + e.substring(7);
};

// ANTLR4 var init and visit
var tree;
const antlr4 = require('antlr4/index');
var Lexer, Parser, Visitor;
setMode(mode);

function setMode(m) {
    Lexer = require(("generated-parser/" + m + "Lexer"));
    Parser = require(("generated-parser/" + m + "Parser"));
    Visitor = require(("js/Visitors/" + m + "Visitor")).Visitor;
}

function visit(code) {
    var input = code;
    var chars = new antlr4.InputStream(input);
    var lexer = new Lexer[mode + "Lexer"](chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new Parser[mode + "Parser"](tokens);
    var visitor = new Visitor();

    parser.buildParseTrees = true;
    tree = parser.compilationUnit();
    try {
        visitor.visitCompilationUnit(tree);
    } catch (e) {
        err(e);
    }
}
