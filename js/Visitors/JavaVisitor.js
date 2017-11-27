const JavaVisitor = require('generated-parser/JavaVisitor').JavaVisitor;
const Variable = require('js/Variable');
const Type = require('js/Type');
// const DataType = require('js/DataType');
const Declarator = require('js/Declarator');
const Value = require('js/Value');
const CallFunc = require('js/CallFunc');
const LinkedList = require('js/Structures/LinkedList');
const List = require('js/Structures/List');
const PriorityQueue = require('js/Structures/PriorityQueue');
const Queue = require('js/Structures/Queue');
const Stack = require('js/Structures/Stack');


let tables = new Array();
let structures = new Set();
structures.add("LinkedList");
structures.add("ArrayList");
structures.add("List");
structures.add("Queue");
structures.add("Stack");
structures.add("PriorityQueue");

// This class defines a complete visitor for a parse tree produced by todoParser.
class JVisitor extends JavaVisitor {
    constructor() {
        super();
    }

    // Visit a parse tree produced by JavaParser#compilationUnit.
    visitCompilationUnit(ctx) {
        this.clearTables();

        this.visitTypeDeclaration(ctx.typeDeclaration(0));
        return tables;
    };

    // Visit a parse tree produced by JavaParser#typeDeclaration.
    visitTypeDeclaration(ctx) {
        return this.visitClassDeclaration(ctx.classDeclaration());
    };

    // Visit a parse tree produced by JavaParser#classDeclaration.
    visitClassDeclaration(ctx) {
        return this.visitClassBody(ctx.classBody())
    };

    // Visit a parse tree produced by JavaParser#classBody.
    visitClassBody(ctx) {
        let index = 0;
        while (ctx.classBodyDeclaration(index)) {
            this.visitClassBodyDeclaration(ctx.classBodyDeclaration(index))
            index++;
        }
        return
    };

    // Visit a parse tree produced by JavaParser#classBodyDeclaration.
    visitClassBodyDeclaration(ctx) {
        return this.visitMemberDeclaration(ctx.memberDeclaration());
    };

    visitMemberDeclaration(ctx) {
        return this.visitMethodDeclaration(ctx.methodDeclaration());
    }

    // Visit a parse tree produced by JavaParser#methodDeclaration.
    visitMethodDeclaration(ctx) {
        return this.visitMethodBody(ctx.methodBody());
    };

    // Visit a parse tree produced by JavaParser#methodBody.
    visitMethodBody(ctx) {
        if (ctx.block()) {
            this.addTable();
            return this.visitBlock(ctx.block());
        }
        return
    };

    // Visit a parse tree produced by JavaParser#block.
    visitBlock(ctx) {
        let index = 0;
        while (ctx.blockStatement(index)) {
            this.visitBlockStatement(ctx.blockStatement(index))
            index++;
        }
        return
    };

    // Visit a parse tree produced by JavaParser#blockStatement.
    visitBlockStatement(ctx) {
        if (ctx.localVariableDeclaration()) {
            return this.visitLocalVariableDeclaration(ctx.localVariableDeclaration());
        } else if (ctx.statement()) {
            return this.visitStatement(ctx.statement());
        } else if (ctx.localTypeDeclaration()) {
            return this.visitLocalTypeDeclaration(ctx.localTypeDeclaration())
        }
        return
    };

    // Visit a parse tree produced by JavaParser#localVariableDeclaration.
    visitLocalVariableDeclaration(ctx) {
        console.log("Variable declaration " + ctx.getText());
        let isFinal = false;
        if (ctx.variableModifier(0)) {
            isFinal = true;
        }
        let type = this.visitTypeType(ctx.typeType());

        console.log(type)
        let declarators = this.visitVariableDeclarators(ctx.variableDeclarators());
        for (let dec of declarators) {
            console.log(dec)
            if (dec.value) {
                dec.value.type = type;
                if (this.isStructure(type.mainType)) dec.value.val = this.instantiateObject(type, null)
            } else {
                dec.value = new Value(type, null);
            }
            this.insertVariable(new Variable(isFinal, dec.name, dec.value));
        }
        this.printVariables();
        // console.log(tables);
        return;
    };

