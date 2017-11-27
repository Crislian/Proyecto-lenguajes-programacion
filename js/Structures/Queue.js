const List = require("js/Structures/List");

class Queue extends List {
    constructor() {
        super();
    }

    element() {
        return super.get(0);
    }

    offer(element) {
        return super.add(element);
    }

    peek() {
        return super.get(0);
    }

    poll() {
        return this.remove(0);
    }

    remove(idx = 0) {
        return super.remove(idx);
    }
}

module.exports = Queue;