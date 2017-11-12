class DrawTool {
  static drawList(list, id) {
		for (var i = 0, leng = 15; i < list.length; i++)
      leng += DrawTool.drawEllipse(str(list[i]), i * leng + 50, 75 * id + 50);
  }

  static drawEllipse(string, x, y) {
    push();
    strokeWeight(1.5);
    fill(190, 100, 100);
    ellipseMode(CENTER);
    ellipse(x, y, 13 + textWidth(string) + 13, 50);
    fill(0);
    textAlign(CENTER, CENTER);
    text(string, x, y);
    pop();
    return 13 + textWidth(string) + 13;
  }
}

module.exports = DrawTool;
