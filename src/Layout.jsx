import React, { useEffect, useState } from 'react';
import './css/NetflixCode.css';

const Layout = ({ children , lan , setLan }) => {
    console.log(lan)
  const [country, setCountry] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(()=>{
    setLan(country)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[country])

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'ph', name: 'Filipino' },
    { code: 'id', name: 'Indonesian' }
];

  useEffect(() => {
    const storedCountry = localStorage.getItem('country');
    if (storedCountry) setCountry(storedCountry);
    else {
      getCountry().then((country) => {
        const lang = ['es', 'ph'].includes(country) ? country : 'en';
        localStorage.setItem('country', lang);
        setCountry(lang);
      });
    }
  }, []);

  async function getCountry() {
    try {
      const ipResponse = await fetch('https://api.ipify.org/?format=json');
      const ipData = await ipResponse.json();
      const infoResponse = await fetch(`https://ipinfo.io/${ipData.ip}/json`);
      const info = await infoResponse.json();
      return info.country.toLowerCase();
    } catch {
      return 'en';
    }
  }

  const handleLanguageChange = (lang) => {
    localStorage.setItem('country', lang);
    setCountry(lang);
    setShowDropdown(false);
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
      

      <div className="dropdown-container">
        <button 
          onClick={(e) => {e.stopPropagation(); setShowDropdown(!showDropdown)}} 
          className="dropdown-btn"
        >
          <span className="globe-icon">🌐</span> {country.toUpperCase()}
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            {languages.map((lang) => (
              <div 
                key={lang} 
                onClick={() => handleLanguageChange(lang.code)} 
                className={`dropdown-item ${lang === country ? 'active' : ''}`}
              >
                {lang.name}
              </div>
            ))}
          </div>
        )}
      </div>

     {children}
    </div>
  );
};

export default Layout;