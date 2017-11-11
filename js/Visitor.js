var TodoVisitor = require('generated-parser/TodoVisitor').TodoVisitor;
// This class defines a complete visitor for a parse tree produced by todoParser.
class Visitor extends TodoVisitor {
  constructor() {
    super();
  }

  // Visit a parse tree produced by todoParser#elements.
  visitElements(ctx) {
    // console.log("Rule: ELEMENTS");
    // console.log(ctx);
    return super.visitChildren(ctx);
  };

  // Visit a parse tree produced by todoParser#element.
  visitElement(ctx) {
    // console.log("Rule: ELEMENT");
    // console.log(ctx);
    return super.visitChildren(ctx);
  };

  // Visit a parse tree produced by todoParser#emptyLine.
  visitEmptyLine(ctx) {
    // console.log("Rule: EmptyLine");
    // console.log(ctx);
    return super.visitChildren(ctx);
  };
}

exports.Visitor = Visitor;
