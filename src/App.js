import {
  Download,
  FileText,
  Layers,
  Link,
  Mail,
  MessageSquare,
  Palette,
  Phone,
  QrCode,
  Share2,
  Smartphone,
  User,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Navbar = () => (
  <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <QrCode className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">QRCraft</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Features
          </a>
          <a
            href="#generator"
            className="hover:text-indigo-600 transition-colors"
          >
            Generator
          </a>
          <a href="#steps" className="hover:text-indigo-600 transition-colors">
            How it Works
          </a>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
          Get Started
        </button>
      </div>
    </div>
  </nav>
);

const StepCard = ({ number, title, description, icon: Icon }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 relative">
      <Icon size={24} />
      <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
        {number}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

// --- Main Application Logic ---

export default function App() {
  const [activeTab, setActiveTab] = useState("url");
  const [qrData, setQrData] = useState("https://example.com");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event("prerender-ready"));
  }, []);

  // Input States
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [sms, setSms] = useState({ phone: "", message: "" });
  const [phone, setPhone] = useState("");
  const [wifi, setWifi] = useState({ ssid: "", password: "", type: "WPA" });
  const [vcard, setVcard] = useState({
    name: "",
    phone: "",
    email: "",
    org: "",
  });

  useEffect(() => {
    let dataString = "";

    switch (activeTab) {
      case "url":
      case "pdf":
      case "app":
      case "multi":
        dataString = url || "https://your-website.com";
        break;
      case "text":
        dataString = text || "Your text here";
        break;
      case "email":
        dataString = `mailto:${email.to}?subject=${encodeURIComponent(
          email.subject
        )}&body=${encodeURIComponent(email.body)}`;
        break;
      case "sms":
        dataString = `sms:${sms.phone}?body=${encodeURIComponent(sms.message)}`;
        break;
      case "phone":
        dataString = `tel:${phone}`;
        break;
      case "wifi":
        dataString = `WIFI:T:${wifi.type};S:${wifi.ssid};P:${wifi.password};;`;
        break;
      case "contact":
        dataString = `BEGIN:VCARD\nVERSION:3.0\nFN:${vcard.name}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nORG:${vcard.org}\nEND:VCARD`;
        break;
      default:
        dataString = "https://example.com";
    }

    setQrData(dataString);
  }, [activeTab, url, text, email, sms, phone, wifi, vcard]);

  const getQrImageUrl = () => {
    const colorHex = qrColor.replace("#", "");
    const bgHex = bgColor.replace("#", "");
    return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
      qrData
    )}&color=${colorHex}&bgcolor=${bgHex}&margin=20`;
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(getQrImageUrl());
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `qrcode-${activeTab}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed", error);
    }
    setDownloading(false);
  };

  const tabs = [
    { id: "url", label: "URL", icon: Link },
    { id: "pdf", label: "PDF", icon: FileText },
    { id: "text", label: "Text", icon: Layers },
    { id: "email", label: "Email", icon: Mail },
    { id: "sms", label: "SMS", icon: MessageSquare },
    { id: "phone", label: "Phone", icon: Phone },
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "contact", label: "Contact", icon: User },
    { id: "app", label: "App", icon: Smartphone },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <Helmet>
        <title>QRCraft — Free Custom QR Code Generator</title>
        <meta
          name="description"
          content="Generate custom QR codes in seconds with QRCraft. Customize colors, choose types like URL, PDF, Email, WiFi, and download high-quality QR codes for free."
        />
        <meta
          name="keywords"
          content="QR code generator, custom QR code, free QR code, QR codes online, QR code generator free"
        />
        <meta name="author" content="QRCraft" />
        <link rel="canonical" href="https://www.example.com" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "QRCraft",
              "url": "https://www.example.com",
              "description": "Generate custom QR codes quickly and free with QRCraft."
            }
          `}
        </script>
      </Helmet>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Create Custom{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              QR Codes
            </span>
            <br className="hidden sm:block" /> in Seconds.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            The simplest, most reliable QR code generator. Customize colors,
            choose types, and download high-quality images for free.
          </p>
        </div>
      </header>

      {/* Main Generator Section */}
      <main
        id="generator"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-24 relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          {/* Sidebar / Tabs */}
          <div className="w-full lg:w-64 bg-slate-50 border-r border-slate-100 p-4 lg:p-6 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Reset inputs slightly to avoid confusion
                    if (tab.id === "pdf")
                      setUrl("https://example.com/file.pdf");
                    else if (tab.id === "app")
                      setUrl("https://apps.apple.com/app-id");
                    else setUrl("");
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="flex-1 p-6 lg:p-10 bg-white">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {activeTab === "url"
                  ? "Website URL"
                  : activeTab === "pdf"
                  ? "PDF File URL"
                  : activeTab === "app"
                  ? "App Store Link"
                  : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-slate-500 text-sm">
                Enter the details below to generate your QR code.
              </p>
            </div>

            <div className="space-y-6">
              {/* Conditional Inputs based on Active Tab */}

              {(activeTab === "url" ||
                activeTab === "pdf" ||
                activeTab === "app" ||
                activeTab === "multi") && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {activeTab === "pdf"
                      ? "Paste link to your PDF"
                      : "Website URL"}
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  {activeTab === "pdf" && (
                    <p className="mt-2 text-xs text-slate-400">
                      Note: QR codes store links. Upload your PDF to a cloud
                      storage (like Drive or Dropbox) and paste the link here.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "text" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Plain Text
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Enter your text here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
              )}

              {activeTab === "email" && (
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={email.to}
                    onChange={(e) => setEmail({ ...email, to: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={email.subject}
                    onChange={(e) =>
                      setEmail({ ...email, subject: e.target.value })
                    }
                  />
                  <textarea
                    rows={3}
                    placeholder="Message Body"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={email.body}
                    onChange={(e) =>
                      setEmail({ ...email, body: e.target.value })
                    }
                  />
                </div>
              )}

              {activeTab === "sms" && (
                <div className="space-y-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={sms.phone}
                    onChange={(e) => setSms({ ...sms, phone: e.target.value })}
                  />
                  <textarea
                    rows={3}
                    placeholder="Message"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={sms.message}
                    onChange={(e) =>
                      setSms({ ...sms, message: e.target.value })
                    }
                  />
                </div>
              )}

              {activeTab === "phone" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              )}

              {activeTab === "wifi" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Network Name (SSID)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={wifi.ssid}
                    onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={wifi.password}
                    onChange={(e) =>
                      setWifi({ ...wifi, password: e.target.value })
                    }
                  />
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                    value={wifi.type}
                    onChange={(e) => setWifi({ ...wifi, type: e.target.value })}
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Encryption</option>
                  </select>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                      value={vcard.name}
                      onChange={(e) =>
                        setVcard({ ...vcard, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Organization"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                      value={vcard.org}
                      onChange={(e) =>
                        setVcard({ ...vcard, org: e.target.value })
                      }
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={vcard.phone}
                    onChange={(e) =>
                      setVcard({ ...vcard, phone: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={vcard.email}
                    onChange={(e) =>
                      setVcard({ ...vcard, email: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Customization */}
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Palette size={18} /> Appearance
                </h3>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                      Code Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                      />
                      <span className="text-sm font-mono text-slate-600 uppercase">
                        {qrColor}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                      Background
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                      />
                      <span className="text-sm font-mono text-slate-600 uppercase">
                        {bgColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-96 bg-slate-50 border-l border-slate-100 p-8 flex flex-col items-center justify-center relative">
            <div className="bg-white p-4 rounded-2xl shadow-lg mb-8 w-64 h-64 flex items-center justify-center">
              <img
                src={getQrImageUrl()}
                alt="QR Code Preview"
                className="w-full h-full object-contain"
                key={qrData + qrColor + bgColor} // Force re-render on change
              />
            </div>

            <div className="w-full max-w-xs space-y-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-indigo-200 shadow-lg transform active:scale-[0.98] transition-all"
              >
                {downloading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <Download size={20} /> Download PNG
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                High quality PNG output
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Steps Section */}
      <section id="steps" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Generate your custom QR code in three simple steps. It's fast,
              free, and requires no signup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Choose Content Type"
              description="Select what you want your QR code to do. Link to a website, show text, send an email, or connect to WiFi."
              icon={Layers}
            />
            <StepCard
              number="2"
              title="Customize Details"
              description="Enter your data and customize the look. Change the colors to match your brand identity."
              icon={Palette}
            />
            <StepCard
              number="3"
              title="Download & Share"
              description="Get your high-quality QR code instantly. Download it as a PNG and print it or share it online."
              icon={Share2}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-slate-900 p-1.5 rounded-md">
              <QrCode className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">QRCraft</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} QRCraft Generator. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
