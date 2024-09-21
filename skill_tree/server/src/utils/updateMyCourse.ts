interface ISkillNode {
  name: string;
  state: "Not Started" | "In Progress" | "Completed" | "Stopped";
  children: ISkillNode[]; // Recursive definition for child nodes
}

export const updateNodes =  (
  tree: ISkillNode,
  nodeName: string,
  nodeStatus: "Not Started" | "In Progress" | "Completed" | "Stopped"
):ISkillNode => {

  const completedStatusUpdate = (
    root: ISkillNode,
    nodeName: string,
    nodeStatus: "Not Started" | "In Progress" | "Completed" | "Stopped"
  ): boolean => {
    if (root.name === nodeName) {
      root.state = nodeStatus;
      return true; 
    }
  
    for (const node of root.children) {
      if (completedStatusUpdate(node, nodeName, nodeStatus)) {
        // Check if all children are completed
        return root.children.every(child => child.state === "Completed");
      }
    }
  
    return false; // Return false if the node is not found in this branch
  };
  

  const startStatusUpdate = (
    root: ISkillNode,
    nodeName: string,
    nodeStatus: "Not Started" | "In Progress" | "Completed" | "Stopped"
  ): boolean => {
    if (root.name === nodeName) {
      root.state = nodeStatus;
      return true;
    }

    for (const node of root.children) {
      if (startStatusUpdate(node, nodeName, nodeStatus)) {
        root.state = nodeStatus;
        return true;
      }
    }

    return false;
  };



  const stoppedStatusUpdate = (
    root: ISkillNode,
    nodeName: string,
    nodeStatus: "Not Started" | "In Progress" | "Completed" | "Stopped"
  ): boolean => {
    if (root.name === nodeName) {
      root.state = nodeStatus; // Update the state
      return true; // Indicate the node was found and updated
    }

    // Recursively check children
    for (const node of root.children) {
      if (stoppedStatusUpdate(node, nodeName, nodeStatus)) {
        return true; // If found in children, return true
      }
    }

    return false; // Node not found
  };



  if (nodeStatus === "Completed") {
    completedStatusUpdate(tree, nodeName, nodeStatus);
  } else if (nodeStatus === "In Progress") {
    startStatusUpdate(tree, nodeName, nodeStatus);
  } else {
    stoppedStatusUpdate(tree, nodeName, nodeStatus);
  }
  return tree;
};


export const updateProgressRate = (root: ISkillNode): number => {
  let total: number = 0;
  let completed: number = 0;

  const traverse = (node: ISkillNode) => {
    total++; // Increment total count for each node
    if (node.state === "Completed") {
      completed++; // Increment completed count if the node is completed
    }

    // Traverse children if there are any
    for (const child of node.children) {
      traverse(child);
    }
  };

  // Start the traversal from the root node
  traverse(root);

  // Calculate progress rate as a percentage
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return progress;
};
