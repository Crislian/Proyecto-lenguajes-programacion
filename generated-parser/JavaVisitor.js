// Generated from Java.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by JavaParser.

function JavaVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

JavaVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
JavaVisitor.prototype.constructor = JavaVisitor;

// Visit a parse tree produced by JavaParser#literal.
JavaVisitor.prototype.visitLiteral = function(ctx) {
};


// Visit a parse tree produced by JavaParser#type.
JavaVisitor.prototype.visitType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primitiveType.
JavaVisitor.prototype.visitPrimitiveType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#numericType.
JavaVisitor.prototype.visitNumericType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#integralType.
JavaVisitor.prototype.visitIntegralType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#floatingPointType.
JavaVisitor.prototype.visitFloatingPointType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#referenceType.
JavaVisitor.prototype.visitReferenceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classOrInterfaceType.
JavaVisitor.prototype.visitClassOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classType.
JavaVisitor.prototype.visitClassType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classType_lf_classOrInterfaceType.
JavaVisitor.prototype.visitClassType_lf_classOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classType_lfno_classOrInterfaceType.
JavaVisitor.prototype.visitClassType_lfno_classOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceType.
JavaVisitor.prototype.visitInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceType_lf_classOrInterfaceType.
JavaVisitor.prototype.visitInterfaceType_lf_classOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceType_lfno_classOrInterfaceType.
JavaVisitor.prototype.visitInterfaceType_lfno_classOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeVariable.
JavaVisitor.prototype.visitTypeVariable = function(ctx) {
};


// Visit a parse tree produced by JavaParser#arrayType.
JavaVisitor.prototype.visitArrayType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#dims.
JavaVisitor.prototype.visitDims = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeParameter.
JavaVisitor.prototype.visitTypeParameter = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeParameterModifier.
JavaVisitor.prototype.visitTypeParameterModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeBound.
JavaVisitor.prototype.visitTypeBound = function(ctx) {
};


// Visit a parse tree produced by JavaParser#additionalBound.
JavaVisitor.prototype.visitAdditionalBound = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeArguments.
JavaVisitor.prototype.visitTypeArguments = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeArgumentList.
JavaVisitor.prototype.visitTypeArgumentList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeArgument.
JavaVisitor.prototype.visitTypeArgument = function(ctx) {
};


// Visit a parse tree produced by JavaParser#wildcard.
JavaVisitor.prototype.visitWildcard = function(ctx) {
};


// Visit a parse tree produced by JavaParser#wildcardBounds.
JavaVisitor.prototype.visitWildcardBounds = function(ctx) {
};


// Visit a parse tree produced by JavaParser#packageName.
JavaVisitor.prototype.visitPackageName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeName.
JavaVisitor.prototype.visitTypeName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#packageOrTypeName.
JavaVisitor.prototype.visitPackageOrTypeName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#expressionName.
JavaVisitor.prototype.visitExpressionName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodName.
JavaVisitor.prototype.visitMethodName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#ambiguousName.
JavaVisitor.prototype.visitAmbiguousName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#compilationUnit.
JavaVisitor.prototype.visitCompilationUnit = function(ctx) {
};


// Visit a parse tree produced by JavaParser#packageDeclaration.
JavaVisitor.prototype.visitPackageDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#packageModifier.
JavaVisitor.prototype.visitPackageModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#importDeclaration.
JavaVisitor.prototype.visitImportDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#singleTypeImportDeclaration.
JavaVisitor.prototype.visitSingleTypeImportDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeImportOnDemandDeclaration.
JavaVisitor.prototype.visitTypeImportOnDemandDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#singleStaticImportDeclaration.
JavaVisitor.prototype.visitSingleStaticImportDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#staticImportOnDemandDeclaration.
JavaVisitor.prototype.visitStaticImportOnDemandDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeDeclaration.
JavaVisitor.prototype.visitTypeDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classDeclaration.
JavaVisitor.prototype.visitClassDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#normalClassDeclaration.
JavaVisitor.prototype.visitNormalClassDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classModifier.
JavaVisitor.prototype.visitClassModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeParameters.
JavaVisitor.prototype.visitTypeParameters = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeParameterList.
JavaVisitor.prototype.visitTypeParameterList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#superclass.
JavaVisitor.prototype.visitSuperclass = function(ctx) {
};


