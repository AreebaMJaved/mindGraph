import {
  BookOpen,
  Layers3,
  Network,
  Settings,
  Sparkles,
} from "lucide-react";

import { useGraphStore } from "../store/graphStore";

interface Props {
  onSettings: () => void;
}

export default function Sidebar({ onSettings }: Props) {
  const nodes = useGraphStore((state) => state.nodes);

  const categories = Array.from(
    new Set(nodes.map((node) => node.data.category))
  );

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-section">
          <p className="sidebar-label">WORKSPACE</p>

          <div className="side-item active">
            <Network size={18} />
            <span>Knowledge graph</span>
          </div>

          <div className="side-item">
            <BookOpen size={18} />
            <span>Concepts</span>
            <strong>{nodes.length}</strong>
          </div>

          <div className="side-item">
            <Layers3 size={18} />
            <span>Categories</span>
            <strong>{categories.length}</strong>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">CATEGORIES</p>

          {categories.map((category) => (
            <div className="category-item" key={category}>
              <i />
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="insight-card">
          <Sparkles size={18} />

          <strong>Build your knowledge</strong>

          <p>
            Connect ideas together and create your own
            visual knowledge map.
          </p>
        </div>

        <button
          className="settings-button"
          onClick={onSettings}
        >
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
}