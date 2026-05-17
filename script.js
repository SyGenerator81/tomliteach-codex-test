const form = document.getElementById('generator-form');
const worksheet = document.getElementById('worksheet');
const printBtn = document.getElementById('printBtn');

function supportDetails(level) {
  if (level === 'High') {
    return {
      starters: [
        'One clear idea in the text is...',
        'This quotation suggests that...',
        'The writer/poet/playwright chooses this method to...'
      ],
      challenge: 'Write one extra paragraph using a second quotation and explain the effect in detail.'
    };
  }

  if (level === 'Low') {
    return {
      starters: [
        'At this point in the text, the writer presents...',
        'This evidence reveals...',
        'This method is effective because...'
      ],
      challenge: 'Compare this idea with a different moment in the text and evaluate which is more powerful.'
    };
  }

  return {
    starters: [
      'The text shows...',
      'This quotation implies...',
      'The effect on the reader/audience is...'
    ],
    challenge: 'Add one paragraph that explores an alternative interpretation.'
  };
}

function getWagoll(subject, focusText) {
  const focus = focusText.toLowerCase();

  const wagolls = {
    'GCSE English Language Paper 1':
      'In the extract, the writer creates tension by narrowing the focus onto small details, so the reader feels trapped in the character\'s point of view. The verb choices become sharper as the paragraph develops, which mirrors the character\'s rising panic. Structurally, this shift from calm description to short, urgent clauses makes the moment feel sudden and unsettling.',
    'GCSE English Language Paper 2':
      'In Source A, the writer uses positive adjectives to present the experience as exciting, whereas Source B uses cautious modal verbs to show uncertainty. This contrast reveals different attitudes to the same issue. By comparing tone and perspective, we can see that language choices shape how trustworthy and persuasive each viewpoint appears.',
    Macbeth:
      'Shakespeare presents ambition as a destructive force through Macbeth\'s changing language. Early in the play, Macbeth imagines ambition as something that can "o\'erleap" moral limits, suggesting reckless movement. As the tragedy develops, Shakespeare uses violent imagery and fractured reflections to show that ambition does not empower Macbeth; instead, it isolates him and accelerates his downfall.',
    'A Christmas Carol':
      'Dickens presents Scrooge\'s transformation to argue that people can change when they confront social responsibility. At first, Scrooge\'s cold, dismissive dialogue distances him from others, but Dickens later uses warmer imagery and generous actions to signal moral growth. This structural journey from isolation to community reinforces the novella\'s message about compassion and duty.',
    'An Inspector Calls':
      'Priestley presents responsibility as a collective duty rather than a private choice. Through the Inspector\'s authoritative speech, he challenges each character\'s attempt to avoid blame. The cyclical structure of the ending, including the final phone call, warns the audience that ignoring social responsibility leads to repeated consequences.',
    'Power and Conflict Poetry':
      'In \"Ozymandias\", Shelley uses the ruined statue and fragmented description to show that power is temporary. The commanding inscription contrasts with the surrounding decay, creating irony. By placing human pride against the vast, empty landscape, Shelley suggests that conflict with time and nature is always lost.'
  };

  if (focus.includes('ambition') && subject === 'Macbeth') {
    return 'Shakespeare presents Macbeth\'s ambition as self-destructive because it drives him to confuse desire with destiny. Macbeth\'s imagery of "vaulting ambition" suggests movement that is uncontrolled and dangerous, foreshadowing his moral collapse. As his language becomes more fractured and violent, Shakespeare reveals that ambition does not make Macbeth heroic; it strips away his judgement and humanity.';
  }

  return wagolls[subject] || wagolls['GCSE English Language Paper 1'];
}

function keyVocabulary(subject) {
  const banks = {
    'GCSE English Language Paper 1': ['imagery', 'structure', 'narrative perspective', 'tension', 'connotation'],
    'GCSE English Language Paper 2': ['comparison', 'viewpoint', 'tone', 'bias', 'synthesis'],
    Macbeth: ['ambition', 'guilt', 'masculinity', 'supernatural', 'tragedy'],
    'A Christmas Carol': ['redemption', 'social responsibility', 'isolation', 'transformation', 'allegory'],
    'An Inspector Calls': ['responsibility', 'capitalism', 'class', 'dramatic irony', 'didactic'],
    'Power and Conflict Poetry': ['power', 'identity', 'memory', 'oppression', 'juxtaposition']
  };

  return banks[subject] || ['analysis', 'quotation', 'effect', 'evidence', 'interpretation'];
}

function createWorksheet(data) {
  const { subject, questionType, grade, support, focus } = data;
  const supportPack = supportDetails(support);
  const wagoll = getWagoll(subject, questionType + ' ' + focus);
  const vocabulary = keyVocabulary(subject);

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
      <p>To develop ${focus.toLowerCase()} in ${subject} and produce clear analysis aligned to Grade ${grade} standards.</p>
    </section>

    <section>
      <h3>Success Criteria</h3>
      <ul>
        <li>I can answer the question directly and stay focused on the task.</li>
        <li>I can use precise evidence or quotations to support each point.</li>
        <li>I can explain how methods (language/structure/form) shape meaning.</li>
        <li>I can link my analysis to writer intention and reader/audience effect.</li>
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
        ${supportPack.starters.map((starter) => `<li>${starter}</li>`).join('')}
      </ul>
      <p class="writing-lines"></p>
    </section>

    <section>
      <h3>Independent Student Task</h3>
      <p>Answer the following focus: <strong>${questionType}</strong></p>
      <p>Write 2-3 analytical paragraphs using the success criteria and key vocabulary.</p>
    </section>

    <section>
      <h3>Challenge Task</h3>
      <p>${supportPack.challenge}</p>
    </section>

    <section>
      <h3>Homework</h3>
      <p>Redraft your strongest paragraph and improve it to Grade ${grade}+ by adding sharper method analysis and one alternative interpretation.</p>
    </section>

    <section>
      <h3>Teacher Notes</h3>
      <div class="teacher-notes">Assessment focus, misconceptions, and next-step targets:</div>
      <p class="writing-lines"></p>
    </section>
  `;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    subject: document.getElementById('subject').value,
    questionType: document.getElementById('questionType').value.trim(),
    grade: document.getElementById('grade').value,
    support: document.getElementById('support').value,
    focus: document.getElementById('focus').value.trim()
  };

  worksheet.innerHTML = createWorksheet(data);
});

printBtn.addEventListener('click', () => {
  window.print();
});
