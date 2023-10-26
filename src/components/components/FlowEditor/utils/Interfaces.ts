import { Node, Edge, NodeProps, NodeChange, EdgeChange } from 'reactflow';

type NodeType = NodeTypeEnum;
export enum NodeTypeEnum {
  DEFAULT = "default",
  START = "startNode",
  END = "endNode",
  TEXTFIELD = "textFieldNode",
  CUSTOM = "customRenderNode"
}

type EdgeType = EdgeTypeEnum;
export enum EdgeTypeEnum {
  DEFAULT = "default",
  LABELED = "labeledEdge"
}

export interface IFlowEditorProps<T = any, U = any> {
  /**
   * Initial value for nodes.
   */
  defaultNodes?: Node<T, NodeType | string | undefined>[];

  /**
   * Initial value for edges.
   */
  defaultEdges?: Edge<U>[];

  /**
   * Nodes list, use this and onNodesChange to control the component's nodes.
   */
  nodes?: Node<T, NodeType | string | undefined>[];

  /**
   * Connections between Node<T>, use this and onEdgesChange to control the component's edges.
   */
  edges?: Edge<U>[];

  /**
   * Callback for when nodes are changed
   * @param updatedNodeState - The updated state of nodes.
   * @param changes - The changes made to nodes.
   * @returns Updated node state.
   */
  onNodesChange?: (updatedNodeState: Node<T>[], changes: NodeChange[]) => void;

  /**
   * Callback for when edges are changed.
   * @param updatedEdgeState - The updated state of edges.
   * @param changes - The changes made to edges.
   * @returns Updated edge state.
   */
  onEdgesChange?: (updatedEdgeState: Edge<U>[], changes: EdgeChange[]) => void;

  /**
   * Callback for when a new node is added.
   * @param newNode - The new node to be added.
   * @returns The new node to be added.
   */
  onAddClick?: (newNode: Node<T>) => void;

  /**
   * Callback for when a new edge is connected.
   * @param newEdge - The new edge to be added.
   * @returns The new edge to be added.
   */
  onConnect?: (newEdge: Edge<U>) => void;

  /**
   * Determines if the controls (zoom in, zoom out, lock canvas) are shown.
   * @default false
   */
  showControls?: boolean;

  /**
   * Determines if the minimap is shown.
   * @default false
   */
  showMinimap?: boolean;

  /**
   * Set background pattern for the workflow editor.
   * @default undefined
   */
  background?: "dots" | "lines" | "cross";

  /**
   * Callback for when a user clicks on a node.
   * @param node - The clicked node data.
   */
  onNodeClick?: (node: Node<T>) => void;

  /**
   * Callback for when a user double-clicks on a node.
   * @param node - The double-clicked node data.
   */
  onNodeDoubleCLick?: (node: Node<T>) => void;

  /**
   * Callback for when a user clicks on an edge.
   * @param edge - The clicked edge data.
   */
  onEdgeClick?: (edge: Edge<U>) => void;

  /**
   * Callback for when a user double-clicks on an edge.
   * @param edge - The double-clicked edge data.
   */
  onEdgeDoubleClick?: (edge: Edge<U>) => void;

  /**
   * Callback for rendering a custom label for a new node.
   * @param props - NodeProps for the node label.
   * @param defaultRender - Default rendering function for the node label.
   * @returns JSX.Element or null.
   */
  onRenderNewNodeLabel?: (
    props?: NodeProps<ITextFieldNodeData>,
    defaultRender?: (props?: NodeProps<ITextFieldNodeData>) => JSX.Element | null
  ) => JSX.Element | null;

  /**
   * If true, component will render the import button
   */
  importEnabled?: boolean,

  /**
   * If true, component will render the export button
   */
  exportEnabled?: boolean,

  /**
* Represents a set of labels for a specific operation.
*
* @interface OperationLabels
* @property {string} [addNode] - The label for adding a node.button
* @property {string} node - The label to replace node (used when creating a new node)
* @property {string} edge - The label to replace edge (used when creating a new edge)
*/
  labels?: {
    addNode?: string;
    node?: string;
    edge?: string;
  }
}


export interface IWorkflow {
  /**
   * Unique ID of the workflow
   */
  id: string

  /**
   * Name of the workflow
   */
  name: string
}

export interface ITextFieldNodeData {
  /**
   * Label that will show on the node
   */
  label: string

  /**
   * Callback for when user is saving node changes
   * @param id 
   * @param newName 
   * @returns 
   */
  onChange: (id: string, newName: string) => void

  onRender?: (
    props?: NodeProps<ITextFieldNodeData>,
    defaultRender?: (props?: NodeProps<ITextFieldNodeData>) => JSX.Element | null
  ) => JSX.Element | null
}

export interface IStartNodeData {
  label: string
}

export interface ICustomRenderNodeData {
  label: string
  onRender?: (
    props?: NodeProps<ICustomRenderNodeData>,
    defaultRender?: (props?: NodeProps<ICustomRenderNodeData>) => JSX.Element | null
  ) => JSX.Element | null
}