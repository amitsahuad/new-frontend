import React, { useState } from 'react';

const ApiTextInput = () => {
  const [inputText, setInputText] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading , setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try {
      const response = await fetch('https://test.loophj.com/addEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: inputText
      });

      setLoading(false);

      if (response.status === 200) {
        setResponseStatus('success');
        setErrorMessage('');
      } else {
        setResponseStatus('error');
        setErrorMessage(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      setResponseStatus('error');
      setErrorMessage(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter email address"
          rows={6}
          className="w-full p-4 text-xl border-4 text-black border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent resize-y"
        />
        <button 
      disabled={loading}
      type="submit" 
      className="w-full text-xl bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
    >
      {loading ? (
        <div className="flex items-center">
          <svg 
            className="animate-spin h-5 w-5 mr-3 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Submitting Request...
        </div>
      ) : (
        "Submit Request"
      )}
    </button>

    <button 
        onClick={(e) => {
          e.preventDefault()
          setInputText('')
        }}
        className="bg-blue-500 w-full h-12 hover:bg-blue-600 text-white px-4 py-1 rounded transition-colors"
      >
        Clear
      </button>

        {responseStatus === 'success' && (
          <div 
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" 
            role="alert"
          >
            <p className="font-bold text-lg">Success!</p>
            <p>Your request was processed successfully.</p>
          </div>
        )}

        {responseStatus === 'error' && (
          <div 
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" 
            role="alert"
          >
            <p className="font-bold text-lg">Error!</p>
            <p>{errorMessage || 'Something went wrong'}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApiTextInput;