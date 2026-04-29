/**
 * Offline knowledge base — used as fallback when Gemini API is unavailable
 * or rate limited. Provides curated answers for the most common voter questions.
 * @module api/offline-knowledge
 */

const KNOWLEDGE = [
  {
    keywords: ['register', 'registration', 'form 6', 'enroll', 'enrol', 'sign up', 'पंजीकरण', 'मतदाता बनना'],
    answer: `**How to register as a voter in India:**\n\n• You must be **18+ years old** and an Indian citizen\n• Fill **Form 6** online at [voters.eci.gov.in](https://voters.eci.gov.in) (NVSP)\n• Documents: age proof (Aadhaar / birth certificate), address proof, passport-size photo\n• Submit and track status using your reference number\n• After verification, you receive your **EPIC** (Voter ID card)\n\n*Source: Election Commission of India*`
  },
  {
    keywords: ['evm', 'electronic voting', 'voting machine', 'मशीन', 'ईवीएम'],
    answer: `**About EVMs (Electronic Voting Machines):**\n\n• EVMs are **standalone devices** — no internet, WiFi, or Bluetooth\n• They run on **6V batteries**, usable in remote areas without power\n• Manufactured by **BEL** and **ECIL** under strict supervision\n• Each Ballot Unit holds **16 candidates**; up to 4 can be linked (max 64)\n• Cannot be hacked remotely because they are not networked\n• **VVPAT** machines print a paper slip visible for 7 seconds for verification\n\n*Source: Election Commission of India*`
  },
  {
    keywords: ['vvpat', 'paper trail', 'पर्ची'],
    answer: `**VVPAT (Voter Verifiable Paper Audit Trail):**\n\n• A printer attached to every EVM\n• Prints a paper slip showing your candidate, symbol, and serial number\n• Slip is visible behind a glass window for **7 seconds**\n• Then it drops into a sealed box automatically — voters cannot keep it\n• Used for random cross-verification of EVM counts\n\n*Source: ECI*`
  },
  {
    keywords: ['nota', 'none of the above', 'नोटा'],
    answer: `**NOTA (None Of The Above):**\n\n• Available as the **last option** on every EVM\n• Allows voters to formally reject all candidates\n• Introduced in **2013** by Supreme Court order\n• Currently has **no legal consequence** — even if NOTA gets the most votes, the candidate with the most votes among contestants wins\n• Recorded and reported separately by the ECI\n\n*Source: ECI*`
  },
  {
    keywords: ['mcc', 'model code', 'code of conduct', 'आचार संहिता'],
    answer: `**Model Code of Conduct (MCC):**\n\n• A set of **voluntary guidelines** for parties and candidates\n• Comes into effect the moment elections are announced\n• Restricts new policy announcements, government ads, transfers of officials\n• No appeals based on **religion, caste, or communal feelings**\n• Stays in effect until results are declared\n• Although not a law, no major party has openly violated it since 1991\n\n*Source: ECI*`
  },
  {
    keywords: ['nri', 'overseas', 'abroad', 'foreign', 'अनिवासी'],
    answer: `**NRI (Non-Resident Indian) Voting:**\n\n• Since **2011**, NRIs can register as overseas voters\n• Use **Form 6A** at [voters.eci.gov.in](https://voters.eci.gov.in)\n• Must hold an Indian passport (no dual citizenship allowed)\n• Currently must be **physically present** at their constituency to vote\n• Postal ballot for NRIs is under consideration but not yet implemented\n\n*Source: ECI*`
  },
  {
    keywords: ['postal ballot', 'senior citizen', '80 years', 'disability', 'डाक मतपत्र'],
    answer: `**Postal Ballot (Form 12D):**\n\n• Available for:\n  - Senior citizens **aged 80+**\n  - **Persons with disabilities** (PwD, 40%+ benchmark)\n  - **Service voters** (armed forces, government on deputation abroad)\n  - **Election duty staff**\n  - **COVID-19 / quarantined** voters (when applicable)\n• Must apply via **Form 12D** within 5 days of notification\n• Vote is collected by polling officials at the voter's home\n\n*Source: ECI*`
  },
  {
    keywords: ['eligibility', 'who can vote', 'eligible', 'minimum age', 'पात्र'],
    answer: `**Voter Eligibility in India:**\n\n• Must be a **citizen of India**\n• Must be **18+ years old** on the qualifying date (1st January)\n• Must be ordinarily resident in the constituency\n• Name must appear on the electoral roll\n• Must **not** be: in jail, of unsound mind (declared by court), or disqualified for corrupt practices\n• Persons on bail **can** vote\n\n*Source: Representation of the People Act, 1951*`
  },
  {
    keywords: ['id', 'documents', 'photo id', 'epic', 'voter id', 'पहचान'],
    answer: `**Approved Photo IDs at the Polling Booth:**\n\nIf your name is on the electoral roll, you can use any **one** of these 12 IDs:\n\n1. **EPIC** (Voter ID card)\n2. Aadhaar card\n3. Passport\n4. Driving Licence\n5. PAN card\n6. Service ID with photo (Central/State Govt, PSU)\n7. Passbook with photo (Bank/Post Office)\n8. MGNREGA job card\n9. Health insurance smart card (Ministry of Labour)\n10. Pension document with photo\n11. Smart card under NPR (RGI)\n12. Official identity card for MPs/MLAs/MLCs\n\n*Source: ECI*`
  },
  {
    keywords: ['phase', 'schedule', 'date', '2024 election', 'general election'],
    answer: `**2024 Lok Sabha Election Phases:**\n\n• **Phase 1**: 19 April 2024 (102 seats, 21 states/UTs)\n• **Phase 2**: 26 April 2024 (88 seats)\n• **Phase 3**: 7 May 2024 (94 seats)\n• **Phase 4**: 13 May 2024 (96 seats)\n• **Phase 5**: 20 May 2024 (49 seats)\n• **Phase 6**: 25 May 2024 (58 seats)\n• **Phase 7**: 1 June 2024 (57 seats)\n• **Counting Day**: 4 June 2024\n\nTotal: 543 seats elected. Around **968 million** voters were eligible — the world's largest democratic exercise.\n\n*Source: ECI*`
  },
  {
    keywords: ['booth', 'polling station', 'where to vote', 'मतदान केंद्र'],
    answer: `**Find Your Polling Booth:**\n\n• Visit [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in)\n• Search by **EPIC number**, name + details, or mobile number\n• Or use the official **Voter Helpline App** (Android/iOS)\n• Call the toll-free **Voter Helpline: 1950**\n• Polling booths are typically within 2 km of your residence\n\nOn polling day, your slip will mention the booth number and address.\n\n*Source: ECI*`
  },
  {
    keywords: ['cvigil', 'complaint', 'violation', 'report', 'शिकायत'],
    answer: `**cVIGIL — Report Election Violations:**\n\n• Free Android/iOS app by the Election Commission\n• Report violations of the Model Code of Conduct using **photo or video**\n• Auto-captures **time and location** (GPS-enabled)\n• Decision in **100 minutes** by Flying Squads\n• Reporter identity stays anonymous\n• Use it for: hate speech, distribution of money/liquor, illegal hoardings, vehicle misuse, etc.\n\n*Source: ECI*`
  },
  {
    keywords: ['silence period', '48 hours', 'campaign end', 'मौन अवधि'],
    answer: `**The 48-Hour Silence Period:**\n\n• All campaigning **must stop 48 hours** before polling closes\n• No public meetings, processions, or rallies\n• No radio/TV broadcasts of poll-related content in the constituency\n• Exit polls are **banned** from start of Phase 1 until 30 minutes after the last phase ends\n• Helps voters reflect without last-minute pressure\n\n*Source: Section 126, Representation of the People Act*`
  },
  {
    keywords: ['eci', 'commission', 'cec', 'चुनाव आयोग'],
    answer: `**Election Commission of India (ECI):**\n\n• **Autonomous constitutional body** under Article 324\n• Founded **25 January 1950** (now National Voters' Day)\n• Three-member body: **Chief Election Commissioner + 2 Election Commissioners**\n• Conducts elections to: Lok Sabha, Rajya Sabha, State Legislatures, President & Vice-President\n• Headquarters: **Nirvachan Sadan, New Delhi**\n• Cannot be removed except by impeachment (like a Supreme Court judge)\n\n*Source: Constitution of India*`
  },
  {
    keywords: ['prisoner', 'jail', 'undertrial', 'कैदी'],
    answer: `**Can Prisoners Vote?**\n\n• **No** — under Section 62(5) of the Representation of the People Act, persons in jail or police custody cannot vote\n• This includes **undertrials** (not yet convicted)\n• **Exception**: persons on bail **can** vote\n• Disqualification continues for 6 years after release for certain offences\n• Many legal experts have challenged this rule, but it remains in force\n\n*Source: Representation of the People Act, 1951*`
  },
  {
    keywords: ['symbol', 'allotment', 'free symbol', 'चुनाव चिन्ह'],
    answer: `**Election Symbols in India:**\n\n• Allotted by the ECI under the **Symbols (Reservation and Allotment) Order, 1968**\n• **Reserved symbols**: for recognised national/state parties\n• **Free symbols**: for independents and unrecognised parties (chosen from a public list)\n• Helps voters identify candidates on the EVM, especially in low-literacy areas\n• Famous examples: Lotus (BJP), Hand (INC), Cycle (SP), Elephant (BSP)\n\n*Source: ECI*`
  }
];

/**
 * Get an offline answer for a query if any keywords match.
 * @param {string} query - User's question
 * @returns {string|null} Markdown answer or null if no match
 */
export function getOfflineAnswer(query) {
  if (typeof query !== 'string' || !query.trim()) return null;
  const lower = query.toLowerCase();

  // Score each entry by number of keyword hits
  let best = { score: 0, answer: null };
  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw.toLowerCase())) score += 1;
    }
    if (score > best.score) {
      best = { score, answer: entry.answer };
    }
  }
  return best.answer;
}

/**
 * Generic helpful fallback when nothing matches the offline knowledge base
 */
export const GENERIC_FALLBACK = `I couldn't reach the AI service right now, but here are some quick resources:\n\n• **Register / check enrollment**: [voters.eci.gov.in](https://voters.eci.gov.in)\n• **Find your booth**: [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in)\n• **Voter helpline**: 1950 (toll-free, 24×7)\n• **Report violations**: cVIGIL app\n\nTry rephrasing your question with keywords like *EVM, Form 6, NOTA, NRI, postal ballot, eligibility, MCC, polling booth, cVIGIL, ECI*.`;
