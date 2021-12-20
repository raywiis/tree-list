export type TreeNodeId = number;

export type TreeNode = {
	id: TreeNodeId;
	name: string;
	children: TreeNodeId[];
};

export type Tree = Map<TreeNodeId, TreeNode>;
