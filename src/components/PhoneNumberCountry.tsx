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
  "IN": { code: "91", name: "India" }
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
    <div>
      <h2>Enter Phone Number</h2>
      <select value={countryCode} onChange={handleCountryCodeChange}>
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
      />
      <button onClick={handleButtonClick}>Get Country</button>
      {answer && <pre><code>{answer}</code></pre>}
    </div>
  );
}

export default PhoneNumberCountry;