    visitTypeType(ctx) {
        let type = null;
        if (ctx.primitiveType()) {
            console.log("TYPE " + ctx.getText());
            type = (new Type(true, ctx.getText(), null));
        } else {
            type = this.visitClassOrInterfaceType(ctx.classOrInterfaceType());
        }
        return type;
    }

    // Visit a parse tree produced by JavaParser#classOrInterfaceType.
    visitClassOrInterfaceType(ctx) {
        console.log("Class Type " + ctx.getText());
        let topClass = ctx.IDENTIFIER(0).getText();
        let subClass = null;
        if (ctx.typeArguments(0)) {
            subClass = this.visitTypeArguments(ctx.typeArguments(0)).mainType;
        }
        return (new Type(!this.isStructure(topClass), topClass, subClass));
    };

    // Visit a parse tree produced by JavaParser#typeArguments.
    visitTypeArguments(ctx) {
        console.log("Args " + ctx.getText());
        return this.visitTypeArgument(ctx.typeArgument(0));
    };

    // Visit a parse tree produced by JavaParser#typeArgument.
    visitTypeArgument(ctx) {
        if (ctx.typeType()) {
            return this.visitTypeType(ctx.typeType());
        }
    };

    visitVariableDeclarators(ctx) {
        let decs = Array();
        let index = 0;

        while (ctx.variableDeclarator(index)) {
            let dec = this.visitVariableDeclarator(ctx.variableDeclarator(index));
            decs.push(dec);
            index++;
        }
        return decs;
    }

    // Visit a parse tree produced by JavaParser#variableDeclarator.
    visitVariableDeclarator(ctx) {
        console.log("Declarator " + ctx.getText())
        let name = this.visitVariableDeclaratorId(ctx.variableDeclaratorId());
        let val = null;
        if (ctx.variableInitializer()) {
            val = this.visitVariableInitializer(ctx.variableInitializer());
        }
        return (new Declarator(name, val));
    };

    // Visit a parse tree produced by JavaParser#variableDeclaratorId.
    visitVariableDeclaratorId(ctx) {
        return ctx.IDENTIFIER().getText();
    };

    // Visit a parse tree produced by JavaParser#variableInitializer.
    visitVariableInitializer(ctx) {
        if (ctx.expression()) {
            return this.visitExpression(ctx.expression());
        }
    };

    visitLocalTypeDeclaration(ctx) {
        console.log("Type dec " + ctx.getText());
        return super.visitChildren(ctx);
    }

    // Visit a parse tree produced by JavaParser#expression.
    visitExpression(ctx) {
        if (ctx.primary()) {
            return this.visitPrimary(ctx.primary());
        } else if (ctx.IDENTIFIER()) {
            let nameVar = this.visitExpression(ctx.expression(0));
            let nameFunc = ctx.IDENTIFIER().getText();
            return (new CallFunc(nameVar, nameFunc));
        } else if (ctx.NEW()) {
            return this.visitCreator(ctx.creator());
        } else if (ctx.postfix) {
            let value = this.visitExpression(ctx.expression(0));
            return this.postfixEvaluation(value, ctx.postfix.text);
        } else if (ctx.prefix) {
            let value = this.visitExpression(ctx.expression(0));
            return this.prefixEvaluation(value, ctx.prefix.text);
        } else if (ctx.bop) {
            let valueLeft = this.visitExpression(ctx.expression(0));
            let valueRight = this.visitExpression(ctx.expression(1));
            return this.binOpEvaluation(valueLeft, valueRight, ctx.bop.text);
        } else { // expression of call structure functions
            let call = this.visitExpression(ctx.expression(0));
            if (ctx.expressionList())
                call.paramList = this.visitExpressionList(ctx.expressionList());
            console.log(call);
            return call.nameVar.val[call.nameFunc].apply(call.nameVar.val, call.paramList);
        }
    };

