/**
 * Myth-Busting Quiz Questions — Indian Elections
 * @module data/quiz-questions
 */

export const quizQuestions = [
  {
    id: 1,
    category: 'Voter Rights',
    question: 'You need an Aadhaar card to vote in Indian elections.',
    answer: false,
    explanation: 'Aadhaar is NOT mandatory for voting. You can use any of 12 approved photo IDs including Passport, Driving License, PAN card, or EPIC (Voter ID).'
  },
  {
    id: 2,
    category: 'EVM & Process',
    question: 'EVMs can be hacked remotely via WiFi or Bluetooth.',
    answer: false,
    explanation: 'EVMs are standalone devices with no wireless connectivity, no internet, and no operating system. They run on a one-time programmable chip manufactured by BEL/ECIL.'
  },
  {
    id: 3,
    category: 'Voter Rights',
    question: 'If your name is on the electoral roll, you can vote even without a Voter ID card.',
    answer: true,
    explanation: 'Yes! If your name is on the electoral roll, you can vote using any of the 12 approved alternative photo ID documents.'
  },
  {
    id: 4,
    category: 'Deadlines & Rules',
    question: 'Campaigning is allowed right up until polling day.',
    answer: false,
    explanation: 'All campaigning must stop 48 hours before polling begins. This "Silence Period" allows voters to make decisions without pressure.'
  },
  {
    id: 5,
    category: 'EVM & Process',
    question: 'NOTA votes can lead to re-election if they exceed all candidates\' votes.',
    answer: false,
    explanation: 'Currently, NOTA has no legal consequence. Even if NOTA gets the highest votes, the candidate with the most votes among the contestants wins.'
  },
  {
    id: 6,
    category: 'Voter Rights',
    question: 'NRI citizens of India can vote in elections.',
    answer: true,
    explanation: 'Yes! Since 2011, NRIs can register as overseas voters using Form 6A. However, they must be physically present at their constituency to vote.'
  },
  {
    id: 7,
    category: 'EVM & Process',
    question: 'The VVPAT slip is given to the voter to take home.',
    answer: false,
    explanation: 'The VVPAT slip is displayed behind a glass window for only 7 seconds, then automatically drops into a sealed box. Voters cannot touch or take it.'
  },
  {
    id: 8,
    category: 'Deadlines & Rules',
    question: 'A candidate must be at least 25 years old to contest Lok Sabha elections.',
    answer: true,
    explanation: 'Correct! The minimum age is 25 for Lok Sabha and Vidhan Sabha, and 30 for Rajya Sabha.'
  },
  {
    id: 9,
    category: 'Voter Rights',
    question: 'Prisoners in India can vote in elections.',
    answer: false,
    explanation: 'Under Section 62(5) of the Representation of the People Act, persons in jail or police custody cannot vote. However, persons on bail can.'
  },
  {
    id: 10,
    category: 'EVM & Process',
    question: 'Each EVM can store votes for up to 64 candidates.',
    answer: true,
    explanation: 'A single EVM Ballot Unit supports up to 16 candidates. Up to 4 units can be linked, supporting a maximum of 64 candidates.'
  },
  {
    id: 11,
    category: 'Deadlines & Rules',
    question: 'Exit polls can be broadcast during polling phases in India.',
    answer: false,
    explanation: 'Exit polls are banned from the start of the first polling phase until 30 minutes after the last phase ends, to prevent voter influence.'
  },
  {
    id: 12,
    category: 'Voter Rights',
    question: 'Senior citizens above 80 years can vote via postal ballot.',
    answer: true,
    explanation: 'Yes! Voters aged 80+ and persons with disabilities can opt for postal ballots, so they don\'t need to visit polling stations.'
  },
  {
    id: 13,
    category: 'EVM & Process',
    question: 'The indelible ink mark on your finger can be washed off easily with soap.',
    answer: false,
    explanation: 'Indelible ink contains silver nitrate and cannot be removed with soap, bleach, or any common solvent. It fades naturally in 2-4 weeks.'
  },
  {
    id: 14,
    category: 'Deadlines & Rules',
    question: 'Independent candidates (no party) can contest elections in India.',
    answer: true,
    explanation: 'Yes! Any eligible citizen can contest as an independent candidate. They are assigned a unique symbol by the ECI from a free symbols list.'
  },
  {
    id: 15,
    category: 'Voter Rights',
    question: 'Voting is compulsory in India by law.',
    answer: false,
    explanation: 'Voting is a right, not a legal obligation in India at the national level. However, some states like Gujarat have local compulsory voting laws.'
  },
  {
    id: 16,
    category: 'EVM & Process',
    question: 'Mock polls are conducted on the morning of election day before actual voting begins.',
    answer: true,
    explanation: 'Yes! Before polling starts, a mock poll of at least 50 votes is conducted in the presence of candidates\' agents to verify the EVM works correctly.'
  },
  {
    id: 17,
    category: 'Deadlines & Rules',
    question: 'The Election Commission is part of the ruling government.',
    answer: false,
    explanation: 'The ECI is an autonomous constitutional body (Article 324). It operates independently of the government and cannot be directed by any party.'
  },
  {
    id: 18,
    category: 'Voter Rights',
    question: 'You can file a complaint if your name is missing from the voter list on election day.',
    answer: true,
    explanation: 'Yes! You can file Form 6 to get added before the deadline, or approach the Booth Level Officer. On election day, contact the Presiding Officer.'
  },
  {
    id: 19,
    category: 'EVM & Process',
    question: 'EVMs run on batteries and do not need electricity from the grid.',
    answer: true,
    explanation: 'Correct! EVMs are powered by 6-volt alkaline batteries, making them usable even in remote areas without electricity.'
  },
  {
    id: 20,
    category: 'Deadlines & Rules',
    question: 'A person can contest elections from multiple constituencies simultaneously.',
    answer: true,
    explanation: 'Yes, but from a maximum of 2 constituencies. If elected from both, the candidate must vacate one seat within 14 days.'
  }
];

/**
 * Badge thresholds for quiz scores
 */
export const badgeThresholds = [
  { min: 0, max: 4, label: 'Beginner', emoji: '🌱', color: '#6B6B82' },
  { min: 5, max: 7, label: 'Informed Voter', emoji: '📖', color: '#3B82F6' },
  { min: 8, max: 9, label: 'Election Expert', emoji: '🏅', color: '#FF6B35' },
  { min: 10, max: 10, label: 'Democracy Champion', emoji: '🏆', color: '#FFD700' }
];
