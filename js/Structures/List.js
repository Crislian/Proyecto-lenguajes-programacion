const Type = require('js/Type'),
    Value = require('js/Value');

class List {
    constructor() {
        this._storage = [];
    }

    add(element, index = -1) {
        if (index !== -1) {
            this._storage.splice(index.val, 0, Object.assign({}, element));
            return;
        }
        this._storage.push(Object.assign({}, element));
    }

    clear() {
        this._storage = [];
    }

    contains(element) {
        if (this.indexOf(element).val !== -1)
            return new Value(new Type(true, "boolean", null), false);
        return new Value(new Type(true, "boolean", null), true);
    }

    get(index) {
        return Object.assign({}, this._storage[index.val]);
    }

    indexOf(element) {
        for (let i = 0; i < this._storage.length; i++) {
            let e = this._storage[i];
            if (e.type.isPrimitive === element.type.isPrimitive &&
                e.type.mainType === element.type.mainType &&
                e.val === element.val)
                return new Value(new Type(true, "int", null), i);
        }
        return new Value(new Type(true, "int", null), -1);
    }

    isEmpty() {
        return new Value(new Type(true, "boolean", null), this._storage.length === 0);
    }

    lastIndexOf(element) {
        for (let i = this._storage.length - 1; i > 0; i--) {
            let e = this._storage[i];
            if (e.type.isPrimitive === element.type.isPrimitive &&
                e.type.mainType === element.type.mainType &&
                e.val === element.val)
                return new Value(new Type(true, "int", null), i);
        }
        return new Value(new Type(true, "int", null), -1);
    }

    remove(index) {
        return this._storage.splice(index, 1)[0];
    }

    removeElement(element) {
        let index = this.indexOf(element);
        if (index === -1)
            return false;
        this.remove(index);
        return true;
    }

    set(index, element) {
        let oldElement = this._storage[index];
        this._storage[index] = new Value(oldElement.type, element.val);
        return new Value(oldElement.type, oldElement.val);
    }

    size() {
        return new Value(new Type(true, "int", null), this._storage.length);
    }

    // Para dibujar
    get elements() {
        return this._storage;
    }
}

module.exports = List;