class LinkedList extends List {
	constructor() {
		super();
		this.l = new Array();
	}

	append(element) {
		this.l.push(element);
	}

	draw(id) {
		console.log("holi");
		for (var i = 0, leng = 50; i < this.l.length; i++) {
			leng += DrawTool.drawEllipse(str(this.l[i]), i*leng+20, 50);
			console.log(leng);
		}
	}

	get elements() {
		return this.l;
	}
}
