import React, { useEffect, useState } from 'react';


const translations = {
    en: {
      title: "Reset Password",
      subtitle: "Enter your email to receive password reset links.",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      sendButton: "Send Reset Links",
      processing: "Processing...",
      errorGeneric: "Something went wrong. Please try again.",
      successTitle: "Reset Links Ready",
      successMessage: "We've generated reset links for",
      linksTitle: "Your Reset Links:",
      resetLink: "Reset Link",
      expiresIn: "Expires in",
      clickInstructions: "Click on a link above to reset your password. Links will open in a new tab.",
      requestNew: "Request New Links"
    },
    es: {
      title: "Restablecer Contraseña",
      subtitle: "Ingresa tu correo para recibir enlaces de restablecimiento.",
      emailLabel: "Correo Electrónico",
      emailPlaceholder: "Ingresa tu correo",
      sendButton: "Enviar Enlaces",
      processing: "Procesando...",
      errorGeneric: "Algo salió mal. Por favor, inténtalo de nuevo.",
      successTitle: "Enlaces Listos",
      successMessage: "Hemos generado enlaces de restablecimiento para",
      linksTitle: "Tus Enlaces de Restablecimiento:",
      resetLink: "Enlace",
      expiresIn: "Expira en",
      clickInstructions: "Haz clic en un enlace para restablecer tu contraseña. Los enlaces se abrirán en una nueva pestaña.",
      requestNew: "Solicitar Nuevos Enlaces"
    },
    ph: {
      title: "I-reset ang Password",
      subtitle: "Ilagay ang iyong email upang makatanggap ng mga link para i-reset ang password.",
      emailLabel: "Email Address",
      emailPlaceholder: "Ilagay ang iyong email",
      sendButton: "Magpadala ng Reset Links",
      processing: "Pinoproseso...",
      errorGeneric: "May nangyaring mali. Paki-subukan muli.",
      successTitle: "Mga Reset Link Nandiyan Na",
      successMessage: "Nagawa naming mag-generate ng reset links para sa",
      linksTitle: "Iyong mga Reset Link:",
      resetLink: "Reset Link",
      expiresIn: "Mag-eexpire sa",
      clickInstructions: "I-click ang isang link sa itaas upang i-reset ang iyong password. Magbubukas ang mga link sa isang bagong tab.",
      requestNew: "Mag-request ng Bagong Link"
    },
    id: {
      title: "Atur Ulang Kata Sandi",
      subtitle: "Masukkan email Anda untuk menerima tautan pengaturan ulang kata sandi.",
      emailLabel: "Alamat Email",
      emailPlaceholder: "Masukkan email Anda",
      sendButton: "Kirim Tautan Pengaturan Ulang",
      processing: "Memproses...",
      errorGeneric: "Terjadi kesalahan. Silakan coba lagi.",
      successTitle: "Tautan Pengaturan Ulang Siap",
      successMessage: "Kami telah membuat tautan pengaturan ulang untuk",
      linksTitle: "Tautan Pengaturan Ulang Anda:",
      resetLink: "Tautan Pengaturan Ulang",
      expiresIn: "Kedaluwarsa dalam",
      clickInstructions: "Klik tautan di atas untuk mengatur ulang kata sandi Anda. Tautan akan terbuka di tab baru.",
      requestNew: "Minta Tautan Baru"
    }
  };

const PasswordReset = ({lan}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetLinks, setResetLinks] = useState('');
  const [country , setCountry] = useState(lan);
  const [copied , setCopied ] = useState(false);

  useEffect(()=>{
    setCountry(lan)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lan])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError('');
    
    try {
        const response = await fetch('https://api.loophj.com/getLoginLink', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data =await response.json()
        console.log(data.code)
        setIsSubmitted(true);
        if (response.ok) setResetLinks(data.code || 'No code found');
        else setError(data.message || 'Something went wrong');

      } catch {
        setError('Failed to fetch code. Please try again.');
      } finally {
        setIsLoading(false);
      }
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setResetLinks(null);
  };

  const copyLink = (link) => {
    console.log(link)
    const tempInput = document.createElement('input');
    tempInput.value = link;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 

    try {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(link).then(() => {
                console.log('Link copied to clipboard!');
                copiedHandler();
            }).catch(err => {
                console.error('Error copying text: ', err);
            });
        } else {
            document.execCommand('copy');
            console.log('Link copied to clipboard!');
            copiedHandler()
        }
    } catch (err) {
        console.error('Error copying link: ', err);
    }

    document.body.removeChild(tempInput);
};

const copiedHandler = () => {
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 3000);
};


  return (
    <div className="flex items-center justify-center max-h-screen overflow-y-auto bg-gradient-to-b from-gray-900 to-black p-4 text-white">
      <div className="w-full max-w-md p-8 bg-black bg-opacity-80 rounded-md border border-gray-700 shadow-2xl transform transition-all duration-300 hover:shadow-red-900/20">
        {!isSubmitted ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">{translations[country].title}</h1>
            <p className="mb-8 text-gray-300 text-center">
              {translations[country].subtitle}
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6 relative">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1 block">{translations[country].emailLabel}</label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                  placeholder={translations[country].emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-900/40 border border-red-800 rounded-md text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className={`w-full p-4 rounded-md font-bold text-center transition-all duration-300 flex items-center justify-center ${
                  isLoading 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 active:scale-98'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {translations[country].processing}
                  </>
                ) : (
                  translations[country].sendButton
                )}
              </button>
            

            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-900/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">{translations[country].successTitle}</h2>
            
            <div className="mb-4 p-4 bg-gray-800/60 rounded-md border border-gray-700">
              <p className="text-gray-300 mb-2">
                {translations[country].successMessage} <span className="text-white font-medium">{email}</span>
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-left">{translations[country].linksTitle}</h3>
              <div className="space-y-3">
              {resetLinks &&
  <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-left hover:bg-gray-700 transition-colors">
    <div className="mb-2">
      {resetLinks.startsWith('https:') ? (
      <div className='flex flex-col items-center justify-center'>
        <a 
          href={resetLinks} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-400 break-all flex items-center"
        >
          {resetLinks}
          <svg className="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>

        <button onClick={()=>copyLink(resetLinks)} class="my-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
   {copied ? 'Successfully Copied' : ' Copy Link' }
</button>
       
      </div>
      ) : (
        <p className="text-yellow-400">
          Please contact your seller to obtain a valid reset link.
        </p>
      )}
    </div>
  </div>
}
              </div>
            </div>
            
            <p className="mb-6 text-gray-400 text-sm">
              {translations[country].clickInstructions}
            </p>
            
            <button 
              onClick={handleTryAgain}
              className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md font-medium hover:bg-gray-800 transition duration-200"
            >
              {translations[country].requestNew}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;