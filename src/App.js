import React, { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import Confetti from 'react-confetti';
import FileUploader from './components/FileUploader';
import FlashCard from './components/FlashCard';
import ProgressBar from './components/ProgressBar';
import Controls from './components/Controls';
import CompletionCelebration from './components/CompletionCelebration';
import './App.css';

function App() {
  const [allCards, setAllCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [nowTime, setNowTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNowTime(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  const dueCards = allCards.filter((c) => c.nextReviewDate <= nowTime);
  const safeIndex = currentIndex >= dueCards.length ? 0 : currentIndex;
  const activeCard = dueCards[safeIndex];

  const learnedCount = allCards.filter((c) => c.nextReviewDate > nowTime).length;
  const totalCards = allCards.length;

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      delimiter: ';',
      complete: (results) => {
        const srsData = JSON.parse(localStorage.getItem('english_flashcards_srs') || '{}');

        const parsedCards = results.data
          .map((row) => {
            const word = row[0]?.trim() || '';
            const meaning = row[1]?.trim() || '';

            if (!word || !meaning) return null;

            return {
              word,
              meaning,
              repetition: srsData[word]?.repetition || 0,
              interval: srsData[word]?.interval || 0,
              nextReviewDate: srsData[word]?.nextReviewDate || 0,
            };
          })
          .filter(Boolean);

        if (parsedCards.length === 0) {
          alert('No valid words found in the CSV file. Please check the file format.');
          return;
        }

        setAllCards(parsedCards);
        setNowTime(Date.now());
        setCurrentIndex(0);
        setIsFlipped(false);
        setShowCelebration(false);
      },
      error: (error) => {
        alert(`Error loading file: ${error.message}`);
      },
    });
  };

  const speak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
      || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);
  };

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const goToNext = useCallback(() => {
    setIsFlipped(false);
    if (dueCards.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % dueCards.length);
    }
  }, [dueCards.length]);

  const goToPrevious = useCallback(() => {
    setIsFlipped(false);
    if (dueCards.length > 0) {
      setCurrentIndex((prev) => (prev === 0 ? dueCards.length - 1 : prev - 1));
    }
  }, [dueCards.length]);

  const shuffleCards = () => {
    setIsFlipped(false);
    setAllCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const updateCardSRS = (word, rep, int, nextDate) => {
    const updatedCards = allCards.map(c =>
      c.word === word ? { ...c, repetition: rep, interval: int, nextReviewDate: nextDate } : c
    );
    setAllCards(updatedCards);

    const srsData = JSON.parse(localStorage.getItem('english_flashcards_srs') || '{}');
    srsData[word] = { repetition: rep, interval: int, nextReviewDate: nextDate };
    localStorage.setItem('english_flashcards_srs', JSON.stringify(srsData));

    setNowTime(Date.now());
    setIsFlipped(false);

    if (updatedCards.filter(c => c.nextReviewDate > Date.now()).length === updatedCards.length) {
      setShowCelebration(true);
    }
  };

  const handleKnown = useCallback(() => {
    if (!activeCard) return;
    let rep = activeCard.repetition + 1;
    let int = activeCard.interval;

    if (rep === 1) int = 1;
    else if (rep === 2) int = 6;
    else int = Math.round(int * 2.5);

    const nextDate = Date.now() + (int * 24 * 60 * 60 * 1000);
    updateCardSRS(activeCard.word, rep, int, nextDate);
  }, [activeCard, allCards]);

  const handleUnknown = useCallback(() => {
    if (!activeCard) return;
    updateCardSRS(activeCard.word, 0, 0, Date.now());
    goToNext();
  }, [activeCard, allCards, goToNext]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (allCards.length === 0 || showCelebration) return;

      if (e.key === 'ArrowRight') {
        handleKnown();
      } else if (e.key === 'ArrowLeft') {
        handleUnknown();
      } else if (e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowUp') {
        goToPrevious();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [allCards.length, showCelebration, isFlipped, handleKnown, handleUnknown, goToNext, goToPrevious]);

  if (allCards.length === 0) {
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">🎓 English Flashcards</h1>
          <p className="text-purple-600">Spaced Repetition System</p>
        </div>

        <ProgressBar learned={learnedCount} total={totalCards} />

        <div className="my-8">
          {dueCards.length > 0 ? (
            <FlashCard
              card={activeCard}
              isFlipped={isFlipped}
              onFlip={toggleFlip}
              onSpeak={speak}
              currentIndex={safeIndex}
              dueCount={dueCards.length}
            />
          ) : (
            <div className="text-center bg-white p-10 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-bold text-green-500 mb-4">Great Job! 🎉</h2>
              <p className="text-gray-600 text-lg">You have finished all the words you need to review today.</p>
              <p className="text-gray-500 mt-2">You can upload a new CSV if you want to practice more.</p>
            </div>
          )}
        </div>

        {dueCards.length > 0 && !showCelebration && (
          <Controls
            onKnown={handleKnown}
            onUnknown={handleUnknown}
            onNext={goToNext}
            onPrevious={goToPrevious}
            onShuffle={shuffleCards}
          />
        )}

        {showCelebration && (
          <CompletionCelebration
            onRestart={() => {
              setAllCards([]);
              setShowCelebration(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;