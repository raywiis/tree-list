import { useState, useCallback, useMemo } from "react";
import { Tree, TreeNode, TreeNodeId } from "./types";


export const useTree = () => {
	const [idCounter, setIdCounter] = useState(1);

	const nodes = useMemo(() => new Map<TreeNodeId, TreeNode>([
		[
			0,
			{
				id: 0,
				name: "Root",
				children: [],
			},
		],
	]), []);

	const addNode = useCallback(
		(parentId: TreeNodeId, newNodeName: string) => {
			const parentNode = nodes.get(parentId);
			if (!parentNode) {
				console.error("Missing node");
				return;
			}
			const newNode: TreeNode = {
				children: [],
				id: idCounter,
				name: newNodeName,
			};
			nodes.set(idCounter, newNode);
			parentNode.children.push(idCounter);
			setIdCounter((prevCounter) => prevCounter + 1);
		},
		[setIdCounter, idCounter]
	);
	return { nodes, addNode };
};
