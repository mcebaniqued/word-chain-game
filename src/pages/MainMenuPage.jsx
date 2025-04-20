import { usePageContext } from "../context/PageContext";

export const MainMenuPage = () => {
  const { changePage } = usePageContext();
  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-8'>
      <h1 className='text-4xl'>Word Chain</h1>

      <button
        onClick={() => changePage('SelectDifficultyPage')}
        className='text-2xl rounded-lg border border-gray-50'
      >
        Start
      </button>
    </div>
  );
};