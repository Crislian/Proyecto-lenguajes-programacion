require("lib/p5.min.js");
const ArrayList = require("js/Structures/ArrayList"),
    LinkedList = require("js/Structures/LinkedList"),
    Queue = require("js/Structures/Queue"),
    Stack = require("js/Structures/Stack"),
    PriorityQueue = require("js/Structures/PriorityQueue"),
    Drawer = require("js/Drawer");

var vars, openSans, zoom, zoomAt, canvas, resize;

function preload() {
    openSans = loadFont("assets/OpenSans-Light.ttf");
}

function setup() {
    resize = true;
    textFont(openSans, 14);
    zoom = 1;
    zoomAt = createVector(0, 0)
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('#canvas');
    colorMode(HSB);
    vars = new Map();

    // ArrayList
    vars.set("myAL", new ArrayList());
    vars.get("myAL").add("hola");
    vars.get("myAL").add("papu");
    vars.get("myAL").add("como");
    vars.get("myAL").add("estás");
    vars.get("myAL").add("u");
    vars.get("myAL").add("chao");
    vars.get("myAL").add("chao");
    vars.get("myAL").add("papu");
    vars.get("myAL").add("papu");
    // LinkedList
    vars.set("myLL", new LinkedList());
    vars.get("myLL").add("hola");
    vars.get("myLL").add("papu");
    vars.get("myLL").add("como");
    vars.get("myLL").add("estás");
    vars.get("myLL").add("u");
    vars.get("myLL").add("chao");
    vars.get("myLL").add("papu");
    // Stack
    vars.set("myStack", new Stack());
    vars.get("myStack").push("hola");
    vars.get("myStack").push("papu");
    vars.get("myStack").push("como");
    vars.get("myStack").push("estás");
    vars.get("myStack").push("?");
    vars.get("myStack").push("chao");
    vars.get("myStack").push("papu");
    // Queue
    vars.set("myQueue", new Queue());
    vars.get("myQueue").offer("hola");
    vars.get("myQueue").offer("papu");
    vars.get("myQueue").offer("como");
    vars.get("myQueue").offer("estás");
    vars.get("myQueue").offer("?");
    vars.get("myQueue").offer("chao");
    vars.get("myQueue").offer("papu");
    // Priority Queue
    vars.set("myPQ", new PriorityQueue());
    vars.get("myPQ").add(100000000);
    vars.get("myPQ").add(9);
    vars.get("myPQ").add(1);
    vars.get("myPQ").add(8);
    vars.get("myPQ").add(15);
    vars.get("myPQ").add(2);
    vars.get("myPQ").add(3);
    vars.get("myPQ").peek();
    vars.get("myPQ").poll();
    vars.set("myVar", 5);
    vars.set("myNewVar", 50000);
}

function draw() {
    background(26, 7, 84);
    translate(zoomAt.x, zoomAt.y);
    scale(zoom);
    translate(-zoomAt.x, -zoomAt.y);
    Drawer.variables(vars);
    if (resize) {
        resize = false;
        windowResized();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    if (mouseX > 0 && mouseY > 0) {
        zoom += 0.0005 * event.delta;
        zoom = constrain(zoom, 1.0, 2.0);
        zoomAt = createVector(constrain(mouseX, 0, width), constrain(mouseY, 0, height))
    }
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