    visitCreator(ctx) {
        console.log("Creator " + ctx.getText())
        let type = this.visitCreatedName(ctx.createdName());
        let listArgs = this.visitClassCreatorRest(ctx.classCreatorRest());
        let val = this.instantiateObject(type, listArgs);
        return (new Value(type, val));
    }

    visitClassCreatorRest(ctx) {
        return this.visitArguments(ctx.arguments());
    }

    visitArguments(ctx) {
        if (ctx.expressionList()) {
            return this.visitExpressionList(ctx.expressionList());
        } else {
            return (new Array());
        }
    }

    visitExpressionList(ctx) {
        let list = new Array();
        let index = 0;
        let val = null;
        while (ctx.expression(index)) {
            val = this.visitExpression(ctx.expression(index));
            list.push(val);
            index++;
        }
        return list;
    }

    visitCreatedName(ctx) {
        console.log("Created Nme " + ctx.getText())
        let name = ctx.IDENTIFIER(0).getText();
        let secondType = null;
        if (ctx.typeArgumentsOrDiamond(0)) {
            this.visitTypeArgumentsOrDiamond(ctx.typeArgumentsOrDiamond(0));
        }
        return (new Type(!this.isStructure(name), name, secondType));
    }

    // Visit a parse tree produced by JavaParser#typeArgumentsOrDiamond.
    visitTypeArgumentsOrDiamond(ctx) {
        if (ctx.typeArguments()) {
            return this.visitTypeArguments(ctx.typeArguments()).mainType;
        } else return null;
    };

    // Visit a parse tree produced by JavaParser#primary.
    visitPrimary(ctx) {
        if (ctx.expression()) {
            return this.visitExpression(ctx.expression());
        } else if (ctx.literal()) {
            return this.visitLiteral(ctx.literal());
        } else if (ctx.IDENTIFIER()) {
            return this.findVariable(ctx.IDENTIFIER().getText());
        } else {
            return
        }
    };

    // Visit a parse tree produced by JavaParser#literal.
    visitLiteral(ctx) {
        let val = ctx.getText();
        let typeName = null;
        if (ctx.CHAR_LITERAL()) {
            typeName = "char";
        } else if (ctx.STRING_LITERAL()) {
            typeName = "string";
        } else if (ctx.BOOL_LITERAL()) {
            typeName = "boolean";
        } else if (ctx.integerLiteral()) {
            typeName = "int";
        } else if (ctx.floatLiteral()) {
            typeName = "float";
        } else {
            typeName = "null";
        }
        val = this.strToType(typeName, val);
        console.log("literal " + typeName + " " + val);
        return (new Value(new Type(true, typeName, null), val));
    };

    // Visit a parse tree produced by JavaParser#statement.
    visitStatement(ctx) {
        console.log("Statement " + ctx.getText());
        if (ctx.IF()) {
            console.log(ctx.IF().getText());
            this.addTable();
            this.ifStatement(ctx);
            this.removeTable();
        } else if (ctx.FOR()) {
            console.log(ctx.FOR().getText());
            this.addTable();
            this.forStatement(ctx);
            this.removeTable();
        } else if (ctx.WHILE()) {
            console.log(ctx.WHILE().getText());
            // GO TO THE FUNCTION OF WHILE
        } else if (ctx.SWITCH()) {
            console.log(ctx.SWITCH().getText());
            // GO TO THE FUNCTION OF SWITCH
        } else if (ctx.DO()) {
            console.log(ctx.DO().getText());
        } else if (ctx.BREAK()) {
            console.log(ctx.BREAK().getText());
            // Do the action of BREAK
        } else if (ctx.CONTINUE()) {
            console.log(ctx.CONTINUE().getText())
            // DO THE ACTION OF CONTINUE
        } else if (ctx.statementExpression) {
            return this.visitExpression(ctx.statementExpression);
        } else if (ctx.SEMI()) {
            return;
        } else if (ctx.block()) {
            this.visitBlock(ctx.block())
        }
        return
    };

