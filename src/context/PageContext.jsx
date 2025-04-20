import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('MainMenuPage');
  const [difficulty, setDifficulty] = useState(null);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const changeDifficulty = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
  };

  return (
    <PageContext.Provider value={{
      currentPage,
      changePage,
      difficulty,
      changeDifficulty,
    }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  return useContext(PageContext);
}