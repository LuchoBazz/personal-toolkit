import React, { useState, useMemo } from "react";
import { Copy, Check, RefreshCw, Phone, Globe } from "lucide-react";
import { generatePhoneNumber } from 'phone-number-generator-js';
import { countryPhoneDataArray as countryPhoneData } from 'phone-number-generator-js/dist/esm/countryPhoneData';
import { parsePhoneNumber } from 'awesome-phonenumber';

// Helper to convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Map library data to our format and sort by name
const COUNTRIES = countryPhoneData.map(country => ({
  code: country.alpha2,
  name: country.country_name,
  icon: getFlagEmoji(country.alpha2)
})).sort((a, b) => a.name.localeCompare(b.name));

export default function PhoneGenerator() {
  const [selectedCountry, setSelectedCountry] = useState("ES");
  const [count, setCount] = useState("5");
  const [phones, setPhones] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = () => {
    let validCount = parseInt(count);
    if (isNaN(validCount) || validCount < 1) validCount = 1;
    if (validCount > 20) validCount = 20;
    setCount(validCount.toString());

    const countryInfo = COUNTRIES.find(c => c.code === selectedCountry);
    const countryName = countryInfo ? countryInfo.name : "Spain";

    const newPhones = Array.from({ length: validCount }, () => {
      const generated = generatePhoneNumber({ countryName });
      const parsed = parsePhoneNumber(generated);
      return parsed.valid ? parsed.number.international : generated;
    });
    setPhones(newPhones);
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => triggerCopyFeedback(text));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        triggerCopyFeedback(text);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
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

        <div className="bg-indigo-600 p-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Phone className="w-24 h-24 text-white" />
          </div>
          <div className="flex justify-center mb-2">
            <Phone className="text-indigo-200 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold !text-white text-center">Phone Generator</h2>
          <p className="!text-indigo-200 text-center text-sm mt-1">
            Generate valid numbers by country
          </p>
        </div>

        <div className="p-6 flex flex-col h-full overflow-hidden">
          <div className="shrink-0 space-y-4">
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
                      {country.name} {country.icon} ({country.code})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

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

            <button
              onClick={handleGenerate}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <RefreshCw className="w-4 h-4" />
              Generate Numbers
            </button>
          </div>

          <hr className="border-gray-200 my-6 shrink-0" />

          <div className="flex-1 overflow-y-auto min-h-[150px] pr-1 custom-scrollbar">
            {phones.length > 0 ? (
              <div className="space-y-3 animate-fade-in pb-2">
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
    </div>
  );
}