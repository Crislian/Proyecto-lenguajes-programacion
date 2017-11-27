class Value{
    constructor(type, val){
        this.type = type; // Type
        this.val = val; // Depends on the DataType
    }

    toString() {
        return this.val;
    }
}

module.exports = Value;