(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function scrape(obj) {
    let scrape_call = document.createElement("script");
    scrape_call.setAttribute("src", "content_scripts/scraper.js");
    document.body.appendChild(scrape_call);
  }

  /**
   * Listen for messages from the background script.
   * Call "insertBeast()" or "removeExistingBeasts()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      scrape(message.beastURL);
    }
  });
})();

function scraper() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

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
  canvas.alert("Copied to clipboard");

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    }
  });
}
