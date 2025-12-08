import React from 'react';
import { PoemMode, PoeticForm, EmotionalTone, PoemOptionsState } from '../types';
import { Sparkles, BookOpen, Feather, PenTool } from 'lucide-react';

interface PoemOptionsProps {
  options: PoemOptionsState;
  onChange: (options: PoemOptionsState) => void;
  disabled: boolean;
}

export const PoemOptions: React.FC<PoemOptionsProps> = ({ options, onChange, disabled }) => {

  const handleModeChange = (mode: PoemMode) => {
    onChange({ ...options, mode });
  };

  const handleFormChange = (form: PoeticForm) => {
    onChange({ ...options, form });
  };

  const handleToneChange = (tone: EmotionalTone) => {
    onChange({ ...options, tone });
  };

  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, customTopic: e.target.value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          Select Inspiration Mode
        </label>
        <div className="grid grid-cols-2 gap-3">
          <ModeButton 
            active={options.mode === PoemMode.BEST} 
            onClick={() => handleModeChange(PoemMode.BEST)}
            icon={<Sparkles size={18} />}
            label="Visual Muse"
            description="Deep, evocative free verse"
            disabled={disabled}
          />
          <ModeButton 
            active={options.mode === PoemMode.GENERAL} 
            onClick={() => handleModeChange(PoemMode.GENERAL)}
            icon={<Feather size={18} />}
            label="Descriptive"
            description="Captures mood & atmosphere"
            disabled={disabled}
          />
          <ModeButton 
            active={options.mode === PoemMode.STYLE} 
            onClick={() => handleModeChange(PoemMode.STYLE)}
            icon={<BookOpen size={18} />}
            label="Structured"
            description="Sonnet, Haiku, etc."
            disabled={disabled}
          />
          <ModeButton 
            active={options.mode === PoemMode.NARRATIVE} 
            onClick={() => handleModeChange(PoemMode.NARRATIVE)}
            icon={<PenTool size={18} />}
            label="Narrative"
            description="Story & perspective"
            disabled={disabled}
          />
        </div>
      </div>

      {options.mode === PoemMode.STYLE && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-all">
          <label className="block text-sm font-medium text-gray-700 mb-2">Poetic Form</label>
          <select 
            value={options.form}
            onChange={(e) => handleFormChange(e.target.value as PoeticForm)}
            disabled={disabled}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent block"
          >
            {Object.values(PoeticForm).map((form) => (
              <option key={form} value={form}>{form}</option>
            ))}
          </select>
        </div>
      )}

      {options.mode === PoemMode.NARRATIVE && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-all">
          <label className="block text-sm font-medium text-gray-700 mb-2">Emotional Tone</label>
          <select 
            value={options.tone}
            onChange={(e) => handleToneChange(e.target.value as EmotionalTone)}
            disabled={disabled}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent block"
          >
            {Object.values(EmotionalTone).map((tone) => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
          Specific Theme (Optional)
        </label>
        <input
          type="text"
          value={options.customTopic}
          onChange={handleCustomTopicChange}
          disabled={disabled}
          placeholder="e.g., A lost love, winter's chill, hope..."
          className="w-full p-3 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent shadow-sm placeholder-gray-400"
        />
      </div>
    </div>
  );
};

const ModeButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
  disabled: boolean;
}> = ({ active, onClick, icon, label, description, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200
      ${active 
        ? 'border-accent bg-accent text-white shadow-md transform scale-[1.02]' 
        : 'border-gray-200 bg-white text-gray-700 hover:border-accent/30 hover:bg-gray-50'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    <div className={`mb-2 ${active ? 'text-white' : 'text-accent'}`}>
      {icon}
    </div>
    <span className="font-semibold text-sm block">{label}</span>
    <span className={`text-xs mt-1 ${active ? 'text-white/90' : 'text-gray-500'}`}>{description}</span>
  </button>
);
