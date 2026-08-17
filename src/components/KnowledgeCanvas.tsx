import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import KnowledgeNode from "./KnowledgeNode";
import {
  useGraphStore,
  type KnowledgeNode as KnowledgeNodeType,
} from "../store/graphStore";

interface Props {
  search: string;
}

const nodeTypes = {
  knowledge: KnowledgeNode,
};

export default function KnowledgeCanvas({ search }: Props) {
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);

  const setNodes = useGraphStore((state) => state.setNodes);
  const setEdges = useGraphStore((state) => state.setEdges);
  const setSelectedNode = useGraphStore(
    (state) => state.setSelectedNode
  );

  const query = search.trim().toLowerCase();

  /*
   * Search only changes the visual opacity.
   * The actual node data remains untouched.
   */
  const visibleNodes = nodes.map((node) => {
    const matches =
      !query ||
      node.data.title.toLowerCase().includes(query) ||
      node.data.description.toLowerCase().includes(query) ||
      node.data.category.toLowerCase().includes(query);

    return {
      ...node,
      style: {
        ...node.style,
        opacity: matches ? 1 : 0.18,
        transition: "opacity 180ms ease",
      },
    };
  });

  /*
   * React Flow sends position/selection/drag changes here.
   */
  const onNodesChange = (
    changes: NodeChange<KnowledgeNodeType>[]
  ) => {
    setNodes((currentNodes) =>
      applyNodeChanges(changes, currentNodes)
    );
  };

  /*
   * Edge deletion / selection changes.
   */
  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges((currentEdges) =>
      applyEdgeChanges(changes, currentEdges)
    );
  };

  /*
   * Create a connection by dragging
   * from one node handle to another.
   */
  const onConnect = (connection: Connection) => {
    setEdges((currentEdges) =>
      addEdge(
        {
          ...connection,
          id: `${connection.source}-${connection.target}-${Date.now()}`,
          animated: true,
          type: "smoothstep",
        },
        currentEdges
      )
    );
  };

  return (
    <div className="canvas-wrapper">
      <ReactFlow
        nodes={visibleNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => {
          setSelectedNode(node.id);
        }}
        onPaneClick={() => {
          setSelectedNode(null);
        }}
        fitView
        fitViewOptions={{
          padding: 0.25,
          minZoom: 0.35,
          maxZoom: 1.2,
        }}
        minZoom={0.2}
        maxZoom={2}
        nodesDraggable
        nodesConnectable
        elementsSelectable
        panOnDrag
        panOnScroll={false}
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        preventScrolling={true}
        onlyRenderVisibleElements
        proOptions={{
          hideAttribution: false,
        }}
      >
        <Background
          gap={22}
          size={1}
          color="rgba(140, 140, 160, 0.15)"
        />

        <Controls
          showInteractive
          position="bottom-left"
        />

        <MiniMap
          pannable
          zoomable
          position="bottom-right"
          nodeColor={(node) =>
            String(node.data?.color || "#8067e9")
          }
        />
      </ReactFlow>

      <div className="canvas-help">
        <span>Drag</span> nodes
        <b>•</b>
        <span>Connect</span> concepts
        <b>•</b>
        <span>Scroll</span> to zoom
        <b>•</b>
        <span>Click</span> to edit
      </div>
    </div>
  );
}