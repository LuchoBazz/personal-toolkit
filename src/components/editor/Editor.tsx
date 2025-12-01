import React, { JSX, useState } from "react";
import CodeBlock from '@theme/CodeBlock';
import { FileText, Edit3 } from "lucide-react";

export function Editor(): JSX.Element {
  const [answer, setAnswer] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col my-8">

        {/* Header */}
        <div className="bg-indigo-600 p-6 p-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FileText className="w-24 h-24 text-white" />
          </div>
          <div className="flex justify-center mb-2">
            <FileText className="text-indigo-200 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold !text-white text-center">Text Editor</h2>
          <p className="!text-indigo-200 text-center text-sm mt-1">
            Write and preview your text
          </p>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full overflow-hidden">
          <div className="shrink-0 space-y-4">

            {/* Text Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Edit3 className="w-4 h-4" /> Your Text
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-mono resize-none"
                placeholder="Write your text here..."
              />
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700 my-6 shrink-0" />

          {/* Results */}
          <div className="pb-2">
            {answer && answer !== "" ? (
              <div className="animate-fade-in">
                <CodeBlock language="json">
                  {answer}
                </CodeBlock>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-12">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-full mb-3">
                  <FileText className="h-8 w-8 opacity-20" />
                </div>
                <p className="font-medium">Ready to write</p>
                <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">Start typing to see your text</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;