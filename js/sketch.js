require("lib/p5.min.js");
const Drawer = require("js/Drawer");

let openSans, canvas;
//var zoom, zoomAt, resize;

function preload() {
    openSans = loadFont("assets/OpenSans-Light.ttf");
}

function setup() {
    textFont(openSans, 14);
    // resize = true;
    // zoom = 1;
    // zoomAt = createVector(0, 0)
    canvas = createCanvas(windowWidth - 30, 1000);
    canvas.parent('#canvas');
    colorMode(HSB);
    Drawer.variables(new Map());
}

function windowResized() {
    resizeCanvas(windowWidth - 30, 1000);
    Drawer.variables(arrTables[slider.value][1]);
}

function mouseWheel(event) {
    // if (mouseX > 0 && mouseY > 0) {
    //     zoom += 0.0005 * event.delta;
    //     zoom = constrain(zoom, 1.0, 2.0);
    //     zoomAt = createVector(constrain(mouseX, 0, width), constrain(mouseY, 0, height))
    // }
}

function arcArrow(x, y, sx, sy) {
    push();
    stroke(255);
    noFill();
    translate(x, y);
    scale(sx, sy);
    arc(0, 0, 50, 40, 0, PI / 2.0);
    if (sy == -1) {
        translate(25, 3);
    } else if (sx == 1 && sy == 1) {
        translate(3, 20);
        rotate(3 * PI / 2.0);
    }
    fill(255);
    triangle(0, -3, -2, 0, 2, 0);
    pop();
}

function arrow(x1, y1, x2, y2) {
    push();
    stroke(255);
    noFill();
    line(x1, y1, x2 - 3, y2);
    translate(x2, y2 + 0.5);
    fill(255);
    triangle(0, 0, -3, 2, -3, -2);
    pop();
}