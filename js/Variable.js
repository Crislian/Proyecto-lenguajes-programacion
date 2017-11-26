class Variable{

    constructor(isConstant, name, value){
        this.isConstant = isConstant; // Bool
        this.name = name; // String
        this.value = value; // Value
    }
}

module.exports = Variable;