import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Settings } from "lucide-react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import KnowledgeCanvas from "./components/KnowledgeCanvas";
import NodeEditor from "./components/NodeEditor";

import { useGraphStore } from "./store/graphStore";

export default function App() {
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);

  const addNode = useGraphStore(
    (state) => state.addNode
  );

  const resetGraph = useGraphStore(
    (state) => state.resetGraph
  );

  const createNode = () => {
    const id = `concept-${Date.now()}`;

    addNode({
      id,
      type: "knowledge",

      position: {
        x: 400,
        y: 250,
      },

      data: {
        title: "New Concept",
        description:
          "Click this concept to edit its information.",
        category: "General",
        color: "#9b82f5",
      },
    });

    useGraphStore
      .getState()
      .setSelectedNode(id);

    setShowAdd(false);
  };

  const stats = useMemo(
    () => ({
      concepts: nodes.length,
      connections: edges.length,
    }),
    [nodes, edges]
  );

  return (
    <div className={dark ? "app dark" : "app"}>
      <Header
        dark={dark}
        setDark={setDark}
        search={search}
        setSearch={setSearch}
        onAdd={() => setShowAdd(true)}
        onReset={resetGraph}
      />

      <div className="layout">
        <Sidebar
          onSettings={() => setShowSettings(true)}
        />

        <main className="main">
          <div className="page-heading">
            <div>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                YOUR KNOWLEDGE SPACE
              </motion.p>

              <h2>Explore your ideas</h2>
            </div>

            <div className="stats">
              <div>
                <strong>{stats.concepts}</strong>
                <span>Concepts</span>
              </div>

              <div>
                <strong>{stats.connections}</strong>
                <span>Connections</span>
              </div>
            </div>
          </div>

          <KnowledgeCanvas search={search} />
        </main>
      </div>

      <NodeEditor />

      {showAdd && (
        <div
          className="modal-backdrop"
          onClick={() => setShowAdd(false)}
        >
          <motion.div
            className="add-modal"
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setShowAdd(false)
              }
            >
              <X size={18} />
            </button>

            <div className="modal-icon">
              <Plus size={21} />
            </div>

            <h2>Create a new concept</h2>

            <p>
              Add a new idea to your knowledge graph.
              You can edit its title, category and
              description afterward.
            </p>

            <button
              className="create-button"
              onClick={createNode}
            >
              Create concept
            </button>
          </motion.div>
        </div>
      )}

      {showSettings && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setShowSettings(false)
          }
        >
          <motion.div
            className="settings-modal"
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setShowSettings(false)
              }
            >
              <X size={18} />
            </button>

            <Settings
              size={23}
              className="settings-title-icon"
            />

            <h2>MindGraph settings</h2>

            <div className="setting-row">
              <div>
                <strong>Appearance</strong>
                <span>
                  Change application theme
                </span>
              </div>

              <button
                className="small-action"
                onClick={() =>
                  setDark(!dark)
                }
              >
                {dark ? "Dark" : "Light"}
              </button>
            </div>

            <div className="setting-row">
              <div>
                <strong>Saved locally</strong>
                <span>
                  Your graph is stored in your browser.
                </span>
              </div>

              <span className="status">
                Active
              </span>
            </div>

            <div className="setting-row">
              <div>
                <strong>Reset workspace</strong>
                <span>
                  Restore the demo knowledge graph.
                </span>
              </div>

              <button
                className="danger-small"
                onClick={() => {
                  resetGraph();
                  setShowSettings(false);
                }}
              >
                Reset
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}