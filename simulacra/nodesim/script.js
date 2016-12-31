var data = {
	nodes: [],
	connections: [],
	user: {
		id: 12,
		path: [0],
		pointer: 0
	}
};

// Populate the system with data
function buildStory() {
	window.jack = new User({id: 42, name: "Jack"});
	window.jill = new User({id: 12, name: "Jill"});

	// Jack & Jill
	jack.createTextNode("Jack and Jill went up the hill...")
		.addConnDownstream(jack.createTextNode("...to fetch a pail of water"))
		.addConnDownstream(jack.createTextNode("Jack fell down and broke his crown..."))
		.addConnDownstream(jack.createTextNode("...and Jill came tumbling after"));

	// The Itsy Bitsy Spider
	jack.createTextNode("The itsy bitsy spider went up the water spout")
		.addConnDownstream(jack.createTextNode("Down came the rain and washed the spider out"))
		.addConnDownstream(jack.createTextNode("Out came the sun and dried up all the rain"))
		.addConnDownstream(jack.createTextNode("And the itsy bitsy spider went up the spout again"));		
};

// Primitive unit test suite for primitive code
function runTests() {
	if (jack.bread.crumbs.length !== 0) throw new Error("Zero crumbs expected");

	console.log('addCrumb() ', jack.bread.addCrumb(NodeFactory.cache[0]));

	if (!jack.bread.isBread()) throw new Error("Bread is not bread");
	if (jack.bread.crumbs.length !== 1) throw new Error("One crumb expected");
	if (jack.bread.crumbs[0].node.id !== 0) throw new Error("Wrong crumb found");

	console.log('addCrumb() ', jack.bread.addCrumb(NodeFactory.cache[1]).node.text);

	if (!jack.bread.isBread()) throw new Error("Bread is not bread");
	if (jack.bread.crumbs.length !== 1) throw new Error("One crumb expected");
	if (jack.bread.crumbs[0].node.id !== 0) throw new Error("Wrong crumb found");

	if (jack.bread.crumbs[0].crumbs.length !== 1) throw new Error("One crumb expected");
	if (jack.bread.crumbs[0].crumbs[0].node.id !== 1) throw new Error("Wrong crumb found");

	console.log('addCrumb() ', jack.bread.addCrumb(NodeFactory.cache[2]).node.text);

	if (jack.bread.crumbs[0].crumbs[0].crumbs.length !== 1) throw new Error("One crumb expected");
	if (jack.bread.crumbs[0].crumbs[0].crumbs[0].node.id !== 2) throw new Error("Wrong crumb found");
	if (crumb instanceof Array) {
		throw new Error("Wrong return value format for bread.addCrumb() ");
	}
};

// Bootstrap
function main() {
	buildStory();
	runTests();
};