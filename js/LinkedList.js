const List = require("js/List");

class LinkedList extends List {
    constructor() {
        super();
    }

    addFirst(element) {
        this._storage.unshift(element);
    }

    addLast(element) {
        this.add(element);
    }

    element() {
        return this.getFirst();
    }

    getFirst() {
        return this.get(0);
    }

    getLast() {
        return this.get(this.size() - 1);
    }

    lastIndexOf(element) {
        return this._storage.lastIndexOf(element);
    }

    peek() {
        return this.getFirst();
    }

    peekFirst() {
        if (this.isEmpty())
            return null;
        return this.peek();
    }

    peekLast() {
        if (this.isEmpty())
            return null;
        return this.getLast();
    }

    poll() {
        return this.removeFirst();
    }

    pollFirst() {
        if (this.isEmpty())
            return null;
        return this.poll();
    }

    pollLast() {
        if (this.isEmpty())
            return null;
        return this.pop();
    }

    pop() {
        return this.remove(this.size() - 1);
    }

    push(element) {
        this.add(element)
    }

    remove(index = 0) {
        return super.remove(index);
    }

    removeFirst() {
        return this.remove();
    }

    removeLast() {
        return this.remove(this.size() - 1);
    }
}

module.exports = LinkedList;
