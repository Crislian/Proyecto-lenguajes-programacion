var $ = require("lib/jquery.min.js");
var CodeMirror = require("lib/codemirror");
require("lib/codemirror/clike");

// Mode of execution
var mode = "Java";
var code = "";
var editor;
var typingTimer;                //timer identifier
var doneTypingInterval = 1000; // wait time millis
var arrTables;
var slider = document.getElementById("myRange");

// Error managment
var err = console.error;

// ANTLR4 var init and visit
const antlr4 = require('antlr4/index');
var Lexer, Parser, Visitor;

$(document).ready(function () {
    setMode(mode);
    $("#myRange").on("input change", function () {
        // LINEA
        Drawer.variables(arrTables[slider.value][1]);
    });
    // Code to put timer
    editor.on("keyup", function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function () {
            for (var gutter of $(".gutter-error")) {
                gutter.className = "CodeMirror-linenumber CodeMirror-gutter-elt";
                gutter.removeChild(gutter.lastChild);
            }
            code = editor.getValue();
            console.clear();
            setTimeout(() => {
                arrTables = visit(code)
                slider.min = 0;
                slider.value = 0;
                slider.max = arrTables.length - 1;
                Drawer.variables(arrTables[0][1]);
            }, 1);
        }, doneTypingInterval);
    });
    code = editor.getValue();
});

console.error = function (e) {
    err(e);
    var numLinea = parseInt(e.split(" ")[1][0]);
    var gutter = $(".CodeMirror-code")[0].children[numLinea - 1].firstChild.firstChild;
    if (gutter.childNodes.length == 1) {
        var tooltip = document.createElement("span");
        tooltip.className = "gutter-error-tooltip";
        tooltip.appendChild(document.createTextNode("At:" + e.substring(7)));
        gutter.appendChild(tooltip);
        gutter.className += " gutter-error";
    } else {
        gutter.lastChild.textContent += "\nAt:" + e.substring(7);
    }
};

function setMode(m) {
    editor = CodeMirror(document.getElementById("input"), {
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true,
        indentUnit: 4,
        mode: "text/x-" + mode.toLowerCase(),
        value: "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\t\n}",
        smartIdent: true
    });
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
    let tree = parser.compilationUnit();
    try {
        return visitor.visitCompilationUnit(tree);
    } catch (e) {
        err(e);
    }
}