    visitParExpression(ctx) {
        return this.visitExpression(ctx.expression());
    }

    // Visit a parse tree produced by JavaParser#forInit.
    visitForInit(ctx) {
        if (ctx.localVariableDeclaration()) {
            return this.visitLocalVariableDeclaration(ctx.localVariableDeclaration())
        } else {
            return this.visitExpressionList(ctx.expressionList());
        }
    };

    // ************************************************
    // ************************************************
    // ******************* OWN FUNCTIONS **************
    // ************************************************
    // ************************************************

    ifStatement(ctx) {
        let valIf = this.visitParExpression(ctx.parExpression());
        if (valIf.val === true) {
            this.visitStatement(ctx.statement(0));
        } else {
            if (ctx.ELSE()) {
                this.visitStatement(ctx.statement(1));
            }
        }
        return;
    }

    forStatement(ctx) {
        if (ctx.forControl().enhancedForControl()) {
            let isConstant = false;
            let ctxAux = ctx.forControl().enhancedForControl();
            if (ctxAux.variableModifier(0)) {
                isConstant = true
            }

            let type = this.visitTypeType(ctxAux.typeType());
            let varID = this.visitVariableDeclaratorId(ctxAux.variableDeclaratorId());
            let valueExp = this.visitExpression(ctxAux.expression());

            let newVariable = new Variable(isConstant, varID, new Value(type, null));
            this.insertVariable(newVariable);
            this.printVariables();

            for (let i = 0; i < valueExp.val.size(); i++) {
                let aux = valueExp.val.get(i);
                newVariable.value.val = aux;
                console.log(aux);
            }

        } else {
            if (ctx.forControl().forInit())
                this.visitForInit(ctx.forControl().forInit());
            let stopValue = true;
            while (true) {
                if (ctx.forControl().expression())
                    stopValue = this.visitExpression(ctx.forControl().expression()).val
                if (stopValue == false) {
                    break;
                }
                // console.log(ctx.statement(0));
                this.visitStatement(ctx.statement(0));
                if (ctx.forControl().expressionList())
                    this.visitExpressionList(ctx.forControl().expressionList());
            }
        }
    }


    addTable() {
        tables.push(new Map());
    }

    removeTable() {
        tables.pop();
    }

    insertVariable(variable) {
        tables[tables.length - 1].set(variable.name, variable);
    }

    findVariable(name) {
        for (let table of tables) {
            if (table.has(name)) {
                return table.get(name).value;
            }
        }
        // return tables.get(ctx.getText()).value;
    }

    clearTables() {
        while (tables.length != 0) {
            tables.pop()
        }
    }

    printVariables() {
        for (let table of tables) {
            for (let [key, value] of table) {
                console.log(value);
            }
        }
    }

    instantiateObject(type, listArgs) {
        if (!this.isStructure(type.mainType)) {
            return this.strToType(type.mainType, listArgs[0].val);
        } else {
            switch (type.mainType) {
                case "List":
                    return (new List());
                case "LinkedList":
                    return (new LinkedList());
                case "Queue":
                    return (new Queue());
                case "Stack":
                    return (new Stack());
                case "PriorityQueue":
                    return (new PriorityQueue());
                case "ArrayList":
                    return (new LinkedList());
            }
        }
    }

    strToType(type, value) {
        switch (type) {
            case "int":
            case "Integer":
                return parseInt(value);
            case "float":
            case "Float":
            case "double":
            case "Double":
                return parseFloat(value);
            case "boolean":
            case "Boolean":
                return (value === "true");
            case "char":
            case "Character":
                return value.split('\'')[1];
        }
    }

