class Type{
    // constructor(){
    //     this.isPrimitive = false;
    //     this.mainType = null; // DataType
    //     this.subType = null; // DataType
    // }

    constructor(primitive, mainType, subType){
        this.isPrimitive = primitive; //Bool
        this.mainType = mainType; //DataType
        this.subType = subType; //DataType
    }

    // get mainType(){
    //     return this.mainType;
    // }
    // set mainType(type){
    //     this.mainType = type;
    // }
}

module.exports = Type;