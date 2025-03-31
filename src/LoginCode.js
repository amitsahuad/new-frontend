import React, { useEffect, useState } from 'react';

const translations = {
  en: {
      title: "Get Your Netflix Login Code",
       steps: `Open https://www.netflix.com/login
       Choose the option labeled "Use a sign-in code."
       Enter your email address into the provided input field.
       Click on "Send Sign In Code" to receive a one-time password (OTP).
       Put email address in the input of this page to get code.
       To reset password visit https://www.loophj.com/resetlink` ,
      emailPlaceholder: "Enter your account email",
      subInstructions: "Please enter the Netflix email provided to you by the seller to receive the code.",
      getCode: "Get Code",
      fetching: "Fetching...",
      successMessage: "Your Code: ",
      errorMessage: "An error occurred. Please try again.",
      toggleSteps: "Show sign in steps",
      hideSteps: "Hide sign in steps",
      stepsTitle: "How To Get Your Sign-In Code"
  },
  es: {
  "title": "Obtén tu código de inicio de sesión de Netflix",
  "steps": `Abre https://www.netflix.com/login
  Selecciona la opción etiquetada "Usar un código de inicio de sesión."
  Ingresa tu dirección de correo electrónico en el campo de entrada proporcionado.
  Haz clic en "Enviar código de inicio de sesión" para recibir una contraseña de un solo uso (OTP).
  Coloca tu dirección de correo electrónico en el campo de entrada de esta página para obtener el código.
  Para restablecer la contraseña visita https://www.loophj.com/resetlink`,
  "emailPlaceholder": "Ingrese el correo electrónico de su cuenta",
  "subInstructions": "Por favor, ingrese el correo electrónico de Netflix proporcionado por el vendedor para recibir el código.",
  "getCode": "Obtener Código",
  "fetching": "Obteniendo...",
  "successMessage": "Tu Código: ",
  "errorMessage": "Ocurrió un error. Por favor, inténtalo de nuevo.",
  "toggleSteps": "Mostrar pasos de inicio de sesión",
  "hideSteps": "Ocultar pasos de inicio de sesión",
  "stepsTitle": "Cómo obtener tu código de inicio de sesión"
},
  ph: {
  "title": "Kumha ng iyong Netflix Login Code",
  "steps": `Buksan ang https://www.netflix.com/login
  Piliin ang opsyon na may label na "Gamitin ang sign-in code."
  Ilagay ang iyong email address sa input field na ibinigay.
  I-click ang "Send Sign In Code" upang matanggap ang isang beses na password (OTP).
  Ilagay ang iyong email address sa input ng pahinang ito upang makakuha ng code.
  Upang i-reset ang password, bisitahin ang https://www.loophj.com/resetlink`,
  "emailPlaceholder": "Ilagay ang email ng iyong account",
  "subInstructions": "Pakiusap na ilagay ang email ng Netflix na ibinigay ng seller upang matanggap ang code.",
  "getCode": "Kumha ng Kodigo",
  "fetching": "Nagkuha ng datos...",
  "successMessage": "Ang iyong Kodigo: ",
  "errorMessage": "May nangyaring pagkakamali. Pakiusap na subukin muli.",
  "toggleSteps": "Ipakita ang mga hakbang ng sign-in",
  "hideSteps": "Itago ang mga hakbang ng sign-in",
  "stepsTitle": "Paano Kumha ng iyong Sign-In Code"
}
,
  id: {
  "title": "Dapatkan Kode Masuk Netflix Anda",
  "steps": `Buka https://www.netflix.com/login
  Pilih opsi yang diberi label "Gunakan kode masuk."
  Masukkan alamat email Anda ke dalam bidang input yang disediakan.
  Klik "Kirim Kode Masuk" untuk menerima kata sandi sekali pakai (OTP).
  Masukkan alamat email Anda di bidang input halaman ini untuk mendapatkan kode.
  Untuk mengatur ulang kata sandi kunjungi https://www.loophj.com/resetlink`,
  "emailPlaceholder": "Masukkan email akun Anda",
  "subInstructions": "Silakan masukkan email Netflix yang diberikan oleh penjual untuk menerima kode.",
  "getCode": "Dapatkan Kode",
  "fetching": "Mengambil...",
  "successMessage": "Kode Anda: ",
  "errorMessage": "Terjadi kesalahan. Silakan coba lagi.",
  "toggleSteps": "Tampilkan langkah-langkah masuk",
  "hideSteps": "Sembunyikan langkah-langkah masuk",
  "stepsTitle": "Cara Mendapatkan Kode Masuk Anda"
}
};

