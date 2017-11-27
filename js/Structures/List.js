const Type = require('js/Type'),
    Value = require('js/Value');

class List {
    constructor() {
        this._storage = new Array();
    }

    add(element, index = -1) {
        if (index != -1) {
            this._storage.splice(index.val, 0, element);
            return;
        }
        this._storage.push(element);
    }

    clear() {
        this._storage = new Array();
    }

    contains(element) {
        if (this.indexOf(element).val != -1)
            return new Value(new Type(true, "boolean", null), false);
        return new Value(new Type(true, "boolean", null), true);
    }

    get(index) {
        return this._storage[index.val];
    }

    indexOf(element) {
        console.log("FUUUCK IndexOf");
        let i = 0;
        for (let e of this._storage) {
            if (e.type.isPrimitive == element.type.isPrimitive &&
                e.type.mainType == element.type.mainType &&
                e.val == element.val)
                return new Value(new Type(true, "int", null), i);
            i++;
        }
        return new Value(new Type(true, "int", null), -1);
    }

    isEmpty() {
        return new Value(new Type(true, "boolean", null), this._storage.length == 0);
    }

    lastIndexOf(element) {
        for (let i = this._storage.length - 1; i > 0; i--) {
            let e = this._storage[i];
            if (e.type.isPrimitive == element.type.isPrimitive &&
                e.type.mainType == element.type.mainType &&
                e.val == element.val)
                return new Value(new Type(true, "int", null), i);
            i--;
        }
        return new Value(new Type(true, "int", null), -1);
    }

    remove(index) {
        return this._storage.splice(index, 1)[0];
    }

    removeElement(element) {
        var index = this.indexOf(element);
        if (index == -1)
            return false;
        this._storage.splice(index, 1)[0]
        return true;
    }

    set(index, element) {
        var oldElement = this._storage[index];
        this._storage[index] = element;
        return oldElement;
    }

    size() {
        return new Value(new Type(true, "int", null), this._storage.indexOf(element));
    }

    // Para dibujar
    get elements() {
        return this._storage;
    }
}

module.exports = List;