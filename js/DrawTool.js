class DrawTool {
  static drawEllipse(string, x, y) {
    push();
    strokeWeight(2);
    fill(220);
    ellipseMode(CENTER);
    ellipse(x, y, 13 + (string.length) * 6.5 + 13, 50);
    fill(50);
    textAlign(CENTER, CENTER);
    text(string, x, y);
    pop();
    return 13 + (string.length) * 6.5 + 13;
  }
}

module.exports = DrawTool;
