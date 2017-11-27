const List = require("js/Structures/List");
const Type = require('js/Type'),
    Value = require('js/Value');

class Queue extends List {
    constructor() {
        super();
    }

    element() {
        return super.get(new Value(null, 0));
    }

    offer(element) {
        return super.add(element);
    }

    peek() {
        return super.get(new Value(null, 0));
    }

    poll() {
        return this.remove(0);
    }

    remove(idx = 0) {
        return super.remove(idx);
    }
}

module.exports = Queue;