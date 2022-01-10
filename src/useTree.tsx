import { useState, useCallback, useMemo } from "react";
import { Tree, TreeNode, TreeNodeId } from "./types";

function deleteRecursive(map, nodeId) {
	const node: TreeNode = map.get(nodeId);

	node.children.forEach((child) => {
		deleteRecursive(map, child);
	});

	map.delete(nodeId);
}

export const useTree = () => {
	const [idCounter, setIdCounter] = useState(1);
	const [error, setError] = useState(null);

	const nodes = useMemo(
		() =>
			new Map<TreeNodeId, TreeNode>([
				[
					0,
					{
						id: 0,
						parentId: -1,
						name: "Root",
						children: [],
					},
				],
			]),
		[]
	);

	const addNode = useCallback(
		(parentId: TreeNodeId, newNodeName: string) => {
			const parentNode = nodes.get(parentId);
			if (!parentNode) {
				console.error("Missing node");
				return;
			}
			const newNode: TreeNode = {
				children: [],
				parentId,
				id: idCounter,
				name: newNodeName,
			};
			nodes.set(idCounter, newNode);
			parentNode.children.push(idCounter);
			setIdCounter((prevCounter) => prevCounter + 1);
		},
		[setIdCounter, idCounter]
	);

	const removeNode = useCallback((nodeId: TreeNodeId) => {
		const node = nodes.get(nodeId);
		if (!node) {
			console.error("No node found");
			return;
		}
		const { parentId } = node;
		const parent = nodes.get(parentId);
		if (!parent) {
			console.warn("No parent found");
			return;
		}

		parent.children = parent?.children.filter((id) => id !== nodeId);
		deleteRecursive(nodes, nodeId);
		setIdCounter((prevCounter) => prevCounter + 1);
	}, []);

	return { nodes, addNode, removeNode, error };
};
