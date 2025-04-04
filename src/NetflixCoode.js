import React, { useEffect, useState } from 'react';
import './css/NetflixCode.css';

const NetflixCode = ({lan}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [country, setCountry] = useState(lan);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    setCountry(lan)
  }, [lan]);

  const translations = {
    en: {
      title: "Get Your Netflix Household Code",
      instructions: 'Select <span class="highlight">"Watch Temporarily"</span> or <span class="highlight">"I\'m Travelling"</span> in mobile/tv app. After selecting, click on send email to proceed and get the code.',
      emailPlaceholder: "Enter your account email",
      subInstructions: "Please enter the Netflix email provided to you by the seller to receive the code.",
      getCode: "Get Code",
      fetching: "Fetching...",
      successMessage: "Your Code: ",
      errorMessage: "An error occurred. Please try again.",
    },
    es: {
      title: "Obtén Tu Código de Hogar de Netflix",
      instructions: 'Selecciona <span class="highlight">"Ver Temporalmente"</span> o <span class="highlight">"Estoy Viajando"</span>. Después de seleccionar, haz clic en enviar correo electrónico para proceder y obtener el código.',
      emailPlaceholder: "Ingresa tu correo electrónico de cuenta",
      subInstructions: "Por favor, ingresa el correo electrónico de Netflix proporcionado por el vendedor para recibir el código.",
      getCode: "Obtener Código",
      fetching: "Obteniendo...",
      successMessage: "Tu Código: ",
      errorMessage: "Ocurrió un error. Por favor, inténtalo de nuevo.",
    },
    ph: {
      title: "Kumuha ng Iyong Netflix Household Code",
      instructions: 'Pumili ng <span class="highlight">"Panoorin Nang Panandalian"</span> o <span class="highlight">"Nagmamagal"</span>. Pagkatapos pumili, i-click ang send email upang magpatuloy at makuha ang code.',
      emailPlaceholder: "Ilagay ang iyong account email",
      subInstructions: "Mangyaring ilagay ang Netflix email na ibinigay sa iyo ng nagbenta upang matanggap ang code.",
      getCode: "Kumuha ng Code",
      fetching: "Kumuha...",
      successMessage: "Iyong Code: ",
      errorMessage: "Nagkaroon ng error. Pakisubukang muli.",
    },
    id: {
      title: "Dapatkan Kode Rumah Netflix Anda",
      instructions: 'Pilih <span class="highlight">"Tonton Sementara"</span> atau <span class="highlight">"Terburu-buru"</span>. Setelah memilih, klik kirim email untuk melanjutkan dan mendapatkan kode.',
      emailPlaceholder: "Masukkan email akun Anda",
      subInstructions: "Silakan masukkan email Netflix yang diberikan oleh penjual untuk menerima kode.",
      getCode: "Dapatkan Kode",
      fetching: "Mengambil...",
      successMessage: "Kode Anda: ",
      errorMessage: "Terjadi kesalahan. Silakan coba lagi.",
    },

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCode('');

    try {
      const response = await fetch('https://test.loophj.com/getCodes', {
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
    <div className="netflix-container">
      <div className="netflix-background">
        <div className="netflix-overlay"></div>
      </div>
      
      <div className="netflix-card">      
        <h1 className="netflix-title">{translations[country].title}</h1>
        <p className="netflix-instructions" dangerouslySetInnerHTML={{ __html: translations[country].instructions }} />
        
        <form onSubmit={handleSubmit} className="netflix-form">
          <div className="input-wrapper">
            <input
              type="email"
              className="netflix-input"
              placeholder={translations[country].emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email && <span className="input-check">✓</span>}
          </div>
          
          <p className="netflix-sub-instructions">{translations[country].subInstructions}</p>
          
          <button type="submit" className="netflix-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>{translations[country].fetching}</span>
              </>
            ) : (
              translations[country].getCode
            )}
          </button>
        </form>

        {code && (
          <div className="netflix-success-message">
            <span className="success-icon">✓</span>
            {translations[country].successMessage}
            {isValidUrl(code) ? (
              <a href={code} target="_blank" rel="noopener noreferrer" className="netflix-link">
                Click To Update
              </a>
            ) : (
              <span className="netflix-code">{code}</span>
            )}
          </div>
        )}

        {error && (
          <div className="netflix-error-message">
            <span className="error-icon">!</span>
            {translations[country].errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetflixCode;