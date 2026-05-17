const form = document.getElementById('generator-form');
const worksheet = document.getElementById('worksheet');
const printBtn = document.getElementById('printBtn');

function supportDetails(level) {
  if (level === 'High') {
    return {
      starters: [
        'The writer presents...',
        'This suggests that...',
        'A key quote is "..." because...'
      ],
      challenge: 'Write one extra paragraph using a second quote and explain it in detail.'
    };
  }

  if (level === 'Low') {
    return {
      starters: [
        'Through careful language choices, the writer...',
        'This evidence reveals...',
        'Overall, the effect on the reader is...'
      ],
      challenge: 'Compare this idea with another part of the text and evaluate which is more powerful.'
    };
  }

  return {
    starters: [
      'The text shows...',
      'This quote means...',
      'The effect on the reader is...'
    ],
    challenge: 'Add one paragraph that explores an alternative interpretation.'
  };
}

function createWorksheet(data) {
  const { subject, questionType, grade, support, focus } = data;
  const supportPack = supportDetails(support);

  return `
    <section>
      <h2>${subject} Worksheet</h2>
      <p><strong>Topic:</strong> ${questionType}</p>
      <p><strong>Target Grade:</strong> ${grade}</p>
      <p><strong>Support Level:</strong> ${support}</p>
    </section>

    <section>
      <h3>Learning Objective</h3>
      <p>To improve ${focus.toLowerCase()} in ${subject} while working towards Grade ${grade}.</p>
    </section>

    <section>
      <h3>Success Criteria</h3>
      <ul>
        <li>I can respond directly to the question.</li>
        <li>I can use at least two relevant references or quotations.</li>
        <li>I can explain how language, structure, or ideas create meaning.</li>
      </ul>
    </section>

    <section>
      <h3>WAGOLL (What A Good One Looks Like)</h3>
      <p><strong>Model sentence:</strong> In this extract, the writer uses vivid imagery to present conflict as unavoidable, which creates tension for the reader.</p>
      <p><em>Tip:</em> Keep your explanation clear and linked back to the question.</p>
    </section>

    <section>
      <h3>Sentence Starters</h3>
      <ul>
        ${supportPack.starters.map((starter) => `<li>${starter}</li>`).join('')}
      </ul>
    </section>

    <section>
      <h3>Student Task</h3>
      <p>Answer this ${subject} question: <strong>${questionType}</strong>.</p>
      <p>Write 2-3 analytical paragraphs using the success criteria above.</p>
    </section>

    <section>
      <h3>Challenge Task</h3>
      <p>${supportPack.challenge}</p>
    </section>

    <section>
      <h3>Homework</h3>
      <p>Redraft one paragraph from today, improving vocabulary and analysis for Grade ${grade}+ quality.</p>
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
