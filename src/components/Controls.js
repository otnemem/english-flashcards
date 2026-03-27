import React from 'react';
import { FiChevronLeft, FiChevronRight, FiShuffle, FiCheck, FiRotateCcw } from 'react-icons/fi';

function Controls({ onKnown, onUnknown, onNext, onPrevious, onShuffle }) {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={onUnknown}
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-red-400 to-pink-500 hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <FiRotateCcw className="text-2xl" />
          Don't Know (Repeat)
        </button>

        <button
          onClick={onKnown}
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <FiCheck className="text-2xl" />
          Know (Learned!) ✨
        </button>
      </div>

      {/* Navigation & Shuffle Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-indigo-500 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <FiChevronLeft className="text-2xl" />
          Previous
        </button>

        <button
          onClick={onShuffle}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <FiShuffle className="text-2xl" />
          Shuffle
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-indigo-500 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Next
          <FiChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-white rounded-xl p-4 shadow-md text-center max-w-md mx-auto">
        <p className="text-gray-600 text-sm font-semibold mb-2">⌨️ Keyboard Shortcuts:</p>
        <p className="text-gray-500 text-xs leading-relaxed">
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">←</span> Don't Know |
          <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-2">→</span> Know <br className="my-1" />
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">↑</span> Previous Card |
          <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-2">↓</span> Next Card <br className="my-1" />
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">Space</span> Flip
        </p>
      </div>
    </div>
  );
}

export default Controls;