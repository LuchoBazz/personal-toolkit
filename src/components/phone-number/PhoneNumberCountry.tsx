import React, { useState } from "react";
import CodeBlock from '@theme/CodeBlock';
import { parsePhoneNumber } from "awesome-phonenumber";
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Phone Number Details</h2>
      
      <select
        value={countryCode}
        onChange={handleCountryCodeChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={!!fullPhoneNumber}
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
        disabled={!!fullPhoneNumber}
      />

      <h4 className="text-xl font-semibold mb-4">Or</h4>

      <input
        type="text"
        value={fullPhoneNumber}
        onChange={handleFullPhoneNumberChange}
        placeholder="Enter full phone number (e.g. +1234567890)"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={!!phoneNumber || !!countryCode}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleButtonClick}
        className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Get Phone Number Details
      </button>

      <hr className="border-gray-300 my-4" />

      {answer && (
        <CodeBlock language="json">
          {answer}
        </CodeBlock>
      )}
    </div>
  );
}

export default PhoneNumberCountry;