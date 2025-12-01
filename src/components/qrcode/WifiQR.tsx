import React, { JSX, useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';

export default function WifiQR(): JSX.Element {
  // State variables for Wi-Fi configuration
  const [ssid, setSsid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [encryption, setEncryption] = useState<string>("WPA");
  const [isHidden, setIsHidden] = useState<string>("false");
  const [qrValue, setQrValue] = useState<string>("");

  // Function to construct the Wi-Fi connection string
  // Format: WIFI:T:WPA;S:mynetwork;P:mypass;;
  const handleGenerate = () => {
    if (ssid.trim() !== "") {
      // Logic for "None" encryption (no password required)
      const passString = encryption === "nopass" ? "" : `P:${password};`;
      const wifiString = `WIFI:T:${encryption};S:${ssid};${passString}H:${isHidden};;`;
      setQrValue(wifiString);
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `wifi-qr-${ssid}.png`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">

        {/* Header Section */}
        <div className="bg-indigo-600 p-6 p-6 shrink-0 relative overflow-hidden">
          <h2 className="text-2xl font-bold !text-white text-center">Wi-Fi QR Generator</h2>
          <p className="!text-indigo-200 text-center text-sm mt-1">
            Create a code to share your internet connection instantly.
          </p>
        </div>

        <div className="p-6 space-y-4">

          {/* 1. Network Name (SSID) Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Network Name (SSID)
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              The exact name of your Wi-Fi network as it appears on devices.
            </p>
            <input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="e.g., MyHomeNetwork"
            />
          </div>

          {/* 2. Encryption Type Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Encryption Type
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              The security protocol used by your router. WPA/WPA2 is the most common.
            </p>
            <select
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (Open Network)</option>
            </select>
          </div>

          {/* 3. Password Input */}
          {encryption !== "nopass" && (
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                The key or password required to join the network.
              </p>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="Enter Wi-Fi password"
              />
            </div>
          )}

          {/* 4. Hidden Network Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Hidden Network
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Select 'Yes' if your router is configured not to broadcast the SSID.
            </p>
            <select
              value={isHidden}
              onChange={(e) => setIsHidden(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="false">No (Visible)</option>
              <option value="true">Yes (Hidden)</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!ssid}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors mt-4 ${ssid
              ? "bg-indigo-600 hover:bg-indigo-700 shadow-md"
              : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
              }`}
          >
            Generate Wi-Fi QR
          </button>

          <hr className="border-gray-200 dark:border-gray-700 my-6" />

          {/* Preview & Result Area */}
          <div className="flex flex-col items-center justify-center min-h-[220px]">
            {qrValue ? (
              <div className="flex flex-col items-center animate-fade-in w-full">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-indigo-100 dark:border-indigo-900 rounded-xl shadow-sm">
                  <QRCodeCanvas
                    id="qr-gen"
                    value={qrValue}
                    size={200}
                    level={"Q"}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    includeMargin={true}
                  />
                </div>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                  Scan to join: <strong>{ssid}</strong>
                </p>

                {/* Download Button */}
                <button
                  onClick={downloadQR}
                  className="mt-6 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-full transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PNG
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <p>Fill in the details to generate code</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}