// Visit a parse tree produced by JavaParser#superinterfaces.
JavaVisitor.prototype.visitSuperinterfaces = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceTypeList.
JavaVisitor.prototype.visitInterfaceTypeList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classBody.
JavaVisitor.prototype.visitClassBody = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classBodyDeclaration.
JavaVisitor.prototype.visitClassBodyDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classMemberDeclaration.
JavaVisitor.prototype.visitClassMemberDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#fieldDeclaration.
JavaVisitor.prototype.visitFieldDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#fieldModifier.
JavaVisitor.prototype.visitFieldModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#variableDeclaratorList.
JavaVisitor.prototype.visitVariableDeclaratorList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#variableDeclarator.
JavaVisitor.prototype.visitVariableDeclarator = function(ctx) {
};


// Visit a parse tree produced by JavaParser#variableDeclaratorId.
JavaVisitor.prototype.visitVariableDeclaratorId = function(ctx) {
};


// Visit a parse tree produced by JavaParser#variableInitializer.
JavaVisitor.prototype.visitVariableInitializer = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannType.
JavaVisitor.prototype.visitUnannType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannPrimitiveType.
JavaVisitor.prototype.visitUnannPrimitiveType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannReferenceType.
JavaVisitor.prototype.visitUnannReferenceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannClassOrInterfaceType.
JavaVisitor.prototype.visitUnannClassOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannClassType.
JavaVisitor.prototype.visitUnannClassType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannClassType_lf_unannClassOrInterfaceType.
JavaVisitor.prototype.visitUnannClassType_lf_unannClassOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannClassType_lfno_unannClassOrInterfaceType.
JavaVisitor.prototype.visitUnannClassType_lfno_unannClassOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannInterfaceType.
JavaVisitor.prototype.visitUnannInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannInterfaceType_lf_unannClassOrInterfaceType.
JavaVisitor.prototype.visitUnannInterfaceType_lf_unannClassOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannInterfaceType_lfno_unannClassOrInterfaceType.
JavaVisitor.prototype.visitUnannInterfaceType_lfno_unannClassOrInterfaceType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannTypeVariable.
JavaVisitor.prototype.visitUnannTypeVariable = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unannArrayType.
JavaVisitor.prototype.visitUnannArrayType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodDeclaration.
JavaVisitor.prototype.visitMethodDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodModifier.
JavaVisitor.prototype.visitMethodModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodHeader.
JavaVisitor.prototype.visitMethodHeader = function(ctx) {
};


// Visit a parse tree produced by JavaParser#result.
JavaVisitor.prototype.visitResult = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodDeclarator.
JavaVisitor.prototype.visitMethodDeclarator = function(ctx) {
};


// Visit a parse tree produced by JavaParser#formalParameterList.
JavaVisitor.prototype.visitFormalParameterList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#formalParameters.
JavaVisitor.prototype.visitFormalParameters = function(ctx) {
};


// Visit a parse tree produced by JavaParser#formalParameter.
JavaVisitor.prototype.visitFormalParameter = function(ctx) {
};


// Visit a parse tree produced by JavaParser#variableModifier.
JavaVisitor.prototype.visitVariableModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#lastFormalParameter.
JavaVisitor.prototype.visitLastFormalParameter = function(ctx) {
};


// Visit a parse tree produced by JavaParser#receiverParameter.
JavaVisitor.prototype.visitReceiverParameter = function(ctx) {
};


// Visit a parse tree produced by JavaParser#throws_.
JavaVisitor.prototype.visitThrows_ = function(ctx) {
};


// Visit a parse tree produced by JavaParser#exceptionTypeList.
JavaVisitor.prototype.visitExceptionTypeList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#exceptionType.
JavaVisitor.prototype.visitExceptionType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodBody.
JavaVisitor.prototype.visitMethodBody = function(ctx) {
};


