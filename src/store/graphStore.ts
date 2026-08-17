import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Edge, Node } from "@xyflow/react";

export type KnowledgeData = {
  title: string;
  description: string;
  category: string;
  color: string;
};

export type KnowledgeNode = Node<KnowledgeData>;

type NodesUpdater =
  | KnowledgeNode[]
  | ((nodes: KnowledgeNode[]) => KnowledgeNode[]);

type EdgesUpdater =
  | Edge[]
  | ((edges: Edge[]) => Edge[]);

interface GraphState {
  nodes: KnowledgeNode[];
  edges: Edge[];
  selectedNode: string | null;

  addNode: (node: KnowledgeNode) => void;

  updateNode: (
    id: string,
    data: Partial<KnowledgeData>
  ) => void;

  deleteNode: (id: string) => void;

  setSelectedNode: (id: string | null) => void;

  setNodes: (nodes: NodesUpdater) => void;
  setEdges: (edges: EdgesUpdater) => void;

  resetGraph: () => void;
}

const initialNodes: KnowledgeNode[] = [
  {
    id: "react",
    type: "knowledge",
    position: {
      x: 450,
      y: 100,
    },
    data: {
      title: "React",
      description:
        "Library for building interactive user interfaces.",
      category: "Frontend",
      color: "#61dafb",
    },
  },

  {
    id: "components",
    type: "knowledge",
    position: {
      x: 150,
      y: 350,
    },
    data: {
      title: "Components",
      description:
        "Reusable building blocks of React applications.",
      category: "React",
      color: "#a78bfa",
    },
  },

  {
    id: "hooks",
    type: "knowledge",
    position: {
      x: 650,
      y: 350,
    },
    data: {
      title: "Hooks",
      description:
        "Functions that let components use React features.",
      category: "React",
      color: "#34d399",
    },
  },

  {
    id: "useeffect",
    type: "knowledge",
    position: {
      x: 850,
      y: 600,
    },
    data: {
      title: "useEffect",
      description:
        "Synchronize components with external systems.",
      category: "Hooks",
      color: "#fbbf24",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "react-components",
    source: "react",
    target: "components",
    animated: true,
    type: "smoothstep",
  },

  {
    id: "react-hooks",
    source: "react",
    target: "hooks",
    animated: true,
    type: "smoothstep",
  },

  {
    id: "hooks-effect",
    source: "hooks",
    target: "useeffect",
    animated: true,
    type: "smoothstep",
  },
];

export const useGraphStore = create<GraphState>()(
  persist(
    (set) => ({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,

      /*
       * Add a new concept.
       */
      addNode: (node) =>
        set((state) => ({
          nodes: [...state.nodes, node],
        })),

      /*
       * Update title/category/description/color.
       */
      updateNode: (id, data) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    ...data,
                  },
                }
              : node
          ),
        })),

      /*
       * Delete node AND all connections
       * attached to that node.
       */
      deleteNode: (id) =>
        set((state) => ({
          nodes: state.nodes.filter(
            (node) => node.id !== id
          ),

          edges: state.edges.filter(
            (edge) =>
              edge.source !== id &&
              edge.target !== id
          ),

          selectedNode: null,
        })),

      /*
       * Select a node for editing.
       */
      setSelectedNode: (id) =>
        set({
          selectedNode: id,
        }),

      /*
       * Supports both:
       * setNodes(newNodes)
       *
       * and:
       * setNodes(current => updatedNodes)
       *
       * The second form is important for React Flow dragging.
       */
      setNodes: (nodes) =>
        set((state) => ({
          nodes:
            typeof nodes === "function"
              ? nodes(state.nodes)
              : nodes,
        })),

      /*
       * Same pattern for edges.
       */
      setEdges: (edges) =>
        set((state) => ({
          edges:
            typeof edges === "function"
              ? edges(state.edges)
              : edges,
        })),

      /*
       * Restore demo graph.
       */
      resetGraph: () =>
        set({
          nodes: initialNodes,
          edges: initialEdges,
          selectedNode: null,
        }),
    }),

    {
      name: "mindgraph-storage",
    }
  )
);