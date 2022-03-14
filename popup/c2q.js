// Button Event Listener
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("scraper");
  btn.addEventListener("click", function () {
    let scrapedList = scraper();
    newWindowOutput(scrapedList);
  });
});

// Collect all quesitons and answers from document

// TO REPLICATE BUG:
//   open new tab and go to a canvas quiz you've taken
//   run copy/pasted code (it won't work)
//   set a variable equal to some other querySelector value (i.e. "a = document.querySelectorAll('.header')" and then "console.log(a)" 
//   console.log() will output the code correctly
//   delete the "jogger" code you just made and run the original code
//   original code will magically work

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



// function newWindowOutput(list) {
//   let content = list.toString();
//   if (content == "") {
//     content = "no content";
//   }

//   // output content to body
//   window.open().document.body.innerHTML = `
//     <p>${content || `no content`}</p>
//   `;

//   // copy to clipboard
//   navigator.clipboard.writeText(content).then(() => {
//     alert("content copied successfully");
//   });
}
