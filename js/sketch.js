require("lib/p5");
const LinkedList = require("js/LinkedList");
const DrawTool = require("js/DrawTool");

// Canvas
var code, structs;

function setup() {
  var canvas = createCanvas(windowWidth * 2 / 3, windowHeight);
  canvas.parent('#canvas');
  colorMode(HSB);

  code = editor.getValue();

  structs = new Map();
  structs.set("varList", new LinkedList());
  structs.get("varList").add("hola");
  structs.get("varList").add("papu");

  structs.set("holaList", new LinkedList());
  structs.get("holaList").add("chao");
  structs.get("holaList").add("papu");
}

function draw() {
  background(50, 25, 100);
  var i = 0;
  for (var [key, struct] of structs) {
    struct.draw(i++);
  }
  DrawTool.drawEllipse(code, mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