// Visit a parse tree produced by JavaParser#instanceInitializer.
JavaVisitor.prototype.visitInstanceInitializer = function(ctx) {
};


// Visit a parse tree produced by JavaParser#staticInitializer.
JavaVisitor.prototype.visitStaticInitializer = function(ctx) {
};


// Visit a parse tree produced by JavaParser#constructorDeclaration.
JavaVisitor.prototype.visitConstructorDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#constructorModifier.
JavaVisitor.prototype.visitConstructorModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#constructorDeclarator.
JavaVisitor.prototype.visitConstructorDeclarator = function(ctx) {
};


// Visit a parse tree produced by JavaParser#simpleTypeName.
JavaVisitor.prototype.visitSimpleTypeName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#constructorBody.
JavaVisitor.prototype.visitConstructorBody = function(ctx) {
};


// Visit a parse tree produced by JavaParser#explicitConstructorInvocation.
JavaVisitor.prototype.visitExplicitConstructorInvocation = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enumDeclaration.
JavaVisitor.prototype.visitEnumDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enumBody.
JavaVisitor.prototype.visitEnumBody = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enumConstantList.
JavaVisitor.prototype.visitEnumConstantList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enumConstant.
JavaVisitor.prototype.visitEnumConstant = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enumConstantModifier.
JavaVisitor.prototype.visitEnumConstantModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enumBodyDeclarations.
JavaVisitor.prototype.visitEnumBodyDeclarations = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceDeclaration.
JavaVisitor.prototype.visitInterfaceDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#normalInterfaceDeclaration.
JavaVisitor.prototype.visitNormalInterfaceDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceModifier.
JavaVisitor.prototype.visitInterfaceModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#extendsInterfaces.
JavaVisitor.prototype.visitExtendsInterfaces = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceBody.
JavaVisitor.prototype.visitInterfaceBody = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceMemberDeclaration.
JavaVisitor.prototype.visitInterfaceMemberDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#constantDeclaration.
JavaVisitor.prototype.visitConstantDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#constantModifier.
JavaVisitor.prototype.visitConstantModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceMethodDeclaration.
JavaVisitor.prototype.visitInterfaceMethodDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#interfaceMethodModifier.
JavaVisitor.prototype.visitInterfaceMethodModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#annotationTypeDeclaration.
JavaVisitor.prototype.visitAnnotationTypeDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#annotationTypeBody.
JavaVisitor.prototype.visitAnnotationTypeBody = function(ctx) {
};


// Visit a parse tree produced by JavaParser#annotationTypeMemberDeclaration.
JavaVisitor.prototype.visitAnnotationTypeMemberDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#annotationTypeElementDeclaration.
JavaVisitor.prototype.visitAnnotationTypeElementDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#annotationTypeElementModifier.
JavaVisitor.prototype.visitAnnotationTypeElementModifier = function(ctx) {
};


// Visit a parse tree produced by JavaParser#defaultValue.
JavaVisitor.prototype.visitDefaultValue = function(ctx) {
};


// Visit a parse tree produced by JavaParser#annotation.
JavaVisitor.prototype.visitAnnotation = function(ctx) {
};


// Visit a parse tree produced by JavaParser#normalAnnotation.
JavaVisitor.prototype.visitNormalAnnotation = function(ctx) {
};


// Visit a parse tree produced by JavaParser#elementValuePairList.
JavaVisitor.prototype.visitElementValuePairList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#elementValuePair.
JavaVisitor.prototype.visitElementValuePair = function(ctx) {
};


// Visit a parse tree produced by JavaParser#elementValue.
JavaVisitor.prototype.visitElementValue = function(ctx) {
};


// Visit a parse tree produced by JavaParser#elementValueArrayInitializer.
JavaVisitor.prototype.visitElementValueArrayInitializer = function(ctx) {
};


// Visit a parse tree produced by JavaParser#elementValueList.
JavaVisitor.prototype.visitElementValueList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#markerAnnotation.
JavaVisitor.prototype.visitMarkerAnnotation = function(ctx) {
};


// Visit a parse tree produced by JavaParser#singleElementAnnotation.
JavaVisitor.prototype.visitSingleElementAnnotation = function(ctx) {
};


