import { BaseButton } from '@fluentui/react';
import { Node, Edge, getOutgoers } from 'reactflow';
import { NodeTypeEnum } from './Interfaces';

/**
 * A function to validate the workflow if every node reaches the end node
 * @param nodes The list of node
 * @param edges The list of edge
 * @returns **true** if every node reaches end, **false** otherwise
 */
export const validateFlow = (nodes: Node[], edges: Edge[]): boolean => {
  const visitedNodeIds: string[] = [];

  const startingNode: Node[] = nodes.filter(node => node.type === NodeTypeEnum.START);
  const endingNode: Node[] = nodes.filter(node => node.type === NodeTypeEnum.END);

  if (startingNode.length !== 1 || endingNode.length !== 1) return false;

  let currentLayerNode: Node[] = getOutgoers(startingNode[0], nodes, edges);
  let nextLayerNode: Node[] = [];

  while (true) {
    for (const node of currentLayerNode) {
      const nodeOutgoers: Node[] = getOutgoers(node, nodes, edges);

      // If the node is dead-end, return false immediately
      if (node.id !== endingNode[0].id && nodeOutgoers.length === 0) return false;

      // If the node is the "end" node, continue
      if (node.id === endingNode[0].id) continue;

      // If the node already visited, continue
      if (visitedNodeIds.includes(node.id)) continue;
      else visitedNodeIds.push(node.id);

      const filteredOutgoers: Node[] = nodeOutgoers.filter(outgoer => !!!nextLayerNode.some(next => outgoer.id === next.id))
      nextLayerNode.push(...filteredOutgoers);
    }

    // If there is no nextLayerNode, then the flow is validated
    if (nextLayerNode.length === 0) return true;

    currentLayerNode = nextLayerNode;
    nextLayerNode = [];
  }
}

/**
 * Downloads flow data as a JSON file containing nodes and edges.
 *
 * @param {Node[]} nodes - An array of nodes to include in the flow data.
 * @param {Edge[]} edges - An array of edges to include in the flow data.
 * @returns {void}
 */
export const handleDownloadFlowData = (nodes: Node[], edges: Edge[]) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ nodes, edges }))}`;

  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "workflow.json";
  link.click();
}

/**
 * Handles the upload and parsing of flow data, returning a promise that resolves with
 * an object containing nodes and edges.
 *
 * @returns {Promise<{ nodes: Node[], edges: Edge[] }>} A promise that resolves with an
 * object containing nodes and edges parsed from the uploaded flow data.
 */
export const handleUploadAndParseFlow = (): Promise<{ nodes: Node[], edges: Edge[] }> => {
  return new Promise(async (resolve, reject) => {
    const fileInput = document.createElement("input");

    fileInput.type = "file";
    fileInput.onchange = async (event: any) => {
      const file: File = event.target.files[0];

      if (file.type !== "application/json") {
        window.alert("File is not a valid json");
        reject("File not json");
        return;
      }

      const workflowBuffer = await file.arrayBuffer();
      const workflowUint8Array = new Uint8Array(workflowBuffer);
      const workflowJSONString = new TextDecoder().decode(workflowUint8Array);
      const workflow: { nodes: Node[], edges: Edge[] } = JSON.parse(workflowJSONString);

      resolve(workflow);
    };

    fileInput.click();
  });
};
