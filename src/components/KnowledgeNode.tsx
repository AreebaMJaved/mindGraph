import {
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";

import { Network } from "lucide-react";

import type { KnowledgeNode } from "../store/graphStore";

export default function KnowledgeNode({
  data,
  selected,
}: NodeProps<KnowledgeNode>) {
  return (
    <div
      className={`knowledge-node ${
        selected ? "selected" : ""
      }`}
    >
      {/* Connection coming INTO this node */}
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle target-handle"
      />

      <div
        className="node-accent"
        style={{
          background: data.color,
        }}
      />

      <div className="node-icon">
        <Network size={15} />
      </div>

      <div className="node-content">
        <div className="node-category">
          {data.category}
        </div>

        <div className="node-title">
          {data.title}
        </div>

        {data.description && (
          <div className="node-description">
            {data.description}
          </div>
        )}
      </div>

      {/* Connection going OUT of this node */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle source-handle"
      />
    </div>
  );
}