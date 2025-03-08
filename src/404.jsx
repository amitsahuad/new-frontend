import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] min-w-[60vw] bg-gray-900">
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl max-w-md border border-gray-700">
        <h1 className="text-6xl font-bold text-blue-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          The link you followed may be broken or the page has been removed.
        </p>
        <div className="flex justify-center items-center space-x-2 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <div className="h-0.5 w-12 bg-gray-700"></div>
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;