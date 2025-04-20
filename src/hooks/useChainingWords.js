import { compoundWords } from "../data/compoundWords";
import { useState } from "react";

const useChainingWords = (count = 5) => {
  const [chainedWords, setChainedWords] = useState([]);

  const generateChain = () => {
    // Pick a random compound word
    let currentWord = compoundWords[Math.floor(Math.random() * compoundWords.length)];
    const chain = [currentWord.first, currentWord.second]; // Start with the first compound word split into separate parts

    // Keep chaining until we either reach the count or can't chain any further
    while (chain.length < count * 2) {  // *2 because we want to add two words (first and second) per iteration
      const nextCompound = compoundWords.find(
        (item) => item.first === currentWord.second
      );

      if (nextCompound) {
        // Only add the second word if it's not already the last word in the chain
        chain.push(nextCompound.second);
        currentWord = nextCompound; // Update current word for the next iteration
      } else {
        break; // No more chaining possible
      }
    }

    // If we don't have enough words to match the count, we trim the array to the desired count
    setChainedWords(chain.slice(0, count)); // Slice to ensure we only return 'count' words (not doubled)
  };

  return { chainedWords, generateChain };
};

export default useChainingWords;