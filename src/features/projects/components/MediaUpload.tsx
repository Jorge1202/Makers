'use client';

import { ProjectMedia } from '@/features/projects/types/project';
import { useRef, useState } from 'react';

interface MediaUploadProps {
  media: ProjectMedia[];
  onAddMedia: (files: FileList) => void;
  onRemoveMedia: (index: number) => void;
  onSetFeatured: (index: number) => void;
  onUpdateCaption: (index: number, caption: string) => void;
  maxFiles?: number;
}

export const MediaUpload = ({
  media,
  onAddMedia,
  onRemoveMedia,
  onSetFeatured,
  onUpdateCaption,
  maxFiles = 10
}: MediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const remainingSlots = maxFiles - media.length;
    if (remainingSlots <= 0) return;

    const filesArray = Array.from(files);
    const validFiles = filesArray.slice(0, remainingSlots);
    
    const dataTransfer = new DataTransfer();
    validFiles.forEach(file => dataTransfer.items.add(file));
    
    onAddMedia(dataTransfer.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
      e.target.value = ''; // Reset input
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Área de subida */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="space-y-2">
          <div className="text-gray-600">
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex text-sm text-gray-600 justify-center">
            <button
              type="button"
              onClick={openFileDialog}
              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
            >
              <span>Sube archivos</span>
            </button>
            <p className="pl-1">o arrastra y suelta</p>
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF, MP4 hasta 10MB cada uno. Máximo {maxFiles} archivos.
          </p>
          <p className="text-xs text-gray-500">
            Archivos subidos: {media.length}/{maxFiles}
          </p>
        </div>
      </div>

      {/* Vista previa de medios */}
      {media.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Vista previa de medios ({media.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item, index) => (
              <div
                key={index}
                className={`relative border rounded-lg overflow-hidden group ${
                  item.isFeatured ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Media preview */}
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-32 object-cover"
                    muted
                    playsInline
                  />
                )}

                {/* Overlay con controles */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => onSetFeatured(index)}
                      className={`p-2 rounded-full ${
                        item.isFeatured 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      title="Destacar"
                    >
                      ⭐
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveMedia(index)}
                      className="p-2 bg-white text-red-600 rounded-full hover:bg-gray-100"
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Badge de tipo */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.type === 'image' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.type === 'image' ? 'IMG' : 'VID'}
                  </span>
                  {item.isFeatured && (
                    <span className="ml-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      Destacada
                    </span>
                  )}
                </div>

                {/* Caption input */}
                <div className="p-2">
                  <input
                    type="text"
                    value={item.caption || ''}
                    onChange={(e) => onUpdateCaption(index, e.target.value)}
                    placeholder="Agregar descripción..."
                    className="w-full text-xs border-0 p-1 focus:ring-0"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Información de medios destacados */}
          {media.some(m => m.isFeatured) && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                ⭐ La imagen/video destacada será la portada de tu proyecto
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};