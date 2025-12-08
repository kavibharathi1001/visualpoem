import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X, Camera } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedImage, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Extract base64 data (remove data:image/xxx;base64, prefix)
      const base64 = result.split(',')[1];
      onImageSelected(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [onImageSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  if (selectedImage) {
    return (
      <div className="relative group w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <img 
          src={`data:image/jpeg;base64,${selectedImage}`} 
          alt="Selected" 
          className="w-full h-full object-contain"
        />
        <button 
          onClick={onClear}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-64 md:h-96 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-center p-6
        ${isDragging 
          ? 'border-accent bg-accent/5' 
          : 'border-gray-300 hover:border-accent/50 hover:bg-gray-50'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
        <Upload className={`w-8 h-8 ${isDragging ? 'text-accent' : 'text-gray-400'}`} />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        Upload an image to inspire your muse
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
        Drag and drop your photo here, or browse your files.
      </p>
      
      <div className="flex gap-4">
        <label className="cursor-pointer">
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
          <span className="inline-flex items-center px-6 py-3 rounded-lg bg-ink text-white hover:bg-gray-800 transition-transform active:scale-95 shadow-md text-sm font-medium">
            <ImageIcon className="w-4 h-4 mr-2" />
            Browse Files
          </span>
        </label>
        
        {/* Helper for mobile users mostly */}
        <label className="cursor-pointer md:hidden">
           <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
          <span className="inline-flex items-center px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
            <Camera className="w-4 h-4" />
          </span>
        </label>
      </div>
    </div>
  );
};
