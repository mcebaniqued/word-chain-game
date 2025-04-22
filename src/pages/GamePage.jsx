import { useEffect, useState } from "react";
import useChainingWords from "../hooks/useChainingWords";
import { usePageContext } from "../context/PageContext";
import { revealLetter } from "../utils/revealLetter";

export const GamePage = () => {
  const { difficulty, changePage } = usePageContext();

  const wordCount = difficulty === "Easy" ? 4 :
                    difficulty === "Medium" ? 7 :
                    difficulty === "Hard" ? 11 : 4;

  const { chainedWords, generateChain } = useChainingWords(wordCount);

  const [guess, setGuess] = useState('');
  const [currentIndex, setCurrentIndex] = useState(1);
  const [revealed, setRevealed] = useState([0]);
  const [feedback, setFeedback] = useState({});
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState({});
  const [hints, setHints] = useState(3);

  const buttonStyle = 'text-xl px-4 py-2 rounded-lg border border-gray-300 hover:bg-neutral-800 transition-colors duration-300 cursor-pointer disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed';

  useEffect(() => {
    generateChain();
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    const normalizedGuess = guess.trim().toLowerCase();
    const currentWord = chainedWords[currentIndex]?.toLowerCase();
    const isCorrect = normalizedGuess === currentWord;

    if (isCorrect) {
      setFeedback((f) => ({ ...f, [currentIndex]: 'correct' }));

      setTimeout(() => {
        setRevealed((prev) => [...prev, currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        setIncorrectGuesses(0);
        setFeedback((f) => ({ ...f, [currentIndex]: null }));
      }, 500);
    } else {
      setFeedback((f) => ({ ...f, [currentIndex]: 'wrong' }));

      setTimeout(() => {
        setFeedback((f) => ({ ...f, [currentIndex]: null }));
      }, 500);

      setIncorrectGuesses((prev) => {
        const newCount = prev + 1;

        // If 3 incorrect guesses, reveal a letter
        if (newCount === 3) {
          const word = chainedWords[currentIndex];

          revealLetter(word, currentIndex, revealedLetters, setRevealedLetters);
          return 0; // reset after hint
        }

        return newCount;
      });
    }

    setGuess('');
  };

  const currentWord = chainedWords[currentIndex];
  const revealedSet = revealedLetters[currentIndex] || new Set();
  const hiddenIndices = currentWord
    ? [...currentWord]
        .map((_, i) => i)
        .filter(i => i !== 0 && !revealedSet.has(i))
    : [];

  const isRevealDisabled =
    hints <= 0 ||
    currentIndex >= chainedWords.length ||
    revealed.includes(currentIndex) ||
    hiddenIndices.length <= 1;

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-6">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <h1 className="text-2xl">Guess the next word:</h1>
        <form onSubmit={handleGuess}>
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full max-w-xs text-center text-3xl h-12 tracking-widest bg-neutral-600 rounded-md font-mono p-3 transition-all duration-300"
            disabled={currentIndex >= chainedWords.length}
            autoFocus
          />
        </form>
      </div>

      {chainedWords.map((word, index) => {
        const isFullyRevealed = revealed.includes(index);
        const animationState = feedback[index];
        const revealedSet = revealedLetters[index] || new Set();

        const displayWord = word
          .split('')
          .map((char, i) =>
            isFullyRevealed || revealedSet.has(i)
              ? char
              : i === 0 ? char : '_'
          )
          .join(' ');

        const baseClasses = "text-2xl font-mono block transition-colors duration-500";
        const feedbackClass = animationState === 'correct'
          ? 'text-green-500 animate-[--animate-fade-in-scale]'
          : animationState === 'wrong'
          ? 'text-red-500 animate-[--animate-shake]'
          : '';

        return (
          <span key={index} className={`${baseClasses} ${feedbackClass}`}>
            {displayWord}
          </span>
        );
      })}

      <div className='flex items-center justify-center gap-4 pt-8'>
        <button
          onClick={() => changePage('SelectDifficultyPage')}
          className={buttonStyle}
        >
          Change difficulty
        </button>
        <button
          onClick={() => {
            setCurrentIndex(1);
            setRevealed([0]);
            setFeedback({});
            setIncorrectGuesses(0);
            setRevealedLetters({});
            generateChain();
          }}
          className={buttonStyle}
        >
          Restart
        </button>
        <button
          onClick={() => {
            if (currentWord && hiddenIndices.length > 1) {
              revealLetter(currentWord, currentIndex, revealedLetters, setRevealedLetters);
              setHints((prev) => prev - 1);
            }
          }}
          disabled={isRevealDisabled}
          className={buttonStyle}
        >
          {`Reveal a letter (${hints})`}
        </button>
      </div>
    </div>
  );
};