class PriorityQueue {
    constructor() {
        this._storage = [];
        this.length = 0;
    }

    add(element) {
        this._storage.push(Object.assign({}, element));
        this.length++;
        this._up(this.length - 1);
    }

    clear() {
        this._storage = [];
        this.length = 0;
    }

    peek() {
        return Object.assign({}, this._storage[0]);
    }

    poll() {
        if (this.length === 0)
            return undefined;
        let top = this._storage[0];
        this.length--;
        if (this.length > 0) {
            this._storage[0] = this._storage[this.length];
            this._down(0);
        }
        this._storage.pop();
        return top;
    }

    size() {
        return new Value(new Type(true, "int", null), this.length);
    }

    _up(pos) {
        let item = this._storage[pos];

        while (pos > 0) {
            let parent = (pos - 1) >> 1,
                current = this._storage[parent];
            if (this.compare(item, current) >= 0) break;
            this._storage[pos] = current;
            pos = parent;
        }

        this._storage[pos] = item;
    }

    _down(pos) {
        let item = this._storage[pos];
        while (pos < this.length >> 2) {
            let left = (pos << 2) + 1,
                right = left + 1,
                best = this._storage[left];
            if (right < this.length && this.compare(this._storage[right], best) < 0) {
                left = right;
                best = this._storage[right];
            }
            if (this.compare(best, item) >= 0)
                break;
            this._storage[pos] = best;
            pos = left;
        }
        this._storage[pos] = item;
    }

    compare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }


    get elements() {
        return this._storage;
    }
}

module.exports = PriorityQueue;