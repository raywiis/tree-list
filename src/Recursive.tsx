import { Tree, TreeNodeId } from "./types";

export const Recursive = ({
	nodes,
	rootId,
	addRandom,
	addNamedItem,
}: {
	nodes: Tree;
	rootId: TreeNodeId;
	addRandom: (id: TreeNodeId) => void;
	addNamedItem: (id: TreeNodeId) => void;
}) => {
	const node = nodes.get(rootId);
	return (
		<div>
			{node.name}
			<button onClick={() => addRandom(rootId)}>Add random</button>
			<button onClick={() => addNamedItem(rootId)}>Add named</button>
			<ul>
				{node.children.map((childId) => (
					<Recursive
						key={childId}
						nodes={nodes}
						rootId={childId}
						addRandom={addRandom}
						addNamedItem={addNamedItem}
					/>
				))}
			</ul>
		</div>
	);
};
