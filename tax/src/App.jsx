import { useState } from 'react';
import { TAX_RULES } from './constants/taxRules';
import TaxForm from './components/TaxForm';
import TaxResults from './components/TaxResults';
import Sidebar from './components/Sidebar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [results, setResults] = useState(null);

  const handleFormSubmit = (data) => {
    // Generate suggestions
    const suggestions = [];
    for (const [section, rule] of Object.entries(TAX_RULES)) {
      if (rule.condition(data)) {
        suggestions.push([section, rule.suggestion(data), rule.limit]);
      }
    }
    
    setResults({ data, suggestions });
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            <aside>
              <Sidebar darkMode={darkMode} onDarkModeToggle={() => setDarkMode(!darkMode)} />
            </aside>

            <main>
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">💰 Tax Guru</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Your AI-Powered Tax Optimization Companion
                </p>
              </div>

              <TaxForm onSubmit={handleFormSubmit} />
              
              {results && <TaxResults {...results} />}

              <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
                <p>📢 Note: This tool provides general guidance. Consult a CA for complex cases</p>
                <p className="mt-2">Made with ❤ by Tax Guru • v2.0</p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;