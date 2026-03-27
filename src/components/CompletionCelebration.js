import React from 'react';

function CompletionCelebration({ onRestart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center animate-bounce">
        {/* Title */}
        <h2 className="text-5xl font-bold mb-4">
          🎉 Congratulations! 🎉
        </h2>

        {/* Message */}
        <p className="text-2xl text-purple-700 font-semibold mb-3">
          You've Learned All the Words! 🌟
        </p>

        <p className="text-gray-600 mb-8 text-lg">
          Great job! You've made fantastic progress in your English learning.
        </p>

        {/* Emoticons */}
        <div className="flex justify-center gap-4 text-6xl mb-8">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>
            ⭐
          </span>
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
            🎯
          </span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            💎
          </span>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
        >
          📚 Upload New File
        </button>

        {/* Motivation Text */}
        <p className="text-purple-600 text-sm mt-6 italic">
          "Success comes in small steps. Today's success builds the foundation for tomorrow!" 💪
        </p>
      </div>
    </div>
  );
}

export default CompletionCelebration;