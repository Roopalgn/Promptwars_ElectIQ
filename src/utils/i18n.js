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
    'nav.eligibility': 'Am I Eligible?',
    'nav.evm': 'EVM Demo',
    'nav.pledge': 'Pledge',
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
    'timeline.subtitle': 'Projected schedule for India\'s upcoming General Election (2029) — modeled on the 2024 cycle for educational purposes.',
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
    'quiz.shareX': 'Tweet',
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
    'chat.voice': 'Voice input — tap to speak',
    'theme.toggle': 'Toggle theme',
    'booth.title': 'Find Your Polling Booth',
    'booth.subtitle': 'Look up your booth instantly via the official ECI search.',
    'booth.byEpic': 'By EPIC No.',
    'booth.byDetails': 'By Details',
    'booth.epicLabel': 'EPIC (Voter ID) Number',
    'booth.epicHint': '10-character alphanumeric ID printed on your Voter ID card.',
    'booth.state': 'State',
    'booth.district': 'District',
    'booth.pincode': 'Pincode',
    'booth.find': 'Find Booth',
    'booth.note': 'Opens electoralsearch.eci.gov.in with your details prefilled. Nothing is stored locally.',
    'chat.welcome': 'Hi! I\'m your AI election assistant. Ask me anything about the Indian election process — voter registration, EVMs, timelines, or any election topic!',
    'chat.welcome.offline': 'Hi! I run on a built-in election knowledge base — ask me about voter registration, EVMs, NOTA, postal ballots, polling booths, the MCC, NRI voting, and more. (Add a Gemini API key for full AI conversations.)',
    'chat.error': 'Sorry, I couldn\'t process that. Please try again.',
    'chat.rateLimit': 'queries remaining this session',
    'chat.configKey': 'Please set your Gemini API key in the .env file to enable AI chat.',
    'countdown.in': 'in',
    'countdown.day': 'day',
    'countdown.days': 'days',
    'countdown.noEvent.title': 'Be ready for the next election',
    'countdown.noEvent.subtitle': 'Make sure your name is on the electoral roll.',
    'countdown.cta.register': 'Register Now',
    'eligibility.title': 'Am I Eligible to Vote?',
    'eligibility.subtitle': 'Answer 4 quick questions to find out if you can vote in Indian elections.',
    'eligibility.q1': 'Are you a citizen of India?',
    'eligibility.q2': 'Are you 18 years or older?',
    'eligibility.q3': 'Do you ordinarily reside in an Indian constituency?',
    'eligibility.q4': 'Are you currently in jail or police custody (not on bail)?',
    'eligibility.yes': 'Yes',
    'eligibility.no': 'No',
    'eligibility.check': 'Check My Eligibility',
    'eligibility.result.eligible': '✅ You are eligible to vote!',
    'eligibility.result.eligible.body': 'Your next step is to make sure your name is on the electoral roll. If not, register using Form 6.',
    'eligibility.result.ineligible': 'You may not be eligible right now',
    'eligibility.result.ineligible.body': 'Based on your answers, the following criteria are not met:',
    'eligibility.reason.citizen': 'You must be a citizen of India to vote.',
    'eligibility.reason.age': 'You must be at least 18 years old on the qualifying date (1st January).',
    'eligibility.reason.resident': 'You must ordinarily reside in the constituency where you want to vote.',
    'eligibility.reason.jail': 'Persons in jail or police custody cannot vote (Section 62(5), RP Act). Persons on bail can.',
    'eligibility.cta.register': 'Register on NVSP',
    'eligibility.cta.check': 'Check My Name',

    'evm.title': '🗳️ Try the EVM',
    'evm.subtitle': 'Step into the polling booth without leaving your couch — vote on a simulated EVM and see how VVPAT verification works.',
    'evm.intro.title': 'Welcome to the Polling Booth Simulator',
    'evm.intro.body': 'You’re about to experience the same Electronic Voting Machine flow used by 960M+ Indian voters. Pick any candidate — nothing is recorded, nothing is shared.',
    'evm.rule.1': 'You may vote for ONE candidate only.',
    'evm.rule.2': 'Press the blue button next to your chosen candidate.',
    'evm.rule.3': 'A green LED will confirm your vote was recorded.',
    'evm.rule.4': 'A VVPAT slip will appear for 7 seconds for verification.',
    'evm.start': 'Begin Demo Vote',
    'evm.display.ready': 'READY',
    'evm.display.recorded': 'VOTE RECORDED',
    'evm.instruction': 'Press the button next to the candidate of your choice',
    'evm.vvpat.title': 'VVPAT Verification',
    'evm.vvpat.caption': 'Voter Verifiable Paper Audit Trail — visible briefly through the VVPAT window before being deposited in the sealed compartment.',
    'evm.vvpat.visibleFor': 'Visible for',
    'evm.vvpat.disclaimer': 'Real VVPAT slips contain only the candidate name, serial number, and party symbol — never the voter’s identity.',
    'evm.done.title': 'Vote Cast Successfully',
    'evm.done.body': 'In a real polling booth, your demo vote for {name} would now be securely stored in the EVM’s Control Unit. Thank you for participating in democracy!',
    'evm.recap.1': 'Your vote was recorded electronically',
    'evm.recap.2': 'A VVPAT paper slip was generated',
    'evm.recap.3': 'The slip was deposited in the sealed compartment',
    'evm.restart': 'Try Again',
    'evm.checkEligibility': 'Check My Eligibility',

    'pledge.title': '🤝 Take the Voter Pledge',
    'pledge.subtitle': 'Make a personal commitment and download a shareable certificate.',
    'pledge.intro': 'By taking this pledge, I commit to:',
    'pledge.statement.1': 'Cast my vote in every election I am eligible for',
    'pledge.statement.2': 'Make my decision based on facts, not rumours',
    'pledge.statement.3': 'Encourage at least 3 friends or family members to register and vote',
    'pledge.statement.4': 'Report any electoral malpractice via the cVIGIL app',
    'pledge.name': 'Your full name',
    'pledge.state': 'Your state / UT',
    'pledge.selectState': 'Select your state',
    'pledge.submit': 'I Take the Pledge',
    'pledge.cert.thisCertifies': 'This certifies that',
    'pledge.cert.fromState': 'from',
    'pledge.cert.quote': 'I pledge to cast my vote in the upcoming elections, to be informed, non-partisan, and to encourage others to participate in our democracy.',
    'pledge.cert.date': 'DATE',
    'pledge.cert.id': 'CERTIFICATE ID',
    'pledge.download': 'Download Certificate',
    'pledge.share': 'Share Pledge',
    'pledge.retake': 'Retake Pledge',
    'pledge.confirmReset': 'This will erase your saved pledge. Continue?',
    
    'checklist.title': 'Polling Day Checklist',
    'checklist.subtitle': 'Make sure you have everything ready before you head to the polling booth.',
    'checklist.item.1': 'Voter Slip (Optional, but helps find your room quickly)',
    'checklist.item.2': 'Valid Original Photo ID (e.g. Voter ID, Aadhaar, PAN, Passport)',
    'checklist.item.3': 'Verify your name is on the Electoral Roll',
    'checklist.item.4': 'Leave mobile phones and smartwatches at home or outside the booth',
    'checklist.completed': 'You are ready to vote!',

    'quiz.copied': 'Copied!',
    'lang.toggle': 'हिंदी'
  },
  hi: {
    'app.title': 'ElectIQ',
    'app.tagline': 'अपना वोट जानो। अपनी आवाज़ बनो।',
    'nav.home': 'होम',
    'nav.journey': 'यात्रा',
    'nav.timeline': 'समयरेखा',
    'nav.eligibility': 'क्या मैं पात्र हूं?',
    'nav.evm': 'EVM डेमो',
    'nav.pledge': 'शपथ',
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
    'timeline.subtitle': 'भारत के आगामी आम चुनाव (2029) की अनुमानित अनुसूची — शैक्षणिक उद्देश्य से 2024 चक्र पर आधारित।',
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
    'quiz.shareX': 'ट्वीट करें',
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
    'chat.voice': 'आवाज़ इनपुट — बोलने के लिए टैप करें',
    'theme.toggle': 'थीम बदलें',
    'booth.title': 'अपना मतदान केंद्र खोजें',
    'booth.subtitle': 'ECI की आधिकारिक खोज से तुरंत पता लगाएँ।',
    'booth.byEpic': 'EPIC से',
    'booth.byDetails': 'विवरण से',
    'booth.epicLabel': 'EPIC (मतदाता पहचान) नंबर',
    'booth.epicHint': 'आपके मतदाता पहचान पत्र पर छपा 10 अक्षरीय आईडी।',
    'booth.state': 'राज्य',
    'booth.district': 'जिला',
    'booth.pincode': 'पिनकोड',
    'booth.find': 'केंद्र खोजें',
    'booth.note': 'electoralsearch.eci.gov.in खुलेगा जिसमें आपका विवरण पहले से भरा होगा। डेटा स्थानीय रूप से सहेजा नहीं जाता।',
    'chat.welcome': 'नमस्ते! मैं आपका AI चुनाव सहायक हूं। मतदाता पंजीकरण, EVM, समयरेखा, या किसी भी चुनावी विषय पर पूछें!',
    'chat.welcome.offline': 'नमस्ते! मैं एक आंतरिक ज्ञानकोष से चलता हूं — मतदाता पंजीकरण, EVM, NOTA, पोस्टल बैलट, मतदान केंद्र, MCC, NRI मतदान के बारे में पूछें।',
    'chat.error': 'क्षमा करें, प्रोसेस नहीं हो सका। कृपया पुनः प्रयास करें।',
    'chat.rateLimit': 'इस सत्र में शेष प्रश्न',
    'chat.configKey': 'AI चैट सक्षम करने के लिए .env फ़ाइल में Gemini API key सेट करें।',
    'countdown.in': 'में',
    'countdown.day': 'दिन',
    'countdown.days': 'दिन',
    'countdown.noEvent.title': 'अगले चुनाव के लिए तैयार रहें',
    'countdown.noEvent.subtitle': 'सुनिश्चित करें कि आपका नाम मतदाता सूची में है।',
    'countdown.cta.register': 'अभी पंजीकरण करें',
    'eligibility.title': 'क्या मैं मतदान के लिए पात्र हूं?',
    'eligibility.subtitle': '4 छोटे प्रश्नों का उत्तर देकर जानें कि क्या आप भारतीय चुनाव में मतदान कर सकते हैं।',
    'eligibility.q1': 'क्या आप भारतीय नागरिक हैं?',
    'eligibility.q2': 'क्या आप 18 वर्ष या उससे अधिक के हैं?',
    'eligibility.q3': 'क्या आप सामान्यतः भारत के किसी निर्वाचन क्षेत्र में निवास करते हैं?',
    'eligibility.q4': 'क्या आप वर्तमान में जेल या पुलिस हिरासत में हैं (ज़मानत पर नहीं)?',
    'eligibility.yes': 'हां',
    'eligibility.no': 'नहीं',
    'eligibility.check': 'मेरी पात्रता जांचें',
    'eligibility.result.eligible': '✅ आप मतदान के लिए पात्र हैं!',
    'eligibility.result.eligible.body': 'अगला कदम: सुनिश्चित करें कि आपका नाम मतदाता सूची में है। यदि नहीं, तो फॉर्म 6 भरें।',
    'eligibility.result.ineligible': 'आप अभी पात्र नहीं हो सकते',
    'eligibility.result.ineligible.body': 'आपके उत्तरों के आधार पर, निम्न मानदंड पूरे नहीं होते:',
    'eligibility.reason.citizen': 'मतदान के लिए भारतीय नागरिकता आवश्यक है।',
    'eligibility.reason.age': 'अर्हक तिथि (1 जनवरी) को कम से कम 18 वर्ष का होना चाहिए।',
    'eligibility.reason.resident': 'जिस निर्वाचन क्षेत्र में वोट करना है वहां सामान्यतः निवास आवश्यक।',
    'eligibility.reason.jail': 'जेल/हिरासत में व्यक्ति वोट नहीं दे सकते (धारा 62(5))। ज़मानत पर व्यक्ति दे सकते हैं।',
    'eligibility.cta.register': 'NVSP पर पंजीकरण',
    'eligibility.cta.check': 'अपना नाम जांचें',

    'evm.title': '🗳️ EVM को आज़माएँ',
    'evm.subtitle': 'घर बैठे ही ईवीएम पर वोट डालने का अनुभव लें — वीवीपीएटी सत्यापन सहित।',
    'evm.intro.title': 'पोलिंग बूथ सिम्युलेटर',
    'evm.intro.body': 'आप 96 करोड़+ मतदाताओं के द्वारा उपयोग की जाने वाली EVM प्रक्रिया का अनुभव करने वाले हैं। किसी भी उम्मीदवार को चुनें — कुछ भी सहेजा या साझा नहीं किया जाएगा।',
    'evm.rule.1': 'आप केवल एक उम्मीदवार को वोट दे सकते हैं।',
    'evm.rule.2': 'चुने गए उम्मीदवार के निकट नीला बटन दबाएँ।',
    'evm.rule.3': 'हरी LED जलकर वोट दर्ज होने की पुष्टि करेगी।',
    'evm.rule.4': 'VVPAT की पर्ची 7 सेकंड के लिए दिखाई देगी।',
    'evm.start': 'डेमो वोट शुरू करें',
    'evm.display.ready': 'तैयार',
    'evm.display.recorded': 'वोट दर्ज हो गया',
    'evm.instruction': 'अपने पसंदीदा उम्मीदवार के पास का बटन दबाएँ',
    'evm.vvpat.title': 'VVPAT सत्यापन',
    'evm.vvpat.caption': 'मतदाता सत्यापित पेपर ऑडिट ट्रेल — सील बंद डिब्बे में जमा होने से पहले संक्षिप्त रूप से दिखाई देती है।',
    'evm.vvpat.visibleFor': 'दिखाई देगी',
    'evm.vvpat.disclaimer': 'वास्तविक VVPAT पर्चियों पर केवल उम्मीदवार का नाम, क्रम संख्या और चुनाव चिन्ह होते हैं — मतदाता की पहचान कभी नहीं।',
    'evm.done.title': 'वोट सफलतापूर्वक डाला गया',
    'evm.done.body': 'वास्तविक मतदान केंद्र में, {name} के लिए आपका वोट सुरक्षित रूप से EVM कंट्रोल यूनिट में सहेजा जाता। लोकतंत्र में भाग लेने के लिए धन्यवाद!',
    'evm.recap.1': 'आपका वोट इलेक्ट्रॉनिक रूप से दर्ज हुआ',
    'evm.recap.2': 'VVPAT पेपर स्लिप तैयार हुई',
    'evm.recap.3': 'स्लिप सील बंद डिब्बे में जमा हुई',
    'evm.restart': 'फिर से कोशिश करें',
    'evm.checkEligibility': 'पात्रता जांचें',

    'pledge.title': '🤝 मतदाता शपथ लें',
    'pledge.subtitle': 'व्यक्तिगत प्रतिबद्धता जताएँ और साझा करने योग्य प्रमाणपत्र डाउनलोड करें।',
    'pledge.intro': 'यह शपथ लेकर, मैं प्रतिबद्ध हूँ:',
    'pledge.statement.1': 'प्रत्येक चुनाव में अपना वोट डालने के लिए',
    'pledge.statement.2': 'अफवाहों के बजाय तथ्यों के आधार पर निर्णय लेने के लिए',
    'pledge.statement.3': 'कम से कम 3 दोस्तों या परिजनों को पंजीकरण और मतदान के लिए प्रोत्साहित करने के लिए',
    'pledge.statement.4': 'चुनावी कदाचार की शिकायत cVIGIL एप पर करने के लिए',
    'pledge.name': 'आपका पूरा नाम',
    'pledge.state': 'आपका राज्य / UT',
    'pledge.selectState': 'अपना राज्य चुनें',
    'pledge.submit': 'मैं शपथ लेता/लेती हूँ',
    'pledge.cert.thisCertifies': 'यह प्रमाणित करता है कि',
    'pledge.cert.fromState': '—',
    'pledge.cert.quote': 'मैं आगामी चुनावों में वोट डालने, जानकार रहने, गैर-पक्षपाती रहने और दूसरों को लोकतंत्र में भाग लेने के लिए प्रोत्साहित करने की शपथ लेता/लेती हूँ।',
    'pledge.cert.date': 'दिनांक',
    'pledge.cert.id': 'प्रमाणपत्र आईडी',
    'pledge.download': 'प्रमाणपत्र डाउनलोड करें',
    'pledge.share': 'शपथ साझा करें',
    'pledge.retake': 'पुनः शपथ लें',
    'pledge.confirmReset': 'यह आपकी सहेजी गई शपथ मिटा देगा। जारी रखें?',

    'checklist.title': 'मतदान दिवस चेकलिस्ट',
    'checklist.subtitle': 'मतदान केंद्र जाने से पहले सुनिश्चित करें कि आपके पास सब कुछ है।',
    'checklist.item.1': 'वोटर स्लिप (वैकल्पिक, लेकिन कमरा जल्दी खोजने में मदद करता है)',
    'checklist.item.2': 'मूल फोटो आईडी (जैसे वोटर आईडी, आधार, पैन, पासपोर्ट)',
    'checklist.item.3': 'सत्यापित करें कि आपका नाम मतदाता सूची में है',
    'checklist.item.4': 'मोबाइल फोन और स्मार्टवॉच घर पर या बूथ के बाहर छोड़ दें',
    'checklist.completed': 'आप वोट देने के लिए तैयार हैं!',

    'quiz.copied': 'कॉपी हो गया!',
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
