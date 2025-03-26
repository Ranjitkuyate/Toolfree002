import React from "react";

const RobotsTxtGenerator: React.FC = () => {
  return (
    <div>
      <h2>Robots.txt Generator</h2>
      <p>The `robots.txt` file tells search engines &quot;what to index&quot; and &quot;what to avoid&quot;.</p>
      <p>Use `User-agent: *` to allow all search bots.</p>
      <p>Disallow private URLs like &quot;/admin&quot; or &quot;/dashboard&quot; for security.</p>
    </div>
  );
};

export default RobotsTxtGenerator;
