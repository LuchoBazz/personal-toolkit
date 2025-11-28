import React, { useState } from "react";
import { Copy, Check, RefreshCw, Phone, Globe } from "lucide-react";

/**
 * NOTE FOR DEVELOPER:
 * In a real project, you must install the library by running:
 * npm install phone-number-generator-js
 * * And then uncomment the following line:
 * import PhoneNumberGenerator from 'phone-number-generator-js';
 */

// --- START OF MOCK (LIBRARY SIMULATION) ---
// This ensures the preview works without installing external dependencies.
const PhoneNumberGenerator = {
  generate: (countryCode: string) => {
    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const digits = (n: number) => Array.from({ length: n }, () => random(0, 9)).join('');

    switch (countryCode) {
      case 'ES': // Spain
        return `+34 ${random(6, 7)}${digits(2)} ${digits(3)} ${digits(3)}`;
      case 'MX': // Mexico
        return `+52 55 ${digits(4)} ${digits(4)}`;
      case 'US': // United States
        return `+1 (${random(200, 999)}) ${random(200, 999)}-${digits(4)}`;
      case 'AR': // Argentina
        return `+54 9 11 ${digits(4)}-${digits(4)}`;
      case 'CO': // Colombia
        return `+57 3${random(0, 2)}${digits(1)} ${digits(3)} ${digits(4)}`;
      case 'BR': // Brazil
        return `+55 11 9${digits(4)}-${digits(4)}`;
      case 'UK': // United Kingdom
        return `+44 7${digits(3)} ${digits(6)}`;
      case 'FR': // France
        return `+33 ${random(6, 7)} ${digits(2)} ${digits(2)} ${digits(2)} ${digits(2)}`;
      case 'DE': // Germany
        return `+49 1${random(5, 7)}${digits(1)} ${digits(7)}`;
      default:
        return `+00 ${digits(10)}`;
    }
  }
};
// --- END OF MOCK ---

const COUNTRIES = [
  { code: "ES", name: "Spain", icon: "🇪🇸" },
  { code: "MX", name: "Mexico", icon: "🇲🇽" },
  { code: "US", name: "United States", icon: "🇺🇸" },
  { code: "CO", name: "Colombia", icon: "🇨🇴" },
  { code: "AR", name: "Argentina", icon: "🇦🇷" },
  { code: "BR", name: "Brazil", icon: "🇧🇷" },
  { code: "UK", name: "United Kingdom", icon: "🇬🇧" },
  { code: "FR", name: "France", icon: "🇫🇷" },
  { code: "DE", name: "Germany", icon: "🇩🇪" },
];

export default function PhoneGenerator() {
  const [count, setCount] = useState<string>("5");
  const [selectedCountry, setSelectedCountry] = useState<string>("ES");
  const [phones, setPhones] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = () => {
    let validCount = parseInt(count, 10);
    if (isNaN(validCount) || validCount < 1) validCount = 1;
    if (validCount > 20) validCount = 20;
    setCount(validCount.toString());

    // Generate numbers using the library (or mock)
    const newPhones = Array.from({ length: validCount }, () =>
      PhoneNumberGenerator.generate(selectedCountry)
    );

    setPhones(newPhones);
  };

  const copyToClipboard = (text: string) => {
    // Use execCommand as safe fallback for iframes, or navigator if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => triggerCopyFeedback(text));
    } else {
      // Legacy fallback method
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        triggerCopyFeedback(text);
      } catch (err) {
        console.error('Error copying text', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const triggerCopyFeedback = (text: string) => {
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header - Reverted to Indigo to match reference code */}
        <div className="bg-indigo-600 p-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Phone className="w-24 h-24 text-white" />
          </div>
          <div className="flex justify-center mb-2 relative z-10">
            {/* Simple icon container matching reference style */}
            <Phone className="text-indigo-200 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center relative z-10">Phone Generator</h2>
          <p className="text-indigo-200 text-center text-sm mt-1 relative z-10">
            Generate valid numbers by country
          </p>
        </div>

        <div className="p-6 flex flex-col h-full overflow-hidden">
          {/* Controls Area */}
          <div className="shrink-0 space-y-4">

            {/* Country Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Country
              </label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all cursor-pointer text-gray-700"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.icon} {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Max 20)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="5"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <RefreshCw className="w-4 h-4" />
              Generate Numbers
            </button>
          </div>

          <hr className="border-gray-200 my-6 shrink-0" />

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto min-h-[150px] pr-1 custom-scrollbar">
            {phones.length > 0 ? (
              <div className="space-y-3 animate-fade-in pb-2">
                <div className="flex justify-between items-center px-1 mb-2">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Results ({phones.length})
                  </p>
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Click to copy</span>
                </div>

                {phones.map((phone, index) => (
                  <button
                    key={`${phone}-${index}`}
                    onClick={() => copyToClipboard(phone)}
                    className={`w-full group flex items-center justify-between p-3 rounded-lg border text-sm font-mono transition-all duration-200 ${copiedId === phone
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:shadow-sm hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg select-none">
                        {COUNTRIES.find(c => c.code === selectedCountry)?.icon}
                      </span>
                      <span className="truncate">{phone}</span>
                    </div>

                    <span className={`shrink-0 transition-transform duration-200 ${copiedId === phone ? 'scale-110' : 'group-hover:scale-110'
                      }`}>
                      {copiedId === phone ? (
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
                  <Phone className="h-8 w-8 opacity-20" />
                </div>
                <p className="font-medium">Ready to generate</p>
                <p className="text-xs mt-1 text-gray-400">Select a country and quantity</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
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