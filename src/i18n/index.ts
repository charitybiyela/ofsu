import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations
import en from './locales/en';
import af from './locales/af';
import zu from './locales/zu';
import xh from './locales/xh';
import st from './locales/st';
import tn from './locales/tn';
import nso from './locales/nso';
import ts from './locales/ts';
import ss from './locales/ss';
import ve from './locales/ve';
import nr from './locales/nr';
import es from './locales/es';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    af: { translation: af },
    zu: { translation: zu },
    xh: { translation: xh },
    st: { translation: st },
    tn: { translation: tn },
    nso: { translation: nso },
    ts: { translation: ts },
    ss: { translation: ss },
    ve: { translation: ve },
    nr: { translation: nr },
    es: { translation: es }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;