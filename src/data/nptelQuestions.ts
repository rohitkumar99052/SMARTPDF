export interface Question {
  id: number;
  part: 1 | 2 | 3 | 4;
  partTitle: string;
  week: string;
  topic: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string; // 'a' | 'b' | 'c' | 'd'
  explanation: string;
}

export const NPTEL_PARTS = [
  { id: 1, title: 'Part 1: Communication Basics & Group Speaking (Q1 - Q20)', count: 20 },
  { id: 2, title: 'Part 2: Visual Perception, Non-Verbal & Group Dynamics (Q21 - Q40)', count: 20 },
  { id: 3, title: 'Part 3: Emotional Intelligence, Empathy & Creativity (Q41 - Q60)', count: 20 },
  { id: 4, title: 'Part 4: Persuasion, Negotiation & Stress Management (Q61 - Q80)', count: 20 },
];

export const NPTEL_QUESTIONS: Question[] = [
  // ==================== PART 1 (Questions 1 to 20) ====================
  {
    id: 1,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Understanding the communicative environment – I',
    question: 'Soft skills are complementary to hard skills.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Only in technical jobs' },
      { id: 'd', text: 'None of the above' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer lecture 1. Soft skills work in synergy with hard technical skills.'
  },
  {
    id: 2,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Understanding the communicative environment – I',
    question: 'Which statement about communication noise is correct?',
    options: [
      { id: 'a', text: 'Noise affects only verbal communication.' },
      { id: 'b', text: 'Noise can originate from the sender, receiver, channel, or environment.' },
      { id: 'c', text: 'Noise always involves sound.' },
      { id: 'd', text: 'Noise cannot be minimized.' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 1. Noise can be environmental, physiological, or semantic at any stage.'
  },
  {
    id: 3,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Understanding the communicative environment – I',
    question: 'The use of complex technical language that the audience cannot understand illustrates which communication barrier?',
    options: [
      { id: 'a', text: 'Physical barrier' },
      { id: 'b', text: 'Psychological barrier' },
      { id: 'c', text: 'Semantic barrier' },
      { id: 'd', text: 'Cultural barrier' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 1. Semantic barriers relate to language, vocabulary, and jargon.'
  },
  {
    id: 4,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'When to speak and how?',
    question: 'In a group discussion, interrupting repeatedly usually indicates:',
    options: [
      { id: 'a', text: 'Leadership' },
      { id: 'b', text: 'Confidence' },
      { id: 'c', text: 'Poor etiquette' },
      { id: 'd', text: 'Assertiveness' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 4. Constant interruption is a clear sign of poor discussion etiquette.'
  },
  {
    id: 5,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'When to speak and how?',
    question: 'During a team meeting, Riya says, "I think we should review the data once more before deciding," in a calm, steady, and respectful tone despite others disagreeing. Which option best identifies both her voice tone and personality trait?',
    options: [
      { id: 'a', text: 'Hesitant tone; Passive personality' },
      { id: 'b', text: 'Calm, confident tone; Assertive personality' },
      { id: 'c', text: 'Loud tone; Aggressive personality' },
      { id: 'd', text: 'Sarcastic tone; Dominating personality' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 4. Assertive communication balances self-confidence with respect for others.'
  },
  {
    id: 6,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'When to speak and how?',
    question: 'Which observation is LEAST reliable as evidence of conversation dominance?',
    options: [
      { id: 'a', text: 'Repeatedly deciding who speaks next.' },
      { id: 'b', text: 'Interrupting before others complete their points.' },
      { id: 'c', text: 'Speaking in a naturally loud voice.' },
      { id: 'd', text: 'Consistently redirecting topics toward one\'s own agenda.' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 4. Voice loudness may be physical/habitual, unlike conscious conversational control.'
  },
  {
    id: 7,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Starting and sustaining a conversation',
    question: 'A negotiator makes a well-supported offer and then remains silent while maintaining attentive eye contact. The silence primarily functions to:',
    options: [
      { id: 'a', text: 'Signal uncertainty about the offer and invite reassurance' },
      { id: 'b', text: 'Shift the conversational burden to the other party, encouraging a considered response without weakening the position' },
      { id: 'c', text: 'Indicate that the discussion has ended unless the offer is accepted' },
      { id: 'd', text: 'Avoid defending the proposal if it is challenged' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 5. Strategic silence transfers the conversational initiative without making unneeded concessions.'
  },
  {
    id: 8,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Starting and sustaining a conversation',
    question: 'Which scenario best illustrates territorial behaviour?',
    options: [
      { id: 'a', text: 'A student leaves a notebook on a library desk to indicate the seat is occupied.' },
      { id: 'b', text: 'A student greets classmates with a handshake.' },
      { id: 'c', text: 'A teacher speaks loudly to address the class.' },
      { id: 'd', text: 'A manager maintains eye contact during a presentation.' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer lecture 5. Marking space with physical belongings demonstrates nonverbal territoriality.'
  },
  {
    id: 9,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Starting and sustaining a conversation',
    question: 'A senior government official asks a long-time friend to wait in the visitor\'s lounge until the scheduled appointment time instead of meeting immediately in the office. This behaviour is BEST interpreted as:',
    options: [
      { id: 'a', text: 'An intentional personal insult toward the friend' },
      { id: 'b', text: 'A violation of interpersonal communication ethics' },
      { id: 'c', text: 'Respect for institutional protocol and role boundaries rather than a personal judgment' },
      { id: 'd', text: 'Evidence that the friendship has weakened' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 5. Professional protocol takes precedence in formal institutional settings.'
  },
  {
    id: 10,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'What to listen for and why?',
    question: 'Consider the following statements about listening:\nStatement I: In the listening process, the foreground consists of the information that receives the listener\'s primary attention.\nStatement II: Effective listening requires distinguishing foreground information from competing background stimuli.',
    options: [
      { id: 'a', text: 'Both Statement I and Statement II are true, and Statement II correctly explains Statement I.' },
      { id: 'b', text: 'Both Statement I and Statement II are true, but Statement II is not the correct explanation of Statement I.' },
      { id: 'c', text: 'Statement I is true, but Statement II is false.' },
      { id: 'd', text: 'Statement I is false, but Statement II is true.' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 3. Both are true statements regarding auditory attention.'
  },
  {
    id: 11,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'What to listen for and why?',
    question: 'A listener understands not only what a speaker says but also why the speaker holds that viewpoint. This primarily reflects the ability to:',
    options: [
      { id: 'a', text: 'Decode linguistic symbols only' },
      { id: 'b', text: 'Perceive the speaker\'s thoughts and belief system underlying the message' },
      { id: 'c', text: 'Judge the speaker\'s credibility immediately' },
      { id: 'd', text: 'Memorize the speaker\'s arguments verbatim' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 3. Deep listening perceives implicit beliefs, intentions, and underlying mental models.'
  },
  {
    id: 12,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'What to listen for and why?',
    question: 'In Lament by Chekhov, the passengers primarily demonstrate:',
    options: [
      { id: 'a', text: 'Empathic listening' },
      { id: 'b', text: 'Active listening' },
      { id: 'c', text: 'Hearing without meaningful listening' },
      { id: 'd', text: 'Reflective listening' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 3. The passengers heard Iona\'s words mechanically without empathy or true listening.'
  },
  {
    id: 13,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Understanding the communicative environment – II',
    question: 'Which of the following is LEAST likely to be an emblem?',
    options: [
      { id: 'a', text: 'Nodding to mean "yes."' },
      { id: 'b', text: 'Waving to say "goodbye."' },
      { id: 'c', text: 'Accidentally tapping a foot due to nervousness.' },
      { id: 'd', text: 'Beckoning someone with a hand gesture.' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 2. Foot tapping is an adaptor/nervous tic, not a direct cultural emblem with clear direct translation.'
  },
  {
    id: 14,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Understanding the communicative environment – II',
    question: 'Consider the following statements:\nStatement I: Visual aids reduce cognitive load by presenting information in a structured and complementary manner.\nStatement II: Overloading slides with excessive text and graphics can reduce communication effectiveness.',
    options: [
      { id: 'a', text: 'Both Statement I and Statement II are correct.' },
      { id: 'b', text: 'Statement I is correct, but Statement II is incorrect.' },
      { id: 'c', text: 'Statement I is incorrect, but Statement II is correct.' },
      { id: 'd', text: 'Both Statement I and Statement II are incorrect.' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer lecture 2. Well-designed visual aids help understanding, but visual clutter increases cognitive overload.'
  },
  {
    id: 15,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 1',
    topic: 'Understanding the communicative environment – II',
    question: 'Which statement best describes the nature of a white lie?',
    options: [
      { id: 'a', text: 'It is always told under coercion.' },
      { id: 'b', text: 'It is an involuntary response to conflict.' },
      { id: 'c', text: 'It is never ethically acceptable.' },
      { id: 'd', text: 'It is usually a voluntary communicative choice made under social or interpersonal pressure.' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer lecture 2. White lies are polite social concessions made to protect feelings or maintain rapport.'
  },
  {
    id: 16,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 2',
    topic: 'Speaking in Groups',
    question: 'Good relationships and proper communication within group members are the most important factors in functioning as a group.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer to Lecture 10. Relational health and open communication are fundamental to group cohesion.'
  },
  {
    id: 17,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 2',
    topic: 'Communication Styles',
    question: 'Reflective communicators usually prefer to think carefully before responding rather than expressing their opinions immediately.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer to Lecture 9. Reflective speakers digest facts and deliberate internally before sharing.'
  },
  {
    id: 18,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 2',
    topic: 'Speaking in Groups',
    question: 'Effective group decision-making primarily depends on the quality of information available and the effectiveness of ____________________.',
    options: [
      { id: 'a', text: 'leadership style' },
      { id: 'b', text: 'presentation techniques' },
      { id: 'c', text: 'interpersonal relationships' },
      { id: 'd', text: 'message transmission' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer to Lecture 10. Accurate information message transmission ensures sound collective decisions.'
  },
  {
    id: 19,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 2',
    topic: 'Speaking in Groups',
    question: 'According to Fisher\'s Model of Group Progression, during which stage do members first become acquainted with one another and begin identifying the issues the group must address?',
    options: [
      { id: 'a', text: 'Conflict' },
      { id: 'b', text: 'Reinforcement' },
      { id: 'c', text: 'Orientation' },
      { id: 'd', text: 'Emergence' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 10. The first stage in Fisher\'s model is Orientation.'
  },
  {
    id: 20,
    part: 1,
    partTitle: 'Part 1',
    week: 'Week 2',
    topic: 'What to Present and How Part-I',
    question: 'Statement I: Hard skills are generally easier to measure than soft skills.\nStatement II: Hard skills can be evaluated using objective tests, certifications, or practical demonstrations, whereas soft skills are often assessed through observation, behavior, and context.',
    options: [
      { id: 'a', text: 'Both Statement I and Statement II are true, and Statement II is the correct explanation of Statement I.' },
      { id: 'b', text: 'Both Statement I and Statement II are true, but Statement II is not the correct explanation of Statement I.' },
      { id: 'c', text: 'Statement I is true, but Statement II is false.' },
      { id: 'd', text: 'Statement I is false, but Statement II is true.' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer lecture 6. Standardized scoring makes hard skills measurable objectively.'
  },

  // ==================== PART 2 (Questions 21 to 40) ====================
  {
    id: 21,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 2',
    topic: 'Communication Styles',
    question: 'Which of the following statements about Socratic communicators is correct?',
    options: [
      { id: 'a', text: 'They avoid speaking in public and prefer written communication.' },
      { id: 'b', text: 'They communicate only through formal channels.' },
      { id: 'c', text: 'They are articulate, expressive, and possess a strong command of language and speaking skills.' },
      { id: 'd', text: 'They rely more on non-verbal communication than verbal communication.' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 9. Socratic communicators enjoy stimulating discussions and verbal analysis.'
  },
  {
    id: 22,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 2',
    topic: 'What to Present and How Part-I',
    question: 'Messages from individuals perceived as having higher social status are often accepted with ______ questioning than messages from lower-status individuals.',
    options: [
      { id: 'a', text: 'more' },
      { id: 'b', text: 'equal' },
      { id: 'c', text: 'less' },
      { id: 'd', text: 'random' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to Lecture 6. Authority and status bias leads people to question superiors less.'
  },
  {
    id: 23,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 2',
    topic: 'Multimedia Presentation: Understanding the Basics',
    question: 'An advertisement contains a cheerful slogan but uses a disturbing image that creates an opposite emotional effect. This demonstrates that:',
    options: [
      { id: 'a', text: 'images merely clarify the meaning of text.' },
      { id: 'b', text: 'text always determines the interpretation of images.' },
      { id: 'c', text: 'visual and verbal elements function independently and never interact.' },
      { id: 'd', text: 'images can influence or even alter the interpretation of text.' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer to Lecture 8. Visual emotional resonance can redefine the textual meaning.'
  },
  {
    id: 24,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 2',
    topic: 'Communication Styles',
    question: 'Which of the following is described as a two-way process that directly influences the quality of our personal and professional lives?',
    options: [
      { id: 'a', text: 'Leadership' },
      { id: 'b', text: 'Teamwork' },
      { id: 'c', text: 'Conflict resolution' },
      { id: 'd', text: 'Communication' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer lecture 9. Communication is an active reciprocal process fundamental to life.'
  },
  {
    id: 25,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 2',
    topic: 'What to Present and How Part-II',
    question: 'A communicator demonstrates a pertinent tone by adapting the message to the ______.',
    options: [
      { id: 'a', text: 'communicator\'s emotional state' },
      { id: 'b', text: 'audience, purpose, and context' },
      { id: 'c', text: 'maximum possible level of formality' },
      { id: 'd', text: 'longest possible explanation' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to Lecture 7. Effective speakers calibrate their tone to the specific context, goal, and audience.'
  },
  {
    id: 26,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The Face, its Expressions and What it Says',
    question: 'Micro-expressions last for about:',
    options: [
      { id: 'a', text: '1/4 second' },
      { id: 'b', text: '1 second' },
      { id: 'c', text: '1/2 second' },
      { id: 'd', text: '1/10 second' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer lecture 15. Micro-expressions are brief, involuntary facial movements lasting a fraction of a second (about 1/4 second).'
  },
  {
    id: 27,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'Visual Perception',
    question: 'Perception can take place to resolve ______ to make sense.',
    options: [
      { id: 'a', text: 'unsolved problems' },
      { id: 'b', text: 'brain’s dilemmas' },
      { id: 'c', text: 'ambiguities' },
      { id: 'd', text: 'None of the above' }
    ],
    correctOptionId: 'c',
    explanation: 'Visual perception processes sensory input to resolve ambiguities into coherent mental models.'
  },
  {
    id: 28,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The Body and the Way it Communicates',
    question: 'The hand-ring gesture (thumb and forefinger forming a circle) is used to signify "zero" in which of the following countries?',
    options: [
      { id: 'a', text: 'UK' },
      { id: 'b', text: 'Belgium' },
      { id: 'c', text: 'France' },
      { id: 'd', text: 'Russia' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 14. In France, the circle gesture commonly signifies "zero" or "worthless".'
  },
  {
    id: 29,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The Aural: Its Relevance and Impact',
    question: 'Assertion (A): Ethereal music is typically characterized by light, airy, and atmospheric qualities.\nReason (R): This effect is commonly achieved through the use of heavy percussion, fast tempos, and distorted electric guitars.',
    options: [
      { id: 'a', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'b', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'c', text: 'A is true, but R is false.' },
      { id: 'd', text: 'A is false, but R is true.' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 13. Heavy percussion and distortion produce loud energetic music, opposite to ethereal.'
  },
  {
    id: 30,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The Face, its Expressions and What it Says',
    question: 'Anger often results in a _____ jaw and _____ eyebrows.',
    options: [
      { id: 'a', text: 'relaxed / raised' },
      { id: 'b', text: 'clenched / furrowed' },
      { id: 'c', text: 'clenched / raised' },
      { id: 'd', text: 'relaxed / furrowed' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 15. Anger is characterized by tightly clenched jaws and furrowed eyebrows.'
  },
  {
    id: 31,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'Visual Perception',
    question: 'When parallel lines, such as railway tracks, appear to converge as they recede into the distance, this depth cue is known as:',
    options: [
      { id: 'a', text: 'Interposition' },
      { id: 'b', text: 'Linear perspective' },
      { id: 'c', text: 'Texture gradient' },
      { id: 'd', text: 'Relative size' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 12. Linear perspective is a monocular depth cue showing apparent convergence.'
  },
  {
    id: 32,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The Face, its Expressions and What it Says',
    question: 'A job candidate receives news that they did not get the position. Instead of showing disappointment, they immediately display a warm, congratulatory smile toward the interviewer. Which concept does this scenario illustrate?',
    options: [
      { id: 'a', text: 'Emotional leakage' },
      { id: 'b', text: 'Emotional substitution' },
      { id: 'c', text: 'Emotional blunting' },
      { id: 'd', text: 'Emotional contagion' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 15. Substituting a socially appropriate smile over genuine sadness is emotional substitution.'
  },
  {
    id: 33,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The World of Visual Culture I',
    question: 'A painter creates a scene where tile lines converge toward a single point on the horizon at eye level. Which principle is applied?',
    options: [
      { id: 'a', text: 'Vanishing point' },
      { id: 'b', text: 'Texture coding' },
      { id: 'c', text: 'Texture gradient' },
      { id: 'd', text: 'Relative size' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer lecture 11. All receding parallel lines converge at the vanishing point on the horizon.'
  },
  {
    id: 34,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The Body and the Way it Communicates',
    question: 'In Norman Rockwell\'s illustrations, a figure such as Tom Sawyer leaning back with hands in pockets or slouched posture is shorthand for:',
    options: [
      { id: 'a', text: 'Anxiety and nervous tension' },
      { id: 'b', text: 'Casual confidence, nonchalance, or mild defiance toward authority' },
      { id: 'c', text: 'Submission and eagerness to please' },
      { id: 'd', text: 'Aggressive readiness to confront' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 14. Casual, leaning posture symbolizes relaxed non-compliance or independence.'
  },
  {
    id: 35,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 3',
    topic: 'The Aural: Its Relevance and Impact',
    question: 'Pitch is dependent on ____ of the note.',
    options: [
      { id: 'a', text: 'tonality' },
      { id: 'b', text: 'quality' },
      { id: 'c', text: 'timbre' },
      { id: 'd', text: 'frequency' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer lecture 13. Acoustic frequency determines the perceived highness or lowness of pitch.'
  },
  {
    id: 36,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 4',
    topic: 'Groups, Conflicts & their Resolution',
    question: 'Conflicts are always harmful to a group\'s performance and should be completely avoided.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 19. Task-focused disagreements stimulate critical thought and prevent complacency.'
  },
  {
    id: 37,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 4',
    topic: 'Building Relationships',
    question: 'Mutual respect and trust are essential elements of successful interpersonal relationships.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer to lecture 16. Mutual trust is the bedrock of positive collaboration.'
  },
  {
    id: 38,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 4',
    topic: 'Understanding Group Dynamics II',
    question: 'Group norms are informal rules that influence the behaviour of group members.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer to lecture 18. Norms provide unwritten behavioral boundaries within a group.'
  },
  {
    id: 39,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 4',
    topic: 'Understanding Group Dynamics I',
    question: 'In Fisher’s Model of Group Progression, in which stage the group recognizes that it is reaching consensus and explicitly consolidates that consensus to complete the task?',
    options: [
      { id: 'a', text: 'Orientation' },
      { id: 'b', text: 'Reinforcement' },
      { id: 'c', text: 'Emergence' },
      { id: 'd', text: 'Conflict' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 17. The Reinforcement stage finalizes and celebrates consensus.'
  },
  {
    id: 40,
    part: 2,
    partTitle: 'Part 2',
    week: 'Week 4',
    topic: 'Understanding Group Dynamics I',
    question: 'A newly formed student committee is polite and enthusiastic. Members are introducing themselves and learning responsibilities. Major disagreements have not yet emerged. Which stage of group development is this?',
    options: [
      { id: 'a', text: 'Storming' },
      { id: 'b', text: 'Forming' },
      { id: 'c', text: 'Norming' },
      { id: 'd', text: 'Performing' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 17. The Forming stage is characterized by politeness and orientation.'
  },

  // ==================== PART 3 (Questions 41 to 60) ====================
  {
    id: 41,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 4',
    topic: 'Groups, Conflicts & their Resolution',
    question: 'Which of the following is most likely to result in a conflict within a group?',
    options: [
      { id: 'a', text: 'Clearly defined roles and responsibilities' },
      { id: 'b', text: 'Differences in goals, values, or perceptions' },
      { id: 'c', text: 'Effective communication among members' },
      { id: 'd', text: 'Mutual trust and cooperation' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 19. Diverging priorities, values, and perceptions are prime drivers of conflict.'
  },
  {
    id: 42,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 4',
    topic: 'Groups, Conflicts & their Resolution',
    question: 'A project team has been arguing over an assignment. The leader encourages members to openly discuss their concerns, identify common interests, and arrive at a mutually acceptable solution. Which approach is this?',
    options: [
      { id: 'a', text: 'Avoiding' },
      { id: 'b', text: 'Competing' },
      { id: 'c', text: 'Collaborating' },
      { id: 'd', text: 'Accommodating' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 19. Collaborating solves root problems for mutual win-win benefits.'
  },
  {
    id: 43,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 4',
    topic: 'Social Network, Media and Extending Our Identity',
    question: 'Arjun maintains two social media accounts — one polished for professional networking and another private account for close friends. Arjun\'s behaviour is best explained by:',
    options: [
      { id: 'a', text: 'The need to hide his true personality from the people around him' },
      { id: 'b', text: 'The need to adjust his self-presentation depending on the audience and context' },
      { id: 'c', text: 'The need to gain more followers on his professional account' },
      { id: 'd', text: 'The need to be dishonest about aspects of his life' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer lecture 20. Adapting self-presentation is natural situational impression management.'
  },
  {
    id: 44,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Intrapersonal Communication',
    question: 'Self-concept plays a significant role in shaping both intrapersonal and interpersonal communication.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer lecture 24. Our self-image shapes both internal thoughts and external interpersonal interactions.'
  },
  {
    id: 45,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Improving your emotional intelligence',
    question: 'Is it possible to enhance emotional intelligence without understanding one’s own emotions and those of others?',
    options: [
      { id: 'a', text: 'Yes' },
      { id: 'b', text: 'No' }
    ],
    correctOptionId: 'b',
    explanation: 'Self-awareness is the essential prerequisite for all emotional intelligence.'
  },
  {
    id: 46,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'How emotionally mature are you?',
    question: 'The ability to use emotions to enhance thinking, reasoning, problem-solving, and decision-making is referred to as:',
    options: [
      { id: 'a', text: 'Emotional facilitation of thought' },
      { id: 'b', text: 'Emotional suppression' },
      { id: 'c', text: 'Emotional perception' },
      { id: 'd', text: 'Emotional expression' }
    ],
    correctOptionId: 'a',
    explanation: 'Emotional facilitation of thought channels feeling states into cognitive problem-solving.'
  },
  {
    id: 47,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'How emotionally mature are you?',
    question: 'Which structure of the limbic system is often described as the “seat of all passions”?',
    options: [
      { id: 'a', text: 'Brain stem' },
      { id: 'b', text: 'Hippocampus' },
      { id: 'c', text: 'Amygdala' },
      { id: 'd', text: 'Cerebellum' }
    ],
    correctOptionId: 'c',
    explanation: 'The amygdala processes emotional reactions, fear, anger, and emotional memory.'
  },
  {
    id: 48,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Improving your emotional intelligence',
    question: 'Human emotions significantly influence an individual’s _________________.',
    options: [
      { id: 'a', text: 'Cognitive processes' },
      { id: 'b', text: 'Nervous system' },
      { id: 'c', text: 'Muscular coordination' },
      { id: 'd', text: 'Physical endurance' }
    ],
    correctOptionId: 'a',
    explanation: 'Cognition and emotion are deeply intertwined and continuously influence each other.'
  },
  {
    id: 49,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Improving your emotional intelligence',
    question: 'Attributes such as compassion, intuition, and personal outlook are best classified as components of:',
    options: [
      { id: 'a', text: 'Emotional competence' },
      { id: 'b', text: 'Emotional values and beliefs' },
      { id: 'c', text: 'Emotional regulation strategies' },
      { id: 'd', text: 'Emotional awareness skills' }
    ],
    correctOptionId: 'b',
    explanation: 'Refer to lecture 22. Deep ethical outlook and compassion reflect emotional values and beliefs.'
  },
  {
    id: 50,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Change management',
    question: 'An organisation that continues to function without initiating any change is considered to be in a state of:',
    options: [
      { id: 'a', text: 'Equilibrium' },
      { id: 'b', text: 'Disequilibrium' },
      { id: 'c', text: 'Chaos' },
      { id: 'd', text: 'Transformation' }
    ],
    correctOptionId: 'a',
    explanation: 'In organizational theory, an unaltered operational state rests in steady equilibrium.'
  },
  {
    id: 51,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Change management',
    question: 'In Lewin’s change framework, the stage where management recognizes the necessity for change is called:',
    options: [
      { id: 'a', text: 'Unfreezing' },
      { id: 'b', text: 'Changing' },
      { id: 'c', text: 'Refreezing' },
      { id: 'd', text: 'None of the above' }
    ],
    correctOptionId: 'a',
    explanation: 'Unfreezing dissolves old patterns and creates openness to restructuring.'
  },
  {
    id: 52,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Empathy',
    question: 'In the practice of karuṇā (compassion), challenging stereotypes matters chiefly because it:',
    options: [
      { id: 'a', text: 'substitutes affective responses with detached reasoning' },
      { id: 'b', text: 'anchors compassion in understanding rather than fixed assumptions' },
      { id: 'c', text: 'stabilizes moral responses across diverse situations' },
      { id: 'd', text: 'removes the need to attend to particular lived experiences' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to Lecture 23. Discarding prejudgments enables authentic connection.'
  },
  {
    id: 53,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'How emotionally mature are you?',
    question: 'Which of the following combinations correctly represents the personal competencies in emotional intelligence?\nA. Self-awareness\nB. Self-management\nC. Social awareness\nD. Relationship management',
    options: [
      { id: 'a', text: 'Only A' },
      { id: 'b', text: 'Both A and B' },
      { id: 'c', text: 'Both C and D' },
      { id: 'd', text: 'Both A and D' }
    ],
    correctOptionId: 'b',
    explanation: 'Personal competencies pertain to the self (A & B), while social competencies involve others (C & D).'
  },
  {
    id: 54,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 5',
    topic: 'Empathy',
    question: 'A mediator in a conflict zone learns to understand each side\'s suffering clearly without being emotionally flooded, responding in a balanced way. This change is best explained as a shift from:',
    options: [
      { id: 'a', text: 'sympathy to indifference' },
      { id: 'b', text: 'moral judgment to neutrality' },
      { id: 'c', text: 'affective empathy to cognitive empathy' },
      { id: 'd', text: 'emotional detachment to emotional suppression' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to Lecture 23. Cognitive empathy enables clear understanding without emotional burnout.'
  },
  {
    id: 55,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 6',
    topic: 'Creativity: A detailed exploration',
    question: 'Creativity is an ability possessed only by people working in artistic professions.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'b',
    explanation: 'Please refer to lecture 27. Creativity spans all fields, from engineering to daily problem-solving.'
  },
  {
    id: 56,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 6',
    topic: 'Creativity, Critical Thinking and Problem Solving',
    question: 'The process of identifying a problem, analyzing possible causes, generating alternatives, and selecting an appropriate solution is commonly associated with:',
    options: [
      { id: 'a', text: 'Passive learning' },
      { id: 'b', text: 'Routine behaviour' },
      { id: 'c', text: 'Problem solving' },
      { id: 'd', text: 'Information avoidance' }
    ],
    correctOptionId: 'c',
    explanation: 'Please refer to lecture 30. This sequence defines structured problem solving.'
  },
  {
    id: 57,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 6',
    topic: 'Creativity at the workplace',
    question: 'Which of the following is most likely to encourage creativity in the workplace?',
    options: [
      { id: 'a', text: 'Encouraging new ideas and allowing employees to experiment' },
      { id: 'b', text: 'Strictly following existing methods without questioning them' },
      { id: 'c', text: 'Discouraging employees from taking risks' },
      { id: 'd', text: 'Rewarding only those who avoid mistakes' }
    ],
    correctOptionId: 'a',
    explanation: 'Please refer to lecture 29. Freedom to experiment and take calculated risks sparks creative innovation.'
  },
  {
    id: 58,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 6',
    topic: 'Creativity: A detailed exploration',
    question: 'Which of the following best describes creativity?',
    options: [
      { id: 'a', text: 'The ability to reproduce information exactly as it was received' },
      { id: 'b', text: 'The ability to generate ideas or approaches that are both novel and useful' },
      { id: 'c', text: 'The ability to follow established procedures without modification' },
      { id: 'd', text: 'The ability to memorize a large amount of information' }
    ],
    correctOptionId: 'b',
    explanation: 'Please refer to lecture 27. Creativity requires both originality (novelty) and value (usefulness).'
  },
  {
    id: 59,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 6',
    topic: 'Creativity, Critical Thinking and Problem Solving',
    question: 'Which of the following best distinguishes creative thinking from critical thinking?',
    options: [
      { id: 'a', text: 'Creative thinking evaluates ideas, while critical thinking generates possibilities' },
      { id: 'b', text: 'Creative thinking generates possibilities, while critical thinking evaluates and analyses them' },
      { id: 'c', text: 'Both involve only memorizing established information' },
      { id: 'd', text: 'Neither is useful in solving problems' }
    ],
    correctOptionId: 'b',
    explanation: 'Creative thinking generates diverse options; critical thinking evaluates and refines them.'
  },
  {
    id: 60,
    part: 3,
    partTitle: 'Part 3',
    week: 'Week 6',
    topic: 'Creativity: What Does It Mean',
    question: 'In Edward de Bono\'s Six Thinking Hats framework, which hat represents the "big picture" and process control?',
    options: [
      { id: 'a', text: 'Red Hat' },
      { id: 'b', text: 'Yellow Hat' },
      { id: 'c', text: 'Blue Hat' },
      { id: 'd', text: 'Green Hat' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 26. The Blue Hat manages the thinking process and oversees the big picture.'
  },

  // ==================== PART 4 (Questions 61 to 80) ====================
  {
    id: 61,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'Leadership and Motivating Others',
    question: 'An effective leader can motivate others only by offering monetary rewards and promotions.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 35. Intrinsic factors (autonomy, recognition, purpose) motivate strongly.'
  },
  {
    id: 62,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'The Art of Persuasion-I',
    question: 'Manipulation is the broader category, and persuasion is one of its subsets.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 32. Persuasion is the broad communicative umbrella; manipulation is a deceptive subtype.'
  },
  {
    id: 63,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'From Persuasion to Negotiation',
    question: 'In a negotiation, the process of finding a solution that is acceptable to all parties generally requires:',
    options: [
      { id: 'a', text: 'Complete avoidance of disagreement' },
      { id: 'b', text: 'One party\'s unconditional acceptance of the other\'s demands' },
      { id: 'c', text: 'Communication, understanding of interests, and willingness to reach an agreement' },
      { id: 'd', text: 'The use of authority to impose a decision' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 34. Principled bargaining requires mutual interest discovery and dialogue.'
  },
  {
    id: 64,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'Motivating oneself',
    question: 'Which of the following best describes self-motivation?',
    options: [
      { id: 'a', text: 'Depending entirely on others for encouragement' },
      { id: 'b', text: 'Avoiding challenging tasks to prevent failure' },
      { id: 'c', text: 'Working only when external rewards are offered' },
      { id: 'd', text: 'The ability to initiate and sustain action toward a goal through internal drive' }
    ],
    correctOptionId: 'd',
    explanation: 'Please refer to lecture 31. Self-motivation is the ability to persist through personal inner drive.'
  },
  {
    id: 65,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'From Persuasion to Negotiation',
    question: 'Which of the following best distinguishes persuasion from negotiation?',
    options: [
      { id: 'a', text: 'Persuasion always involves conflict, whereas negotiation does not' },
      { id: 'b', text: 'Persuasion primarily seeks to influence others, whereas negotiation involves reaching an acceptable agreement between parties' },
      { id: 'c', text: 'Negotiation is a one-way process, whereas persuasion is always two-way' },
      { id: 'd', text: 'Persuasion and negotiation are the same processes' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 34. Persuasion influences beliefs/attitudes, while negotiation formalizes mutual terms.'
  },
  {
    id: 66,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'Leadership and Motivating Others',
    question: 'A team leader notices that one team member has lost interest. Instead of criticizing, the leader discusses the problem, understands concerns, and provides encouragement. Which leadership behaviour is demonstrated?',
    options: [
      { id: 'a', text: 'Authoritarian control' },
      { id: 'b', text: 'Avoidance of responsibility' },
      { id: 'c', text: 'Supportive and motivating leadership' },
      { id: 'd', text: 'Punitive leadership' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 35. Empathy and encouragement reflect supportive leadership.'
  },
  {
    id: 67,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'The Art of Persuasion-I',
    question: 'A website ad features a countdown timer "Sale ends in 10 minutes!" alongside "Only 2 left!", yet refreshing the page resets the countdown. This technique functions as:',
    options: [
      { id: 'a', text: 'A transparent marketing strategy to help customers plan their purchase timing' },
      { id: 'b', text: 'A manipulative tactic that fabricates urgency and scarcity to pressure impulsive buying decisions' },
      { id: 'c', text: 'An educational tool to inform customers about actual inventory levels' },
      { id: 'd', text: 'A neutral design choice with no influence on consumer psychology' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 32. False urgency is a classic deceptive/manipulative dark pattern.'
  },
  {
    id: 68,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'The Art of Persuasion-II',
    question: 'In persuasive advertising, when a brand features a renowned scientist or doctor to endorse a product, it employs:',
    options: [
      { id: 'a', text: 'celebrity / emotion' },
      { id: 'b', text: 'anonymous / popularity' },
      { id: 'c', text: 'fictional / logic' },
      { id: 'd', text: 'authoritative / authority' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer lecture 33. Appeal to authority leverages recognized credentials to build credibility.'
  },
  {
    id: 69,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 7',
    topic: 'The Art of Persuasion-II',
    question: 'During a used-car negotiation, the seller says: "If you agree to pay in cash today, I\'ll throw in a full year of free servicing." This is an example of which persuasion technique?',
    options: [
      { id: 'a', text: 'Coercion' },
      { id: 'b', text: 'Appeal to authority' },
      { id: 'c', text: 'Bargaining' },
      { id: 'd', text: 'Emotional appeal' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer lecture 33. Offering perks in exchange for immediate transaction terms is bargaining.'
  },
  {
    id: 70,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Managing Stress',
    question: 'Taking regular breaks and engaging in relaxation activities can be useful strategies for managing stress.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer to lecture 37. Relaxation and pacing alleviate physiological stress.'
  },
  {
    id: 71,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Resilience',
    question: 'A resilient person never experiences failure, disappointment, or emotional distress.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 38. Resilience is not invulnerability; it is the capacity to bounce back after distress.'
  },
  {
    id: 72,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Resilience',
    question: 'Which of the following best describes resilience?',
    options: [
      { id: 'a', text: 'The ability to avoid all stressful situations' },
      { id: 'b', text: 'Remaining unaffected by difficulties' },
      { id: 'c', text: 'The ability to adapt to adversity and recover from challenging experiences' },
      { id: 'd', text: 'Depending on others to solve difficult problems' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 38. Resilience is adaptive coping and recovery from adversity.'
  },
  {
    id: 73,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Managing Stress',
    question: 'Stress becomes more difficult to manage when an individual perceives that the demands of a situation __________ their ability to cope with them.',
    options: [
      { id: 'a', text: 'are unrelated to' },
      { id: 'b', text: 'exceed' },
      { id: 'c', text: 'improve' },
      { id: 'd', text: 'reduce' }
    ],
    correctOptionId: 'b',
    explanation: 'Kindly refer to lecture 37. Stress occurs when perceived environmental demands exceed available coping resources.'
  },
  {
    id: 74,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Managing time',
    question: 'Rimi has made a list of appointments for this week and divided them into time slots to save time for lecture preparations. Which component of time management is she using?',
    options: [
      { id: 'a', text: 'Planning behaviors' },
      { id: 'b', text: 'Monitoring and controlling behaviours' },
      { id: 'c', text: 'Self-awareness of one’s time use' },
      { id: 'd', text: 'None of the above' }
    ],
    correctOptionId: 'a',
    explanation: 'In planning behaviors, one sets goals, plans tasks, and allocates schedules proactively.'
  },
  {
    id: 75,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Work-life Balance',
    question: 'A healthy work-life balance requires individuals to establish appropriate __________ between their professional and personal responsibilities.',
    options: [
      { id: 'a', text: 'competition' },
      { id: 'b', text: 'dependence' },
      { id: 'c', text: 'conflicts' },
      { id: 'd', text: 'boundaries' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer to lecture 39. Clear boundaries preserve personal time and prevent professional burnout.'
  },
  {
    id: 76,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Resilience',
    question: 'Which of the following is most likely to contribute to the development of resilience?',
    options: [
      { id: 'a', text: 'Learning from difficulties and maintaining a constructive outlook' },
      { id: 'b', text: 'Viewing setbacks as permanent failures' },
      { id: 'c', text: 'Avoiding unfamiliar situations' },
      { id: 'd', text: 'Refusing to seek help from others' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer to lecture 38. A growth mindset that reframes failures into learning builds inner resilience.'
  },
  {
    id: 77,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Work-life Balance',
    question: 'What is the primary objective of maintaining a healthy work-life balance?',
    options: [
      { id: 'a', text: 'Spending less time on professional responsibilities' },
      { id: 'b', text: 'Giving equal amounts of time to every activity' },
      { id: 'c', text: 'Managing professional and personal responsibilities in a sustainable manner' },
      { id: 'd', text: 'Prioritizing work over all other aspects of life' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 39. Long-term sustainability of career, health, and family is the true goal.'
  },
  {
    id: 78,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Work-life Balance',
    question: 'Meena works late and checks messages late at night. She decides to establish specific working hours and stop checking work messages during personal time. Which aspect is she addressing?',
    options: [
      { id: 'a', text: 'Setting boundaries between work and personal life' },
      { id: 'b', text: 'Career advancement' },
      { id: 'c', text: 'Workplace competition' },
      { id: 'd', text: 'Increasing workload' }
    ],
    correctOptionId: 'a',
    explanation: 'Kindly refer to lecture 39. Creating temporal and digital limits establishes vital psychological boundaries.'
  },
  {
    id: 79,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Managing Stress',
    question: 'An employee receives critical feedback. Instead of reacting defensively, they take time to understand the points and identify areas for improvement. Which response is this?',
    options: [
      { id: 'a', text: 'Avoidance of stressful situations' },
      { id: 'b', text: 'Passive acceptance' },
      { id: 'c', text: 'Constructive coping with a stressful situation' },
      { id: 'd', text: 'Suppression of the problem' }
    ],
    correctOptionId: 'c',
    explanation: 'Kindly refer to lecture 37. Constructive problem-focused coping harnesses feedback productively.'
  },
  {
    id: 80,
    part: 4,
    partTitle: 'Part 4',
    week: 'Week 8',
    topic: 'Applying Soft Skills to Workplace',
    question: 'When employees experience persistent difficulty balancing work and personal life leading to sustained __________, organizations introduce __________ policies like flexible hours.',
    options: [
      { id: 'a', text: 'motivation / restrictive' },
      { id: 'b', text: 'burnout / restrictive' },
      { id: 'c', text: 'productivity / punitive' },
      { id: 'd', text: 'burnout / supportive' }
    ],
    correctOptionId: 'd',
    explanation: 'Kindly refer to lecture 40. Chronic imbalance causes burnout, addressed by supportive flex-time policies.'
  }
];
