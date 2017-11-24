require("lib/p5.min.js");
const LinkedList = require("js/LinkedList"),
    Queue = require("js/Queue"),
    Stack = require("js/Stack"),
    PriorityQueue = require("js/PriorityQueue"),
    Drawer = require("js/Drawer");

var vars, openSans;

function preload() {
    openSans = loadFont("assets/OpenSans-Light.ttf");
}

function setup() {
    textFont(openSans, 14);
    var canvas = createCanvas(windowWidth * 2 / 3, windowHeight);
    canvas.parent('#canvas');
    colorMode(HSB);

    vars = new Map();
    // Array  list
    // Linked list
    vars.set("myLL", new LinkedList());
    vars.get("myLL").add("hola");
    vars.get("myLL").add("papu");
    vars.get("myLL").add("como");
    vars.get("myLL").add("estás");
    vars.get("myLL").add("?");
    vars.get("myLL").add("chao");
    vars.get("myLL").add("papu")
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
    vars.get("myPQ").add(5);
    vars.get("myPQ").add(2);
    vars.get("myPQ").add(3);
    vars.get("myPQ").peek();
    vars.get("myPQ").poll();
    vars.set("myVar", 5);
    vars.set("myNewVar", 50000);
}

function draw() {
    background(26, 7, 84);
    Drawer.variables(vars);
}

function windowResized() {
    resizeCanvas(windowWidth * 2/3, windowHeight);
}
