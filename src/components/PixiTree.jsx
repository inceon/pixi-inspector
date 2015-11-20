var {Component, PropTypes} = require("react");
var inspector = require("../services/inspectorProxy");
var TreeView = require("./TreeView");

class PixiTree extends Component {

	render() {
		var nodes = this.subtree(this.props.tree);
		if (nodes.length === 1) {
			return nodes[0]
		} else {
			return <span>{nodes}</span>
		}
	}
	subtree(node) {
		if (!node.children) {
			return [];
		}

		return node.children.map(node => {
			var title = node.name;
			if (title == undefined) {
				title = node.type
			}
			return <TreeView 
				key={node.id} 
				title={title}
				leaf={node.leaf}
				collapsed={node.collapsed} 
				selected={node.id === this.props.selectedId} 
				renderChildren={this.subtree.bind(this, node)}
				onExpand={this.expand.bind(this, node)} 
				onCollapse={this.collapse.bind(this, node)} 
				onSelect={this.select.bind(this, node)} 
				onSelectParent={this.selectParent.bind(this, node)}
				onSelectPrevious={this.selectPrevious.bind(this, node)}
				onSelectNext={this.selectNext.bind(this, node)}
			/>
		})
	}
	expand(node) {
		inspector.expand(node.id);
	}
	collapse(node) {
		inspector.collapse(node.id);
	}
	select(node) {
		inspector.select(node.id);
	}
	selectParent(node, e) {
		var context = this.props.context;
		if (context.parent) {
			inspector.select(context.parent);
			e.preventDefault()
		}
	}
	selectPrevious(node, e) {
		var context = this.props.context;
		if (context.prev) {
			inspector.select(context.prev);
			e.preventDefault()
		}
	}
	selectNext(node, e) {
		var context = this.props.context;
		if (context.next) {
			inspector.select(context.next);
			e.preventDefault()
		}
	}
};
PixiTree.propTypes = {
	tree: PropTypes.object
};
module.exports = PixiTree;