import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [inputText, setInputText] = useState("");
  const cardRef = useRef(null);

  const gradientStyle = {
    background:
      "linear-gradient(135deg, rgba(238,242,255,1) 0%, rgba(232,245,255,1) 50%, rgba(240,253,244,1) 100%)",
  };

  async function handleDownload() {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio,
      useCORS: true,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "bino-share.png";
    a.click();
  }

  function handleShare() {
    const text = `Found this using Bino! 🔍💬 #FindItOnBino\n\n${inputText}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="text-center mb-4">
              <h1 className="fw-semibold">Bino Share Generator</h1>
              <p className="text-secondary mb-0">Create a quick share card from your Bino find.</p>
            </div>

            <div className="mb-3">
              <label htmlFor="binoInput" className="form-label fw-medium">What did you find with Bino?</label>
              <input
                id="binoInput"
                type="text"
                className="form-control"
                placeholder="Type here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-center">
              <div
                ref={cardRef}
                className="rounded-4 shadow-sm p-4 w-100"
                style={{
                  maxWidth: 720,
                  ...gradientStyle,
                  border: "1px solid #e9ecef",
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: 36, height: 36, background: "#f1f5f9" }}
                    aria-label="Bino logo"
                    title="Bino"
                  >
                    <span style={{ fontSize: 18 }}>🧠</span>
                  </div>
                  <span className="fw-semibold">Found with Bino</span>
                </div>

                <div className="bg-white rounded-3 p-4" style={{ border: "1px solid #eef2f7" }}>
                  <p className="mb-0" style={{ fontSize: 20, lineHeight: 1.5, color: "#0f172a" }}>
                    {inputText || "Your discovery will appear here..."}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-secondary">bino.app • Share your find</small>
                  <small className="text-secondary">#FindItOnBino</small>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
              <button type="button" className="btn btn-primary" onClick={handleDownload}>
                Download Image
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleShare}>
                Share on X (Twitter)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


