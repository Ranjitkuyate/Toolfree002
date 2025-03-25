import React from 'react';
import Link from 'next/link';
import { Tool } from '@/utils/tools';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link href={tool.url} className="tool-card">
      <div className="tool-card-inner">
        <div className="tool-icon">
          <i className={tool.icon}></i>
        </div>
        <div className="tool-info">
          <h3 className="tool-name">{tool.name}</h3>
          <p className="tool-description">{tool.description}</p>
        </div>
        {tool.isNew && <span className="new-badge">NEW</span>}
      </div>
    </Link>
  );
};

export default ToolCard;
