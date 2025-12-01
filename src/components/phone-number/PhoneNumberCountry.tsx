import React, { JSX, useState } from "react";
import CodeBlock from '@theme/CodeBlock';
import { parsePhoneNumber } from "awesome-phonenumber";
import { Phone, Globe, Search, AlertCircle } from "lucide-react";
import countryCodesJSON from "./countries.json"

interface CountryCodes {
  [key: string]: {
    code: string;
    name: string;
  };
}

const countryCodes: CountryCodes = countryCodesJSON;

export function PhoneNumberCountry(): JSX.Element {
  const [countryCode, setCountryCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullPhoneNumber, setFullPhoneNumber] = useState<string>("");
  const [answer, setAnswer] = useState<string>("{}");
  const [error, setError] = useState<string>("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setError("");
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
    setError("");
  };

  const handleFullPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullPhoneNumber(e.target.value);
    setError("");
  };

  const handleButtonClick = () => {
    if ((countryCode && phoneNumber) && fullPhoneNumber) {
      setError("Please enter either a country code and phone number OR a full phone number, not both.");
      return;
    }

    if (!((countryCode && phoneNumber) || fullPhoneNumber)) {
      setError("Please enter a valid phone number with or without a country code.");
      return;
    }

    let formattedNumber = fullPhoneNumber ? fullPhoneNumber : `+${countryCode}${phoneNumber}`;
    try {
      const pn = parsePhoneNumber(formattedNumber);
      setAnswer(JSON.stringify(pn, undefined, 2));
      setError("");
    } catch (err) {
      setError("Invalid phone number format.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl overflow-hidden flex flex-col my-8">

        {/* Header */}
        <div className="bg-indigo-600 p-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Phone className="w-24 h-24 text-white" />
          </div>
          <div className="flex justify-center mb-2">
            <Phone className="text-indigo-200 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold !text-white text-center">Phone Number Details</h2>
          <p className="!text-indigo-200 text-center text-sm mt-1">
            Parse and validate phone numbers
          </p>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full overflow-hidden">
          <div className="shrink-0 space-y-4">

            {/* Country Code Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Country Code
              </label>
              <div className="relative">
                <select
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all cursor-pointer text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!!fullPhoneNumber}
                >
                  <option value="">Select country code</option>
                  {Object.entries(countryCodes).map(([key, value]) => (
                    <option key={key} value={value.code}>
                      {value.name} (+{value.code})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!!fullPhoneNumber}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-sm font-medium text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Full Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Phone Number
              </label>
              <input
                type="text"
                value={fullPhoneNumber}
                onChange={handleFullPhoneNumberChange}
                placeholder="Enter full phone number (e.g. +1234567890)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!!phoneNumber || !!countryCode}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleButtonClick}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Search className="w-4 h-4" />
              Get Phone Number Details
            </button>
          </div>

          <hr className="border-gray-200 my-6 shrink-0" />

          {/* Results */}
          <div className="pb-2">
            {answer && answer !== "{}" ? (
              <div className="animate-fade-in">
                <CodeBlock language="json">
                  {answer}
                </CodeBlock>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 py-12">
                <div className="bg-gray-50 p-4 rounded-full mb-3">
                  <Phone className="h-8 w-8 opacity-20" />
                </div>
                <p className="font-medium">Ready to parse</p>
                <p className="text-xs mt-1 text-gray-400">Enter a phone number to get details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneNumberCountry;