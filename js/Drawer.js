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
        let panelW = width / 3, panelH = height - 10;
        rect(5, 5, 2 * panelW - 2.5, panelH, 15);
        textAlign(CENTER, TOP);
        push();
        stroke(26, 7, 84);
        fill(26, 7, 84);
        text("Structures", 5 + (2 * panelW - 2.5) / 2, 10);
        pop();
        translate(2 * panelW, 0);
        rect(7.5, 5, panelW - 12.5, panelH, 15);
        push();
        stroke(26, 7, 84);
        fill(26, 7, 84);
        text("Variables", 7.5 + (panelW - 12.5) / 2, 10);
        pop();
        pop();
    }

    static variables(tables) {
        let vars = new Map(),
            structs = new Map();
        for (let table of tables) {
            for (let [name, variable] of table) {
                if (variable.value.type.isPrimitive)
                    vars.set(name, variable);
                else
                    structs.set(name, variable);
            }
        }
        this.drawPanels();
        console.log("Ill draw");
        console.log(tables);
        this.structures(structs);
        this.drawVariables(vars);
    }

    static drawVariables(vars) {
        let i = 0;
        for (let [varName, varVal] of vars) {
            push();
            translate(2 * width / 3, i * 20 + 35);
            fill(26, 7, 84);
            textAlign(LEFT, TOP);
            let type = "";
            if (varVal.isConstant)
                type = "final";
            textSize(16);
            text(type + " " + varVal.value.type.mainType + " " + varName + ":", 15, 0);
            textAlign(CENTER, CENTER);
            textAlign(RIGHT, TOP);
            if (varVal.value.val == null || isNaN(varVal.value.val))
                varVal.value.val = "null";
            text(varVal.value.val, width / 3 - 15, 0);
            if (varVal.value.val === "null")
                varVal.value.val = null;
            pop();
            i++;
        }
    }

    static structures(structs) {
        let h = 0;
        push();
        translate(15, 35);
        for (let [varName, struct] of structs) {
            let structName = struct.value.type.mainType;
            textAlign(LEFT, TOP);
            fill(26, 7, 84);
            translate(0, h - 10);
            text(varName + " - " + structName + "<" + struct.value.type.subType + ">", 0, 0);
            translate(0, 35);
            if (!struct.value.val.elements.length == 0)
                h = eval("Drawer.draw" + structName)(struct.value.val.elements.map(function (obj) {
                    return obj.val.toString();
                }));
        }
        pop();
    }

    static drawArrayList(arraylist) {
        let w = 0;
        for (let el of arraylist) {
            push();
            translate(w, 0);
            if (w + textWidth(el) + 30 > 2 * width / 3 - 5) {
                w += Drawer.element("rect", "...");
                pop();
                break;
            }
            w += Drawer.element("rect", el);
            pop();
        }
        return 30;
    }

    static drawLinkedList(list) {
        console.log("LinkedList")
        let w = 5, i = 1;
        for (let el of list) {
            push();
            translate(w, 0);
            if (w + textWidth(el) + 30 > 2 * width / 3 - 5) {
                w += Drawer.element("ellipse", "...");
                pop();
                return;
            }
            let wNew = Drawer.element("ellipse", el);
            w += wNew + 10;
            if (list.length !== i++) {
                translate(wNew - Drawer.whiteSpace(), 0);
                arrow(0, 0, 10, 0);
            }
            pop();
        }
        return 30;
    }

    static drawQueue(queue) {
        let w = 30;
        arcArrow(w - Drawer.whiteSpace(), 15, -1, -1);
        for (let el of queue) {
            push();
            translate(w, 0);
            w += Drawer.element("rect", el);
            pop();
        }
        arcArrow(w - Drawer.whiteSpace(), -15, 1, 1);
        return 30;
    }

    static drawStack(stack) {
        let w = 5;
        for (let el of stack) {
            push();
            translate(w, 0);
            w += Drawer.element("rect", el);
            pop();
        }
        arcArrow(w - Drawer.whiteSpace(), 25, 1, -1);
        arcArrow(w - Drawer.whiteSpace(), -25, 1, 1);
        return 30;
    }

    static drawPriorityQueue(pq, i = 0, w = 0) {
        if (i === 0) {
            Drawer.drawArrayList(pq);
            w = width / 3 - Drawer.whiteSpace();
            translate(0, -5);
        }
        push();
        translate(w, 45);
        w = Math.abs(w);
        Drawer.element("ellipse", pq[i], 1);
        let right = (i + 1) * 2,
            left = right - 1;
        stroke(255);
        if (left < pq.length) {
            line(0, 15, -w / 2, 30);
            Drawer.drawPriorityQueue(pq, left, -w / 2);
        }
        if (right < pq.length) {
            line(0, 15, w / 2, 30);
            Drawer.drawPriorityQueue(pq, right, w / 2);
        }
        pop();
        if (i == 0) {
            return 30 + 45 * (Math.ceil(Math.log2(pq.length + 1)));
        }
    }

    static element(shape, string, centered = 0) {
        let valText = textWidth(string);
        push();
        strokeWeight(0.5);
        stroke(0, 0, 33);
        fill(29, 33, 75);
        textSize(12);
        eval(shape + "Mode")(CENTER);
        if (centered === 0)
            eval(shape)(valText / 2, 0, Drawer.whiteSpace() * 2 + valText, 30);
        else
            eval(shape)(0, 0, Drawer.whiteSpace() * 2 + valText, 30);
        fill(0, 0, 33);
        textAlign(CENTER, CENTER);
        if (centered === 0)
            text(string, valText / 2, -2);
        else
            text(string, 0, -2);
        pop();
        return Drawer.whiteSpace() * 2 + valText;
    }

    static whiteSpace() {
        return 3;
    }
}

module.exports = Drawer;