// Visit a parse tree produced by JavaParser#arrayInitializer.
JavaVisitor.prototype.visitArrayInitializer = function(ctx) {
};


// Visit a parse tree produced by JavaParser#variableInitializerList.
JavaVisitor.prototype.visitVariableInitializerList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#block.
JavaVisitor.prototype.visitBlock = function(ctx) {
};


// Visit a parse tree produced by JavaParser#blockStatements.
JavaVisitor.prototype.visitBlockStatements = function(ctx) {
};


// Visit a parse tree produced by JavaParser#blockStatement.
JavaVisitor.prototype.visitBlockStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#localVariableDeclarationStatement.
JavaVisitor.prototype.visitLocalVariableDeclarationStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#localVariableDeclaration.
JavaVisitor.prototype.visitLocalVariableDeclaration = function(ctx) {
};


// Visit a parse tree produced by JavaParser#statement.
JavaVisitor.prototype.visitStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#statementNoShortIf.
JavaVisitor.prototype.visitStatementNoShortIf = function(ctx) {
};


// Visit a parse tree produced by JavaParser#statementWithoutTrailingSubstatement.
JavaVisitor.prototype.visitStatementWithoutTrailingSubstatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#emptyStatement.
JavaVisitor.prototype.visitEmptyStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#labeledStatement.
JavaVisitor.prototype.visitLabeledStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#labeledStatementNoShortIf.
JavaVisitor.prototype.visitLabeledStatementNoShortIf = function(ctx) {
};


// Visit a parse tree produced by JavaParser#expressionStatement.
JavaVisitor.prototype.visitExpressionStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#statementExpression.
JavaVisitor.prototype.visitStatementExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#ifThenStatement.
JavaVisitor.prototype.visitIfThenStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#ifThenElseStatement.
JavaVisitor.prototype.visitIfThenElseStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#ifThenElseStatementNoShortIf.
JavaVisitor.prototype.visitIfThenElseStatementNoShortIf = function(ctx) {
};


// Visit a parse tree produced by JavaParser#assertStatement.
JavaVisitor.prototype.visitAssertStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#switchStatement.
JavaVisitor.prototype.visitSwitchStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#switchBlock.
JavaVisitor.prototype.visitSwitchBlock = function(ctx) {
};


// Visit a parse tree produced by JavaParser#switchBlockStatementGroup.
JavaVisitor.prototype.visitSwitchBlockStatementGroup = function(ctx) {
};


// Visit a parse tree produced by JavaParser#switchLabels.
JavaVisitor.prototype.visitSwitchLabels = function(ctx) {
};


// Visit a parse tree produced by JavaParser#switchLabel.
JavaVisitor.prototype.visitSwitchLabel = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enumConstantName.
JavaVisitor.prototype.visitEnumConstantName = function(ctx) {
};


// Visit a parse tree produced by JavaParser#whileStatement.
JavaVisitor.prototype.visitWhileStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#whileStatementNoShortIf.
JavaVisitor.prototype.visitWhileStatementNoShortIf = function(ctx) {
};


// Visit a parse tree produced by JavaParser#doStatement.
JavaVisitor.prototype.visitDoStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#forStatement.
JavaVisitor.prototype.visitForStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#forStatementNoShortIf.
JavaVisitor.prototype.visitForStatementNoShortIf = function(ctx) {
};


// Visit a parse tree produced by JavaParser#basicForStatement.
JavaVisitor.prototype.visitBasicForStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#basicForStatementNoShortIf.
JavaVisitor.prototype.visitBasicForStatementNoShortIf = function(ctx) {
};


// Visit a parse tree produced by JavaParser#forInit.
JavaVisitor.prototype.visitForInit = function(ctx) {
};


// Visit a parse tree produced by JavaParser#forUpdate.
JavaVisitor.prototype.visitForUpdate = function(ctx) {
};


// Visit a parse tree produced by JavaParser#statementExpressionList.
JavaVisitor.prototype.visitStatementExpressionList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enhancedForStatement.
JavaVisitor.prototype.visitEnhancedForStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#enhancedForStatementNoShortIf.
JavaVisitor.prototype.visitEnhancedForStatementNoShortIf = function(ctx) {
};


