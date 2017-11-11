require("js/sketch.js");
// Editor init
var javaEditor = CodeMirror(document.getElementById("input"), {
  lineNumbers: true,
  matchBrackets: true,
  mode: "text/x-java"
});
console.log(javaEditor)

// Code change evaluation
javaEditor.on("change", function(cm) {
  for (l of lines) {
    var gutter = document.getElementsByClassName("CodeMirror-code")[0].children[l].firstChild.firstChild;
    gutter.className = "CodeMirror-linenumber CodeMirror-gutter-elt";
  }
  lines = [];
  console.clear();
  setTimeout(() => {
    visit(cm.getValue());
  }, 1);
});

// Error advice
var gutter = document.querySelectorAll('.CodeMirror-linenumber');
for (lineNumber of gutter) {
  lineNumber.addEventListener('mouseover', function(e) {
    if (this.error != undefined)
      alert(this.error)
  });
}

// Error managment
var lines = [];
var err = console.error;
console.error = function(e) {
  err(e);
  var [line, col] = e.split(" ")[1].split(":").map(Number);

  lines.push(line - 1);
  var gutter = document.getElementsByClassName("CodeMirror-code")[0].children[line - 1].firstChild.firstChild;
  gutter.className += " gutter-error";
  gutter.error = "At:" + e.substring(7);
};

// ANTLR4 var init and visit
var tree;
var antlr4 = require('antlr4/index');
var TodoLexer = require('generated-parser/TodoLexer');
var TodoParser = require('generated-parser/TodoParser');
var Visitor = require('js/Visitor');

function visit(code) {
  var input = code;
  var chars = new antlr4.InputStream(input);
  var lexer = new TodoLexer.TodoLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new TodoParser.TodoParser(tokens);
  var visitor = new Visitor.Visitor();
  parser.buildParseTrees = true;
  tree = parser.elements();
  visitor.visitElements(tree);
}
