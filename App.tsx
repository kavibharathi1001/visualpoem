import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PoemOptions } from './components/PoemOptions';
import { PoemDisplay } from './components/PoemDisplay';
import { generatePoem } from './services/geminiService';
import { PoemMode, PoeticForm, EmotionalTone, PoemOptionsState } from './types';
import { ArrowRight, Sparkles, X } from 'lucide-react';

const INITIAL_OPTIONS: PoemOptionsState = {
  mode: PoemMode.BEST,
  form: PoeticForm.FREE_VERSE,
  tone: EmotionalTone.HOPEFUL,
  customTopic: '',
};

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [options, setOptions] = useState<PoemOptionsState>(INITIAL_OPTIONS);
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (base64: string, type: string) => {
    setSelectedImage(base64);
    setMimeType(type);
    setGeneratedPoem(null);
    setError(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setGeneratedPoem(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const poem = await generatePoem(selectedImage, mimeType, options);
      setGeneratedPoem(poem);
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the poem.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
      setGeneratedPoem(null);
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-ink">Visual Muse</h1>
          </div>
          <div className="text-sm font-medium text-gray-400 hidden sm:block">
            Powered by Gemini
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Controls & Input */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6 text-ink">1. Choose your visual</h2>
              <ImageUploader 
                selectedImage={selectedImage}
                onImageSelected={handleImageSelected}
                onClear={handleClearImage}
              />
            </section>

            <section className={!selectedImage ? 'opacity-50 pointer-events-none filter blur-[1px] transition-all' : 'transition-all'}>
               <h2 className="text-2xl font-serif font-bold mb-6 text-ink">2. Define the style</h2>
               <PoemOptions 
                 options={options} 
                 onChange={setOptions} 
                 disabled={!selectedImage || isLoading}
               />
            </section>

             <div className="pt-4 sticky bottom-6 z-40">
                <button
                  onClick={handleGenerate}
                  disabled={!selectedImage || isLoading}
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-xl transition-all
                    ${!selectedImage || isLoading 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-ink text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98]'
                    }
                  `}
                >
                  {isLoading ? 'Weaving Verses...' : 'Generate Poem'}
                  {!isLoading && <ArrowRight size={20} />}
                </button>
                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex justify-between items-start">
                        <span>{error}</span>
                        <button 
                            onClick={() => setError(null)}
                            className="ml-2 text-red-400 hover:text-red-700 hover:bg-red-100 p-1 rounded transition-colors"
                            aria-label="Dismiss error"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
             </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7 h-full">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
               <h2 className="text-2xl font-serif font-bold mb-6 text-ink lg:hidden">3. The Result</h2>
               <PoemDisplay 
                  poem={generatedPoem} 
                  isLoading={isLoading} 
                  onReset={handleReset}
               />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;