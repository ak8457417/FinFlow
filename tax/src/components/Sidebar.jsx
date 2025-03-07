import { Info } from 'lucide-react';
import { TAX_GLOSSARY } from '../constants/taxRules';

export default function Sidebar({ darkMode, onDarkModeToggle }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">📚 Tax Dictionary</h2>
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          🌙 {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(TAX_GLOSSARY).map(([term, details]) => (
          <details key={term} className="group">
            <summary className="flex items-center cursor-pointer">
              <Info className="w-5 h-5 mr-2" />
              <span className="font-medium">What is {term}?</span>
            </summary>
            <div className="mt-2 pl-7 text-sm space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>📖 Description:</strong> {details.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>📝 Example:</strong> {details.example}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>🔢 Limit:</strong> {details.limit}
              </p>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Pro Tip: Hover over input labels for more info!
        </p>
      </div>
    </div>
  );
}