const translations = {
  en: {
    home: 'Home', dashboard: 'Dashboard', charts: 'Charts', forms: 'Forms',
    tables: 'Tables', gallery: 'Gallery', media: 'Media', maps: 'Maps',
    pdf: 'PDF', upload: 'Upload', markdown: 'Markdown', qr: 'QR Code',
    ai: 'AI Lab', three: 'Three.js', webgpu: 'WebGPU', physics: 'Physics',
    canvas: 'Canvas', browserApi: 'Browser APIs', settings: 'Settings',
    libraries: 'Libraries', performance: 'Performance', about: 'About'
  },
  es: {
    home: 'Inicio', dashboard: 'Panel', charts: 'Gráficos', forms: 'Formularios',
    tables: 'Tablas', gallery: 'Galería', media: 'Medios', maps: 'Mapas',
    pdf: 'PDF', upload: 'Subir', markdown: 'Markdown', qr: 'Código QR',
    ai: 'IA Lab', three: 'Three.js', webgpu: 'WebGPU', physics: 'Física',
    canvas: 'Lienzo', browserApi: 'APIs del Navegador', settings: 'Ajustes',
    libraries: 'Bibliotecas', performance: 'Rendimiento', about: 'Acerca de'
  },
  fr: {
    home: 'Accueil', dashboard: 'Tableau de bord', charts: 'Graphiques', forms: 'Formulaires',
    tables: 'Tableaux', gallery: 'Galerie', media: 'Médias', maps: 'Cartes',
    pdf: 'PDF', upload: 'Télécharger', markdown: 'Markdown', qr: 'QR Code',
    ai: 'IA Lab', three: 'Three.js', webgpu: 'WebGPU', physics: 'Physique',
    canvas: 'Canvas', browserApi: 'APIs Navigateur', settings: 'Paramètres',
    libraries: 'Bibliothèques', performance: 'Performance', about: 'À propos'
  }
};

let currentLang = localStorage.getItem('fn_lang') || 'en';

export const t = (key) => translations[currentLang]?.[key] || translations.en[key] || key;

export const getCurrentLang = () => currentLang;

export const setLanguage = (lang) => {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('fn_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  window.dispatchEvent(new CustomEvent('app:languageChange', { detail: lang }));
};

export const getAvailableLanguages = () => Object.keys(translations);
