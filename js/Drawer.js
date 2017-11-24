// Colores
// "#D7CEC7"  26,  7, 84
// "#565656"   0,  0, 33
// "#C09F80"  29, 33, 75
// "#76323F" 348, 57, 46
class Drawer {

    static drawPanels() {
        push();
        textSize(16);
        noStroke();
        fill(0, 0, 33);
        var panelW = width / 3, panelH = height - 10;
        rect(5, 5, 2 * panelW - 2.5, panelH, 15)
        textAlign(CENTER, TOP);
        push();
        stroke(26, 7, 84);
        fill(26, 7, 84);
        text("Structures", 5 + (2 * panelW - 2.5) / 2, 10)
        pop();
        translate(2 * panelW, 0);
        rect(7.5, 5, panelW - 12.5, panelH, 15)
        push();
        stroke(26, 7, 84);
        fill(26, 7, 84);
        text("Variables", 7.5 + (panelW - 12.5) / 2, 10)
        pop();
        pop();
    }

    static variables(variables) {
        var vars = new Map(),
            structs = new Map();
        for (var [name, value] of variables) {
            if (value.elements != undefined)
                structs.set(name, value);
            else
                vars.set(name, value);
        }
        this.drawPanels();
        this.structures(structs);
        this.varTable(vars);
    }

    static varTable(vars) {
        var i = 0;
        for (var [varName, varVal] of vars) {
            push();
            translate(2 * width / 3, i * 20 + 35);
            fill(26, 7, 84);
            textAlign(LEFT, TOP);
            text(varName + ":", 15, 0);
            textAlign(RIGHT, TOP);
            text(varVal, width/3-15, 0);
            pop();
            i++;
        }
    }

    static structures(structs) {
        var i = 0;
        for (var [varName, struct] of structs) {
            var structName = struct.constructor.name;
            push();
            textAlign(LEFT, TOP);
            translate(15, i * 100 + 35);
            fill(26, 7, 84);
            text(varName + " - " + structName, 0, 0);
            structName = structName[0].toLowerCase() + structName.substring(1);
            eval("Drawer." + structName)(struct.elements.map(function (obj) {
                return obj.toString();
            }));
            pop();
            i++
        }
    }

    static linkedList(list) {
        var w = 10;
        for (var el of list) {
            push();
            translate(w, 60);
            w += Drawer.element("ellipse", el) + 15;
            pop();
        }
    }

    static queue(queue) {
        var w = 40;
        for (var el of queue) {
            push();
            translate(w, 60);
            w += Drawer.element("rect", el);
            pop();
        }
    }

    static stack(queue) {
        var w = 10;
        for (var el of queue) {
            push();
            translate(w, 60);
            w += Drawer.element("rect", el);
            pop();
        }
    }

    static priorityQueue(pq) {
        var w = 10;
        for (var el of pq) {
            push();
            translate(w, 60);
            w += Drawer.element("ellipse", el) + 15;
            pop();
        }
    }

    static element(shape, string) {
        var valText = textWidth(string);
        push();
        strokeWeight(0.5);
        stroke(0, 0, 33)
        fill(29, 33, 75);
        textSize(12);
        eval(shape + "Mode")(CENTER);
        eval(shape)(valText / 2, 0, 13 + valText + 13, 50);
        fill(0, 0, 33);
        textAlign(CENTER, CENTER);
        text(string, valText / 2, -2);
        pop();
        return 13 + valText + 13;
    }
}

module.exports = Drawer;
