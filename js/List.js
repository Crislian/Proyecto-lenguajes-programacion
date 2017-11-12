class List {
  constructor() {
    this.l = new Array();
  }

  draw(id) {
    DrawTool.drawList(this.l, id);
  }
}

module.exports = List;
