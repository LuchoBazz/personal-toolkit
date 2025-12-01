import React, { JSX, useState } from "react";
import { Copy, Check, RefreshCw, Hash } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export default function UUIDGenerator(): JSX.Element {
  const [count, setCount] = useState<string>("5");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = () => {
    let validCount = parseInt(count, 10);
    if (isNaN(validCount) || validCount < 1) validCount = 1;
    if (validCount > 20) validCount = 20;
    setCount(validCount.toString());

    const newUuids = Array.from({ length: validCount }, () => uuidv4());
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden flex flex-col max-h-[90vh]">

        <div className="bg-indigo-600 p-6 shrink-0 relative overflow-hidden">
          <div className="flex justify-center mb-2">
            <Hash className="text-indigo-200 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold !text-white text-center">UUID Generator</h2>
          <p className="!text-indigo-200 text-center text-sm mt-1">
            Generate secure v4 unique identifiers
          </p>
        </div>

        <div className="p-6 flex flex-col h-full overflow-hidden">
          {/* Input Area */}
          <div className="shrink-0">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many UUIDs? (1-20)
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all mb-4"
              placeholder="5"
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Generate UUIDs
            </button>
          </div>

          <hr className="border-gray-200 my-6 shrink-0" />

          {/* Results Area with Scroll */}
          <div className="flex-1 overflow-y-auto min-h-[200px] pr-1 custom-scrollbar">
            {uuids.length > 0 ? (
              <div className="space-y-3 animate-fade-in pb-2">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2 text-center">
                  Click to copy
                </p>
                {uuids.map((uuid) => (
                  <button
                    key={uuid}
                    onClick={() => copyToClipboard(uuid)}
                    className={`w-full group flex items-center justify-between p-3 rounded-lg border text-sm font-mono transition-all duration-200 ${copiedId === uuid
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:shadow-sm hover:bg-gray-50"
                      }`}
                  >
                    <span className="truncate mr-2">{uuid}</span>
                    <span className={`shrink-0 transition-transform duration-200 ${copiedId === uuid ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {copiedId === uuid ? (
                        <Check className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <div className="bg-gray-50 p-4 rounded-full mb-3">
                  <Hash className="h-8 w-8 opacity-20" />
                </div>
                <p>Ready to generate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styles for animation and scrollbar */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        /* Custom Scrollbar for the list area */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}