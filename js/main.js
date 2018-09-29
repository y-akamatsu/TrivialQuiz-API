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
  //innerTextは中身を書き換える
  //innerTextだと「""」や「''」が変な文字に変換されるためinnerHTMLを使うようにした
  questionElement.innerHTML = currentQuestionData.question;
  const answers = [
  currentQuestionData.correct_answer,
  currentQuestionData.incorrect_answers[0],
  currentQuestionData.incorrect_answers[1],
  currentQuestionData.incorrect_answers[2],
  ];

  const shuffledAnswers = arrShuffle(answers);
  answerElementA.innerHTML = shuffledAnswers[0];
  answerElementB.innerHTML = shuffledAnswers[1];
  answerElementC.innerHTML = shuffledAnswers[2];
  answerElementD.innerHTML = shuffledAnswers[3];
}

function arrShuffle(answers){
  const copiedAnswers = answers.slice();
  //事前にletを使って変数宣言
  let length, i, j, tmp;
  //lengthにanswersの配列の数を代入
  for (length = copiedAnswers.length, i = length - 1; i > 0; i--) {
    //引数として与えた値の乱数の生成
    j = Math.floor(Math.random() * (i + 1));
    tmp = copiedAnswers[i];
    copiedAnswers[i] = copiedAnswers[j];
    copiedAnswers[j] = tmp;
    return copiedAnswers;
  }
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
      console.log('data:',json);
      currentQuestionIndex = 0;
      results = json.results;
      setQuestion();
    });
});