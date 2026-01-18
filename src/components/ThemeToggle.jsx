import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-md hover:shadow-lg relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <span className="text-2xl relative z-10 transform group-hover:rotate-180 transition-transform duration-500">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
    </button>
  );
};
