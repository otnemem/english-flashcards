import React from 'react';

function ProgressBar({ learned, total }) {
  const percentage = total === 0 ? 0 : (learned / total) * 100;

  return (
    <div className="bg-white rounded-full shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <p className="text-purple-700 font-bold text-lg">Progress</p>
        <p className="text-purple-600 font-semibold">
          {learned} / {total}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-purple-100 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && (
            <span className="text-white font-bold text-sm">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>

      {/* Motivation Text */}
      <div className="mt-4 text-center">
        {percentage === 0 && (
          <p className="text-purple-600 font-semibold">🚀 Let's get started!</p>
        )}
        {percentage > 0 && percentage < 50 && (
          <p className="text-purple-600 font-semibold">💪 Great start!</p>
        )}
        {percentage >= 50 && percentage < 100 && (
          <p className="text-purple-600 font-semibold">🌟 Almost there!</p>
        )}
        {percentage === 100 && (
          <p className="text-purple-600 font-semibold">🎉 Congratulations!</p>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;