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


let tables = [];
let arrayOfTables = [];

let structures = new Set();
structures.add("LinkedList");
structures.add("ArrayList");
structures.add("List");
structures.add("Queue");
structures.add("Stack");
structures.add("PriorityQueue");

let hasToBreak, hasToContinue;

// This class defines a complete visitor for a parse tree produced by todoParser.
class JVisitor extends JavaVisitor {
    constructor() {
        super();
    }

    // Visit a parse tree produced by JavaParser#compilationUnit.
    visitCompilationUnit(ctx) {
        this.clearTables();
        this.visitTypeDeclaration(ctx.typeDeclaration(0));
        return arrayOfTables;
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
        let isFinal = false;
        if (ctx.variableModifier(0)) {
            isFinal = true;
        }
        let type = this.visitTypeType(ctx.typeType());
        let declarators = this.visitVariableDeclarators(ctx.variableDeclarators());
        for (let dec of declarators) {
            if (dec.value) {
                dec.value.type = type;
                if (this.isStructure(type.mainType)) dec.value.val = this.instantiateObject(type, null)
            } else {
                dec.value = new Value(type, null);
            }
            this.insertVariable(new Variable(isFinal, dec.name, dec.value));
            let line = ctx.start.line;
            arrayOfTables.push([line, this.copyTables()]);
        }
        return;
    };

    visitTypeType(ctx) {
        let type = null;
        if (ctx.primitiveType()) {
            type = (new Type(true, ctx.getText(), null));
        } else {
            type = this.visitClassOrInterfaceType(ctx.classOrInterfaceType());
        }
        return type;
    }

    // Visit a parse tree produced by JavaParser#classOrInterfaceType.
    visitClassOrInterfaceType(ctx) {
        let topClass = ctx.IDENTIFIER(0).getText();
        let subClass = null;
        if (ctx.typeArguments(0)) {
            subClass = this.visitTypeArguments(ctx.typeArguments(0)).mainType;
        }
        return (new Type(!this.isStructure(topClass), topClass, subClass));
    };

