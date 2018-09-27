const questionElement = document.getElementById("mondai");
const answerElementA =document.getElementById("answer_a");
const answerElementB =document.getElementById("answer_b");
const answerElementC =document.getElementById("answer_c");
const answerElementD =document.getElementById("answer_d");
const nextButton = document.getElementById("btn");

//変数constは再代入不可、基本的にcosntを使用。letは再代入可能
//次の問題を選択するときは＋１する
//1件目のデータを問題に使う
let currentQuestionIndex = 0;

//fecthのresultsの値を格納する（問題リストがはいる）
let results = [];
function setQuestion(){
  if (results.length <= currentQuestionIndex){
    alert('出題できる問題がありません。');
    return;
  }

  const currentQuestionData = results[currentQuestionIndex];
  console.log(currentQuestionData);

  //innnerTextは中身を書き換える
  // innerTextだと「""」や「''」が変な文字に変換されるためinnerHTMLを使うようにした

  questionElement.innerHTML = currentQuestionData.question;

  answerElementA.innerHTML = currentQuestionData.correct_answer;
  answerElementB.innerHTML = currentQuestionData.incorrect_answers[0];
  answerElementC.innerHTML = currentQuestionData.incorrect_answers[1];
  answerElementD.innerHTML = currentQuestionData.incorrect_answers[2];

}

function selectAnswer (event) {
  const answer = event.target.innerText;
  const currentQuestionData = results[currentQuestionIndex];
  if (answer === currentQuestionData.correct_answer){
    alert('正解！');
  } else {
    alert('不正解！');
  }
}
//変数.addEventListener('イベント名', 関数);
answerElementA.addEventListener('click', selectAnswer);
answerElementB.addEventListener('click', selectAnswer);
answerElementC.addEventListener('click', selectAnswer);
answerElementD.addEventListener('click', selectAnswer);
nextButton.addEventListener('click', () => {
  //次の問題へ
  currentQuestionIndex++;
  setQuestion();
});

window.addEventListener('load', () =>{
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
  .then(function(response){
    return response.json();
    })
    .then(function(json){
    currentQuestionIndex = 0;
    results = json.results;
    setQuestion();
  });
});
