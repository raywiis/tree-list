import { Tree, TreeNode, TreeNodeId } from "./types";

const flattenTree = (nodes: Tree, rootId: TreeNodeId): [TreeNode, number][] => {
	const root = nodes.get(rootId);
	const list: [TreeNode, number][] = [[root, 0]];

	const stack: [TreeNode, number][] = [[root, 0]];
	while (stack.length > 0) {
		const [topNode, currentChild] = stack.pop();

		if (topNode.children.length > currentChild) {
			stack.push([topNode, currentChild + 1]);
			const childNode = nodes.get(topNode.children[currentChild]);
			list.push([childNode, stack.length]);
			stack.push([childNode, 0]);
		}
	}

	return list;
};

const IterativeItem = ({ node, addRandom, addNamedItem, indentation }) => (
	<div
		className="item-row"
		key={node.id}
		style={{
			paddingLeft: 16 * indentation,
		}}
	>
		<div className="item-row-name">
			{node.name}
		</div>
		<button onClick={() => addRandom(node.id)}>Add random</button>
		<button onClick={() => addNamedItem(node.id)}>Add named</button>
	</div>
);

export const Iterative = ({
	nodes,
	addRandom,
	addNamedItem,
}: {
	nodes: Tree;
	addRandom: (id: TreeNodeId) => void;
	addNamedItem: (id: TreeNodeId) => void;
}) => (
	<div>
		{flattenTree(nodes, 0).map(([node, indentation]) => (
			<IterativeItem
				key={node.id}
				node={node}
				indentation={indentation}
				addRandom={addRandom}
				addNamedItem={addNamedItem}
			/>
		))}
	</div>
);
