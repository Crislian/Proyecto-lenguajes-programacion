require("lib/p5");
const LinkedList = require("js/LinkedList");
const DrawTool = require("js/DrawTool");

// Canvas
var code, structs;

function setup() {
  var canvas = createCanvas(windowWidth * 2 / 3, windowHeight);
  canvas.parent('#canvas');
  code = javaEditor.getValue();
  structs = new Map();
  structs.set("varList", new LinkedList());
  structs.get("varList").append("hola");
  structs.get("varList").append("papu");

  structs.set("holaList", new LinkedList());
  structs.get("holaList").append("chao");
  structs.get("holaList").append("papu");
}

function draw() {
  background(255);
  var i = 0;
  for (var [key, struct] of structs) {
    i++;
    // console.log(key + ' : ' + struct.elements);
    struct.draw(i);
  }
  DrawTool.drawEllipse(code, mouseX, mouseY);
}
