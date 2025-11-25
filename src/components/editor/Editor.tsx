import React, { useState } from "react";
import CodeBlock from '@theme/CodeBlock';

export function Editor(): JSX.Element {
  const [answer, setAnswer] = useState<string>("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Text Editor</h2>
      
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4 font-mono"
        placeholder="Write your text here..."
      />
      
      <hr className="border-gray-300 my-4" />

      {answer && (
        <CodeBlock language="json">
          {answer}
        </CodeBlock>
      )}
    </div>
  );
}

export default Editor;