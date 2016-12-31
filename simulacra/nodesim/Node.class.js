function Node(data) {
	var that = this;
	this._rawData = data;
	this._connAll = [];
	this.id = this._rawData.id;
	this.text = this._rawData.text;
	this.author = this._rawData.author;

	this.construct = function() {};

	this.follow = function() {

	};

	this.addConnDownstream = function(node) {
		window.data.connections.push({
			upstream: that.id,
			downstream: node.id,
			author: window.data.user.id
		});
		return node;
	};

	this.getConnAll = function () {
		this.getConnDownstream();
		this.getConnUpstream();
	};

	this.getConnDownstream = function () {
		this._downstreamNodes = this.getConn(Node._CONN_TYPE_DOWNSTREAM);
		return this._downstreamNodes;
	};

	this.getConnDownstreamDefault = function () {
		return this.getConnDownstream().filter(function(node) {
			return node.author === that.author;
		})[0];
	};

	this.getConnUpstream = function () {
		this._upstreamNodes = this.getConn(Node._CONN_TYPE_UPSTREAM);
		return this._upstreamNodes;
	};

	this.getConnUpstreamDefault = function () {};

	this.setConnUpstreamReferrer = function(referrer) {
		this._connUpstreamReferrer = referrer;
	};

	this.getConnUpstreamReferrer = function () {};

	this.getConn = function(connType) {
		var connTypeOther = Node.toggleConnType(connType);
		var connectingNodes = data.connections.filter(function(c) {
			return c[connTypeOther] === that.id;
		}).map(function(c) {
			return NodeFactory.getById(c[connType]);
		});
		return connectingNodes;
	};

	this.construct.apply(this, arguments);
};
Node._CONN_TYPE_UPSTREAM = "upstream";
Node._CONN_TYPE_DOWNSTREAM = "downstream";
Node.toggleConnType = function(connType) {
	switch (connType) {
		case Node._CONN_TYPE_DOWNSTREAM:
			return Node._CONN_TYPE_UPSTREAM;
		break;
		case Node._CONN_TYPE_UPSTREAM:
			return Node._CONN_TYPE_DOWNSTREAM;
		break;
	}
	return false;
};