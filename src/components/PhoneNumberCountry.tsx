import React, { useState } from "react";
import { parsePhoneNumber } from "awesome-phonenumber";

interface CountryCodes {
  [key: string]: {
    code: string;
    name: string;
  };
}

const countryCodes: CountryCodes = {
  "US": { code: "1", name: "United States" },
  "ES": { code: "34", name: "Spain" },
  "BR": { code: "55", name: "Brazil" },
  "CO": { code: "57", name: "Colombia" },
  "UK": { code: "44", name: "United Kingdom" },
  "IN": { code: "91", name: "India" },
  "MT": { code: "356", name: "Malta" },
};

export function PhoneNumberCountry(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [answer, setAnswer] = useState<string>("{}");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const handleButtonClick = () => {
    if (!countryCode || !phoneNumber) {
      setAnswer("Please enter both country code and phone number.");
      return;
    }
    
    const pn = parsePhoneNumber("+" + countryCode + phoneNumber);
    setAnswer(JSON.stringify(pn, undefined, 2));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Enter Phone Number</h2>
      
      <select
        value={countryCode}
        onChange={handleCountryCodeChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select country code</option>
        {Object.entries(countryCodes).map(([key, value]) => (
          <option key={key} value={value.code}>
            {value.name} (+{value.code})
          </option>
        ))}
      </select>

      <input
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter phone number"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={handleButtonClick}
        className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Get Country
      </button>

      {answer && (
        <pre className="mt-4 p-4 bg-gray-100 text-sm text-gray-700 rounded-md">
          <code>{answer}</code>
        </pre>
      )}
    </div>
  );
}

export default PhoneNumberCountry;
