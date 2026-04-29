/**
 * Election Timeline Events — India General Election phases
 * Used by Google Charts Timeline visualization
 * @module data/timeline-events
 */

export const timelineEvents = [
  {
    id: 'announcement',
    label: { en: 'Election Announcement', hi: 'चुनाव घोषणा' },
    category: 'pre-election',
    color: '#3B82F6',
    startDate: '2024-03-16',
    endDate: '2024-03-20',
    description: { en: 'ECI announces schedule, MCC comes into effect', hi: 'ECI कार्यक्रम घोषित, MCC लागू' }
  },
  {
    id: 'nomination',
    label: { en: 'Nomination Period', hi: 'नामांकन अवधि' },
    category: 'pre-election',
    color: '#8B5CF6',
    startDate: '2024-03-20',
    endDate: '2024-04-19',
    description: { en: 'Candidates file nomination papers with Returning Officers', hi: 'उम्मीदवार रिटर्निंग ऑफिसर को नामांकन पत्र दाखिल करते हैं' }
  },
  {
    id: 'scrutiny',
    label: { en: 'Scrutiny & Withdrawal', hi: 'जांच और वापसी' },
    category: 'pre-election',
    color: '#EC4899',
    startDate: '2024-04-01',
    endDate: '2024-04-29',
    description: { en: 'Papers checked for validity; candidates may withdraw', hi: 'पत्रों की जांच; उम्मीदवार वापस ले सकते हैं' }
  },
  {
    id: 'campaign',
    label: { en: 'Campaign Period', hi: 'प्रचार अवधि' },
    category: 'election',
    color: '#F59E0B',
    startDate: '2024-03-20',
    endDate: '2024-05-30',
    description: { en: 'Rallies, media campaigns, and voter outreach', hi: 'रैलियां, मीडिया अभियान, मतदाता संपर्क' }
  },
  {
    id: 'phase1',
    label: { en: 'Phase 1 Polling', hi: 'चरण 1 मतदान' },
    category: 'polling',
    color: '#FF6B35',
    startDate: '2024-04-19',
    endDate: '2024-04-19',
    description: { en: '102 constituencies across 21 states/UTs', hi: '21 राज्यों/केंद्रशासित प्रदेशों में 102 सीटें' }
  },
  {
    id: 'phase2',
    label: { en: 'Phase 2 Polling', hi: 'चरण 2 मतदान' },
    category: 'polling',
    color: '#FF6B35',
    startDate: '2024-04-26',
    endDate: '2024-04-26',
    description: { en: '89 constituencies across 13 states/UTs', hi: '13 राज्यों/केंद्रशासित प्रदेशों में 89 सीटें' }
  },
  {
    id: 'phase3',
    label: { en: 'Phase 3 Polling', hi: 'चरण 3 मतदान' },
    category: 'polling',
    color: '#FF6B35',
    startDate: '2024-05-07',
    endDate: '2024-05-07',
    description: { en: '94 constituencies across 12 states/UTs', hi: '12 राज्यों/केंद्रशासित प्रदेशों में 94 सीटें' }
  },
  {
    id: 'phase4',
    label: { en: 'Phase 4 Polling', hi: 'चरण 4 मतदान' },
    category: 'polling',
    color: '#FF6B35',
    startDate: '2024-05-13',
    endDate: '2024-05-13',
    description: { en: '96 constituencies across 10 states/UTs', hi: '10 राज्यों/केंद्रशासित प्रदेशों में 96 सीटें' }
  },
  {
    id: 'phase5',
    label: { en: 'Phase 5 Polling', hi: 'चरण 5 मतदान' },
    category: 'polling',
    color: '#FF6B35',
    startDate: '2024-05-20',
    endDate: '2024-05-20',
    description: { en: '49 constituencies across 8 states/UTs', hi: '8 राज्यों/केंद्रशासित प्रदेशों में 49 सीटें' }
  },
  {
    id: 'phase6',
    label: { en: 'Phase 6 Polling', hi: 'चरण 6 मतदान' },
    category: 'polling',
    color: '#FF6B35',
    startDate: '2024-05-25',
    endDate: '2024-05-25',
    description: { en: '58 constituencies across 8 states/UTs', hi: '8 राज्यों/केंद्रशासित प्रदेशों में 58 सीटें' }
  },
  {
    id: 'phase7',
    label: { en: 'Phase 7 Polling', hi: 'चरण 7 मतदान' },
    category: 'polling',
    color: '#FF6B35',
    startDate: '2024-06-01',
    endDate: '2024-06-01',
    description: { en: '57 constituencies across 8 states/UTs', hi: '8 राज्यों/केंद्रशासित प्रदेशों में 57 सीटें' }
  },
  {
    id: 'counting',
    label: { en: 'Counting Day', hi: 'मतगणना दिवस' },
    category: 'post-election',
    color: '#16A34A',
    startDate: '2024-06-04',
    endDate: '2024-06-04',
    description: { en: 'Votes counted at designated centers, results declared', hi: 'निर्धारित केंद्रों पर मत गिने जाते हैं, परिणाम घोषित' }
  },
  {
    id: 'results',
    label: { en: 'Government Formation', hi: 'सरकार गठन' },
    category: 'post-election',
    color: '#16A34A',
    startDate: '2024-06-05',
    endDate: '2024-06-09',
    description: { en: 'Winning party/coalition invited to form government', hi: 'विजयी दल/गठबंधन को सरकार बनाने का आमंत्रण' }
  }
];

/** Category color legend */
export const timelineCategories = [
  { id: 'pre-election', label: { en: 'Pre-Election', hi: 'चुनाव पूर्व' }, color: '#3B82F6' },
  { id: 'election', label: { en: 'Campaign', hi: 'प्रचार' }, color: '#F59E0B' },
  { id: 'polling', label: { en: 'Polling Phases', hi: 'मतदान चरण' }, color: '#FF6B35' },
  { id: 'post-election', label: { en: 'Post-Election', hi: 'चुनाव पश्चात' }, color: '#16A34A' }
];
