
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PetalRain } from './components/PetalRain';

const ROSE_MESSAGE = {
  text: "Happy Rose Day",
  subText: "A special rose, just for you.",
  message: "I wanted to send you something as beautiful as your heart. Thank you for being such a wonderful person.",
  meaning: "A red rose symbolizes deep love and appreciation."
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateRose = async () => {
    setIsGenerating(true);
    setIsOpen(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: 'A single, stunning, hyper-realistic red rose with dew drops on soft velvet petals, dreamy bokeh background, studio lighting, high resolution floral photography' }]
        },
      });

      const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
      if (imagePart?.inlineData) {
        setGeneratedImage(`data:image/png;base64,${imagePart.inlineData.data}`);
      } else {
        // Fallback in case of generation failure
        setGeneratedImage('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop');
      }
    } catch (error) {
      console.error("Error generating rose:", error);
      setGeneratedImage('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setGeneratedImage(null);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 overflow-hidden bg-[#fffafb]">
      <PetalRain />

      {/* Floating Hearts Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${15 + Math.random() * 25}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <main className="relative z-10 w-full max-w-md">
        {!isOpen ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <h1 className="text-3xl font-semibold text-rose-600 mb-10 text-center tracking-tight">
              I have a surprise for you...
            </h1>
            
            <button
              onClick={generateRose}
              className="group relative w-60 h-44 bg-white rounded-[2.5rem] border border-rose-100 shadow-[0_15px_40px_rgba(251,113,133,0.15)] flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300 mb-2">💌</div>
              <span className="text-rose-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                Tap to Open
              </span>
              <div className="absolute inset-0 bg-rose-50 opacity-0 group-hover:opacity-30 transition-opacity" />
            </button>
            <p className="mt-8 text-rose-300 text-sm font-medium animate-pulse">Touch the envelope</p>
          </div>
        ) : (
          <div className="relative animate-in slide-in-from-bottom-6 fade-in duration-700 ease-out">
            <div className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.1)] overflow-hidden border border-rose-50 relative">
              
              {/* Image Section */}
              <div className="h-80 w-full bg-rose-50 overflow-hidden relative flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
                    <p className="text-rose-400 text-xs font-bold animate-pulse uppercase tracking-widest">Growing your rose...</p>
                  </div>
                ) : (
                  <img 
                    src={generatedImage || ''} 
                    alt="Your Rose" 
                    className="w-full h-full object-cover animate-in fade-in duration-1000"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="p-8 text-center flex flex-col items-center">
                <h2 className="text-3xl font-bold text-rose-600 mb-1">
                  {ROSE_MESSAGE.text}
                </h2>
                
                <p className="text-rose-400 font-medium mb-6 text-sm">
                  {ROSE_MESSAGE.subText}
                </p>

                <div className="w-12 h-[2px] bg-rose-100 rounded-full mb-6"></div>

                <p className="text-gray-600 leading-relaxed text-base mb-8">
                  {ROSE_MESSAGE.message}
                </p>

                <div className="bg-rose-50/50 px-5 py-3 rounded-2xl border border-rose-100/50 w-full mb-8">
                  <p className="text-[10px] text-rose-300 uppercase tracking-widest font-bold mb-1">Symbolism</p>
                  <p className="text-xs text-rose-400 italic">
                    {ROSE_MESSAGE.meaning}
                  </p>
                </div>

                <button 
                  onClick={handleClose}
                  className="px-10 py-2.5 text-rose-400 hover:text-rose-600 text-sm font-semibold transition-all hover:bg-rose-50 rounded-full border border-rose-100"
                >
                  Back
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
               <button 
                onClick={() => window.print()}
                className="text-xs text-rose-200 hover:text-rose-400 font-bold tracking-widest uppercase transition-all"
               >
                 Save a memory 💝
               </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 z-10">
        <p className="text-rose-200 text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Happy Rose Day</p>
      </footer>
    </div>
  );
};

export default App;
