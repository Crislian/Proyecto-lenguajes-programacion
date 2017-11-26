const List = require("js/Structures/List");

class ArrayList extends List {
    constructor(initialCapacity = 10) {
        super(initialCapacity);
    }
}

module.exports = ArrayList;