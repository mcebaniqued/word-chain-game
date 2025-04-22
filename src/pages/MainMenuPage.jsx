import { usePageContext } from "../context/PageContext";

export const MainMenuPage = () => {
  const { changePage } = usePageContext();
  const buttonStyle = 'text-xl px-4 py-2 rounded-lg border border-gray-300 hover:bg-neutral-800 transition-colors duration-300 cursor-pointer disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-8'>
      <h1 className='text-4xl'>Word Chain</h1>

      <button
        onClick={() => changePage('SelectDifficultyPage')}
        className={buttonStyle}
      >
        Start
      </button>
    </div>
  );
};