const JavaVisitor = require('generated-parser/JavaVisitor').JavaVisitor;
const Variable = require('js/Variable');
const Type = require('js/Type');
// const DataType = require('js/DataType');
const Declarator = require('js/Declarator');
const Value = require('js/Value');

let tableOfVar = new Map();

// This class defines a complete visitor for a parse tree produced by todoParser.
class JVisitor extends JavaVisitor {
    constructor() {
        super();
    }

    // Visit a parse tree produced by JavaParser#compilationUnit.
    visitCompilationUnit(ctx) {
        console.log("INICIO "  + ctx.getText());
         return this.visitTypeDeclaration(ctx.typeDeclaration(0))
    };

    // Visit a parse tree produced by JavaParser#typeDeclaration.
    visitTypeDeclaration(ctx) {
        console.log("Type declaration");
        return this.visitClassDeclaration(ctx.classDeclaration());
    };

    // Visit a parse tree produced by JavaParser#classDeclaration.
    visitClassDeclaration(ctx) {
        console.log("Clase " + ctx.getText());
        return this.visitClassBody(ctx.classBody())
    };

    // Visit a parse tree produced by JavaParser#classBody.
    visitClassBody(ctx) {
        console.log("Cuerpo " + ctx.getText());
        let index = 0;
        while(ctx.classBodyDeclaration(index)){
            this.visitClassBodyDeclaration(ctx.classBodyDeclaration(index))
            index++;
        }
        return
    };

    // Visit a parse tree produced by JavaParser#classBodyDeclaration.
    visitClassBodyDeclaration(ctx) {
        console.log("Member declaration " + ctx.getText());
        return this.visitMemberDeclaration(ctx.memberDeclaration());
    };

    visitMemberDeclaration(ctx){
        console.log("Member " + ctx.getText());
        return this.visitMethodDeclaration(ctx.methodDeclaration());
    }

    // Visit a parse tree produced by JavaParser#methodDeclaration.
    visitMethodDeclaration(ctx) {
        console.log("Method " + ctx.getText());
        return this.visitMethodBody(ctx.methodBody());
    };

    // Visit a parse tree produced by JavaParser#methodBody.
    visitMethodBody(ctx) {
        console.log("Method Body " + ctx.getText());
        if(ctx.block()){
            return this.visitBlock(ctx.block());
        }
        return
    };

    // Visit a parse tree produced by JavaParser#block.
    visitBlock(ctx) {
        let index = 0;
        while(ctx.blockStatement(index)){
            this.visitBlockStatement(ctx.blockStatement(index))
            index++;
        }
        return
    };

    // Visit a parse tree produced by JavaParser#blockStatement.
    visitBlockStatement(ctx) {
        if(ctx.localVariableDeclaration()){
            return this.visitLocalVariableDeclaration(ctx.localVariableDeclaration());
        } else if(ctx.statement()){
            return this.visitStatement(ctx.statement());
        } else if(ctx.localTypeDeclaration()){
            return this.visitLocalTypeDeclaration(ctx.localTypeDeclaration())
        }
        return
    };

    // Visit a parse tree produced by JavaParser#localVariableDeclaration.
    visitLocalVariableDeclaration(ctx) {
        console.log("Var " + ctx.getText());
        let isFinal = false;
        if(ctx.variableModifier(0)){
            isFinal = true;
        }
        let type = this.visitTypeType(ctx.typeType());
        console.log(type);


        let declarators = this.visitVariableDeclarators(ctx.variableDeclarators());
        for(let val of declarators)
            tableOfVar.set(val.name, new Variable(isFinal, val.name, val.value))
        console.log(tableOfVar);
        // return super.visitChildren(ctx)
    };

    visitTypeType(ctx){
        console.log("TYPE " + ctx.getText());
        let type = null;
        if(ctx.primitiveType()){
            type = new Type(true, ctx.primitiveType().getText(), null);
        } else {
            type = this.visitClassOrInterfaceType(ctx.classOrInterfaceType());
        }
        return type;
    }

