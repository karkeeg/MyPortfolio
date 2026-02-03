import { useEffect, useState } from "react";

const synth = window.speechSynthesis;
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function AccessibilityToolbar() {
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [ttsPanelOpen, setTtsPanelOpen] = useState(false);
  const [fontPanelOpen, setFontPanelOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [recognition, setRecognition] = useState(null);
  const [voiceGender, setVoiceGender] = useState("male");
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [selectedFont, setSelectedFont] = useState("");
  const [clickToSpeak, setClickToSpeak] = useState(false);

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.lang = "en-US";

    recog.onresult = (e) => {
      const cmd = e.results[e.results.length - 1][0].transcript.toLowerCase();
      handleCommand(cmd);
    };

    setRecognition(recog);
  }, []);

  useEffect(() => {
    if (!toolbarOpen) {
      setTtsPanelOpen(false);
    }
  }, [toolbarOpen]);

  // Apply font changes to the entire website
  useEffect(() => {
    // Create or get the style element for accessibility changes
    let styleEl = document.getElementById("accessibility-font-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "accessibility-font-styles";
      document.head.appendChild(styleEl);
    }

    // Build CSS that targets only the main content, excluding toolbar elements
    let css = "";

    // Apply font size - exclude anything with data-accessibility-toolbar attribute or its children
    if (fontSize !== 16) {
      css += `
        #app-content, #app-content * {
          font-size: ${fontSize}px !important;
        }
      `;
    }

    // Apply font family if selected
    if (dyslexiaFont) {
      css += `
        #app-content, #app-content * {
          font-family: "OpenDyslexic", "Comic Sans MS", sans-serif !important;
        }
      `;
    } else if (selectedFont) {
      css += `
        #app-content, #app-content * {
          font-family: ${selectedFont} !important;
        }
      `;
    }

    styleEl.textContent = css;

    // Cleanup function
    return () => {
      if (fontSize === 16 && !dyslexiaFont && !selectedFont) {
        styleEl.textContent = "";
      }
    };
  }, [fontSize, dyslexiaFont, selectedFont]);

  /* ---------- Text Highlighting ---------- */
  const highlightText = (text, start, end) => {
    removeHighlight();

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip toolbar elements
          const parent = node.parentElement;
          if (parent && parent.closest("[data-accessibility-toolbar]")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    let charCount = 0;
    let node;
    const nodesToHighlight = [];

    while ((node = walker.nextNode())) {
      const nodeText = node.textContent;
      const nodeStart = charCount;
      const nodeEnd = charCount + nodeText.length;

      if (nodeEnd > start && nodeStart < end) {
        nodesToHighlight.push({
          node,
          start: Math.max(0, start - nodeStart),
          end: Math.min(nodeText.length, end - nodeStart),
        });
      }

      charCount += nodeText.length;
    }

    nodesToHighlight.forEach(({ node, start, end }) => {
      const parent = node.parentNode;
      const before = document.createTextNode(
        node.textContent.substring(0, start),
      );
      const highlighted = document.createElement("span");
      highlighted.className = "tts-highlight";
      highlighted.style.backgroundColor = "#3b82f6";
      highlighted.style.color = "white";
      highlighted.style.padding = "2px 4px";
      highlighted.style.borderRadius = "2px";
      highlighted.textContent = node.textContent.substring(start, end);
      const after = document.createTextNode(node.textContent.substring(end));

      parent.insertBefore(before, node);
      parent.insertBefore(highlighted, node);
      parent.insertBefore(after, node);
      parent.removeChild(node);
    });
  };

  const removeHighlight = () => {
    const highlights = document.querySelectorAll(".tts-highlight");
    highlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      const text = document.createTextNode(highlight.textContent);
      parent.replaceChild(text, highlight);
      parent.normalize();
    });
  };

  useEffect(() => {
    const loadVoices = () => {
      // This forces the browser to populate the voice list
      synth.getVoices();
    };

    // Some browsers need this event to trigger the load
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const getBestVoice = () => {
    const voices = synth.getVoices();
    let selectedVoice = voices.find(
      (v) =>
        v.name.includes("Natural") &&
        v.name.toLowerCase().includes(voiceGender),
    );

    if (!selectedVoice) {
      selectedVoice = voices.find(
        (v) =>
          v.name.includes("Google") &&
          v.lang.startsWith("en") &&
          (voiceGender === "male"
            ? !v.name.includes("Female")
            : v.name.includes("Female")),
      );
    }

    if (!selectedVoice) {
      if (voiceGender === "male") {
        selectedVoice =
          voices.find((v) => v.name.includes("David")) ||
          voices.find((v) => v.lang.startsWith("en-"));
      } else {
        selectedVoice =
          voices.find((v) => v.name.includes("Zira")) ||
          voices.find((v) => v.lang.startsWith("en-"));
      }
    }
    return selectedVoice;
  };

  const speakText = (text, onBoundary = null) => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.pitch = 1.0;
    const voice = getBestVoice();
    if (voice) utterance.voice = voice;

    if (onBoundary) {
      utterance.onboundary = onBoundary;
    }

    utterance.onend = () => {
      removeHighlight();
      setIsPaused(false);
    };

    setCurrentUtterance(utterance);
    synth.speak(utterance);
    setIsPaused(false);
  };

  useEffect(() => {
    const appContent = document.getElementById("app-content");
    
    if (clickToSpeak && appContent) {
      appContent.classList.add("click-to-speak-active");
    }

    const handleClick = (e) => {
      if (!clickToSpeak) return;
      // Ignore if clicking on the toolbar
      if (e.target.closest("[data-accessibility-toolbar]")) return;

      const text = e.target.innerText || e.target.textContent;
      if (text && text.trim().length > 0) {
        speakText(text.trim());
        
        // Brief visual feedback
        const originalBg = e.target.style.backgroundColor;
        e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)";
        setTimeout(() => {
          e.target.style.backgroundColor = originalBg;
        }, 500);
      }
    };

    document.addEventListener("dblclick", handleClick);
    
    return () => {
      document.removeEventListener("dblclick", handleClick);
      if (appContent) {
        appContent.classList.remove("click-to-speak-active");
      }
    };
  }, [clickToSpeak, speed, voiceGender]);
  /* ---------- TTS Actions ---------- */
  const readPage = () => {
    removeHighlight();

    // 1. Get text content
    const bodyClone = document.body.cloneNode(true);
    const toolbarClone = bodyClone.querySelector(
      "[data-accessibility-toolbar]",
    );
    if (toolbarClone) toolbarClone.remove();
    const textContent = bodyClone.innerText;

    speakText(textContent, (event) => {
      if (event.name === "word") {
        const wordLength = event.charLength || 5;
        highlightText(
          textContent,
          event.charIndex,
          event.charIndex + wordLength,
        );
      }
    });
  };
  const pauseResume = () => {
    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
    } else {
      synth.pause();
      setIsPaused(true);
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      try {
        recognition.stop();
      } catch (e) {
        // Recognition might already be stopped
      }
    }
    setIsListening(false);
  };

  const resetAll = () => {
    // Cancel any ongoing speech
    synth.cancel();

    // Remove text highlighting
    removeHighlight();

    // Stop voice recognition
    stopListening();

    // Reset all states
    setIsListening(false);
    setIsPaused(false);
    setCurrentUtterance(null);
    setSpeed(1.0);
    setVoiceGender("male");
    setClickToSpeak(false);

    // Reset font settings
    setFontSize(16);
    setDyslexiaFont(false);
    setSelectedFont("");

    // Close all panels
    setTtsPanelOpen(false);
    setFontPanelOpen(false);
  };

  const startListening = () => {
    if (!recognition) return;
    recognition.start();
    setIsListening(true);
  };

  const handleCommand = (cmd) => {
    if (cmd.includes("read")) readPage();
    else if (cmd.includes("pause")) synth.pause();
    else if (cmd.includes("resume")) synth.resume();
    else if (cmd.includes("stop")) synth.cancel();
    else if (cmd.includes("scroll down"))
      window.scrollBy({ top: 400, behavior: "smooth" });
    else if (cmd.includes("scroll up"))
      window.scrollBy({ top: -400, behavior: "smooth" });
  };

  const toggleTtsPanel = () => {
    setTtsPanelOpen(!ttsPanelOpen);
  };

  const toggleFontPanel = () => {
    setFontPanelOpen(!fontPanelOpen);
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 64));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  return (
    <div data-accessibility-toolbar className="accessibility-toolbar">
      {/* Floating Accessibility Button */}
      {!toolbarOpen && (
        <button
          onClick={() => setToolbarOpen(true)}
          className="fixed bottom-8 right-8 z-[9999] bg-white/70 backdrop-blur-md border border-slate-200/50 text-slate-700 w-12 h-12 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center group"
          aria-label="Open Accessibility Toolbar"
        >
          <svg
            className="w-8 h-8 transition-transform group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      )}

      {/* Top Toolbar */}
      {toolbarOpen && (
        <div className="fixed top-4 left-1/2 opacity-90 -translate-x-1/2 w-[90%] max-w-4xl z-[9999] bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-lg rounded-2xl">
          <div className="mx-auto px-4 py-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
            {/* Close Button */}
            <button
              onClick={() => setToolbarOpen(false)}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-600 hover:text-gray-900"
              aria-label="Close Toolbar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="h-8 w-px bg-gray-200"></div>

            {/* Text To Speech Button with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleTtsPanel}
                className={`p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm ${
                  ttsPanelOpen ? "ring-2 ring-blue-500/20" : ""
                }`}
                aria-label="Text To Speech"
                title="Text To Speech"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>

              {/* Text-To-Speech Dropdown Panel */}
              {ttsPanelOpen && (
                <div className="absolute top-full mt-4 left-0 w-80 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-100/50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 bg-slate-50/50 border-b border-slate-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 leading-tight">
                          Text to Speech
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Customize reading
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTtsPanelOpen(false)}
                      className="p-1.5 hover:bg-slate-200/50 rounded-md transition-colors text-slate-400"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col gap-4">
                    {/* Voice Selection */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Voice Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setVoiceGender("male")}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            voiceGender === "male"
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Male
                        </button>
                        <button
                          onClick={() => setVoiceGender("female")}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            voiceGender === "female"
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Female
                        </button>
                      </div>
                    </div>

                    {/* Reading Speed */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Reading Speed
                        </label>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {speed.toFixed(1)}x
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.5"
                          max="2.0"
                          step="0.1"
                          value={speed}
                          onChange={(e) => setSpeed(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          style={{
                            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((speed - 0.5) / 1.5) * 100}%, #e5e7eb ${((speed - 0.5) / 1.5) * 100}%, #e5e7eb 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Slow</span>
                          <span>Fast</span>
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={readPage}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Read Page
                      </button>
                      <button
                        onClick={pauseResume}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-600 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {isPaused ? (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Resume
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Pause
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={startListening}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 border ${
                        isListening
                          ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${isListening ? "animate-pulse" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                      {isListening ? "Listening..." : "Voice Commands"}
                    </button>

                    <button
                      onClick={() => setClickToSpeak(!clickToSpeak)}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 border ${
                        clickToSpeak
                          ? "bg-blue-50 border-blue-100 text-blue-700"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                        />
                      </svg>
                      {clickToSpeak ? "Double Click to Speak: ON" : "Double Click to Speak: OFF"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-gray-200"></div>

            {/* Font Tools Button with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleFontPanel}
                className={`p-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-200 shadow-sm ${
                  fontPanelOpen ? "ring-2 ring-amber-500/20" : ""
                }`}
                aria-label="Font Tools"
                title="Font Tools"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              {/* Font Tools Dropdown Panel */}
              {fontPanelOpen && (
                <div className="absolute top-full mt-4 left-0 w-80 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-100/50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 bg-slate-50/50 border-b border-slate-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-amber-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 leading-tight">
                          Font Tools
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Customize aesthetics
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFontPanelOpen(false)}
                      className="p-1.5 hover:bg-slate-200/50 rounded-md transition-colors text-slate-400"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col gap-4">
                    {/* Font Size */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Font Size
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={decreaseFontSize}
                          className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-all duration-200 flex items-center justify-center font-bold text-lg border border-slate-100"
                        >
                          −
                        </button>
                        <div className="flex-1 text-center">
                          <div className="text-xl font-bold text-amber-600">
                            {fontSize}px
                          </div>
                        </div>
                        <button
                          onClick={increaseFontSize}
                          className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-all duration-200 flex items-center justify-center font-bold text-lg border border-slate-100"
                        >
                          +
                        </button>
                        <button
                          onClick={resetFontSize}
                          className="px-3 h-10 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm transition-all duration-200 font-medium"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Dyslexia Friendly Fonts */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Accessibility Font
                      </label>
                      <button
                        onClick={() => setDyslexiaFont(!dyslexiaFont)}
                        className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left flex items-center justify-between border ${
                          dyslexiaFont
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>Dyslexia Friendly</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            dyslexiaFont ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* More Fonts */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Font Family
                      </label>
                      <select
                        value={selectedFont}
                        onChange={(e) => setSelectedFont(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-sm transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      >
                        <option value="">Default Font</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="'Times New Roman', serif">
                          Times New Roman
                        </option>
                        <option value="'Courier New', monospace">
                          Courier New
                        </option>
                        <option value="Tahoma, sans-serif">Tahoma</option>
                        <option value="'Trebuchet MS', sans-serif">
                          Trebuchet MS
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            </div>

            <div className="flex items-center gap-2">
              <div className="h-8 w-px bg-slate-100"></div>

              {/* Reset Button */}
              <button
                onClick={resetAll}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 rounded-lg transition-all duration-200"
                aria-label="Reset All"
                title="Reset All"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