    isStructure(nameVariable) {
        return structures.has(nameVariable);
    }

    postfixEvaluation(value, sign) {
        if (sign == "++") {
            value.val += 1;
            return value;
        } else {
            value.val -= 1;
            return value;
        }
    }

    prefixEvaluation(value, sign) {
        switch (sign) {
            case "++":
                return ++value;
            case "--":
                return --value;
            case "-":
                return (value * -1);
            case "~":
                return (~value);
            case "!":
                return (!value);
        }
    }

    // evaluacion de operadores binarios
    binOpEvaluation(valueLeft, valueRight, operator) {
        let valL, valR;
        valL = valueLeft.val;
        valR = valueRight.val;
        switch (operator) {
            case "*":
                return new Value("int", valL * valR);
            case "/":
                return new Value("int", valL / valR);
            case "%":
                return new Value("int", valL % valR);
            case "+":
                return new Value("int", valL + valR);
            case "-":
                return new Value("int", valL - valR);
            case "<=":
                return new Value("boolean", valL <= valL);
            case ">=":
                return new Value("boolean", valL >= valR);
            case ">":
                return new Value("boolean", valL > valR);
            case "<":
                return new Value("boolean", valL < valR);
            case "==":
                return new Value("boolean", valL == valR);
            case "!=":
                return new Value("boolean", valL != valR);
            case "&":
                return new Value("int", valL & valR);
            case "^":
                return new Value("int", valL ^ valR);
            case "|":
                return new Value("int", valL | valR);
            case "&&":
                return new Value("boolean", valL && valR);
            case "||":
                return new Value("boolean", valL || valR);
            case "&&":
                return new Value("boolean", valL && valR);
            case "=":
                console.log(valueLeft);
                console.log(valueRight);
                // if(!valueLeft){
                //     valueLeft = valueRight;
                // } else {
                if (valueLeft.type.mainType !== valueRight.type.mainType)
                    valueLeft.val = this.instantiateObject(valueLeft.type, null);
                else valueLeft.val = valueRight.val;
                // }
                return valueLeft;
            case "+=":
                valueLeft.val += valueRight.val;
                return valueLeft;
            case "-=":
                valueLeft.val -= valueRight.val;
                return valueLeft;
            case "*=":
                valueLeft.val *= valueRight.val;
                return valueLeft;
            case "/=":
                valueLeft.val /= valueRight.val;
                return valueLeft;
            case "&=":
                valueLeft.val &= valueRight.val;
                return valueLeft;
            case "|=":
                valueLeft.val |= valueRight.val;
                return valueLeft;
            case "^=":
                valueLeft.val ^= valueRight.val;
                return valueLeft;
            case ">>=":
                valueLeft.val >>= valueRight.val;
                return valueLeft;
            case ">>>=":
                valueLeft.val >>>= valueRight.val;
                return valueLeft;
            case "<<=":
                valueLeft.val <<= valueRight.val;
                return valueLeft;
            case "%=":
                valueLeft.val %= valueRight.val;
                return valueLeft;
        }
    }


    // ************************************************
    // ************************************************
    // ************************************************
    // ************************************************
    // ************************************************


    // Visit a parse tree produced by JavaParser#statementExpression.
    visitStatementExpression(ctx) {
        console.log(ctx);
        return super.visitChildren(ctx)
    };

