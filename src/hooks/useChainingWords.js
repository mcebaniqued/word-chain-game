import { compoundWords } from "../data/compoundWords";
import { useState } from "react";

const useChainingWords = (count = 4) => {
  const [chainedWords, setChainedWords] = useState([]);

  const generateChain = () => {
    let chain = [];
    let tries = 0; // Track the number of retry attempts

    // Keep trying to generate a valid chain
    while (chain.length < count * 2 && tries < 10) { // *2 because we want to add two words (first and second) per iteration
      // Start with a new random compound word
      let currentWord = compoundWords[Math.floor(Math.random() * compoundWords.length)];
      // console.log("Starting with:", currentWord); // Debugging output

      chain = [currentWord.first, currentWord.second]; // Start with the first compound word split into separate parts
      // console.log("Initial Chain:", chain); // Debugging output

      // Try chaining words until we reach the desired count or can't chain anymore
      while (chain.length < count * 2) {
        // Use .filter() to find all valid next words that start with the current second word
        const possibleNextWords = compoundWords.filter(
          (item) => item.first === currentWord.second
        );
        // console.log("Possible Next Words:", possibleNextWords); // Debugging output

        if (possibleNextWords.length > 0) {
          // Pick a random next word from the possible valid words
          const nextCompound = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
          chain.push(nextCompound.second);
          currentWord = nextCompound; // Update current word for the next iteration
          tries = 0; // Reset retry counter when a valid word is found
        } else {
          // No valid next compound found, stop trying this chain and start a new one
          tries++;
          break; // Break the loop to try a new starting word
        }
      }

      // If the chain couldn't be generated after multiple retries, exit the loop
      if (chain.length < count * 2 && tries >= 10) {
        // console.log("Failed to generate a valid chain after several attempts");
        break;
      }
    }

    // If we don't have enough words to match the count, we trim the array to the desired count
    setChainedWords(chain.slice(0, count)); // Slice to ensure we only return 'count' words (not doubled)
  };

  // console.log("Chained Words:", chainedWords); // Debugging output

  return { chainedWords, generateChain };
};

export default useChainingWords;