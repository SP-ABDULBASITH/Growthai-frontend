import { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import './App.css';

function App() {
  const [businessData, setBusinessData] = useState(null);
  const [formInfo, setFormInfo] = useState({ name: '', location: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ name, location }) => {
    setIsLoading(true);
    try {
      const res = await fetch('https://growthai-backend-q678.onrender.com/business-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location })
      });
      const data = await res.json();
      setBusinessData(data);
      setFormInfo({ name, location });
    } catch (err) {
      alert("Failed to fetch business data");
    } finally {
      setIsLoading(false);
    }
  };


  const regenerateHeadline = async () => {
    try {
      const res = await fetch(
        `https://growthai-backend-q678.onrender.com/regenerate-headline?name=${formInfo.name}&location=${formInfo.location}`
      );
      const data = await res.json();
      setBusinessData(prev => ({ ...prev, headline: data.headline }));
    } catch (err) {
      alert("Failed to regenerate headline");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-800">📈 Local Business Dashboard</h1>

        <BusinessForm onSubmit={handleSubmit} />

        {businessData && (
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800">📊 Business Overview</h2>
            <div className="text-gray-700 space-y-1">
              <p><span className="font-medium">⭐ Rating:</span> {businessData.rating}</p>
              <p><span className="font-medium">📝 Reviews:</span> {businessData.reviews}</p>
              <p><span className="font-medium">🧠 SEO Headline:</span> {businessData.headline}</p>
            </div>
            <button
              onClick={regenerateHeadline}
              className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? '🔁 Generating...' : '🔁 Regenerate SEO Headline'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;