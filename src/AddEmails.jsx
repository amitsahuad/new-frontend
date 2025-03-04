import React, { useState } from 'react';

const ApiTextInput = () => {
  const [inputText, setInputText] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://api.loophj.com/addEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: inputText
      });

      if (response.status === 200) {
        setResponseStatus('success');
        setErrorMessage('');
      } else {
        setResponseStatus('error');
        setErrorMessage(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      setResponseStatus('error');
      setErrorMessage(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter email address"
          rows={6}
          className="w-full p-4 text-xl border-4 text-black border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent resize-y"
        />
        
        <button 
          type="submit" 
          className="w-full text-xl bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Request
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