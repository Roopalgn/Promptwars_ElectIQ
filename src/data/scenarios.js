export const scenarios = {
  "missed_registration": {
    id: "missed_registration",
    title: "Missed Registration Deadline",
    icon: "⏰",
    description: "What happens if you miss the voter registration deadline?",
    start_node: "start",
    nodes: {
      "start": {
        message: "You realized the voter registration deadline for the upcoming election has already passed.",
        message_hi: "आपको एहसास हुआ कि आगामी चुनाव के लिए मतदाता पंजीकरण की समय सीमा पहले ही बीत चुकी है।",
        severity: "critical",
        options: [
          { label: "Can I still register and vote in this election?", label_hi: "क्या मैं अभी भी पंजीकरण कर सकता हूं और इस चुनाव में मतदान कर सकता हूं?", next: "cannot_vote" },
          { label: "What should I do for the next election?", label_hi: "मुझे अगले चुनाव के लिए क्या करना चाहिए?", next: "register_next" }
        ],
        consequences: ["You cannot vote in the current election cycle."],
        consequences_hi: ["आप वर्तमान चुनाव चक्र में मतदान नहीं कर सकते हैं।"],
        recovery: [],
        deadline: "Next election cycle",
        deadline_hi: "अगला चुनाव चक्र"
      },
      "cannot_vote": {
        message: "Unfortunately, by law, the electoral roll is frozen before the election. You cannot vote this time.",
        message_hi: "दुर्भाग्य से, कानून के अनुसार, चुनाव से पहले मतदाता सूची को फ्रीज कर दिया जाता है। इस बार आप मतदान नहीं कर सकते।",
        severity: "critical",
        options: [
          { label: "Is there any exception?", label_hi: "क्या कोई अपवाद है?", next: "no_exception" },
          { label: "Okay, how do I prepare for next time?", label_hi: "ठीक है, मैं अगली बार के लिए कैसे तैयारी करूं?", next: "register_next" }
        ],
        consequences: ["Missed opportunity to vote in this election."],
        consequences_hi: ["इस चुनाव में मतदान करने का अवसर चूक गया।"],
        recovery: [],
        deadline: null
      },
      "no_exception": {
        message: "There are no exceptions. The freeze date is strictly enforced to print the final voter lists.",
        message_hi: "कोई अपवाद नहीं हैं। अंतिम मतदाता सूची छापने के लिए फ्रीज की तारीख सख्ती से लागू की जाती है।",
        severity: "critical",
        options: [
          { label: "Got it. How do I register for the future?", label_hi: "समझ गया। मैं भविष्य के लिए कैसे पंजीकरण करूं?", next: "register_next" }
        ],
        consequences: [],
        recovery: [],
        deadline: null
      },
      "register_next": {
        message: "You can apply anytime online via NVSP. Your name will be added during the next continuous updation process.",
        message_hi: "आप NVSP के माध्यम से ऑनलाइन कभी भी आवेदन कर सकते हैं। अगले निरंतर अद्यतन प्रक्रिया के दौरान आपका नाम जोड़ा जाएगा।",
        severity: "safe",
        options: [
          { label: "Finish Simulation", label_hi: "अनुकरण समाप्त करें", next: null }
        ],
        consequences: [],
        recovery: ["Visit voters.eci.gov.in", "Fill Form 6 online", "Keep your Aadhaar/Address proof ready"],
        recovery_hi: ["voters.eci.gov.in पर जाएं", "फॉर्म 6 ऑनलाइन भरें", "अपना आधार/पता प्रमाण तैयार रखें"],
        deadline: "Continuous updation",
        deadline_hi: "निरंतर अद्यतन"
      }
    }
  },
  "name_missing": {
    id: "name_missing",
    title: "Name Not in Voter List",
    icon: "🔍",
    description: "You have a Voter ID, but your name is missing from the list at the booth.",
    start_node: "start",
    nodes: {
      "start": {
        message: "You arrive at the polling booth with your Voter ID card, but the polling officer says your name is not on the voter list.",
        message_hi: "आप अपना मतदाता पहचान पत्र लेकर मतदान केंद्र पहुंचते हैं, लेकिन मतदान अधिकारी का कहना है कि मतदाता सूची में आपका नाम नहीं है।",
        severity: "critical",
        options: [
          { label: "Argue that I have a Voter ID card!", label_hi: "बहस करें कि मेरे पास वोटर आईडी कार्ड है!", next: "voter_id_insufficient" },
          { label: "Check if I am at the right booth.", label_hi: "जांचें कि क्या मैं सही बूथ पर हूं।", next: "check_booth" }
        ],
        consequences: ["You are currently not allowed to vote."],
        consequences_hi: ["आपको वर्तमान में मतदान करने की अनुमति नहीं है।"],
        recovery: [],
        deadline: "Election Day",
        deadline_hi: "चुनाव का दिन"
      },
      "voter_id_insufficient": {
        message: "A Voter ID card (EPIC) alone does not guarantee the right to vote. Your name MUST be on the electoral roll.",
        message_hi: "अकेले मतदाता पहचान पत्र (EPIC) मतदान के अधिकार की गारंटी नहीं देता है। आपका नाम मतदाता सूची में होना चाहिए।",
        severity: "critical",
        options: [
          { label: "So what can I do right now?", label_hi: "तो मैं अभी क्या कर सकता हूँ?", next: "check_booth" }
        ],
        consequences: ["Possession of EPIC is not enough."],
        consequences_hi: ["EPIC का होना ही काफी नहीं है।"],
        recovery: [],
        deadline: null
      },
      "check_booth": {
        message: "You can use the Voter Helpline App or check online to ensure you haven't been shifted to an auxiliary booth nearby.",
        message_hi: "आप वोटर हेल्पलाइन ऐप का उपयोग कर सकते हैं या ऑनलाइन जांच कर सकते हैं ताकि यह सुनिश्चित हो सके कि आपको पास के किसी सहायक बूथ पर तो नहीं भेजा गया है।",
        severity: "warning",
        options: [
          { label: "My name is indeed shifted to another booth.", label_hi: "मेरा नाम वास्तव में दूसरे बूथ पर स्थानांतरित कर दिया गया है।", next: "go_to_new_booth" },
          { label: "My name is completely deleted from the roll.", label_hi: "मतदाता सूची से मेरा नाम पूरी तरह कट गया है।", next: "name_deleted" }
        ],
        consequences: [],
        recovery: ["Download Voter Helpline App", "Search by EPIC number"],
        recovery_hi: ["वोटर हेल्पलाइन ऐप डाउनलोड करें", "EPIC नंबर से खोजें"],
        deadline: null
      },
      "go_to_new_booth": {
        message: "Great! Head over to the correct polling station listed on the app. You can vote there.",
        message_hi: "बहुत बढ़िया! ऐप पर सूचीबद्ध सही मतदान केंद्र पर जाएं। आप वहां मतदान कर सकते हैं।",
        severity: "safe",
        options: [
          { label: "Finish Simulation", label_hi: "अनुकरण समाप्त करें", next: null }
        ],
        consequences: [],
        recovery: ["Go to the correct booth", "Cast your vote"],
        recovery_hi: ["सही बूथ पर जाएं", "अपना वोट डालें"],
        deadline: "Before polling closes today",
        deadline_hi: "आज मतदान समाप्त होने से पहले"
      },
      "name_deleted": {
        message: "If your name is deleted, you cannot vote today. You must re-apply using Form 6 after the elections are over.",
        message_hi: "यदि आपका नाम हटा दिया जाता है, तो आप आज मतदान नहीं कर सकते। चुनाव समाप्त होने के बाद आपको फॉर्म 6 का उपयोग करके फिर से आवेदन करना होगा।",
        severity: "critical",
        options: [
          { label: "Finish Simulation", label_hi: "अनुकरण समाप्त करें", next: null }
        ],
        consequences: ["Cannot vote today.", "Must re-register."],
        consequences_hi: ["आज मतदान नहीं कर सकते।", "फिर से पंजीकरण करना होगा।"],
        recovery: ["Wait for elections to finish", "Submit Form 6 online"],
        recovery_hi: ["चुनाव खत्म होने का इंतजार करें", "फॉर्म 6 ऑनलाइन जमा करें"],
        deadline: "Post-election continuous updation",
        deadline_hi: "चुनाव के बाद निरंतर अद्यतन"
      }
    }
  },
  "changed_residence": {
    id: "changed_residence",
    title: "Changed Residence",
    icon: "🏠",
    description: "You moved to a new city or state and need to update your voter status.",
    start_node: "start",
    nodes: {
      "start": {
        message: "You recently shifted to a new city and elections are coming up in 2 months.",
        message_hi: "आप हाल ही में एक नए शहर में चले गए हैं और 2 महीने में चुनाव होने वाले हैं।",
        severity: "warning",
        options: [
          { label: "Can I vote in my old city?", label_hi: "क्या मैं अपने पुराने शहर में मतदान कर सकता हूँ?", next: "vote_old_city" },
          { label: "How do I shift my vote to the new city?", label_hi: "मैं अपना वोट नए शहर में कैसे स्थानांतरित करूं?", next: "shift_vote" }
        ],
        consequences: ["Your voter ID is tied to your old address."],
        consequences_hi: ["आपका वोटर आईडी आपके पुराने पते से जुड़ा है।"],
        recovery: [],
        deadline: null
      },
      "vote_old_city": {
        message: "You can technically vote there if your name is still on the roll, but it is an offense to be registered in two places. You should ideally shift it.",
        message_hi: "आप तकनीकी रूप से वहां मतदान कर सकते हैं यदि आपका नाम अभी भी सूची में है, लेकिन दो स्थानों पर पंजीकृत होना एक अपराध है। आपको इसे आदर्श रूप से स्थानांतरित करना चाहिए।",
        severity: "warning",
        options: [
          { label: "Okay, I will shift my vote.", label_hi: "ठीक है, मैं अपना वोट स्थानांतरित कर दूंगा।", next: "shift_vote" }
        ],
        consequences: ["Travel required to old city.", "Potential legal issue if registered twice."],
        consequences_hi: ["पुराने शहर की यात्रा आवश्यक।", "दो बार पंजीकृत होने पर संभावित कानूनी समस्या।"],
        recovery: [],
        deadline: null
      },
      "shift_vote": {
        message: "You need to submit Form 8 for shifting of residence. If it's a different assembly constituency, you will get a new part/serial number.",
        message_hi: "निवास स्थान बदलने के लिए आपको फॉर्म 8 जमा करना होगा। यदि यह एक अलग विधानसभा क्षेत्र है, तो आपको एक नया भाग/क्रम संख्या मिलेगा।",
        severity: "safe",
        options: [
          { label: "Do I get a new Voter ID card?", label_hi: "क्या मुझे नया वोटर आईडी कार्ड मिलेगा?", next: "new_card" }
        ],
        consequences: [],
        recovery: ["Submit Form 8 online", "Provide new address proof"],
        recovery_hi: ["फॉर्म 8 ऑनलाइन जमा करें", "नया पता प्रमाण प्रदान करें"],
        deadline: "Before election notification",
        deadline_hi: "चुनाव अधिसूचना से पहले"
      },
      "new_card": {
        message: "Yes! A replacement EPIC with the new address will be generated and delivered to you.",
        message_hi: "हाँ! नए पते के साथ एक प्रतिस्थापन EPIC उत्पन्न किया जाएगा और आपको वितरित किया जाएगा।",
        severity: "safe",
        options: [
          { label: "Finish Simulation", label_hi: "अनुकरण समाप्त करें", next: null }
        ],
        consequences: [],
        recovery: ["Wait for speed post delivery of new EPIC"],
        recovery_hi: ["नए EPIC के स्पीड पोस्ट वितरण की प्रतीक्षा करें"],
        deadline: null
      }
    }
  }
};