const LoginCode = ({lan}) => {
    const [country, setCountry] = useState(lan);
    const [showDropdown, setShowDropdown] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [showSteps, setShowSteps] = useState(false);

    useEffect(() => {
        setCountry(lan)
      }, [lan]);

    
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCode('');

    try {
      const response = await fetch('https://test.loophj.com/getLoginCodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) setCode(data.code || 'No code found');
      else setError(data.message || 'Something went wrong');
    } catch {
      setError('Failed to fetch code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (showDropdown && !e.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [showDropdown]);

  return (
    <div className="flex max-h-screen max-w-full overflow-auto items-center justify-center bg-black text-white p-2 sm:p-4">
      <div className="relative z-10 w-full max-w-md bg-black bg-opacity-80 rounded-lg shadow-xl p-3 sm:p-6 border border-gray-800">
        <div className="flex justify-center mb-4 sm:mb-6">
        </div>
        
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4">{translations[country].title}</h1>
        
        <button 
          onClick={() => setShowSteps(!showSteps)}
          className="w-full mb-3 sm:mb-4 bg-transparent border border-gray-600 rounded-md py-2 px-2 sm:px-4 text-xs sm:text-sm hover:bg-gray-800 transition-colors flex items-center justify-center break-words"
        >
          <svg 
            className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform flex-shrink-0 ${showSteps ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="truncate">
            {showSteps ? translations[country].hideSteps : translations[country].toggleSteps}
          </span>
        </button>
        
        {showSteps && (
          <div className="mb-4 sm:mb-6 bg-gray-900 rounded-md p-2 sm:p-4 border border-gray-700">
            <h2 className="text-base sm:text-lg font-semibold text-red-600 mb-2 sm:mb-3 text-center">
              {translations[country].stepsTitle}
            </h2>
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {translations[country].steps.split('\n').map((step, index) => {
                // Check if the step contains a URL to make it a direct link
                const urlMatch = step.match(/(https?:\/\/[^\s]+)/);
                return (
                    <li key={index} className="text-gray-300">
                        {urlMatch ? (
                            <a 
                                href={urlMatch[1]} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-500 hover:underline"
                            >
                                {step}
                            </a>
                        ) : (
                            step
                        )}
                    </li>
                );
            })}
        </ol>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="relative">
            <input
              type="email"
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 sm:py-3 px-3 sm:px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder={translations[country].emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
          
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            {translations[country].subInstructions}
          </p>
          
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md py-2 sm:py-3 text-sm transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs sm:text-sm">{translations[country].fetching}</span>
              </span>
            ) : (
              <span className="text-xs sm:text-sm">{translations[country].getCode}</span>
            )}
          </button>
        </form>
        
        {code && (
          <div className="mt-3 sm:mt-4 bg-gray-900 border border-green-600 rounded-md p-2 sm:p-4 flex items-start sm:items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1 min-w-0">
              <span className="text-green-500 font-medium text-xs sm:text-sm">{translations[country].successMessage}</span>
              {isValidUrl(code) ? (
                <a href={code} target="_blank" rel="noopener noreferrer" className="block text-red-500 hover:underline mt-1 text-xs sm:text-sm truncate">
                  Click To Update
                </a>
              ) : (
                <span className="text-sm sm:text-lg font-mono block mt-1 bg-gray-800 py-1 px-2 rounded select-all overflow-x-auto">{code}</span>
              )}
            </div>
          </div>
        )}
        
        {error && (
          <div className="mt-3 sm:mt-4 bg-gray-900 border border-red-600 rounded-md p-2 sm:p-4 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-red-500 text-xs sm:text-sm">{translations[country].errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginCode;