    visitPackageDeclaration(ctx) {
        console.log("package");
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#importDeclaration.
    visitImportDeclaration(ctx) {
        console.log("ASDSDAS");
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#type.
    visitType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primitiveType.
    visitPrimitiveType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#numericType.
    visitNumericType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#integralType.
    visitIntegralType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#floatingPointType.
    visitFloatingPointType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#referenceType.
    visitReferenceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#classType.
    visitClassType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#classType_lf_classOrInterfaceType.
    visitClassType_lf_classOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#classType_lfno_classOrInterfaceType.
    visitClassType_lfno_classOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceType.
    visitInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceType_lf_classOrInterfaceType.
    visitInterfaceType_lf_classOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceType_lfno_classOrInterfaceType.
    visitInterfaceType_lfno_classOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeVariable.
    visitTypeVariable(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#arrayType.
    visitArrayType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#dims.
    visitDims(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeParameter.
    visitTypeParameter(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeParameterModifier.
    visitTypeParameterModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeBound.
    visitTypeBound(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#additionalBound.
    visitAdditionalBound(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeArgumentList.
    visitTypeArgumentList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#wildcard.
    visitWildcard(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#wildcardBounds.
    visitWildcardBounds(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#packageName.
    visitPackageName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeName.
    visitTypeName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#packageOrTypeName.
    visitPackageOrTypeName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#expressionName.
    visitExpressionName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodName.
    visitMethodName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#ambiguousName.
    visitAmbiguousName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#packageDeclaration.


    // Visit a parse tree produced by JavaParser#packageModifier.
    visitPackageModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#singleTypeImportDeclaration.
    visitSingleTypeImportDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeImportOnDemandDeclaration.
    visitTypeImportOnDemandDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#singleStaticImportDeclaration.
    visitSingleStaticImportDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#staticImportOnDemandDeclaration.
    visitStaticImportOnDemandDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#normalClassDeclaration.
    visitNormalClassDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#classModifier.
    visitClassModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeParameters.
    visitTypeParameters(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#typeParameterList.
    visitTypeParameterList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#superclass.
    visitSuperclass(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#superinterfaces.
    visitSuperinterfaces(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceTypeList.
    visitInterfaceTypeList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#classMemberDeclaration.
    visitClassMemberDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#fieldDeclaration.
    visitFieldDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#fieldModifier.
    visitFieldModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#variableDeclaratorList.
    visitVariableDeclaratorList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#unannType.
    visitUnannType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannPrimitiveType.
    visitUnannPrimitiveType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannReferenceType.
    visitUnannReferenceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannClassOrInterfaceType.
    visitUnannClassOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannClassType.
    visitUnannClassType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannClassType_lf_unannClassOrInterfaceType.
    visitUnannClassType_lf_unannClassOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannClassType_lfno_unannClassOrInterfaceType.
    visitUnannClassType_lfno_unannClassOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannInterfaceType.
    visitUnannInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannInterfaceType_lf_unannClassOrInterfaceType.
    visitUnannInterfaceType_lf_unannClassOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannInterfaceType_lfno_unannClassOrInterfaceType.
    visitUnannInterfaceType_lfno_unannClassOrInterfaceType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannTypeVariable.
    visitUnannTypeVariable(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unannArrayType.
    visitUnannArrayType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodModifier.
    visitMethodModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodHeader.
    visitMethodHeader(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#result.
    visitResult(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodDeclarator.
    visitMethodDeclarator(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#formalParameterList.
    visitFormalParameterList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#formalParameters.
    visitFormalParameters(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#formalParameter.
    visitFormalParameter(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#variableModifier.
    visitVariableModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#lastFormalParameter.
    visitLastFormalParameter(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#receiverParameter.
    visitReceiverParameter(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#throws_.
    visitThrows_(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#exceptionTypeList.
    visitExceptionTypeList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#exceptionType.
    visitExceptionType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#instanceInitializer.
    visitInstanceInitializer(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#staticInitializer.
    visitStaticInitializer(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#constructorDeclaration.
    visitConstructorDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#constructorModifier.
    visitConstructorModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#constructorDeclarator.
    visitConstructorDeclarator(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#simpleTypeName.
    visitSimpleTypeName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#constructorBody.
    visitConstructorBody(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#explicitConstructorInvocation.
    visitExplicitConstructorInvocation(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enumDeclaration.
    visitEnumDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enumBody.
    visitEnumBody(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enumConstantList.
    visitEnumConstantList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enumConstant.
    visitEnumConstant(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enumConstantModifier.
    visitEnumConstantModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enumBodyDeclarations.
    visitEnumBodyDeclarations(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceDeclaration.
    visitInterfaceDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#normalInterfaceDeclaration.
    visitNormalInterfaceDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceModifier.
    visitInterfaceModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#extendsInterfaces.
    visitExtendsInterfaces(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceBody.
    visitInterfaceBody(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceMemberDeclaration.
    visitInterfaceMemberDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#constantDeclaration.
    visitConstantDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#constantModifier.
    visitConstantModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceMethodDeclaration.
    visitInterfaceMethodDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#interfaceMethodModifier.
    visitInterfaceMethodModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#annotationTypeDeclaration.
    visitAnnotationTypeDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#annotationTypeBody.
    visitAnnotationTypeBody(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#annotationTypeMemberDeclaration.
    visitAnnotationTypeMemberDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#annotationTypeElementDeclaration.
    visitAnnotationTypeElementDeclaration(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#annotationTypeElementModifier.
    visitAnnotationTypeElementModifier(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#defaultValue.
    visitDefaultValue(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#annotation.
    visitAnnotation(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#normalAnnotation.
    visitNormalAnnotation(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#elementValuePairList.
    visitElementValuePairList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#elementValuePair.
    visitElementValuePair(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#elementValue.
    visitElementValue(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#elementValueArrayInitializer.
    visitElementValueArrayInitializer(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#elementValueList.
    visitElementValueList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#markerAnnotation.
    visitMarkerAnnotation(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#singleElementAnnotation.
    visitSingleElementAnnotation(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#arrayInitializer.
    visitArrayInitializer(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#variableInitializerList.
    visitVariableInitializerList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#blockStatements.
    visitBlockStatements(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#localVariableDeclarationStatement.
    visitLocalVariableDeclarationStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#statementNoShortIf.
    visitStatementNoShortIf(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#statementWithoutTrailingSubstatement.
    visitStatementWithoutTrailingSubstatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#emptyStatement.
    visitEmptyStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#labeledStatement.
    visitLabeledStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#labeledStatementNoShortIf.
    visitLabeledStatementNoShortIf(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#expressionStatement.
    visitExpressionStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#ifThenStatement.
    visitIfThenStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#ifThenElseStatement.
    visitIfThenElseStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#ifThenElseStatementNoShortIf.
    visitIfThenElseStatementNoShortIf(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#assertStatement.
    visitAssertStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#switchStatement.
    visitSwitchStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#switchBlock.
    visitSwitchBlock(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#switchBlockStatementGroup.
    visitSwitchBlockStatementGroup(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#switchLabels.
    visitSwitchLabels(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#switchLabel.
    visitSwitchLabel(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enumConstantName.
    visitEnumConstantName(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#whileStatement.
    visitWhileStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#whileStatementNoShortIf.
    visitWhileStatementNoShortIf(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#doStatement.
    visitDoStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#forStatement.
    visitForStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#forStatementNoShortIf.
    visitForStatementNoShortIf(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#basicForStatement.
    visitBasicForStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#basicForStatementNoShortIf.
    visitBasicForStatementNoShortIf(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#forUpdate.
    visitForUpdate(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#statementExpressionList.
    visitStatementExpressionList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enhancedForStatement.
    visitEnhancedForStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#enhancedForStatementNoShortIf.
    visitEnhancedForStatementNoShortIf(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#breakStatement.
    visitBreakStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#continueStatement.
    visitContinueStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#returnStatement.
    visitReturnStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#throwStatement.
    visitThrowStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#synchronizedStatement.
    visitSynchronizedStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#tryStatement.
    visitTryStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#catches.
    visitCatches(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#catchClause.
    visitCatchClause(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#catchFormalParameter.
    visitCatchFormalParameter(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#catchType.
    visitCatchType(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#finally_.
    visitFinally_(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#tryWithResourcesStatement.
    visitTryWithResourcesStatement(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#resourceSpecification.
    visitResourceSpecification(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#resourceList.
    visitResourceList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#resource.
    visitResource(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#primaryNoNewArray.
    visitPrimaryNoNewArray(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_arrayAccess.
    visitPrimaryNoNewArray_lf_arrayAccess(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_arrayAccess.
    visitPrimaryNoNewArray_lfno_arrayAccess(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_primary.
    visitPrimaryNoNewArray_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary.
    visitPrimaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary.
    visitPrimaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_primary.
    visitPrimaryNoNewArray_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary.
    visitPrimaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary.
    visitPrimaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#classInstanceCreationExpression.
    visitClassInstanceCreationExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#classInstanceCreationExpression_lf_primary.
    visitClassInstanceCreationExpression_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#classInstanceCreationExpression_lfno_primary.
    visitClassInstanceCreationExpression_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#fieldAccess.
    visitFieldAccess(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#fieldAccess_lf_primary.
    visitFieldAccess_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#fieldAccess_lfno_primary.
    visitFieldAccess_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#arrayAccess.
    visitArrayAccess(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#arrayAccess_lf_primary.
    visitArrayAccess_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#arrayAccess_lfno_primary.
    visitArrayAccess_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodInvocation.
    visitMethodInvocation(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodInvocation_lf_primary.
    visitMethodInvocation_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodInvocation_lfno_primary.
    visitMethodInvocation_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#argumentList.
    visitArgumentList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodReference.
    visitMethodReference(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodReference_lf_primary.
    visitMethodReference_lf_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#methodReference_lfno_primary.
    visitMethodReference_lfno_primary(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#arrayCreationExpression.
    visitArrayCreationExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#dimExprs.
    visitDimExprs(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#dimExpr.
    visitDimExpr(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#constantExpression.
    visitConstantExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

    // Visit a parse tree produced by JavaParser#lambdaExpression.
    visitLambdaExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#lambdaParameters.
    visitLambdaParameters(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#inferredFormalParameterList.
    visitInferredFormalParameterList(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#lambdaBody.
    visitLambdaBody(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#assignmentExpression.
    visitAssignmentExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#assignment.
    visitAssignment(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#leftHandSide.
    visitLeftHandSide(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#assignmentOperator.
    visitAssignmentOperator(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#conditionalExpression.
    visitConditionalExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#conditionalOrExpression.
    visitConditionalOrExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#conditionalAndExpression.
    visitConditionalAndExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#inclusiveOrExpression.
    visitInclusiveOrExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#exclusiveOrExpression.
    visitExclusiveOrExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#andExpression.
    visitAndExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#equalityExpression.
    visitEqualityExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#relationalExpression.
    visitRelationalExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#shiftExpression.
    visitShiftExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#additiveExpression.
    visitAdditiveExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#multiplicativeExpression.
    visitMultiplicativeExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unaryExpression.
    visitUnaryExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#preIncrementExpression.
    visitPreIncrementExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#preDecrementExpression.
    visitPreDecrementExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#unaryExpressionNotPlusMinus.
    visitUnaryExpressionNotPlusMinus(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#postfixExpression.
    visitPostfixExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#postIncrementExpression.
    visitPostIncrementExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#postIncrementExpression_lf_postfixExpression.
    visitPostIncrementExpression_lf_postfixExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#postDecrementExpression.
    visitPostDecrementExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#postDecrementExpression_lf_postfixExpression.
    visitPostDecrementExpression_lf_postfixExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };


    // Visit a parse tree produced by JavaParser#castExpression.
    visitCastExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };
}

module.exports.Visitor = JVisitor;
