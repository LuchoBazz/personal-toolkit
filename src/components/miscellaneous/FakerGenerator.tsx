import React, { useState } from "react";
import { Copy, Check, RefreshCw, User, Mail, Camera, Briefcase, MapPin, Fingerprint, Database, Sparkles, ShoppingCart, Package, FileText, Tag, Box, ShoppingBag, Barcode, DollarSign, Smile, Globe, Server, Link, AtSign, Send, Hash, Activity, Wifi, Shield, Key, Lock, Network } from "lucide-react";
import { faker } from "@faker-js/faker";

// ----------------------------------------------------------------------
// GENERIC CONFIGURATION
// ----------------------------------------------------------------------
// To add a new option, simply add an object here.
// icon: The visual icon from Lucide.
// label: What the user sees in the select.
// generate: The faker function that will be executed.
// ----------------------------------------------------------------------

type DataTypeOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
  generate: () => string;
};

const DATA_TYPES: DataTypeOption[] = [
  {
    id: 'fullname',
    label: 'Full Name',
    icon: <User className="w-4 h-4" />,
    generate: faker.person.fullName
  },
  {
    id: 'email',
    label: 'Email Address',
    icon: <Mail className="w-4 h-4" />,
    generate: faker.internet.email
  },
  {
    id: 'avatar',
    label: 'Avatar URL',
    icon: <Camera className="w-4 h-4" />,
    generate: faker.image.avatar
  },
  {
    id: 'job',
    label: 'Job Title',
    icon: <Briefcase className="w-4 h-4" />,
    generate: faker.person.jobTitle
  },
  {
    id: 'uuid',
    label: 'UUID',
    icon: <Fingerprint className="w-4 h-4" />,
    generate: faker.string.uuid
  },
  {
    id: 'city',
    label: 'City',
    icon: <MapPin className="w-4 h-4" />,
    generate: faker.location.city
  },
  {
    id: 'department',
    label: 'Department',
    icon: <ShoppingCart className="w-4 h-4" />,
    generate: faker.commerce.department
  },
  {
    id: 'productName',
    label: 'Product Name',
    icon: <Package className="w-4 h-4" />,
    generate: faker.commerce.productName
  },
  {
    id: 'productDescription',
    label: 'Product Description',
    icon: <FileText className="w-4 h-4" />,
    generate: faker.commerce.productDescription
  },
  {
    id: 'productAdjective',
    label: 'Product Adjective',
    icon: <Tag className="w-4 h-4" />,
    generate: faker.commerce.productAdjective
  },
  {
    id: 'productMaterial',
    label: 'Product Material',
    icon: <Box className="w-4 h-4" />,
    generate: faker.commerce.productMaterial
  },
  {
    id: 'product',
    label: 'Product',
    icon: <ShoppingBag className="w-4 h-4" />,
    generate: faker.commerce.product
  },
  {
    id: 'isbn',
    label: 'ISBN',
    icon: <Barcode className="w-4 h-4" />,
    generate: faker.commerce.isbn
  },
  {
    id: 'price',
    label: 'Price',
    icon: <DollarSign className="w-4 h-4" />,
    generate: faker.commerce.price
  },
  {
    id: 'emoji',
    label: 'Emoji',
    icon: <Smile className="w-4 h-4" />,
    generate: faker.internet.emoji
  },
  {
    id: 'displayName',
    label: 'Display Name',
    icon: <User className="w-4 h-4" />,
    generate: faker.internet.displayName
  },
  {
    id: 'domainName',
    label: 'Domain Name',
    icon: <Globe className="w-4 h-4" />,
    generate: faker.internet.domainName
  },
  {
    id: 'domainSuffix',
    label: 'Domain Suffix',
    icon: <Server className="w-4 h-4" />,
    generate: faker.internet.domainSuffix
  },
  {
    id: 'domainWord',
    label: 'Domain Word',
    icon: <Globe className="w-4 h-4" />,
    generate: faker.internet.domainWord
  },
  {
    id: 'exampleEmail',
    label: 'Example Email',
    icon: <Mail className="w-4 h-4" />,
    generate: faker.internet.exampleEmail
  },
  {
    id: 'httpMethod',
    label: 'HTTP Method',
    icon: <Send className="w-4 h-4" />,
    generate: faker.internet.httpMethod
  },
  {
    id: 'httpStatusCode',
    label: 'HTTP Status Code',
    icon: <Hash className="w-4 h-4" />,
    generate: () => faker.internet.httpStatusCode().toString()
  },
  {
    id: 'ip',
    label: 'IP Address',
    icon: <Network className="w-4 h-4" />,
    generate: faker.internet.ip
  },
  {
    id: 'ipv4',
    label: 'IPv4 Address',
    icon: <Wifi className="w-4 h-4" />,
    generate: faker.internet.ipv4
  },
  {
    id: 'ipv6',
    label: 'IPv6 Address',
    icon: <Wifi className="w-4 h-4" />,
    generate: faker.internet.ipv6
  },
  {
    id: 'jwt',
    label: 'JWT Token',
    icon: <Shield className="w-4 h-4" />,
    generate: faker.internet.jwt
  },
  {
    id: 'jwtAlgorithm',
    label: 'JWT Algorithm',
    icon: <Lock className="w-4 h-4" />,
    generate: faker.internet.jwtAlgorithm
  },
  {
    id: 'mac',
    label: 'MAC Address',
    icon: <Activity className="w-4 h-4" />,
    generate: faker.internet.mac
  },
  {
    id: 'port',
    label: 'Port',
    icon: <Hash className="w-4 h-4" />,
    generate: () => faker.internet.port().toString()
  },
  {
    id: 'protocol',
    label: 'Protocol',
    icon: <Server className="w-4 h-4" />,
    generate: faker.internet.protocol
  },
  {
    id: 'url',
    label: 'URL',
    icon: <Link className="w-4 h-4" />,
    generate: faker.internet.url
  },
  {
    id: 'userAgent',
    label: 'User Agent',
    icon: <Server className="w-4 h-4" />,
    generate: faker.internet.userAgent
  },
  {
    id: 'username',
    label: 'Username',
    icon: <AtSign className="w-4 h-4" />,
    generate: faker.internet.username
  }
];

