const List = require("js/Structures/List");

class Stack extends List {
    constructor() {
        super();
    }

    peek() {
        return super.get(super.size()-1);
    }

    pop() {
        return super.remove(super.size() -1);
    }

    push(element) {
        this.add(element)
    }
}

module.exports = Stack;