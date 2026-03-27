import React from 'react';
import { FiVolume2 } from 'react-icons/fi';

function FlashCard({ card, isFlipped, onFlip, onSpeak, currentIndex, dueCount }) {
  return (
    <div className="flex flex-col items-center">
      {/* Due Counter */}
      <div className="text-center mb-4 bg-white px-5 py-2 rounded-full shadow-sm border border-purple-100">
        <p className="text-purple-700 font-bold text-sm">
          Due Words: <span className="text-pink-500">{dueCount}</span>
          <span className="text-gray-400 ml-2 font-normal">(Card {currentIndex + 1})</span>
        </p>
      </div>

      {/* Flip Card */}
      <div
        className="flip-card w-full max-w-md h-80 cursor-pointer"
        onClick={onFlip}
      >
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front - English */}
          <div className="flip-card-front bg-gradient-to-br from-pink-300 to-purple-400 rounded-3xl shadow-2xl border-4 border-white flex flex-col items-center justify-center p-6">
            <p className="text-white text-6xl font-bold text-center break-words mb-6">
              {card.word}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(card.word);
              }}
              className="bg-white text-purple-500 p-4 rounded-full hover:bg-purple-100 transition-all transform hover:scale-110 shadow-lg"
              title="Listen to pronunciation"
            >
              <FiVolume2 className="text-3xl" />
            </button>
            <p className="text-white text-sm mt-6 font-semibold opacity-75">
              Click to see the translation! 👇
            </p>
          </div>

          {/* Back - Translation */}
          <div className="flip-card-back bg-gradient-to-br from-blue-300 to-cyan-400 rounded-3xl shadow-2xl border-4 border-white flex items-center justify-center p-6">
            <p className="text-white text-5xl font-bold text-center break-words">
              {card.meaning}
            </p>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-6 text-center">
        <p className="text-purple-700 text-sm font-semibold">
          💡 Use the spacebar or mouse to flip the card
        </p>
      </div>
    </div>
  );
}

export default FlashCard;