// Visit a parse tree produced by JavaParser#breakStatement.
JavaVisitor.prototype.visitBreakStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#continueStatement.
JavaVisitor.prototype.visitContinueStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#returnStatement.
JavaVisitor.prototype.visitReturnStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#throwStatement.
JavaVisitor.prototype.visitThrowStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#synchronizedStatement.
JavaVisitor.prototype.visitSynchronizedStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#tryStatement.
JavaVisitor.prototype.visitTryStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#catches.
JavaVisitor.prototype.visitCatches = function(ctx) {
};


// Visit a parse tree produced by JavaParser#catchClause.
JavaVisitor.prototype.visitCatchClause = function(ctx) {
};


// Visit a parse tree produced by JavaParser#catchFormalParameter.
JavaVisitor.prototype.visitCatchFormalParameter = function(ctx) {
};


// Visit a parse tree produced by JavaParser#catchType.
JavaVisitor.prototype.visitCatchType = function(ctx) {
};


// Visit a parse tree produced by JavaParser#finally_.
JavaVisitor.prototype.visitFinally_ = function(ctx) {
};


// Visit a parse tree produced by JavaParser#tryWithResourcesStatement.
JavaVisitor.prototype.visitTryWithResourcesStatement = function(ctx) {
};


// Visit a parse tree produced by JavaParser#resourceSpecification.
JavaVisitor.prototype.visitResourceSpecification = function(ctx) {
};


// Visit a parse tree produced by JavaParser#resourceList.
JavaVisitor.prototype.visitResourceList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#resource.
JavaVisitor.prototype.visitResource = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primary.
JavaVisitor.prototype.visitPrimary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray.
JavaVisitor.prototype.visitPrimaryNoNewArray = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_arrayAccess.
JavaVisitor.prototype.visitPrimaryNoNewArray_lf_arrayAccess = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_arrayAccess.
JavaVisitor.prototype.visitPrimaryNoNewArray_lfno_arrayAccess = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_primary.
JavaVisitor.prototype.visitPrimaryNoNewArray_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary.
JavaVisitor.prototype.visitPrimaryNoNewArray_lf_primary_lf_arrayAccess_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary.
JavaVisitor.prototype.visitPrimaryNoNewArray_lf_primary_lfno_arrayAccess_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_primary.
JavaVisitor.prototype.visitPrimaryNoNewArray_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary.
JavaVisitor.prototype.visitPrimaryNoNewArray_lfno_primary_lf_arrayAccess_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#primaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary.
JavaVisitor.prototype.visitPrimaryNoNewArray_lfno_primary_lfno_arrayAccess_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classInstanceCreationExpression.
JavaVisitor.prototype.visitClassInstanceCreationExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classInstanceCreationExpression_lf_primary.
JavaVisitor.prototype.visitClassInstanceCreationExpression_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#classInstanceCreationExpression_lfno_primary.
JavaVisitor.prototype.visitClassInstanceCreationExpression_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#typeArgumentsOrDiamond.
JavaVisitor.prototype.visitTypeArgumentsOrDiamond = function(ctx) {
};


// Visit a parse tree produced by JavaParser#fieldAccess.
JavaVisitor.prototype.visitFieldAccess = function(ctx) {
};


// Visit a parse tree produced by JavaParser#fieldAccess_lf_primary.
JavaVisitor.prototype.visitFieldAccess_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#fieldAccess_lfno_primary.
JavaVisitor.prototype.visitFieldAccess_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#arrayAccess.
JavaVisitor.prototype.visitArrayAccess = function(ctx) {
};