    // Visit a parse tree produced by JavaParser#typeArguments.
    visitTypeArguments(ctx) {
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
            console.log(value);
            return this.prefixEvaluation(value, ctx);
        } else if (ctx.bop) {
            let valueLeft = this.visitExpression(ctx.expression(0));
            let valueRight = this.visitExpression(ctx.expression(1));
            console.log(valueLeft);
            return this.binOpEvaluation(valueLeft, valueRight, ctx);
        } else { // expression of call structure functions
            let call = this.visitExpression(ctx.expression(0));
            if (ctx.expressionList())
                call.paramList = this.visitExpressionList(ctx.expressionList());
            let line = ctx.start.line;
            arrayOfTables.push([line, this.copyTables()]);
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
        if (hasToBreak || hasToContinue) return

        if (ctx.IF()) {
            this.ifStatement(ctx);
        } else if (ctx.FOR()) {
            this.addTable();
            hasToBreak = false;
            this.forStatement(ctx);
            hasToBreak = false;
            this.removeTable();
        } else if (ctx.WHILE()) {
            hasToBreak = false;
            this.whileStatement(ctx);
            hasToBreak = false;
        } else if (ctx.SWITCH()) {
            hasToBreak = false;
            this.switchStatement(ctx);
            hasToBreak = false;
        } else if (ctx.DO()) {
            this.doWhileStatement(ctx);
        } else if (ctx.BREAK()) {
            this.breakStatement(ctx);
        } else if (ctx.CONTINUE()) {
            this.continueStatement(ctx);
        } else if (ctx.statementExpression) {
            return this.visitExpression(ctx.statementExpression);
        } else if (ctx.SEMI()) {
            return;
        } else if (ctx.block()) {
            this.addTable();
            this.visitBlock(ctx.block())
            this.removeTable();
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

    // Visit a parse tree produced by JavaParser#switchLabel.
    visitSwitchLabel(ctx) {
        if (ctx.CASE()) {
            if (ctx.expression()) {
                return this.visitExpression(ctx.expression());
            } else {
                return this.findVariable(ctx.IDENTIFIER().getText());
            }
        } else {
            return "default";
        }
    };

    // ************************************************
    // ************************************************
    // ******************* OWN FUNCTIONS **************
    // ************************************************
    // ************************************************

    copyTables() {
        let newArr = clone(tables);
        return newArr;
    }


    switchStatement(ctx) {
        let valueExpression = this.visitParExpression(ctx.parExpression());
        let index = 0;
        let flag = false;
        let ctxAux;
        while (ctx.switchBlockStatementGroup(index) && !hasToBreak) {
            ctxAux = ctx.switchBlockStatementGroup(index);
            let i = 0;
            while (ctxAux.switchLabel(i)) {
                let val = this.visitSwitchLabel(ctxAux.switchLabel(i));
                if (val == "default") {
                    flag = true;
                    break;
                } else if (val.val == valueExpression.val) {
                    flag = true;
                    break;
                }
                i++;
            }
            if (flag) {
                i = 0;
                while (ctxAux.blockStatement(i)) {
                    this.visitBlockStatement(ctxAux.blockStatement(i));
                    i++;
                }
            }
            index++;
        }
    }

    breakStatement(ctx) {
        hasToBreak = true;
    }

    continueStatement(ctx) {
        hasToContinue = true;
    }

    whileStatement(ctx) {
        let stopCond = this.visitParExpression(ctx.parExpression()).val;
        while (true) {
            hasToContinue = false;
            if (stopCond == false) {
                break;
            }
            this.visitStatement(ctx.statement(0));
            if (hasToBreak) break;
            stopCond = this.visitParExpression(ctx.parExpression()).val;
        }
    }

    doWhileStatement(ctx) {
        let stopCond = true;
        do {
            this.visitStatement(ctx.statement(0));
            stopCond = this.visitParExpression(ctx.parExpression());
        } while (stopCond);
    }

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

            let line = ctx.start.line;
            arrayOfTables.push([line, this.copyTables()]);

            for (let i = 0; i < valueExp.val.size(); i++) {
                hasToContinue = false;
                let aux = valueExp.val.get(i);
                newVariable.value.val = aux;
                line = ctx.start.line;
                arrayOfTables.push([line, this.copyTables()]);

                this.visitStatement(ctx.statement(0));
                if (hasToBreak) break;
            }
        } else {
            if (ctx.forControl().forInit())
                this.visitForInit(ctx.forControl().forInit());
            let stopValue = true;
            while (true) {
                hasToContinue = false;
                if (ctx.forControl().expression())
                    stopValue = this.visitExpression(ctx.forControl().expression()).val
                if (stopValue == false) {
                    break;
                }

                this.visitStatement(ctx.statement(0));
                if (hasToBreak) break;

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
    }

    clearTables() {
        while (arrayOfTables != 0) {
            arrayOfTables.pop();
        }
        while (tables.length != 0) {
            tables.pop();
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

    prefixEvaluation(value, ctx) {
        let sign = ctx.prefix.text;
        let line = ctx.start.line;
        switch (sign) {
            case "++":
                ++value.val;
                arrayOfTables.push([line, this.copyTables()]);
                return value;
            case "--":
                --value.val;
                arrayOfTables.push([line, this.copyTables()]);
                return value;
            case "-":
                return new Value(value.type, (value.val * -1));
            case "~":
                return new Value(value.type, (~value.val));
            case "!":
                return new Value(value.type, (!value.val));
        }
    }

    // Binary operators evaluation
    binOpEvaluation(valueLeft, valueRight, ctx) {
        let valL, valR;
        valL = valueLeft.val;
        valR = valueRight.val;
        let operator = ctx.bop.text;
        let intType = new Type(true, "int", null);
        let boolType = new Type(true, "boolean", null);
        let line = ctx.start.line;

        switch (operator) {
            case "*":
                return new Value(intType, valL * valR);
            case "/":
                return new Value(intType, valL / valR);
            case "%":
                return new Value(intType, valL % valR);
            case "+":
                return new Value(intType, valL + valR);
            case "-":
                return new Value(intType, valL - valR);
            case "<=":
                return new Value(boolType, valL <= valL);
            case ">=":
                return new Value(boolType, valL >= valR);
            case ">":
                return new Value(boolType, valL > valR);
            case "<":
                return new Value(boolType, valL < valR);
            case "==":
                return new Value(boolType, valL == valR);
            case "!=":
                return new Value(boolType, valL != valR);
            case "&":
                return new Value(intType, valL & valR);
            case "^":
                return new Value(intType, valL ^ valR);
            case "|":
                return new Value(intType, valL | valR);
            case "&&":
                return new Value(boolType, valL && valR);
            case "||":
                return new Value(boolType, valL || valR);
            case "&&":
                return new Value(boolType, valL && valR);
            case "=":
                if (valueLeft.type.mainType !== valueRight.type.mainType)
                    valueLeft.val = this.instantiateObject(valueLeft.type, null);
                else valueLeft.val = valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "+=":
                valueLeft.val += valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "-=":
                valueLeft.val -= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "*=":
                valueLeft.val *= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "/=":
                valueLeft.val /= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "&=":
                valueLeft.val &= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "|=":
                valueLeft.val |= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "^=":
                valueLeft.val ^= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case ">>=":
                valueLeft.val >>= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case ">>>=":
                valueLeft.val >>>= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "<<=":
                valueLeft.val <<= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
            case "%=":
                valueLeft.val %= valueRight.val;
                arrayOfTables.push([line, this.copyTables()]);
                return valueLeft;
        }
    }
}

module.exports.Visitor = JVisitor;