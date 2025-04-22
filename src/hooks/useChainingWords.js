import { compoundWords } from "../data/compoundWords";
import { useState } from "react";

const useChainingWords = (count = 4) => {
  const [chainedWords, setChainedWords] = useState([]);
  const maxTries = 1000;

  const generateChain = () => {
    let chain = [];
    const usedWords = new Set();
    const usedPairs = [];
    const usedPairsSet = new Set();

    let attempts = 0;

    while (chain.length < count && attempts++ < maxTries) {
      // If chain is empty, start with a random compound word
      if (chain.length === 0) {
        const first = compoundWords[Math.floor(Math.random() * compoundWords.length)];

        chain.push(first.first, first.second);
        usedWords.add(first.first);
        usedWords.add(first.second);
        usedPairs.push(first);
        usedPairsSet.add(`${first.first}:${first.second}`);
        continue;
      }

      const lastWord = chain[chain.length - 1];

      const candidates = compoundWords.filter(
        (word) =>
          word.first === lastWord &&
          !usedWords.has(word.second) &&
          !usedPairsSet.has(`${word.first}:${word.second}`)
      );

      if (candidates.length > 0) {
        const picked = candidates[Math.floor(Math.random() * candidates.length)];

        chain.push(picked.second);
        usedWords.add(picked.first);
        usedWords.add(picked.second);
        usedPairs.push(picked);
        usedPairsSet.add(`${picked.first}:${picked.second}`);
      } else {
        if (usedPairs.length > 0) {
          const lastUsed = usedPairs.pop();

          usedPairsSet.add(`${lastUsed.first}:${lastUsed.second}`);

          if (usedPairs.length === 0) {
            // First compound, remove both
            chain.pop();
            chain.pop();
            usedWords.delete(lastUsed.first);
            usedWords.delete(lastUsed.second);
          } else {
            // Mid-chain: only remove second
            if (chain[chain.length - 1] === lastUsed.second) {
              chain.pop();
              usedWords.delete(lastUsed.second);
            }
          }
        } else {
          // Fully reset
          chain = [];
          usedWords.clear();
          usedPairs.length = 0;
          usedPairsSet.clear();
        }
      }
    }

    setChainedWords(chain.slice(0, count));
  };

  return { chainedWords, generateChain };
};

export default useChainingWords;
