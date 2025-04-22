import { usePageContext } from "../context/PageContext";

export const SelectDifficultyPage = () => {
  const { changePage, changeDifficulty } = usePageContext();
  const difficultyLevels = ['Easy', 'Medium', 'Hard']
  const buttonStyle = 'text-xl px-4 py-2 rounded-lg border border-gray-300 hover:bg-neutral-800 transition-colors duration-300 cursor-pointer disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-8'>
      <h1 className='text-4xl'>Select difficulty</h1>

      <div className='flex flex-col gap-4'>
        {difficultyLevels.map((levels, index) => (
        <button
          key={`${levels}-${index}`}
          onClick={() => {
              changeDifficulty(levels);
              changePage('GamePage');
            }}
          className={buttonStyle}
        >
          {levels}
        </button>
        ))}
      </div>

      <button
        onClick={() => changePage('MainMenuPage')}
        className='cursor-pointer'
      >
        Return
      </button>
    </div>
  );
};