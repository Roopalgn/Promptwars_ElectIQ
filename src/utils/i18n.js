/**
 * Lightweight i18n (Internationalization) engine
 * Supports English (en) and Hindi (hi)
 * @module utils/i18n
 */

/** UI string translations */
const translations = {
  en: {
    'app.title': 'ElectIQ',
    'app.tagline': 'Know Your Vote. Own Your Voice.',
    'nav.home': 'Home',
    'nav.journey': 'Journey',
    'nav.timeline': 'Timeline',
    'nav.quiz': 'Quiz',
    'nav.glossary': 'Glossary',
    'nav.maps': 'Find Booth',
    'hero.badge': 'AI-Powered Election Education',
    'hero.title.1': 'Understand India\'s',
    'hero.title.2': 'Election Process',
    'hero.title.3': 'Like Never Before',
    'hero.subtitle': 'Your interactive guide to voter registration, EVMs, timelines, and everything about Indian democracy — powered by Google Gemini AI.',
    'hero.cta.journey': 'Start Learning',
    'hero.cta.chat': 'Ask AI Assistant',
    'hero.stat.voters': '960M+',
    'hero.stat.voters.label': 'Registered Voters',
    'hero.stat.constituencies': '543',
    'hero.stat.constituencies.label': 'Lok Sabha Seats',
    'hero.stat.phases': '7',
    'hero.stat.phases.label': 'Polling Phases',
    'journey.title': 'Your Election Journey',
    'journey.subtitle': 'Follow the step-by-step process of how Indian elections work — from registration to results.',
    'journey.step': 'Step',
    'journey.of': 'of',
    'journey.prev': '← Previous',
    'journey.next': 'Next →',
    'journey.fact': '💡 Did You Know?',
    'timeline.title': 'Election Timeline',
    'timeline.subtitle': 'Visualize the complete schedule of India\'s 2024 General Election — all 7 phases at a glance.',
    'quiz.title': 'Myth Buster Quiz',
    'quiz.subtitle': 'Think you know Indian elections? Test your knowledge with these common myths and facts!',
    'quiz.start': 'Start Quiz',
    'quiz.question': 'Question',
    'quiz.true': '✓ TRUE',
    'quiz.false': '✗ FALSE',
    'quiz.next': 'Next Question →',
    'quiz.correct': '✓ Correct!',
    'quiz.incorrect': '✗ Incorrect',
    'quiz.score': 'Your Score',
    'quiz.retry': 'Try Again',
    'quiz.share': 'Share Score',
    'glossary.title': 'Election Glossary',
    'glossary.subtitle': 'Look up any election term — explained in simple, plain language.',
    'glossary.search': 'Search terms (e.g., EVM, NOTA, Form 6)...',
    'glossary.empty': 'No terms found. Try a different search.',
    'glossary.all': 'All',
    'maps.title': 'Find Your Polling Booth',
    'maps.subtitle': 'Locate your nearest polling station and Election Commission office.',
    'maps.search': 'Search for a location...',
    'chat.title': 'ElectIQ AI Assistant',
    'chat.subtitle': 'Powered by Google Gemini',
    'chat.placeholder': 'Ask about Indian elections...',
    'chat.welcome': 'Hi! I\'m your AI election assistant. Ask me anything about the Indian election process — voter registration, EVMs, timelines, or any election topic!',
    'chat.error': 'Sorry, I couldn\'t process that. Please try again.',
    'chat.rateLimit': 'queries remaining this session',
    'chat.configKey': 'Please set your Gemini API key in the .env file to enable AI chat.',
    'lang.toggle': 'हिंदी'
  },
  hi: {
    'app.title': 'ElectIQ',
    'app.tagline': 'अपना वोट जानो। अपनी आवाज़ बनो।',
    'nav.home': 'होम',
    'nav.journey': 'यात्रा',
    'nav.timeline': 'समयरेखा',
    'nav.quiz': 'क्विज़',
    'nav.glossary': 'शब्दकोश',
    'nav.maps': 'बूथ खोजें',
    'hero.badge': 'AI-संचालित चुनाव शिक्षा',
    'hero.title.1': 'भारत की',
    'hero.title.2': 'चुनाव प्रक्रिया',
    'hero.title.3': 'को समझें — नए अंदाज़ में',
    'hero.subtitle': 'मतदाता पंजीकरण, EVM, समयरेखा और भारतीय लोकतंत्र की हर जानकारी — Google Gemini AI द्वारा संचालित।',
    'hero.cta.journey': 'सीखना शुरू करें',
    'hero.cta.chat': 'AI सहायक से पूछें',
    'hero.stat.voters': '96 करोड़+',
    'hero.stat.voters.label': 'पंजीकृत मतदाता',
    'hero.stat.constituencies': '543',
    'hero.stat.constituencies.label': 'लोक सभा सीटें',
    'hero.stat.phases': '7',
    'hero.stat.phases.label': 'मतदान चरण',
    'journey.title': 'आपकी चुनाव यात्रा',
    'journey.subtitle': 'भारतीय चुनाव कैसे होते हैं — पंजीकरण से परिणाम तक, कदम-दर-कदम जानें।',
    'journey.step': 'चरण',
    'journey.of': 'में से',
    'journey.prev': '← पिछला',
    'journey.next': 'अगला →',
    'journey.fact': '💡 क्या आप जानते हैं?',
    'timeline.title': 'चुनाव समयरेखा',
    'timeline.subtitle': '2024 के भारतीय आम चुनाव की पूरी अनुसूची — सभी 7 चरण एक नज़र में।',
    'quiz.title': 'मिथक तोड़ो क्विज़',
    'quiz.subtitle': 'क्या आप भारतीय चुनाव जानते हैं? इन आम मिथकों और तथ्यों से परखें!',
    'quiz.start': 'क्विज़ शुरू करें',
    'quiz.question': 'प्रश्न',
    'quiz.true': '✓ सच',
    'quiz.false': '✗ झूठ',
    'quiz.next': 'अगला प्रश्न →',
    'quiz.correct': '✓ सही!',
    'quiz.incorrect': '✗ गलत',
    'quiz.score': 'आपका स्कोर',
    'quiz.retry': 'फिर से खेलें',
    'quiz.share': 'स्कोर शेयर करें',
    'glossary.title': 'चुनाव शब्दकोश',
    'glossary.subtitle': 'कोई भी चुनावी शब्द खोजें — सरल भाषा में।',
    'glossary.search': 'शब्द खोजें (जैसे EVM, NOTA, फॉर्म 6)...',
    'glossary.empty': 'कोई शब्द नहीं मिला। कुछ और खोजें।',
    'glossary.all': 'सभी',
    'maps.title': 'अपना मतदान केंद्र खोजें',
    'maps.subtitle': 'अपने निकटतम मतदान केंद्र और चुनाव आयोग कार्यालय का पता लगाएं।',
    'maps.search': 'स्थान खोजें...',
    'chat.title': 'ElectIQ AI सहायक',
    'chat.subtitle': 'Google Gemini द्वारा संचालित',
    'chat.placeholder': 'भारतीय चुनावों के बारे में पूछें...',
    'chat.welcome': 'नमस्ते! मैं आपका AI चुनाव सहायक हूं। मतदाता पंजीकरण, EVM, समयरेखा, या किसी भी चुनावी विषय पर पूछें!',
    'chat.error': 'क्षमा करें, प्रोसेस नहीं हो सका। कृपया पुनः प्रयास करें।',
    'chat.rateLimit': 'इस सत्र में शेष प्रश्न',
    'chat.configKey': 'AI चैट सक्षम करने के लिए .env फ़ाइल में Gemini API key सेट करें।',
    'lang.toggle': 'English'
  }
};

