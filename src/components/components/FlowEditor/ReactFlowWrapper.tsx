import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Position,
  NodeTypes,
  addEdge,
  Connection,
  useReactFlow,
  Node,
  Edge,
  EdgeTypes,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MarkerType,
  useStoreApi,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
} from "reactflow";
import {
  IFlowEditorProps,
  EdgeTypeEnum,
  ITextFieldNodeData,
  NodeTypeEnum,
} from "./utils/Interfaces";
import { BaseButton, Button, useTheme } from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

import TextFieldNode from "./CustomNodes/TextFieldNode";
import LabeledEdge from "./LabeledEdge";
import ActionButtons from "./ActionButtons";

import "reactflow/dist/style.css";
import StartNode from "./CustomNodes/StartNode";
import EndNode from "./CustomNodes/EndNode";
import CustomRenderNode from "./CustomNodes/CustomRenderNode";

const nodeTypes: NodeTypes = {
  textFieldNode: TextFieldNode,
  startNode: StartNode,
  endNode: EndNode,
  customRenderNode: CustomRenderNode,
};

const edgeTypes: EdgeTypes = {
  labeledEdge: LabeledEdge,
};

const ReactFlowWrapper: React.FunctionComponent<
  IFlowEditorProps<object, string>
> = (props: IFlowEditorProps) => {
  const theme = useTheme();

  const reactFlow = useReactFlow();
  const storeApi = useStoreApi();

  const [nodes, setNodes] = useNodesState(props.defaultNodes || []);
  const [edges, setEdges] = useEdgesState(props.defaultEdges || []);

  const styles = mergeStyleSets({
    wrapper: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    actionWrapper: {
      position: "absolute",
      zIndex: 1,
      top: 10,
      left: 10,
    },
    startNode: {
      borderRadius: "20px !important",
      width: "100px !important",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    endNode: {
      borderRadius: "20px !important",
      width: "100px !important",
      display: "flex",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  // ================
  // Shared Functions
  // ================
  const handleNodeChange = (id: string, newName: string) => {
    if (!!!props.nodes) {
      let updatedNodes: Node[] = nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newName } }
          : node,
      );
      setNodes(updatedNodes);
      props.onNodesChange?.(updatedNodes, []);
    } else {
      props.onNodesChange?.(
        props.nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: newName } }
            : node,
        ),
        [],
      );
    }
  };

  const handleJsonUpload = async (event: any) => {
    const file: File = event.target.files[0];

    if (file.type !== "application/json") {
      window.alert("File not json");
      return;
    }

    const workflowBuffer = await file.arrayBuffer();
    const workflowUint8Array = new Uint8Array(workflowBuffer);
    const workflowJSONString = new TextDecoder().decode(workflowUint8Array);
    const workflow: { nodes: Node[]; edges: Edge[] } =
      JSON.parse(workflowJSONString);

    if (!!!props.nodes) {
      setNodes(workflow.nodes);
    }
    props.onNodesChange?.(workflow.nodes, []);

    if (!!!props.edges) {
      setEdges(workflow.edges);
    }
    props.onEdgesChange?.(workflow.edges, []);

    setTimeout(() => reactFlow.fitView({ nodes: workflow.nodes }), 0);
  };

  const createNode = (label: string): Node<ITextFieldNodeData> => {
    const { width, height } = storeApi.getState();
    const { x: viewportX, y: viewportY, zoom } = reactFlow.getViewport();

    return {
      id: crypto.randomUUID(),
      type: "textFieldNode",
      position: {
        x: (width / 2 - viewportX) / zoom - 175 / 2,
        y: (height / 2 - viewportY) / zoom - 40 / 2,
      },
      data: {
        label: label,
        onChange: handleNodeChange,
        onRender: props.onRenderNewNodeLabel,
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    };
  };

  const createEdge = (nodeConnection: Connection): Edge => {
    let src = props.nodes || nodes || [];

    const sourceNode = src.find((node) => node.id === nodeConnection.source);
    const targetNode = src.find((node) => node.id === nodeConnection.target);

    const newEdge: Edge = {
      id: crypto.randomUUID(),
      type: EdgeTypeEnum.LABELED,
      label: `${sourceNode?.data?.label} - ${targetNode?.data?.label} ${
        props.labels?.edge || "Edge"
      }`,
      source: nodeConnection.source || "",
      sourceHandle: nodeConnection.sourceHandle,
      target: nodeConnection.target || "",
      targetHandle: nodeConnection.targetHandle,
      markerEnd: { type: MarkerType.ArrowClosed },
      data: { isEditing: false },
    };

    return newEdge;
  };

  const mapNodes = (nodes: Node[]): Node[] => {
    let result: Node[] = [];
    if (nodes?.length > 0) {
      result = nodes.map((node: Node) => {
        return {
          ...node,
          data: {
            ...node.data,
            onChange: handleNodeChange,
            onRender: props.onRenderNewNodeLabel,
          },
        };
      });
    }
    return result;
  };

  // =================
  // Handler Functions
  // =================
  const handleUploadClick = (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement,
      MouseEvent
    >,
  ) => {
    const fileInput = document.createElement("input");

    fileInput.type = "file";
    fileInput.onchange = handleJsonUpload;
    fileInput.click();
  };

  const handleAddClick = (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement,
      MouseEvent
    >,
  ) => {
    let newNode: Node = createNode(`New ${props.labels?.node || "Node"}`);

    if (!!!props.nodes) {
      setNodes([...nodes, newNode]);
    }
    props.onAddClick?.(newNode);
  };

  const handleConnect = (nodeConnection: Connection) => {
    let newEdge: Edge = createEdge(nodeConnection);

    if (!!!props.edges) {
      setEdges([...edges, newEdge]);
    }
    props.onConnect?.(newEdge);
  };

  const handleNodeClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node,
  ) => {
    props.onNodeClick?.(node);
  };

  const handleNodeDoubleClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node,
  ) => {
    props.onNodeDoubleCLick?.(node);
  };

  const handleEdgeClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    edge: Edge,
  ) => {
    props.onEdgeClick?.(edge);
  };

  const handleEdgeDoubleClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    edge: Edge,
  ) => {
    if (edge.type === EdgeTypeEnum.LABELED) {
      const activeEdge: Edge = {
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed },
        data: { isEditing: true },
      };

      if (!!!props.edges) {
        setEdges((previous) =>
          previous.map((previousEdge) =>
            edge.id === previousEdge.id ? activeEdge : previousEdge,
          ),
        );
      } else {
        props.onEdgesChange?.(
          props.edges.map((previousEdge) =>
            edge.id === previousEdge.id ? activeEdge : previousEdge,
          ),
          [],
        );
      }
    }

    props.onEdgeDoubleClick?.(edge);
  };

  // const handleEdgesDelete = (deletedEdges: Edge[]) => {
  //   const updatedEdges: Edge[] = edges.filter(edge => !!!deletedEdges.some(deletedEdge => deletedEdge.id === edge.id));
  // }

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (changes.some((change) => change.type === "dimensions")) {
        return;
      }

      if (!!!props.nodes) {
        let updatedNodes: Node[] = applyNodeChanges(changes, nodes);
        setNodes(updatedNodes);
        // props.onNodesChange?.(updatedNodes, changes);
        props.onNodesChange?.(updatedNodes, changes);
      } else {
        // props.onNodesChange?.(applyNodeChanges(changes, props.nodes), changes);
        props.onNodesChange?.(applyNodeChanges(changes, props.nodes), changes);
      }
    },
    [props.onNodesChange, props.nodes, nodes],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]): void => {
      if (!!!props.edges) {
        let updatedEdges: Edge[] = applyEdgeChanges(changes, edges);
        setEdges(updatedEdges);
        props.onEdgesChange && props.onEdgesChange(updatedEdges, changes);
      } else {
        props.onEdgesChange &&
          props.onEdgesChange(applyEdgeChanges(changes, props.edges), changes);
      }
    },
    [props.onEdgesChange, props.edges, edges],
  );

  const memoizedNodes = useMemo(() => {
    if (props.nodes && props.nodes?.length > 0) {
      if (props.nodes.some((node) => !!!node.data.onChange))
        return mapNodes(props.nodes);
      else return props.nodes;
    }

    if (nodes.length > 0) {
      if (nodes.some((node) => !!!node.data.onChange)) return mapNodes(nodes);
      else return nodes;
    }
    return [];
  }, [props.nodes, nodes]);

  const memoizedEdges = useMemo(() => {
    return props.edges || edges || [];
  }, [props.edges, edges]);

  // useEffect(() => {
  //   if (props.nodes?.length > 0) {
  //     if (props.nodes.some((node) => !!!node.data.onChange))
  //       setNodes(mapNodes(props.nodes));
  //     else
  //       setNodes(props.nodes);
  //   }
  // }, [props.nodes]);

  // useEffect(() => {
  //   setEdges(props.edges);
  // }, [props.edges]);

  // useEffect(() => console.log('rerender'));

  return (
    <>
      <div className={styles.wrapper}>
        <ActionButtons
          addNodeLabel={props.labels?.addNode || "Add Node"}
          onAddClick={handleAddClick}
          onUploadClick={handleUploadClick}
          importEnabled={props.importEnabled}
          exportEnabled={props.exportEnabled}
        />

        <ReactFlow
          fitView
          nodes={memoizedNodes}
          edges={memoizedEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onConnect={handleConnect}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onNodeClick={handleNodeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeClick={handleEdgeClick}
          onEdgeDoubleClick={handleEdgeDoubleClick}
        >
          {props.showControls && <Controls />}
          {props.showMinimap && <MiniMap />}
          {props.background && (
            <Background variant={props.background as BackgroundVariant} />
          )}
        </ReactFlow>
      </div>
    </>
  );
};

export default ReactFlowWrapper;
