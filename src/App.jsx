import { PageProvider, usePageContext } from "./context/PageContext";
import { MainMenuPage } from "./pages/MainMenuPage";
import { SelectDifficultyPage } from "./pages/SelectDifficultyPage";
import { GamePage } from "./pages/GamePage";

export const App = () => {
  return (
    <PageProvider>
      <MainApp />
    </PageProvider>
  );
};

const MainApp = () => {
  const { currentPage } = usePageContext();
  console.log(currentPage)

  const renderPage = () => {
    switch (currentPage) {
      case 'MainMenuPage':
        return <MainMenuPage />
      case 'SelectDifficultyPage':
        return <SelectDifficultyPage />
      case 'GamePage':
        return <GamePage />
      default:
        return <MainMenuPage />
    }
  };

  return (
    <div className='flex w-full h-full justify-center items-center'>
      {renderPage()}
    </div>
  );
};