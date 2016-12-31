function User(data) {
	this.bread = new Crumb({user: this});

	this.construct = function(data) {
		this.id = data.id;
		this.name = data.name;
		User.prototype.cache.push(this);
	};

	this.createNode = function(data) {
		data.author = this.id;
		return NodeFactory.create(data);
	};

	this.createTextNode = function(text) {
		return this.createNode({
			text: text
		});
	};

	this.loadPathCollection = function() {};

	this.construct.apply(this, arguments);
};
User.prototype.cache = [];