/** Current language state */
let currentLang = localStorage.getItem('electiq-lang') || 'en';

/**
 * Get translated string by key
 * @param {string} key - Translation key
 * @returns {string} Translated string or key if not found
 */
export function t(key) {
  const val = translations[currentLang]?.[key];
  if (val !== undefined) {
    return val;
  }
  // Fallback to English
  return translations.en?.[key] || key;
}

/**
 * Get localized value from a bilingual object { en, hi }
 * @param {Object} obj - Object with en/hi keys
 * @returns {string} Localized value
 */
export function localize(obj) {
  if (!obj || typeof obj !== 'object') {
    return '';
  }
  return obj[currentLang] || obj.en || '';
}

/**
 * Get current language code
 * @returns {string} 'en' or 'hi'
 */
export function getLang() {
  return currentLang;
}

/**
 * Set language and persist to localStorage
 * @param {string} lang - 'en' or 'hi'
 */
export function setLang(lang) {
  if (lang !== 'en' && lang !== 'hi') {
    return;
  }
  currentLang = lang;
  localStorage.setItem('electiq-lang', lang);
  document.documentElement.lang = lang;
}

/**
 * Toggle between English and Hindi
 * @returns {string} New language code
 */
export function toggleLang() {
  const newLang = currentLang === 'en' ? 'hi' : 'en';
  setLang(newLang);
  return newLang;
}
