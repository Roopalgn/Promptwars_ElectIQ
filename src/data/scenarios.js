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
        severity: "critical",
        options: [
          { label: "Can I still register and vote in this election?", next: "cannot_vote" },
          { label: "What should I do for the next election?", next: "register_next" }
        ],
        consequences: ["You cannot vote in the current election cycle."],
        recovery: [],
        deadline: "Next election cycle"
      },
      "cannot_vote": {
        message: "Unfortunately, by law, the electoral roll is frozen before the election. You cannot vote this time.",
        severity: "critical",
        options: [
          { label: "Is there any exception?", next: "no_exception" },
          { label: "Okay, how do I prepare for next time?", next: "register_next" }
        ],
        consequences: ["Missed opportunity to vote in this election."],
        recovery: [],
        deadline: null
      },
      "no_exception": {
        message: "There are no exceptions. The freeze date is strictly enforced to print the final voter lists.",
        severity: "critical",
        options: [
          { label: "Got it. How do I register for the future?", next: "register_next" }
        ],
        consequences: [],
        recovery: [],
        deadline: null
      },
      "register_next": {
        message: "You can apply anytime online via NVSP. Your name will be added during the next continuous updation process.",
        severity: "safe",
        options: [
          { label: "Finish Simulation", next: null }
        ],
        consequences: [],
        recovery: ["Visit voters.eci.gov.in", "Fill Form 6 online", "Keep your Aadhaar/Address proof ready"],
        deadline: "Continuous updation"
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
        severity: "critical",
        options: [
          { label: "Argue that I have a Voter ID card!", next: "voter_id_insufficient" },
          { label: "Check if I am at the right booth.", next: "check_booth" }
        ],
        consequences: ["You are currently not allowed to vote."],
        recovery: [],
        deadline: "Election Day"
      },
      "voter_id_insufficient": {
        message: "A Voter ID card (EPIC) alone does not guarantee the right to vote. Your name MUST be on the electoral roll.",
        severity: "critical",
        options: [
          { label: "So what can I do right now?", next: "check_booth" }
        ],
        consequences: ["Possession of EPIC is not enough."],
        recovery: [],
        deadline: null
      },
      "check_booth": {
        message: "You can use the Voter Helpline App or check online to ensure you haven't been shifted to an auxiliary booth nearby.",
        severity: "warning",
        options: [
          { label: "My name is indeed shifted to another booth.", next: "go_to_new_booth" },
          { label: "My name is completely deleted from the roll.", next: "name_deleted" }
        ],
        consequences: [],
        recovery: ["Download Voter Helpline App", "Search by EPIC number"],
        deadline: null
      },
      "go_to_new_booth": {
        message: "Great! Head over to the correct polling station listed on the app. You can vote there.",
        severity: "safe",
        options: [
          { label: "Finish Simulation", next: null }
        ],
        consequences: [],
        recovery: ["Go to the correct booth", "Cast your vote"],
        deadline: "Before polling closes today"
      },
      "name_deleted": {
        message: "If your name is deleted, you cannot vote today. You must re-apply using Form 6 after the elections are over.",
        severity: "critical",
        options: [
          { label: "Finish Simulation", next: null }
        ],
        consequences: ["Cannot vote today.", "Must re-register."],
        recovery: ["Wait for elections to finish", "Submit Form 6 online"],
        deadline: "Post-election continuous updation"
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
        severity: "warning",
        options: [
          { label: "Can I vote in my old city?", next: "vote_old_city" },
          { label: "How do I shift my vote to the new city?", next: "shift_vote" }
        ],
        consequences: ["Your voter ID is tied to your old address."],
        recovery: [],
        deadline: null
      },
      "vote_old_city": {
        message: "You can technically vote there if your name is still on the roll, but it is an offense to be registered in two places. You should ideally shift it.",
        severity: "warning",
        options: [
          { label: "Okay, I will shift my vote.", next: "shift_vote" }
        ],
        consequences: ["Travel required to old city.", "Potential legal issue if registered twice."],
        recovery: [],
        deadline: null
      },
      "shift_vote": {
        message: "You need to submit Form 8 for shifting of residence. If it's a different assembly constituency, you will get a new part/serial number.",
        severity: "safe",
        options: [
          { label: "Do I get a new Voter ID card?", next: "new_card" }
        ],
        consequences: [],
        recovery: ["Submit Form 8 online", "Provide new address proof"],
        deadline: "Before election notification"
      },
      "new_card": {
        message: "Yes! A replacement EPIC with the new address will be generated and delivered to you.",
        severity: "safe",
        options: [
          { label: "Finish Simulation", next: null }
        ],
        consequences: [],
        recovery: ["Wait for speed post delivery of new EPIC"],
        deadline: null
      }
    }
  }
};
