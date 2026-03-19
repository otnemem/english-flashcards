import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

function FileUploader({ onFileUpload }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        onFileUpload(file);
      } else {
        alert('Lütfen bir CSV dosyası seç! (Dosya adı .csv ile bitmelidir)');
      }
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        onFileUpload(file);
      } else {
        alert('Lütfen bir CSV dosyası seç!');
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-2">📚 Hoşgeldiniz!</h2>
        <p className="text-gray-600">İngilizce kelimeleri öğrenmek için bir CSV dosyası yükle</p>
      </div>

      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-4 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragActive
            ? 'border-purple-500 bg-purple-50 scale-105'
            : 'border-purple-300 bg-purple-50 hover:border-purple-400'
        }`}
      >
        <FiUploadCloud className="mx-auto text-5xl text-purple-500 mb-4" />
        <p className="text-purple-700 font-semibold mb-2">Dosya Sürükle ve Bırak</p>
        <p className="text-purple-600 text-sm mb-4">veya</p>

        <label className="cursor-pointer">
          <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-shadow inline-block">
            Dosya Seç
          </span>
          <input
            type="file"
            accept=".csv"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Formatı Açıkla */}
      <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <p className="text-sm text-blue-700 font-semibold mb-2">📝 CSV Formatı:</p>
        <p className="text-xs text-blue-600 font-mono bg-white p-2 rounded">
          hello;Merhaba<br />
          world;Dünya<br />
          book;Kitap
        </p>
      </div>
    </div>
  );
}

export default FileUploader;