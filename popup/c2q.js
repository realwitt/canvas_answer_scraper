// Button Event Listener
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('scraper');
  btn.addEventListener('click', function() {
      scraper();
  });
});

// Collect all quesitons and answers from document
function scraper() {
  // QUESTION AND ANSWER TOGETHER:
  let listy = [];

  let questions = document.querySelectorAll(".quiz_sortable.question_holder");

  for (let question of questions) {
    let question_text = question.querySelector(
      ".question_text.user_content.enhanced"
    );

    let question_text_cleaned = question_text.innerHTML.replace(/\n\s*/g, "");
    //   console.(typeof(question_text_cleaned))

    let answer_text = question
      .querySelector(".answer.answer_for_.correct_answer .answer_text")
      .innerHTML.replace(/\n\s*/g, "");

    listy.push({
      question: question_text_cleaned.trim(),
      answer: answer_text.trim(),
    });
  }

  const canvas = window.open();

  canvas.document.write("<pre>");
  let plz = listy.map((obj) => `${obj.question}\t${obj.answer}\n`);
  canvas.document.write(plz.join(""));
  canvas.document.write("</pre>");

  navigator.clipboard.writeText(plz.join(""));
  canvas.alert("Copied answers clipboard");
}