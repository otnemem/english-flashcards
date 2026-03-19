import React from 'react';
import { FiChevronLeft, FiChevronRight, FiShuffle, FiCheck, FiRotateCcw } from 'react-icons/fi';

function Controls({
  onMarkAsLearned,
  onMarkAsRepeat,
  onNext,
  onPrevious,
  onShuffle,
  isLearned,
}) {
  return (
    <div className="space-y-6">
      {/* Öğrendim / Tekrar Et Butonları */}
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={onMarkAsLearned}
          disabled={isLearned}
          className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
            isLearned
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:shadow-xl active:scale-95'
          }`}
        >
          <FiCheck className="text-2xl" />
          Öğrendim! ✨
        </button>

        <button
          onClick={onMarkAsRepeat}
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-red-400 to-pink-500 hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <FiRotateCcw className="text-2xl" />
          Tekrar Et
        </button>
      </div>

      {/* Navigasyon Butonları */}
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-indigo-500 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <FiChevronLeft className="text-2xl" />
          Önceki
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-indigo-500 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Sonraki
          <FiChevronRight className="text-2xl" />
        </button>

        <button
          onClick={onShuffle}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <FiShuffle className="text-2xl" />
          Karıştır
        </button>
      </div>

      {/* Klavye İpuçları */}
      <div className="bg-white rounded-xl p-4 shadow-md text-center">
        <p className="text-gray-600 text-sm font-semibold mb-2">⌨️ Klavye Kısayolları:</p>
        <p className="text-gray-500 text-xs">
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">←</span> Önceki |
          <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-2">→</span> Sonraki |
          <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-2">Boşluk</span> Döndür
        </p>
      </div>
    </div>
  );
}

export default Controls;