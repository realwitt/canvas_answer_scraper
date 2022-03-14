// Button Event Listener
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("scraper");
  btn.addEventListener("click", function () {
    let scrapedList = scraper();
    newWindowOutput(scrapedList);
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

  console.log(listy);
  return listy;
}

function newWindowOutput(list) {
  window.open().document.body.innerText = `
    <p>${list.toString() || `no content`}</p>
  `;
  // const outputText = document.createElement("p");

  // const listString = list.toString();
  // if (!listString) {
  //   outputText.innerHTML = listString;
  // } else {
  //   outputText.innerHTML = "it didn't work";
  // }
  // document.body.appendChild(outputText);

  // newWindow.document.write("<pre>")
  // let plz = listy.map((obj) => `${obj.question}\t${obj.answer}\n`);
  // newWindow.document.write(plz.join(""));
  // newWindow.document.write("</pre>");

  // navigator.clipboard.writeText(plz.join(""));
  // canvas.alert("Copied answers clipboard");
}
