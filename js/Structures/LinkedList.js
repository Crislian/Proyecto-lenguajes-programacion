const List = require("js/Structures/List");
const Type = require('js/Type'),
    Value = require('js/Value');

class LinkedList extends List {
    constructor() {
        super();
    }

    addFirst(element) {
        this.add(element, 0);
    }

    addLast(element) {
        this.add(element);
    }

    element() {
        return this.getFirst();
    }

    getFirst() {
        return this.get(new Value(null, 0));
    }

    getLast() {
        return this.get(new Value(null, this.size() - 1));
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
        if (isNaN(index))
            return super.removeElement(index);
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
