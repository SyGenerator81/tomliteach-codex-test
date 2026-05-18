const form = document.getElementById('generator-form');
const worksheet = document.getElementById('worksheet');
const printBtn = document.getElementById('printBtn');
const subjectField = document.getElementById('subject');
const questionField = document.getElementById('questionType');
const questionWarning = document.getElementById('questionWarning');
const hideTeacherNotesPrintField = document.getElementById('hideTeacherNotesPrint');

const literatureSubjects = ['Macbeth', 'A Christmas Carol', 'An Inspector Calls', 'Power and Conflict Poetry'];

function isLiteratureSubject(subject) {
  return literatureSubjects.includes(subject);
}

function gradeBand(grade) {
  return Number(grade) >= 7 ? 'high' : 'secure';
}

function supportDetails(level) {
  if (level === 'High') {
    return {
      challenge: 'Write one extra paragraph using a second quotation/reference and explain how it deepens the idea.'
    };
  }

  if (level === 'Low') {
    return {
      challenge: 'Compare this idea with a different moment and evaluate which is more significant for the reader/audience.'
    };
  }

  return {
    challenge: 'Add one paragraph that explores an alternative interpretation.'
  };
}

function getWagoll(subject, focusText, grade) {
  const focus = focusText.toLowerCase();
  const band = gradeBand(grade);

  const litExamples = {
    macbeth_ambition:
      band === 'high'
        ? 'Shakespeare presents ambition as a corrupting force when Macbeth admits he has only "vaulting ambition", a metaphor suggesting reckless momentum without moral control. The image implies that Macbeth already recognises the danger, yet still chooses violence. By exposing this self-awareness before Duncan\'s murder, Shakespeare critiques unchecked desire for status and warns a Jacobean audience that political ambition without conscience destroys both order and self.'
        : 'Shakespeare presents ambition as dangerous when Macbeth says he has "vaulting ambition". This metaphor suggests ambition is leaping too far, so Macbeth is already crossing moral limits. Shakespeare uses this to show that wanting power too much leads Macbeth towards murder and ruin.' ,
    macbeth_guilt:
      band === 'high'
        ? 'Shakespeare presents guilt as psychologically inescapable when Lady Macbeth imagines "all the perfumes of Arabia" cannot sweeten her hand. The hyperbolic image of scent shows guilt as permanent contamination rather than a passing feeling. By shifting her from confident control to broken prose-like outbursts, Shakespeare reveals that violent choices stain the mind and that suppressed conscience eventually overwhelms performance.'
        : 'Shakespeare presents guilt as overwhelming when Lady Macbeth says "all the perfumes of Arabia" will not make her hand sweet. The exaggeration shows she cannot wash away what she has done. Shakespeare suggests guilt remains even when characters try to hide it.' ,
    macbeth_violence:
      band === 'high'
        ? 'Shakespeare presents violence as a cycle that consumes Macbeth, shown when he declares he is "in blood stepped in so far". The metaphor of wading suggests he is trapped in his own brutality, with no clean return. Shakespeare links kingship to repeated murder to expose how tyrannical power depends on fear, not legitimacy, and therefore collapses from within.'
        : 'Shakespeare presents violence as inescapable when Macbeth says he is "in blood stepped in so far". This metaphor makes violence seem like deep water he keeps walking through. Shakespeare shows that each murder leads to more violence, not safety.'
  };

  const bySubject = {
    'A Christmas Carol_redemption': band === 'high'
      ? 'Dickens presents redemption as active moral change when Scrooge becomes "as good a friend, as good a master, and as good a man". The triadic pattern emphasises that redemption is measured through relationships, not private emotion. By structurally moving Scrooge from isolation to generosity, Dickens argues that social healing is possible when the wealthy accept responsibility for others.'
      : 'Dickens presents redemption through Scrooge\'s clear change into "as good a friend... as good a man". The repeated phrase shows he is consistently kinder. Dickens suggests people can change if they choose generosity and responsibility.' ,
    'A Christmas Carol_poverty': band === 'high'
      ? 'Dickens exposes the cruelty of Victorian attitudes to poverty through Scrooge\'s question, "Are there no prisons?" The rhetorical question echoes institutional language, reducing human suffering to administration. Dickens later contrasts this with Tiny Tim\'s vulnerability to challenge readers who treat poverty as personal failure rather than a social injustice requiring collective action.'
      : 'Dickens criticises harsh attitudes to poverty when Scrooge asks, "Are there no prisons?" The question sounds cold and dismissive. Dickens uses this to challenge readers to care for poor families instead of blaming them.' ,
    'An Inspector Calls_responsibility': band === 'high'
      ? 'Priestley presents responsibility as shared and unavoidable through the Inspector\'s assertion that "we are members of one body". The collective pronoun "we" rejects individualism and frames society as interdependent. By placing this speech at the dramatic centre, Priestley uses the stage as a moral platform to challenge capitalist self-interest and advocate social accountability.'
      : 'Priestley presents responsibility as collective when the Inspector says "we are members of one body". The word "we" includes everyone, so nobody can avoid blame. Priestley shows that actions affect other people across society.' ,
    'An Inspector Calls_social class': band === 'high'
      ? 'Priestley critiques class privilege through Mrs Birling\'s claim that "girls of that class" are undeserving of sympathy. The demonstrative phrase distances Eva and turns class into a barrier to empathy. Priestley exposes how upper-class language protects status while dehumanising workers, encouraging the audience to question inherited social hierarchies.'
      : 'Priestley challenges class prejudice when Mrs Birling refers to "girls of that class". This phrase sounds dismissive and superior. Priestley shows how class attitudes can make wealthy characters ignore real suffering.' ,
    'Power and Conflict Poetry_nature': band === 'high'
      ? 'In "Exposure", Owen presents nature as a relentless power when the "merciless iced east winds" that "knive us" are personified as an attacking force. The violent verb "knive" suggests soldiers are wounded not only by war but by the environment itself. Owen shifts attention from patriotic glory to human vulnerability, criticising leaders who romanticise conflict.'
      : 'In "Exposure", Owen presents nature as powerful through "merciless iced east winds that knive us". Personification makes the weather feel like an enemy. Owen shows soldiers are helpless against nature as well as war.' ,
    'Power and Conflict Poetry_war': band === 'high'
      ? 'In "Remains", Armitage presents war\'s lasting trauma when the speaker says the image of the looter is "probably armed, possibly not". The fractured certainty and repeated memory show moral ambiguity that cannot be resolved. Through conversational voice and cyclical flashbacks, Armitage reveals that conflict continues psychologically long after physical combat ends.'
      : 'In "Remains", Armitage shows war\'s effects through "probably armed, possibly not". The uncertainty suggests the speaker cannot settle what happened. Armitage presents conflict as something that continues in the mind afterwards.'
  };

  const languageExamples = {
    'GCSE English Language Paper 1': band === 'high'
      ? 'The writer presents the setting as unstable by moving from broad description to sensory fragments such as clipped verbs and tactile detail. This structural narrowing controls viewpoint so the reader experiences events alongside the narrator rather than from a distance. By combining vivid imagery with shifts in sentence length, the writer crafts a narrative voice that is both descriptive and dramatic, sustaining tension through methodical focus changes.'
      : 'The writer presents the scene clearly by selecting descriptive details and precise verbs. Shorter sentences later in the paragraph increase pace and make the moment feel more intense. These methods help the reader picture the setting and follow the narrator\'s changing emotions.' ,
    'GCSE English Language Paper 2': band === 'high'
      ? 'Writer A frames the issue with assertive declaratives and evaluative adjectives, creating a confident viewpoint, while Writer B uses cautious modality and balanced clauses to appear measured. Comparing these methods reveals not just different opinions but different persuasive strategies: one seeks urgency, the other credibility. The contrast in tone and structure shapes how far each source seems trustworthy and how strongly each position influences the reader.'
      : 'Writer A uses stronger words to show a clear viewpoint, while Writer B sounds more careful through modal verbs and balanced sentences. Comparing these choices shows different attitudes to the same issue. This helps the reader judge which source feels more convincing.'
  };

  if (subject === 'Macbeth' && focus.includes('ambition')) return litExamples.macbeth_ambition;
  if (subject === 'Macbeth' && focus.includes('guilt')) return litExamples.macbeth_guilt;
  if (subject === 'Macbeth' && focus.includes('violence')) return litExamples.macbeth_violence;
  if (subject === 'A Christmas Carol' && focus.includes('redemption')) return bySubject['A Christmas Carol_redemption'];
  if (subject === 'A Christmas Carol' && focus.includes('poverty')) return bySubject['A Christmas Carol_poverty'];
  if (subject === 'An Inspector Calls' && (focus.includes('responsibility') || focus.includes('responsible'))) return bySubject['An Inspector Calls_responsibility'];
  if (subject === 'An Inspector Calls' && (focus.includes('class') || focus.includes('social'))) return bySubject['An Inspector Calls_social class'];
  if (subject === 'Power and Conflict Poetry' && (focus.includes('nature') || focus.includes('ozymandias') || focus.includes('exposure'))) return bySubject['Power and Conflict Poetry_nature'];
  if (subject === 'Power and Conflict Poetry' && focus.includes('war')) return bySubject['Power and Conflict Poetry_war'];

  return languageExamples[subject] || languageExamples['GCSE English Language Paper 1'];
}

