var List = require("js/List");

class LinkedList extends List {
  constructor() {
    super();
  }

  add(element) {
    this.l.push(element);
  }

  get elements() {
    return this.l;
  }
}

module.exports = LinkedList;
