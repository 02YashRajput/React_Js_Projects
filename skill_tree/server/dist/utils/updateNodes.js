export const updateNodes = (tree, nodeName, nodeStatus) => {
    const completedStatusUpdate = (root, nodeName, nodeStatus) => {
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
    const startStatusUpdate = (root, nodeName, nodeStatus) => {
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
    const stoppedStatusUpdate = (root, nodeName, nodeStatus) => {
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
    }
    else if (nodeStatus === "In Progress") {
        startStatusUpdate(tree, nodeName, nodeStatus);
    }
    else {
        stoppedStatusUpdate(tree, nodeName, nodeStatus);
    }
    return tree;
};