function keyVocabulary(subject) {
  const banks = {
    'GCSE English Language Paper 1': ['imagery', 'narrative perspective', 'semantic field', 'structure shift', 'sensory detail'],
    'GCSE English Language Paper 2': ['viewpoint', 'comparison', 'tone', 'modality', 'synthesis'],
    Macbeth: ['ambition', 'guilt', 'tragedy', 'soliloquy', 'kingship'],
    'A Christmas Carol': ['redemption', 'poverty', 'transformation', 'allegory', 'social responsibility'],
    'An Inspector Calls': ['responsibility', 'social class', 'capitalism', 'dramatic irony', 'generational divide'],
    'Power and Conflict Poetry': ['nature', 'power', 'conflict', 'voice', 'juxtaposition']
  };

  return banks[subject] || ['analysis', 'quotation', 'evidence', 'method', 'interpretation'];
}

function paragraphFrame(subject) {
  if (isLiteratureSubject(subject)) {
    return [
      'Point: Shakespeare/Dickens/Priestley presents...',
      'Evidence: This is shown when...',
      'Method: The word/phrase/stage direction/image suggests...',
      'Explanation: This reveals...',
      'Context/intention: The writer may be criticising/challenging/exposing...',
      'Link: Therefore, the audience/reader understands...'
    ];
  }

  return [
    'Point: The writer presents...',
    'Evidence: The phrase...',
    'Method: The adjective/verb/simile/structure...',
    'Effect: This makes the reader...',
    'Development: Later, the writer shifts the focus by...'
  ];
}

