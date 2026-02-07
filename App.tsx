
import React, { useState, useRef } from 'react';
import { PetalRain } from './components/PetalRain';
import { generateRoseDayContent, generateRoseImage, generateSpeech } from './geminiService';
import { RoseColor, GenerationState } from './types';

const ROSE_COLORS: { name: RoseColor; hex: string }[] = [
  { name: 'Red', hex: '#e11d48' },
  { name: 'Pink', hex: '#db2777' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'White', hex: '#f8fafc' },
  { name: 'Lavender', hex: '#9333ea' },
];

const App: React.FC = () => {
  const name = 'Sinzu';
  const [relation, setRelation] = useState('Partner');
  const [selectedColor, setSelectedColor] = useState<RoseColor>('Red');
  const [state, setState] = useState<GenerationState>({
    loading: false,
    error: null,
    data: null,
    audioUrl: null,
    imageUrl: null,
  });

  const handleGenerate = async () => {
    setState({ loading: true, error: null, data: null, audioUrl: null, imageUrl: null });

    try {
      // 1. Generate text content
      const content = await generateRoseDayContent(name, relation, selectedColor);
      
      // 2. Start image and audio generation in parallel
      const [imageUrl, audioBase64] = await Promise.all([
        generateRoseImage(selectedColor),
        generateSpeech(content.text)
      ]);

      setState({
        loading: false,
        error: null,
        data: content,
        imageUrl: imageUrl,
        audioUrl: audioBase64 ? `data:audio/pcm;base64,${audioBase64}` : null
      });
    } catch (err) {
      console.error(err);
      setState({ loading: false, error: 'Oh no! The petals got stuck. Please try again.', data: null, audioUrl: null, imageUrl: null });
    }
  };

  const playAudio = async (base64: string) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const decode = (b64: string) => {
      const binaryString = atob(b64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
      return bytes;
    };

    const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
      const dataInt16 = new Int16Array(data.buffer);
      const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
      return buffer;
    };

    const buffer = await decodeAudioData(decode(base64.replace('data:audio/pcm;base64,', '')), audioCtx);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6">
      <PetalRain />

      {/* Header */}
      <header className="relative z-10 text-center mb-12 animate-bounce-slow">
        <h1 className="text-5xl md:text-7xl font-cursive text-rose-600 mb-2 drop-shadow-sm">
          Happy Rose Day
        </h1>
        <p className="text-rose-400 text-lg font-medium">A special digital rose for Sinzu</p>
      </header>

      <main className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-rose-100 flex flex-col">
        {/* Input Section */}
        <div className="p-8 border-b border-rose-50">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-rose-700 mb-2">Relationship with Sinzu</label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-rose-100 focus:border-rose-300 focus:ring-rose-200 outline-none transition-all text-rose-800 bg-rose-50/30"
            >
              <option>Partner</option>
              <option>Best Friend</option>
              <option>Crush</option>
              <option>Family</option>
              <option>Someone Special</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-rose-700 mb-4">Pick a Rose Color</label>
            <div className="flex flex-wrap gap-4 justify-center">
              {ROSE_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`group relative flex flex-col items-center transition-all transform hover:scale-110`}
                >
                  <div 
                    className={`w-12 h-12 rounded-full border-4 shadow-sm mb-1 ${selectedColor === color.name ? 'border-rose-400 ring-2 ring-rose-200' : 'border-white'}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className={`text-xs font-bold ${selectedColor === color.name ? 'text-rose-600' : 'text-gray-400'}`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={state.loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2
              ${state.loading ? 'bg-rose-300' : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600'}`}
          >
            {state.loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Planting the Seeds...
              </>
            ) : (
              <>
                <span>🌹</span>
                Generate Magic
              </>
            )}
          </button>
          
          {state.error && <p className="text-center text-red-500 mt-4 text-sm font-medium">{state.error}</p>}
        </div>

        {/* Output Section */}
        {state.data && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Generated Image */}
              <div className="shrink-0 w-full md:w-64 h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                {state.imageUrl ? (
                  <img src={state.imageUrl} alt="Beautiful Rose" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-200">
                    <span className="text-4xl">🥀</span>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div>
                  <h3 className="text-rose-500 font-bold uppercase tracking-wider text-xs mb-1">A message for {name}</h3>
                  <p className="text-xl md:text-2xl text-rose-900 font-medium leading-relaxed italic">
                    "{state.data.text}"
                  </p>
                  {state.audioUrl && (
                    <button 
                      onClick={() => playAudio(state.audioUrl!)}
                      className="mt-3 text-sm text-rose-400 hover:text-rose-600 flex items-center gap-1 mx-auto md:mx-0 font-bold"
                    >
                      <span className="text-lg">🔊</span> Listen to greeting
                    </button>
                  )}
                </div>

                <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                  <h4 className="font-cursive text-2xl text-rose-600 mb-3">A Verse for You</h4>
                  <p className="text-rose-700 whitespace-pre-line leading-relaxed">
                    {state.data.poem}
                  </p>
                </div>

                <div className="text-xs text-rose-400 bg-white/40 p-3 rounded-lg border border-dashed border-rose-200">
                  <span className="font-bold">Meaning:</span> {state.data.roseMeaning}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
               <button 
                onClick={() => window.print()}
                className="text-sm text-rose-300 hover:text-rose-500 underline"
               >
                 Save as a keepsake (PDF/Print)
               </button>
            </div>
          </div>
        )}

        {/* Empty State / Welcome */}
        {!state.data && !state.loading && (
          <div className="p-12 text-center text-rose-300">
            <div className="text-6xl mb-4">💐</div>
            <p className="text-lg">Your personalized bouquet for Sinzu is waiting...</p>
          </div>
        )}
      </main>

      <footer className="mt-12 text-rose-400 text-sm font-medium z-10 flex flex-col items-center gap-2">
      </footer>
    </div>
  );
};

export default App;
