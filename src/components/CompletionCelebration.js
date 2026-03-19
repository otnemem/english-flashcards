import React from 'react';

function CompletionCelebration({ onRestart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center animate-bounce">
        {/* Başlık */}
        <h2 className="text-5xl font-bold mb-4">
          🎉 Tebrikler! 🎉
        </h2>

        {/* Mesaj */}
        <p className="text-2xl text-purple-700 font-semibold mb-3">
          Tüm Kelimeleri Öğrendin! 🌟
        </p>

        <p className="text-gray-600 mb-8 text-lg">
          Çok güzel bir iş çıkardın! İngilizce öğreniminde harika ilerleme kaydettiniz.
        </p>

        {/* Emoji Dekorasyonu */}
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

        {/* Baştan Başla Butonu */}
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
        >
          📚 Yeni Dosya Yükle
        </button>

        {/* Motivasyon Metni */}
        <p className="text-purple-600 text-sm mt-6 italic">
          "Başarı küçük adımlarla gelir. Bugünkü başarın yarının temelini oluşturuyor!" 💪
        </p>
      </div>
    </div>
  );
}

export default CompletionCelebration;