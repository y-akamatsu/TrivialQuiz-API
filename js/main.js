const questionElement = document.getElementById("mondai");
const answerElementA = document.getElementById("answer_a");
const answerElementB = document.getElementById("answer_b");
const nextButton = document.getElementById("btn");

// 次の問題を選択するときは+1する。
// デフォルトでは1件目のデータを問題に使う
let currentQuestionIndex = 0;

// fetchのresultsの値を格納する。(問題リストが入る)
let results = [];

function setQuestion() {
  // console.log(results, '@@@@@@@@@@');
  if (results.length <= currentQuestionIndex) {
    alert('出題できる問題がありません。');
    return;
  }
  const currentQuestionData = results[currentQuestionIndex];
  console.log(currentQuestionData);
  
  // innerTextだと「""」や「''」が変な文字に変換されるためinnerHTMLを使うようにした
  questionElement.innerHTML = currentQuestionData.question;
  
  answerElementA.innerHTML = currentQuestionData.correct_answer;
  answerElementB.innerHTML = currentQuestionData.incorrect_answers[0];
}

function selectAnswer (event) {
  const answer = event.target.innerText;
  const currentQuestionData = results[currentQuestionIndex];
  if (answer === currentQuestionData.correct_answer) {
    alert('正解！');
  } else {
    alert('不正解...');
  }
}

answerElementA.addEventListener('click', selectAnswer);
answerElementB.addEventListener('click', selectAnswer);
nextButton.addEventListener('click', () => {
  // 次の問題に移動する
  currentQuestionIndex++;
  setQuestion();
});


window.addEventListener('load', () => {
   // APIでデータ取得
  fetch('https://opentdb.com/api.php?amount=10')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // 現在の問題の選択インデックスをリセットする
      currentQuestionIndex = 0;
      results = json.results;
      setQuestion();
    });
});