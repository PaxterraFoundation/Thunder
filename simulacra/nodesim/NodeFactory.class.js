var NodeFactory = {
	cache: [],
	newId: function() {
		var nodeId = 0;
		while (NodeFactory.cache.filter(function(n) {
			return n.id === nodeId;
		}).length) {
			nodeId++;
		}
		return nodeId;
	},
	create: function(newNodeData) {
		newNodeData.id = NodeFactory.newId();
		NodeFactory.cache.push(new Node(newNodeData));
		return NodeFactory.getById(newNodeData.id);
	},
	getById: function(id) {
		var foundNode = NodeFactory.cache.filter(function(n) {
			return n.id === id;
		})[0];
		if (foundNode) return foundNode;
		return false;
	}
};