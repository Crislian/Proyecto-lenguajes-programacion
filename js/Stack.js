const List = require("js/List");

class Stack extends List {
    constructor() {
        super();
    }

    peek() {
        return this.get(this.size()-1);
    }

    pop() {
        return this.remove(this.size() -1);
    }

    push(element) {
        // this.add(element)
    }
}

module.exports = Stack;