function learningObjective(subject, focus, grade) {
  if (isLiteratureSubject(subject)) {
    return `To develop clear Literature analysis of ${focus.toLowerCase()} in ${subject}, using references, method analysis, and writer intention for Grade ${grade}.`;
  }

  return `To develop Language analysis of ${focus.toLowerCase()} in ${subject}, using viewpoint/description methods and comparison skills for Grade ${grade}.`;
}

function taskText(subject) {
  if (isLiteratureSubject(subject)) {
    return 'Write 2–3 analytical Literature paragraphs that stay focused on the text and include concise references.';
  }

  return 'Write 2–3 Language paragraphs analysing writer methods (and comparison for Paper 2) without drifting into set-text plot summary.';
}

function homeworkText(subject, grade) {
  if (isLiteratureSubject(subject)) {
    return `Redraft your strongest Literature paragraph and improve it to Grade ${grade}+ by sharpening method analysis and writer intention.`;
  }

  return `Redraft your strongest Language paragraph and improve it to Grade ${grade}+ by refining method analysis and reader effect.`;
}

function createWorksheet(data) {
  const { subject, questionType, grade, support, focus } = data;
  const supportPack = supportDetails(support);
  const wagoll = getWagoll(subject, `${questionType} ${focus}`, grade);
  const vocabulary = keyVocabulary(subject);
  const frame = paragraphFrame(subject);

  return `
    <section>
      <h2>${subject} Worksheet</h2>
      <p class="student-line"><span><strong>Student Name:</strong> <span class="line-fill"></span></span> <span><strong>Date:</strong> <span class="line-fill"></span></span></p>
      <p><strong>Topic / Question Focus:</strong> ${questionType}</p>
      <p><strong>Target Grade:</strong> Grade ${grade}</p>
      <p><strong>Support Level:</strong> ${support}</p>
    </section>

    <section>
      <h3>Learning Objective</h3>
      <p>${learningObjective(subject, focus, grade)}</p>
    </section>

    <section>
      <h3>Success Criteria</h3>
      <ul>
        <li>I can answer the question directly and stay focused on the task.</li>
        <li>I can use precise evidence or references to support each point.</li>
        <li>I can explain how methods (language/structure/form) shape meaning.</li>
        <li>I can link analysis to writer intention and reader/audience effect.</li>
      </ul>
    </section>

    <section>
      <h3>Key Vocabulary</h3>
      <div class="vocab-box">${vocabulary.join(' • ')}</div>
    </section>

    <section>
      <h3>WAGOLL Paragraph (What A Good One Looks Like)</h3>
      <p>${wagoll}</p>
    </section>

    <section>
      <h3>Guided Paragraph Frame</h3>
      <ul>
        ${frame.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <p class="writing-lines"></p>
    </section>

    <section>
      <h3>Independent Student Task</h3>
      <p>Answer the following focus: <strong>${questionType}</strong></p>
      <p>${taskText(subject)}</p>
    </section>

    <section>
      <h3>Challenge Task</h3>
      <p>${supportPack.challenge}</p>
    </section>

    <section>
      <h3>Homework</h3>
      <p>${homeworkText(subject, grade)}</p>
    </section>

    <section class="teacher-notes-section">
      <h3>Teacher Notes</h3>
      <div class="teacher-notes">Assessment focus, misconceptions, and next-step targets:</div>
      <p class="writing-lines"></p>
    </section>
  `;
}

