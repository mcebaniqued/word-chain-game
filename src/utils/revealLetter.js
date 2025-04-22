export const revealLetter = (word, index, revealedLetters, setRevealedLetters) => {
  const currentSet = revealedLetters[index] || new Set();

  const hiddenIndices = [...word]
    .map((_, i) => i)
    .filter(i => i !== 0 && !currentSet.has(i)); // Exclude first letter

  if (hiddenIndices.length > 1) {
    const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
    const newSet = new Set(currentSet);

    newSet.add(randomIndex);

    setRevealedLetters((prevMap) => ({
      ...prevMap,
      [index]: newSet
    }));

    return true; // revealed successfully
  }

  return false; // not enough hidden letters to reveal
};