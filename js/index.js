var $ = require("lib/jquery.min.js");
var CodeMirror = require("lib/codemirror");
require("lib/codemirror/clike");

// Mode of execution
var mode = "Java";
var code = "";
var editor;
// <<<<<<< HEAD
// initEditor();

var initialCode = "public class Main{\n" +
    " public static void main(String []args){\n" +
    "  \t\n" +
    " }\n" +
    "}";

// function initEditor() {
//     editor = CodeMirror(document.getElementById("input"), {
//         lineNumbers: true,
//         matchBrackets: true,
//         styleActiveLine: true,
//         indentUnit:4,
//         mode: "text/x-" + mode.toLowerCase(),
//         value: "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\t\n}",
//         smartIdent:true
//     });
// }

// Wait time until stop typing
var typingTimer;                //timer identifier
// <<<<<<< HEAD
// var doneTypingInterval = 1000; // tiempo de espera
// // Code to put timer
// editor.on("keyup", function () {
//     clearTimeout(typingTimer);
//     if (editor.getValue()) {
//         typingTimer = setTimeout(doneTyping, doneTypingInterval);
//     }
// });
//
// function doneTyping() {
//     for (l of lines) {
//         var gutter = $(".CodeMirror-code:first")[0].children[l].firstChild.firstChild;
//         gutter.className = "CodeMirror-linenumber CodeMirror-gutter-elt";
//     }
//     lines = [];
//     console.clear();
//     code = editor.getValue();
//     console.log(code);
//     setTimeout(() => {
//         visit(code);
//     }, 1);
// }
//
// // Error advice
// var gutter = document.querySelectorAll('.CodeMirror-linenumber');
// for (lineNumber of gutter) {
//     lineNumber.addEventListener('mouseover', function (e) {
//         if (this.error != undefined)
//             alert(this.error)
//     });
// }
// =======
var doneTypingInterval = 1000; // wait time millis
// >>>>>>> 4a2f77d6618c5ca26dee8ae280e1480256514e43

// Error managment
var err = console.error;

// ANTLR4 var init and visit
const antlr4 = require('antlr4/index');
var Lexer, Parser, Visitor;

$(document).ready(function () {
    setMode(mode);

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
                visit(code);
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
        indentUnit:4,
        mode: "text/x-" + mode.toLowerCase(),
        value: "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\t\n}",
        smartIdent:true
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
        visitor.visitCompilationUnit(tree);
    } catch (e) {
        err(e);
    }
}
