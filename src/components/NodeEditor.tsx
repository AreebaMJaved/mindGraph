import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, Save } from "lucide-react";
import { useGraphStore } from "../store/graphStore";
import { useState, useEffect } from "react";

export default function NodeEditor() {
  const nodes = useGraphStore((state) => state.nodes);
  const selectedNode = useGraphStore((state) => state.selectedNode);
  const updateNode = useGraphStore((state) => state.updateNode);
  const deleteNode = useGraphStore((state) => state.deleteNode);
  const setSelectedNode = useGraphStore((state) => state.setSelectedNode);

  const node = nodes.find((item) => item.id === selectedNode);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (node) {
      setTitle(node.data.title);
      setDescription(node.data.description);
      setCategory(node.data.category);
    }
  }, [node]);

  return (
    <AnimatePresence>
      {node && (
        <motion.aside
          className="editor"
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 350, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div className="editor-header">
            <div>
              <small>CONCEPT</small>
              <h2>Edit concept</h2>
            </div>

            <button
              className="close-button"
              onClick={() => setSelectedNode(null)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="form">
            <label>
              Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              Category
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>

            <label>
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </label>

            <button
              className="save-button"
              onClick={() => {
                updateNode(node.id, {
                  title,
                  description,
                  category,
                });

                setSelectedNode(null);
              }}
            >
              <Save size={17} />
              Save changes
            </button>

            <button
              className="delete-button"
              onClick={() => deleteNode(node.id)}
            >
              <Trash2 size={17} />
              Delete concept
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}