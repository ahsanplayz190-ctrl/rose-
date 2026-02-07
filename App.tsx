
import React, { useState } from 'react';
import { PetalRain } from './components/PetalRain';
import { CssRose } from './components/CssRose';
import { PaperPlane } from './components/PaperPlane';

const ROSE_MESSAGE = {
  text: "Happy Rose Day",
  subText: "Across the miles, with all my love.",
  message: "Distance is just a test to see how far love can travel. Though we are miles apart today, my heart is right there with you. Sending you this virtual rose to brighten your day until I can give you a real one in person.",
  meaning: "A red rose symbolizes deep love and the enduring strength of our connection, no matter the distance."
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 overflow-hidden bg-[#fffafb]">
      <PetalRain />
      <PaperPlane />

      {/* Background Distance Visuals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl transform -rotate-12">📍</div>
        <div className="absolute bottom-10 right-10 text-4xl transform rotate-12">📍</div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M 10 10 Q 50 50 90 90" 
            fill="transparent" 
            stroke="#fb7185" 
            strokeWidth="0.2" 
            strokeDasharray="1,1"
          />
        </svg>
      </div>

      <main className="relative z-10 w-full max-w-md">
        {!isOpen ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <h1 className="text-3xl font-semibold text-rose-600 mb-2 text-center tracking-tight font-cursive">
              Sending something special...
            </h1>
            <p className="text-rose-400/60 text-xs mb-10 font-bold tracking-[0.2em] uppercase">Traveling across the miles</p>
            
            <button
              onClick={() => setIsOpen(true)}
              className="group relative w-64 h-48 bg-white rounded-[2.5rem] border border-rose-100 shadow-[0_15px_40px_rgba(251,113,133,0.15)] flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform duration-500 mb-2">✈️</div>
              <span className="text-rose-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                Open Message
              </span>
              <div className="absolute inset-0 bg-rose-50 opacity-0 group-hover:opacity-30 transition-opacity" />
            </button>
            <p className="mt-8 text-rose-300 text-sm font-medium animate-pulse">Touch to deliver</p>
          </div>
        ) : (
          <div className="relative animate-in slide-in-from-bottom-6 fade-in duration-700 ease-out">
            <div className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.1)] overflow-hidden border border-rose-50 relative">
              
              {/* Distance Connection Badge */}
              <div className="absolute top-4 right-6 z-20 flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-rose-100 shadow-sm">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-tighter">ME</span>
                <div className="w-8 h-[1px] bg-rose-200 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px]">❤️</div>
                </div>
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-tighter">YOU</span>
              </div>

              {/* Animated CSS Rose Section */}
              <div className="h-80 w-full relative">
                <CssRose />
              </div>

              {/* Text Content */}
              <div className="p-8 text-center flex flex-col items-center">
                <h2 className="text-4xl font-bold text-rose-600 mb-1 font-cursive">
                  {ROSE_MESSAGE.text}
                </h2>
                
                <p className="text-rose-400 font-medium mb-6 text-sm tracking-wide">
                  {ROSE_MESSAGE.subText}
                </p>

                <div className="w-12 h-[2px] bg-rose-100 rounded-full mb-6"></div>

                <p className="text-gray-600 leading-relaxed text-base mb-8 italic">
                  "{ROSE_MESSAGE.message}"
                </p>

                <div className="bg-rose-50/50 px-5 py-3 rounded-2xl border border-rose-100/50 w-full mb-8">
                  <p className="text-[10px] text-rose-300 uppercase tracking-widest font-bold mb-1">Our Bond</p>
                  <p className="text-xs text-rose-400 italic">
                    {ROSE_MESSAGE.meaning}
                  </p>
                </div>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-10 py-2.5 text-rose-400 hover:text-rose-600 text-sm font-semibold transition-all hover:bg-rose-50 rounded-full border border-rose-100"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
               <button 
                onClick={() => window.print()}
                className="text-xs text-rose-200 hover:text-rose-400 font-bold tracking-widest uppercase transition-all"
               >
                 Save our distance diary 📖
               </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 z-10 flex flex-col items-center gap-2">
        <p className="text-rose-200 text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Miles Apart, Heart to Heart</p>
        <div className="flex gap-4">
          <span className="text-lg opacity-30">🏠</span>
          <div className="w-12 border-b border-rose-100 border-dashed self-center"></div>
          <span className="text-lg opacity-30">🏡</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
