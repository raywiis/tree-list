import { useState } from "react";
import { Iterative } from "./Iterative";
import { Recursive } from "./Recursive";
import { useTree } from "./useTree";
import { TreeNodeId } from "./types";

export default function App() {
	const [recursive, setRecursive] = useState(false);
	const { nodes, addNode, removeNode } = useTree();

	const addRandom = (rootId: TreeNodeId) => {
		addNode(rootId, Math.random().toFixed(20));
	};

	const addNamedItem = (rootId: TreeNodeId) => {
		const itemName = prompt("What to name the new item?");
		if (itemName) {
			addNode(rootId, itemName);
		}
	};

	return (
		<div>
			<label>
				Recursive?
				<input
					type="checkbox"
					onChange={(e) => setRecursive(e.target.checked)}
				/>
			</label>
			{recursive ? (
				<Recursive
					nodes={nodes}
					rootId={0}
					addRandom={addRandom}
					addNamedItem={addNamedItem}
				/>
			) : (
				<Iterative
					nodes={nodes}
					addRandom={addRandom}
					addNamedItem={addNamedItem}
					removeItem={removeNode}
				/>
			)}
			{JSON.stringify(Array.from(nodes.entries()), null, 4)}
		</div>
	);
}
