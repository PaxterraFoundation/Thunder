function Crumb(data) {
	this.parent = data.parent || undefined;
	this.user = data.user || undefined;
	this.node = data.node || undefined;
	this.pointer = undefined;
	this.crumbs = [];

	this.construct = function(data) {};

	this.getCrumbById = function(id) {
		return this.crumbs.filter(function(crumb) {
			return crumb.id === id;
		})[0];
	};

	this.addCrumb = function(node) {
		if (!this.pointer) {
			var newCrumb = new Crumb({
				parent: this,
				user: this.user,
				node: node
			});
			this.pointer = newCrumb;
			if (!this.isBread()) {
				console.log(this.node.text+' -> '+this.pointer.node.text);
			} else {
				console.log(' || '+this.pointer.node.text+' ||');
			}
			this.crumbs.push(newCrumb);
			return [newCrumb];
		} else {
			return this.pointer.addCrumb(node)[0];
		}
	};

	this.isBread = function() {
		return !this.node;
	};

	this.get = function(index) {
		var node = this.nodes[index];
		if (!node) throw new Error("Path.get(): Cannot return node "+index+" of a "+this.nodes.length+"-node array.");
		return node;
	};

	this.construct.apply(this, arguments);
};