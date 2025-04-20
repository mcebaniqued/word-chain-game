import { useEffect, useState } from "react";
import useChainingWords from "../hooks/useChainingWords";
import { usePageContext  } from "../context/PageContext";

export const GamePage = () => {
  const { difficulty } = usePageContext();
  const wordCount = difficulty === 'Easy' ? 5 :
                    difficulty === 'Medium' ? 8 :
                    difficulty === 'Hard' ? 12 : 5;
  const { chainedWords, generateChain } = useChainingWords(wordCount);

  const [guess, setGuess] = useState('');
  const [currentIndex, setCurrentIndex] = useState(1);
  const [revealed, setRevealed] = useState([0]);
  const [feedback, setFeedback] = useState({});

  const handleGuess = (e) => {
    e.preventDefault();

    const correct = guess.trim().toLowerCase() === chainedWords[currentIndex].toLowerCase();

    if (correct) {
      setFeedback((f) => ({ ...f, [currentIndex]: 'correct' }));
      setTimeout(() => {
        setRevealed((prev) => [...prev, currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        setFeedback((f) => ({ ...f, [currentIndex]: null }));
      }, 500);
    } else {
      setFeedback((f) => ({ ...f, [currentIndex]: 'wrong' }));
      setTimeout(() => {
        setFeedback((f) => ({ ...f, [currentIndex]: null }));
      }, 500);
    }

    setGuess('');
  };

  useEffect(() => {
    generateChain();
  }, []);

  useEffect(() => {
    console.log(chainedWords)
  }, [chainedWords])

  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-6'>
      <div className='flex flex-col gap-4 w-full items-center justify-center'>
        <h1 className='text-2xl'>Guess the next word:</h1>
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
        const isRevealed = revealed.includes(index);
        const animationState = feedback[index];

        let displayWord = isRevealed
          ? word
          : word[0] + ' _'.repeat(word.length - 1);

        const baseClasses = "text-2xl font-mono block transition-colors duration-500";
        const feedbackClass = animationState === 'correct'
          ? 'text-green-500 animate-[--animate-fade-in-scale]'
          : animationState === 'wrong'
          ? 'text-red-500 animate-[--animate-shake]'
          : '';

        return (
          <span
            key={index}
            className={`${baseClasses} ${feedbackClass}`}
          >
            {displayWord}
          </span>
        );
      })}
    </div>
  )
};