    // Visit a parse tree produced by JavaParser#classOrInterfaceType.
    visitClassOrInterfaceType(ctx) {
        console.log("Class Type " + ctx.getText());
        let topClass = ctx.IDENTIFIER(0).getText();
        let subClass = -1;
        if(ctx.typeArguments(0)){
            subClass = this.visitTypeArguments(ctx.typeArguments(0));
        }
        return (new Type(false, topClass, subClass));
    };

    // Visit a parse tree produced by JavaParser#typeArguments.
    visitTypeArguments(ctx) {
        console.log("Args " + ctx.getText());
        return this.visitTypeArgument(ctx.typeArgument(0));
    };

    // Visit a parse tree produced by JavaParser#typeArgument.
    visitTypeArgument(ctx) {
        if(ctx.typeType()){
            return this.visitTypeType(ctx.typeType()).mainType;
        } else {
            return super.visitChildren(ctx);
        }
    };

    visitVariableDeclarators(ctx){
        let decs = Array();
        let index = 0;
        while(ctx.variableDeclarator(index)){
            let dec = this.visitVariableDeclarator(ctx.variableDeclarator(index));
            decs.push(dec);
            index++;
        }
        return decs;
    }

    // Visit a parse tree produced by JavaParser#variableDeclarator.
    visitVariableDeclarator(ctx) {
        let name = this.visitVariableDeclaratorId(ctx.variableDeclaratorId());
        // let val = this.visitVariableInitializer(ctx.variableInitializer());
        let val = 0;
        return (new Declarator(name, val));
    };

    // Visit a parse tree produced by JavaParser#variableDeclaratorId.
    visitVariableDeclaratorId(ctx) {
        return ctx.IDENTIFIER().getText();
    };

    visitLocalTypeDeclaration(ctx){
        console.log("Type dec " + ctx.getText());
        return super.visitChildren(ctx);
    }

    // Visit a parse tree produced by JavaParser#statement.
    visitStatement(ctx) {
        console.log("Statement " + ctx.getText());
        if(ctx.IF()){
            console.log(ctx.IF().getText());
            // Go to the if function
        } else if(ctx.FOR()){
            console.log(ctx.FOR().getText());
            // GO TO THE FUNCTION OF FOR
        } else if(ctx.WHILE()){
            console.log(ctx.WHILE().getText());
            // GO TO THE FUNCTION OF WHILE
        } else if(ctx.SWITCH()){
            console.log(ctx.SWITCH().getText());
            // GO TO THE FUNCTION OF SWITCH
        } else if(ctx.DO()){
            console.log(ctx.DO().getText());
        } else if(ctx.BREAK()){
            console.log(ctx.BREAK().getText());
            // Do the action of BREAK
        } else if(ctx.CONTINUE()) {
            console.log(ctx.CONTINUE().getText())
            // DO THE ACTION OF CONTINUE
        } else if(ctx.statementExpression){
            this.visitExpression(ctx.statementExpression);
        }
        return
    };

    // Visit a parse tree produced by JavaParser#expression.
    visitExpression(ctx) {
        console.log(ctx.getText());
        return super.visitChildren(ctx)
    };

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



    // Visit a parse tree produced by JavaParser#literal.
  visitLiteral(ctx) {
    console.log(ctx.getText());
    return
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

  // Visit a parse tree produced by JavaParser#variableInitializer.
  visitVariableInitializer(ctx) {
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


  // Visit a parse tree produced by JavaParser#forInit.
  visitForInit(ctx) {
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


  // Visit a parse tree produced by JavaParser#primary.
  visitPrimary(ctx) {
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


  // Visit a parse tree produced by JavaParser#typeArgumentsOrDiamond.
  visitTypeArgumentsOrDiamond(ctx) {
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
