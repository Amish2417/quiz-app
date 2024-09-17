let questionsList = [

     {
      question: "Which is the largest animal in the World ?",
      options : [
        {text: "Shark",correct:false},
        {text: "Blue Whale",correct:true},
        {text: "Elephant",correct:false},
        {text: "Giraffe",correct:false},
      ],
     },

     {
      question: "Which is the largest desert in the World ?",
      options : [
        {text: "kalahari",correct:false},
        {text: "Gobi",correct:false},
        {text: "Sahara",correct:false},
        {text: "Antarctica",correct:true},
      ],
     },


     {
      question: "Which is the smallest continent in the World ?",
      options : [
        {text: "Asia",correct:false},
        {text: "Australia",correct:true},
        {text: "Africa",correct:false},
        {text: "Arctic",correct:false},
      ],
     },


     {
      question: "Which planet in the solar system is known as the “Red Planet ?",
      options : [
        {text: "Venus",correct:false},
        {text: "Earth",correct:false},
        {text: "Mars",correct:true},
        {text: "Jupiter",correct:false},
      ],
     },
     

     {
      question: "What is the capital of Japan ?",
      options : [
        {text: "Beijing",correct:false},
        {text: "Tokyo",correct:true},
        {text: "Seoul",correct:false},
        {text: "Bangkok",correct:false},
      ],
     },

     
];

let questionElement = document.querySelector(".question");
let answerChoiceButtonElement = document.querySelector(".answer-choice-button");
// console.log(answerChoiceButtonElement);
let nextButtonElement = document.querySelector(".next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  showQuestions();
}

function showQuestions(){
  resetState()
  let currentQuestion = questionsList[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.options.forEach(answer => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer");
    answerChoiceButtonElement.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct ;
      // console.log(button);
    }
    button.addEventListener("click",selectAnswer);
  })
  
}
function resetState(){
  nextButtonElement.style.display = "none";
  while(answerChoiceButtonElement.firstChild){
    answerChoiceButtonElement.removeChild(answerChoiceButtonElement.firstChild);
  }
}

function selectAnswer(event){
  //console.log(event);
  let selectedButton = event.target
  // console.log(selectedButton);
  let isCorrect = selectedButton.dataset.correct === "true";
  //console.log(isCorrect);
  if(isCorrect){
    selectedButton.classList.add("correct");
    score++;
  }
  else{
    selectedButton.classList.add("inCorrect");
  }
  // console.log(typeof answerChoiceButtonElement.children);
  Array.from(answerChoiceButtonElement.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;

  });
  nextButtonElement.style.display = "block";
}
nextButtonElement.addEventListener("click",()=>{
  if(currentQuestionIndex < questionsList.length){
    handleNextButtonClick();
  }else{
    startQuiz();
  }
})

function handleNextButtonClick(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questionsList.length){
    showQuestions();
  }else{
    showScore();
  }
}
function showScore(){
  resetState();
  questionElement.innerHTML = `You Scored  ${score} out of ${questionsList.length}`
  nextButtonElement.innerHTML = "Play Again";
  nextButtonElement.style.display = "block";
}
startQuiz();
