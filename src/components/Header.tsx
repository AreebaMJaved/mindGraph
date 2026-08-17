import { motion } from "framer-motion";
import {
  Brain,
  Moon,
  Search,
  Sun,
  Plus,
  RotateCcw,
} from "lucide-react";

interface HeaderProps {
  dark: boolean;
  setDark: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
  onReset: () => void;
}

export default function Header({
  dark,
  setDark,
  search,
  setSearch,
  onAdd,
  onReset,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">
        <motion.div
          className="brand-mark"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Brain size={23} />
        </motion.div>

        <div>
          <h1>MindGraph</h1>
          <span>Knowledge made visual</span>
        </div>
      </div>

      <div className="header-actions">
        <div className="search">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge..."
          />
          <kbd>⌘ K</kbd>
        </div>

        <button className="icon-button" onClick={onReset} title="Reset graph">
          <RotateCcw size={18} />
        </button>

        <button className="icon-button" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="add-button" onClick={onAdd}>
          <Plus size={18} />
          New concept
        </button>
      </div>
    </header>
  );
}