export default function FakerGenerator() {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(DATA_TYPES[0].id);
  const [count, setCount] = useState("5");
  const [generatedData, setGeneratedData] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Get the current configuration based on the selected ID
  const currentOption = DATA_TYPES.find(t => t.id === selectedTypeId) || DATA_TYPES[0];

  const handleGenerate = () => {
    let validCount = parseInt(count);

    // Limit validation
    if (isNaN(validCount) || validCount < 1) validCount = 1;
    if (validCount > 20) validCount = 20; // Maximum limit requested

    setCount(validCount.toString());

    // Dynamic generation using the function configured in DATA_TYPES
    const newData = Array.from({ length: validCount }, () => {
      return currentOption.generate();
    });

    setGeneratedData(newData);
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => triggerCopyFeedback(text));
    } else {
      // Fallback for older browsers or restrictive iframes
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="bg-indigo-600 p-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Database className="w-24 h-24 text-white" />
          </div>
          <div className="flex justify-center mb-2">
            <Sparkles className="text-indigo-200 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold !text-white text-center">Faker Generator</h2>
          <p className="!text-indigo-200 text-center text-sm mt-1">
            Generate mock data instantly
          </p>
        </div>

        <div className="p-6 flex flex-col h-full overflow-hidden">
          <div className="shrink-0 space-y-4">

            {/* TYPE SELECTOR */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Database className="w-4 h-4" /> Data Type
              </label>
              <div className="relative">
                <select
                  value={selectedTypeId}
                  onChange={(e) => {
                    setSelectedTypeId(e.target.value);
                    setGeneratedData([]); // Clear data when changing type
                  }}
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all cursor-pointer text-gray-700 dark:text-gray-100"
                >
                  {DATA_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            {/* QUANTITY INPUT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity (Max 20)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="5"
              />
            </div>

            {/* GENERATE BUTTON */}
            <button
              onClick={handleGenerate}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <RefreshCw className="w-4 h-4" />
              Generate {currentOption.label}
            </button>
          </div>

          <hr className="border-gray-200 dark:border-gray-700 my-6 shrink-0" />

          {/* RESULTS LIST */}
          <div className="flex-1 overflow-y-auto min-h-[150px] pr-1 custom-scrollbar">
            {generatedData.length > 0 ? (
              <div className="space-y-3 animate-fade-in pb-2">
                {generatedData.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    onClick={() => copyToClipboard(item)}
                    className={`w-full group flex items-center justify-between p-3 rounded-lg border text-sm font-mono transition-all duration-200 ${copiedId === item
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-300 hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="text-gray-400 shrink-0">
                        {currentOption.icon}
                      </span>
                      <span className="truncate text-left" title={item}>
                        {item}
                      </span>
                    </div>

                    <span className={`shrink-0 transition-transform duration-200 ml-2 ${copiedId === item ? 'scale-110' : 'group-hover:scale-110'
                      }`}>
                      {copiedId === item ? (
                        <Check className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              // EMPTY STATE
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-full mb-3">
                  <Database className="h-8 w-8 opacity-20" />
                </div>
                <p className="font-medium">Ready to generate</p>
                <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">Select type and quantity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}