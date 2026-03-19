import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Confetti from 'react-confetti';
import FileUploader from './components/FileUploader';
import FlashCard from './components/FlashCard';
import ProgressBar from './components/ProgressBar';
import Controls from './components/Controls';
import CompletionCelebration from './components/CompletionCelebration';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedCards, setLearnedCards] = useState(new Set());
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // CSV dosyasını yükle
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedCards = results.data
          .map((row) => ({
            word: row[0]?.trim() || '',
            meaning: row[1]?.trim() || '',
          }))
          .filter((card) => card.word && card.meaning);

        if (parsedCards.length === 0) {
          alert('CSV dosyasından geçerli kelime bulunamadı. Lütfen dosya formatını kontrol et.');
          return;
        }

        setCards(parsedCards);
        setCurrentIndex(0);
        setLearnedCards(new Set());
        setIsFlipped(false);
        setShowCelebration(false);
      },
      error: (error) => {
        alert(`Dosya yüklenirken hata oluştu: ${error.message}`);
      },
    });
  };

    // Telaffuz
  const speak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 0.9;
    utterance.volume = 1.0;
    
    // Sesler listesinden İngilizce seç
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Google')
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    } else {
      // Eğer Google sesi yoksa, İngilizce herhangi birini seç
      const alternativeVoice = voices.find(voice => voice.lang.startsWith('en'));
      if (alternativeVoice) {
        utterance.voice = alternativeVoice;
      }
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // Kart tıklandığında flip
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Öğrendim butonu
  const markAsLearned = () => {
    const newLearned = new Set(learnedCards);
    newLearned.add(currentIndex);
    setLearnedCards(newLearned);

    if (newLearned.size === cards.length) {
      setShowCelebration(true);
    } else {
      goToNext();
    }
  };

  // Tekrar Et butonu
  const markAsRepeat = () => {
    goToNext();
  };

  // Sonraki karta git
  const goToNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Önceki karta git
  const goToPrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(cards.length - 1);
    }
  };

  // Kartları karıştır
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Klavye tuşları (Ok tuşları)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (cards.length === 0) return;

      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, cards.length, goToNext, goToPrevious, toggleFlip]);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
        <FileUploader onFileUpload={handleFileUpload} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      {showCelebration && <Confetti />}

      <div className="max-w-2xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">🎓 English Flashcards</h1>
          <p className="text-purple-600">İngilizce kelimeleri öğren ve eğlen!</p>
        </div>

        {/* İlerleme Çubuğu */}
        <ProgressBar learned={learnedCards.size} total={cards.length} />

        {/* Kart */}
        <div className="my-8">
          {cards.length > 0 && (
            <FlashCard
              card={cards[currentIndex]}
              isFlipped={isFlipped}
              onFlip={toggleFlip}
              onSpeak={speak}
              cardNumber={currentIndex + 1}
              totalCards={cards.length}
            />
          )}
        </div>

        {/* Butonlar */}
        <Controls
          onMarkAsLearned={markAsLearned}
          onMarkAsRepeat={markAsRepeat}
          onNext={goToNext}
          onPrevious={goToPrevious}
          onShuffle={shuffleCards}
          isLearned={learnedCards.has(currentIndex)}
        />

        {/* Tamamlama Kutlaması */}
        {showCelebration && (
          <CompletionCelebration
            onRestart={() => {
              setCards([]);
              setLearnedCards(new Set());
              setShowCelebration(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;