// Visit a parse tree produced by JavaParser#arrayAccess_lf_primary.
JavaVisitor.prototype.visitArrayAccess_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#arrayAccess_lfno_primary.
JavaVisitor.prototype.visitArrayAccess_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodInvocation.
JavaVisitor.prototype.visitMethodInvocation = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodInvocation_lf_primary.
JavaVisitor.prototype.visitMethodInvocation_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodInvocation_lfno_primary.
JavaVisitor.prototype.visitMethodInvocation_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#argumentList.
JavaVisitor.prototype.visitArgumentList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodReference.
JavaVisitor.prototype.visitMethodReference = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodReference_lf_primary.
JavaVisitor.prototype.visitMethodReference_lf_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#methodReference_lfno_primary.
JavaVisitor.prototype.visitMethodReference_lfno_primary = function(ctx) {
};


// Visit a parse tree produced by JavaParser#arrayCreationExpression.
JavaVisitor.prototype.visitArrayCreationExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#dimExprs.
JavaVisitor.prototype.visitDimExprs = function(ctx) {
};


// Visit a parse tree produced by JavaParser#dimExpr.
JavaVisitor.prototype.visitDimExpr = function(ctx) {
};


// Visit a parse tree produced by JavaParser#constantExpression.
JavaVisitor.prototype.visitConstantExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#expression.
JavaVisitor.prototype.visitExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#lambdaExpression.
JavaVisitor.prototype.visitLambdaExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#lambdaParameters.
JavaVisitor.prototype.visitLambdaParameters = function(ctx) {
};


// Visit a parse tree produced by JavaParser#inferredFormalParameterList.
JavaVisitor.prototype.visitInferredFormalParameterList = function(ctx) {
};


// Visit a parse tree produced by JavaParser#lambdaBody.
JavaVisitor.prototype.visitLambdaBody = function(ctx) {
};


// Visit a parse tree produced by JavaParser#assignmentExpression.
JavaVisitor.prototype.visitAssignmentExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#assignment.
JavaVisitor.prototype.visitAssignment = function(ctx) {
};


// Visit a parse tree produced by JavaParser#leftHandSide.
JavaVisitor.prototype.visitLeftHandSide = function(ctx) {
};


// Visit a parse tree produced by JavaParser#assignmentOperator.
JavaVisitor.prototype.visitAssignmentOperator = function(ctx) {
};


// Visit a parse tree produced by JavaParser#conditionalExpression.
JavaVisitor.prototype.visitConditionalExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#conditionalOrExpression.
JavaVisitor.prototype.visitConditionalOrExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#conditionalAndExpression.
JavaVisitor.prototype.visitConditionalAndExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#inclusiveOrExpression.
JavaVisitor.prototype.visitInclusiveOrExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#exclusiveOrExpression.
JavaVisitor.prototype.visitExclusiveOrExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#andExpression.
JavaVisitor.prototype.visitAndExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#equalityExpression.
JavaVisitor.prototype.visitEqualityExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#relationalExpression.
JavaVisitor.prototype.visitRelationalExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#shiftExpression.
JavaVisitor.prototype.visitShiftExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#additiveExpression.
JavaVisitor.prototype.visitAdditiveExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#multiplicativeExpression.
JavaVisitor.prototype.visitMultiplicativeExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unaryExpression.
JavaVisitor.prototype.visitUnaryExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#preIncrementExpression.
JavaVisitor.prototype.visitPreIncrementExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#preDecrementExpression.
JavaVisitor.prototype.visitPreDecrementExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#unaryExpressionNotPlusMinus.
JavaVisitor.prototype.visitUnaryExpressionNotPlusMinus = function(ctx) {
};


// Visit a parse tree produced by JavaParser#postfixExpression.
JavaVisitor.prototype.visitPostfixExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#postIncrementExpression.
JavaVisitor.prototype.visitPostIncrementExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#postIncrementExpression_lf_postfixExpression.
JavaVisitor.prototype.visitPostIncrementExpression_lf_postfixExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#postDecrementExpression.
JavaVisitor.prototype.visitPostDecrementExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#postDecrementExpression_lf_postfixExpression.
JavaVisitor.prototype.visitPostDecrementExpression_lf_postfixExpression = function(ctx) {
};


// Visit a parse tree produced by JavaParser#castExpression.
JavaVisitor.prototype.visitCastExpression = function(ctx) {
};



exports.JavaVisitor = JavaVisitor;