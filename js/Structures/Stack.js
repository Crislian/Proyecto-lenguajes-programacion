const List = require("js/Structures/List");
const Value = require("js/Value");

class Stack extends List {
    constructor() {
        super();
    }

    peek() {
        return super.get(new Value(null, super.size()-1));
    }

    pop() {
        return super.remove(super.size() -1);
    }

    push(element) {
        this.add(element)
    }

    empty(){
        return super.isEmpty();
    }
}

module.exports = Stack;