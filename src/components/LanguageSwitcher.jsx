import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'kg', label: 'Кыргызча', flag: '🇰🇬' },
  ];

  const current = languages.find((lang) => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 shadow-sm hover:shadow-md transition-all"
      >
        <span className="text-base">{current.flag}</span>
        <span className="text-sm font-semibold uppercase">{current.code}</span>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border border-slate-100 z-50">
          <ul className="py-1">
            {languages.map((lang) => {
              const active = lang.code === currentLanguage;
              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    onClick={() => {
                      changeLanguage(lang.code);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
