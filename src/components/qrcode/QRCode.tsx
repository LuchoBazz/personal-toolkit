import React, { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCode(): JSX.Element {
  const [url, setUrl] = useState<string>("");
  const [qrValue, setQrValue] = useState<string>("");

  const handleGenerate = () => {
    if (url.trim() !== "") {
      setQrValue(url);
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "my-qr-code.png";
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">QR Generator</h2>
          <p className="text-indigo-200 text-center text-sm mt-1">Convert your links into QR codes</p>
        </div>

        <div className="p-6">
          {/* URL Input */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your URL or text
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all mb-4"
            placeholder="https://example.com"
          />

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!url}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
              url 
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-md" 
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Generate QR
          </button>
          
          <hr className="border-gray-200 my-6" />

          {/* Preview Area */}
          <div className="flex flex-col items-center justify-center min-h-[220px]">
            {qrValue ? (
              <div className="flex flex-col items-center animate-fade-in">
                <div className="p-4 bg-white border-2 border-indigo-100 rounded-xl shadow-sm">
                  {/* qrcode.react component 
                     Make sure to install: npm install qrcode.react
                  */}
                  <QRCodeCanvas
                    id="qr-gen"
                    value={qrValue}
                    size={200}
                    level={"H"}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    includeMargin={true}
                  />
                </div>
                
                <p className="mt-4 text-sm text-gray-500 break-all text-center px-4 max-w-xs">
                  {qrValue}
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
              <div className="text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 6h6v6H6V6zm12 0h6v6h-6V6zm0 12h6v6h-6v-6zM6 18h6v6H6v-6z" />
                </svg>
                <p>The QR code will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Simple fade-in animation */}
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
