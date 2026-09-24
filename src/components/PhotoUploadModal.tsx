import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  Check, 
  RotateCcw, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAvatar } from '../context/AvatarContext';

export default function PhotoUploadModal() {
  const { 
    avatarUrl, 
    isCustom, 
    setAvatar, 
    resetAvatar, 
    isUploadModalOpen, 
    closeUploadModal 
  } = useAvatar();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const processFile = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    // Read and compress image onto canvas to ensure lightweight localStorage persistence
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Create canvas for square/optimized avatar
        const canvas = document.createElement('canvas');
        const maxDim = 800; // Optimal resolution for avatar
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setPreviewUrl(compressedDataUrl);
        } else {
          setPreviewUrl(result);
        }
      };
      img.src = result;
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read the file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApply = () => {
    if (previewUrl) {
      setAvatar(previewUrl);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      closeUploadModal();
    }
  };

  const handleReset = () => {
    resetAvatar();
    setPreviewUrl(null);
    closeUploadModal();
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width > 800 ? 800 : img.width;
      canvas.height = img.height > 800 ? (img.height * 800) / img.width : img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setPreviewUrl(dataUrl);
          setErrorMessage(null);
          return;
        } catch {
          // CORS fallback
        }
      }
      setPreviewUrl(urlInput.trim());
      setErrorMessage(null);
    };
    img.onerror = () => {
      setErrorMessage('Could not load image from that URL. Please try downloading it and uploading the file instead.');
    };
    img.src = urlInput.trim();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={closeUploadModal}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add Your Photo</h2>
              <p className="text-xs text-slate-400">
                Upload your exact original photo (e.g. from WhatsApp or camera)
              </p>
            </div>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Drag & Drop / Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDragging 
                ? 'border-indigo-400 bg-indigo-500/10' 
                : 'border-slate-700 hover:border-slate-600 bg-slate-950/50 hover:bg-slate-950/80'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {previewUrl ? (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-xl mb-3 relative group">
                  <img
                    src={previewUrl}
                    alt="New Photo Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition-opacity">
                    Click to change
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Photo loaded! Click &quot;Apply to Portfolio&quot; below.
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Click to select or drag & drop your photo
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Select <span className="text-indigo-300 font-mono">IMG-20250119-WA0003[1].jpg</span> or any picture from your gallery
                  </p>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 font-medium">
                  PNG, JPG, JPEG, or WebP
                </div>
              </div>
            )}
          </div>

          {/* Alternative: URL input */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Or paste an Image Link / URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/my-photo.jpg"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors shrink-0"
              >
                Load
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <div>
              {isCustom && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeUploadModal}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApply}
                disabled={!previewUrl}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                  previewUrl
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply to Portfolio</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
