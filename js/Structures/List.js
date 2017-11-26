class List {
    constructor() {
        // if (this.constructor === List) {
        //     throw new Error("Can't instantiate abstract class!");
        // }
        this._storage = new Array();
    }

    add(element, index = -1) {
        if (index != -1)
            this._storage.splice(index, 0, element);
        return this._storage.push(element);
    }

    clear() {
        this._storage = new Array();
    }

    contains(element) {
        return this._storage.includes(element);
    }

    get(index) {
        return this._storage[index];
    }

    indexOf(element) {
        return this._storage.indexOf(element);
    }

    isEmpty() {
        return this._storage.length == 0;
    }

    remove(index) {
        return this._storage.splice(index, 1)[0];
    }

    removeElement(element) {
        var index = this.indexOf(element);
        if (index == -1)
            return false
        this._storage.splice(index, 1)[0]
        return true;
    }

    set(index, element) {
        var oldElement = this._storage[index];
        this._storage[index] = element;
        return oldElement;
    }

    size() {
        return this._storage.length;
    }

    // Para dibujar
    get elements() {
        return this._storage;
    }
}

module.exports = List;