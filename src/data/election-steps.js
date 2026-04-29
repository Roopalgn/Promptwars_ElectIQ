/**
 * Election Journey Steps — India General Election Process
 * Bilingual: English + Hindi
 * @module data/election-steps
 */

export const electionSteps = [
  {
    id: 1,
    icon: '🗳️',
    title: { en: 'Voter Registration', hi: 'मतदाता पंजीकरण' },
    description: {
      en: 'Every Indian citizen aged 18+ has the right to vote. You must register with the Election Commission to get your name on the electoral roll.',
      hi: 'हर 18+ भारतीय नागरिक को मतदान का अधिकार है। आपको चुनाव आयोग में पंजीकरण कराना होगा।'
    },
    details: {
      en: [
        'Fill Form 6 online at the NVSP (National Voter Service Portal) or at your nearest ERO office',
        'Documents needed: Age proof (Aadhaar/Birth Certificate), Address proof, Passport-size photo',
        'After verification, you receive your EPIC (Voter ID card)',
        'You can check your name on the electoral roll at electoralsearch.in',
        'NRI citizens can register using Form 6A for overseas voting'
      ],
      hi: [
        'NVSP पोर्टल या ERO कार्यालय में फॉर्म 6 भरें',
        'दस्तावेज: आयु प्रमाण (आधार/जन्म प्रमाणपत्र), पता प्रमाण, फोटो',
        'सत्यापन के बाद EPIC (मतदाता पहचान पत्र) मिलता है',
        'electoralsearch.in पर अपना नाम जांचें',
        'NRI नागरिक फॉर्म 6A से पंजीकरण कर सकते हैं'
      ]
    },
    fact: {
      en: 'India has over 960 million registered voters — the largest electorate in the world!',
      hi: 'भारत में 96 करोड़ से अधिक पंजीकृत मतदाता हैं — दुनिया का सबसे बड़ा मतदाता समूह!'
    }
  },
  {
    id: 2,
    icon: '📢',
    title: { en: 'Election Announcement', hi: 'चुनाव की घोषणा' },
    description: {
      en: 'The Election Commission of India announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately.',
      hi: 'भारत निर्वाचन आयोग चुनाव कार्यक्रम की घोषणा करता है। आदर्श आचार संहिता तुरंत लागू होती है।'
    },
    details: {
      en: [
        'ECI announces dates for nomination, scrutiny, withdrawal, polling, and counting',
        'Model Code of Conduct (MCC) restricts government announcements and policy decisions',
        'No new welfare schemes or promises of public works can be announced',
        'Election observers and expenditure monitors are appointed',
        'Political parties prepare their candidate lists and manifestos'
      ],
      hi: [
        'ECI नामांकन, जांच, वापसी, मतदान और मतगणना की तिथियां घोषित करता है',
        'आदर्श आचार संहिता (MCC) सरकारी घोषणाओं पर प्रतिबंध लगाती है',
        'नई कल्याणकारी योजनाओं की घोषणा नहीं हो सकती',
        'चुनाव पर्यवेक्षक और व्यय निरीक्षक नियुक्त होते हैं',
        'राजनीतिक दल उम्मीदवार सूची और घोषणापत्र तैयार करते हैं'
      ]
    },
    fact: {
      en: 'The MCC is not a law but a voluntary agreement. Yet no party has ever openly violated it since 1991!',
      hi: 'MCC कानून नहीं बल्कि स्वैच्छिक समझौता है। फिर भी 1991 से कभी खुला उल्लंघन नहीं हुआ!'
    }
  },
  {
    id: 3,
    icon: '📋',
    title: { en: 'Nomination & Scrutiny', hi: 'नामांकन और जांच' },
    description: {
      en: 'Candidates file their nomination papers with the Returning Officer. Papers are scrutinized for eligibility.',
      hi: 'उम्मीदवार रिटर्निंग ऑफिसर के पास नामांकन पत्र दाखिल करते हैं। पात्रता की जांच होती है।'
    },
    details: {
      en: [
        'Candidates must be 25+ years old (for Lok Sabha and Vidhan Sabha)',
        'A security deposit of ₹25,000 (General) or ₹12,500 (SC/ST) is required',
        'Candidates must file an affidavit declaring criminal cases, assets, and education',
        'Returning Officer checks all documents during scrutiny period',
        'After scrutiny, candidates can withdraw until the withdrawal deadline'
      ],
      hi: [
        'उम्मीदवार की आयु 25+ वर्ष होनी चाहिए (लोक सभा और विधान सभा)',
        '₹25,000 (सामान्य) या ₹12,500 (SC/ST) जमानत राशि आवश्यक',
        'आपराधिक मामलों, संपत्ति और शिक्षा का हलफनामा दाखिल करना होता है',
        'रिटर्निंग ऑफिसर जांच अवधि में सभी दस्तावेजों की जांच करता है',
        'जांच के बाद, वापसी की अंतिम तिथि तक उम्मीदवार नाम वापस ले सकते हैं'
      ]
    },
    fact: {
      en: 'If a candidate fails to get 1/6th of total valid votes, their security deposit is forfeited!',
      hi: 'अगर उम्मीदवार को कुल वैध मतों का 1/6 नहीं मिलता तो जमानत राशि जब्त हो जाती है!'
    }
  },
  {
    id: 4,
    icon: '🎙️',
    title: { en: 'Campaign Period', hi: 'प्रचार अभियान' },
    description: {
      en: 'Political parties and candidates campaign to win voter support through rallies, door-to-door outreach, and media.',
      hi: 'राजनीतिक दल और उम्मीदवार रैलियों, डोर-टू-डोर और मीडिया से मतदाताओं का समर्थन जुटाते हैं।'
    },
    details: {
      en: [
        'Campaigning must stop 48 hours before polling day ("silence period")',
        'Each candidate has a spending limit (₹95 lakh for Lok Sabha, ₹40 lakh for Vidhan Sabha)',
        'All expenditures must be reported to ECI-appointed expenditure observers',
        'No appeals based on religion, caste, or communal feelings allowed',
        'Paid news and fake social media campaigns are monitored by ECI\'s Media Certification Committee'
      ],
      hi: [
        'मतदान से 48 घंटे पहले प्रचार बंद करना होता है ("मौन अवधि")',
        'प्रत्येक उम्मीदवार का खर्च सीमित है (लोक सभा ₹95 लाख, विधान सभा ₹40 लाख)',
        'सभी खर्चों की रिपोर्ट ECI व्यय पर्यवेक्षकों को देनी होती है',
        'धर्म, जाति या सांप्रदायिक भावनाओं पर अपील वर्जित',
        'पेड न्यूज़ और फर्जी सोशल मीडिया पर ECI मीडिया प्रमाणन समिति नजर रखती है'
      ]
    },
    fact: {
      en: 'In the 2024 Lok Sabha elections, parties collectively spent an estimated ₹1.35 lakh crore on campaigning!',
      hi: '2024 लोक सभा चुनाव में दलों ने सामूहिक रूप से अनुमानित ₹1.35 लाख करोड़ खर्च किए!'
    }
  },
  {
    id: 5,
    icon: '☑️',
    title: { en: 'Polling Day', hi: 'मतदान दिवस' },
    description: {
      en: 'Voters cast their votes using Electronic Voting Machines (EVMs) at designated polling stations.',
      hi: 'मतदाता निर्धारित मतदान केंद्रों पर EVM (इलेक्ट्रॉनिक वोटिंग मशीन) से मत डालते हैं।'
    },
    details: {
      en: [
        'Carry your EPIC (Voter ID) or any of 12 approved photo IDs (Aadhaar, Passport, etc.)',
        'Polling hours are typically 7 AM to 6 PM (varies by state)',
        'The Presiding Officer verifies your identity and applies indelible ink on your finger',
        'Press the button next to your candidate\'s symbol on the EVM',
        'The VVPAT machine prints a slip showing your choice (visible for 7 seconds)',
        'NOTA (None of the Above) is available as the last option on every EVM'
      ],
      hi: [
        'अपना EPIC (वोटर ID) या 12 अनुमोदित फोटो ID में से कोई एक लाएं',
        'मतदान समय सामान्यतः सुबह 7 से शाम 6 बजे तक (राज्य अनुसार भिन्न)',
        'पीठासीन अधिकारी पहचान सत्यापित कर अमिट स्याही लगाता है',
        'EVM पर अपने उम्मीदवार के चिन्ह के बगल का बटन दबाएं',
        'VVPAT मशीन आपकी पसंद दिखाती पर्ची छापती है (7 सेकंड दिखती है)',
        'NOTA (इनमें से कोई नहीं) हर EVM पर अंतिम विकल्प के रूप में उपलब्ध'
      ]
    },
    fact: {
      en: 'India uses about 5.5 million EVMs in a general election. Each EVM can record up to 2,000 votes!',
      hi: 'भारत आम चुनाव में लगभग 55 लाख EVM का उपयोग करता है। हर EVM 2,000 वोट तक रिकॉर्ड कर सकता है!'
    }
  },
  {
    id: 6,
    icon: '📊',
    title: { en: 'Counting & Results', hi: 'मतगणना और परिणाम' },
    description: {
      en: 'Votes are counted at designated counting centers under strict security. Results are declared constituency by constituency.',
      hi: 'कड़ी सुरक्षा में निर्धारित केंद्रों पर मतगणना होती है। परिणाम निर्वाचन क्षेत्रवार घोषित होते हैं।'
    },
    details: {
      en: [
        'Counting happens on a single designated day, starting at 8 AM',
        'Postal ballots are counted first, then EVM votes round by round',
        'Candidates and their agents can observe the counting process',
        'VVPAT slips of 5 randomly selected booths per constituency are matched with EVM counts',
        'The candidate with the highest votes in a constituency wins (FPTP system)',
        'Results are updated live on results.eci.gov.in'
      ],
      hi: [
        'मतगणना एक निर्धारित दिन सुबह 8 बजे से शुरू होती है',
        'पहले डाक मतपत्र, फिर EVM मत राउंड दर राउंड गिने जाते हैं',
        'उम्मीदवार और उनके एजेंट मतगणना देख सकते हैं',
        'प्रति निर्वाचन क्षेत्र 5 यादृच्छिक बूथों की VVPAT पर्चियां EVM से मिलाई जाती हैं',
        'निर्वाचन क्षेत्र में सबसे अधिक मत पाने वाला जीतता है (FPTP प्रणाली)',
        'results.eci.gov.in पर लाइव अपडेट होते हैं'
      ]
    },
    fact: {
      en: 'The 2024 Lok Sabha counting day processed results from 543 constituencies in under 12 hours!',
      hi: '2024 लोक सभा मतगणना दिवस में 543 निर्वाचन क्षेत्रों के परिणाम 12 घंटे से कम में आए!'
    }
  }
];
