import { Tree, TreeNode, TreeNodeId } from "./types";

type TreeList = {
	node: TreeNode;
	indentation: number;
}[];

const flattenTree = (nodes: Tree, rootId: TreeNodeId): TreeList => {
	const root = nodes.get(rootId);
	if (!root) {
		throw new Error("No root found");
	}
	const list: TreeList = [{ node: root, indentation: 0 }];
	const stack: [TreeNode, number][] = [[root, 0]];

	while (stack.length > 0) {
		const top = stack.pop();
		if (!top) {
			throw new Error("No top popped");
		}
		const [topNode, childIdx] = top;

		if (childIdx < topNode.children.length) {
			stack.push([topNode, childIdx + 1]);
			const node = nodes.get(topNode.children[childIdx]);
			if (!node) {
				throw new Error("Node not found");
			}
			list.push({ node, indentation: stack.length });
			stack.push([node, 0]);
		}
	}

	return list;
};

const IterativeItem = ({
	node,
	addRandom,
	addNamedItem,
	removeItem,
	indentation,
}) => (
	<div
		key={node.id}
		style={{
			paddingLeft: 16 * indentation,
		}}
	>
		{node.name}
		<button onClick={() => addRandom(node.id)}>Add random</button>
		<button onClick={() => addNamedItem(node.id)}>Add named</button>
		<button onClick={() => removeItem(node.id)}>Remove</button>
	</div>
);

export const Iterative = ({
	nodes,
	addRandom,
	addNamedItem,
	removeItem,
}: {
	nodes: Tree;
	addRandom: (id: TreeNodeId) => void;
	addNamedItem: (id: TreeNodeId) => void;
	removeItem: (id: TreeNodeId) => void;
}) => (
	<div>
		{flattenTree(nodes, 0).map(({ node, indentation }) => (
			<IterativeItem
				key={node.id}
				node={node}
				indentation={indentation}
				addRandom={addRandom}
				addNamedItem={addNamedItem}
				removeItem={removeItem}
			/>
		))}
	</div>
);