function updateQuestionWarning() {
  const subject = subjectField.value;
  const value = questionField.value.trim().toLowerCase();
  const litMarkers = ['macbeth', 'scrooge', 'inspector', 'birling', 'poetry', 'shakespeare', 'dickens', 'priestley'];
  const isLanguage = subject === 'GCSE English Language Paper 1' || subject === 'GCSE English Language Paper 2';
  const looksLikeLiterature = litMarkers.some((word) => value.includes(word));

  questionWarning.textContent = isLanguage && looksLikeLiterature
    ? 'This looks like a Literature question. Consider selecting Macbeth, A Christmas Carol, An Inspector Calls, or Poetry instead.'
    : '';
}

subjectField.addEventListener('change', updateQuestionWarning);
questionField.addEventListener('input', updateQuestionWarning);

hideTeacherNotesPrintField.addEventListener('change', () => {
  document.body.classList.toggle('hide-teacher-notes-print', hideTeacherNotesPrintField.checked);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    subject: subjectField.value,
    questionType: questionField.value.trim(),
    grade: document.getElementById('grade').value,
    support: document.getElementById('support').value,
    focus: document.getElementById('focus').value.trim()
  };

  worksheet.innerHTML = createWorksheet(data);
});

printBtn.addEventListener('click', () => {
  window.print();
});
