let questions;
let currentQuestionIndex = localStorage.getItem("currentQuestionIndex") || 0;
let timeLeft = localStorage.getItem("timeLeft") || 600; //600s = 10min
let timeInterval;

document.addEventListener("DOMContentLoaded", () => {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      startQuiz();
    });
});

function startQuiz() {
  if (!document.fullscreenElement) {
    document.getElementById("fullscreen-alert").style.display = "block";
  } else {
    document.getElementById("fullscreen-alert").style.display = "none";
    loadQuestion();
    startTimer();
  }
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    alert("Quiz Completed!");
    return;
  }
  const questionData = questions[currentQuestionIndex];
  document.getElementById("question").innerText = questionData.question;
  const choicesList = document.getElementById("choices");
  choicesList.innerHTML = "";
  questionData.choices.forEach((choice) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="choice" value="${choice}"> ${choice}`;
    choicesList.appendChild(li);
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
  loadQuestion();
}

function startTimer() {
  document.getElementById("time-left").innerText = formatTime(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft--;
    localStorage.setItem("timeLeft", timeLeft);
    document.getElementById("time-left").innerText = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

document.addEventListener("fullscreenchange", () => {
  startQuiz();
});

function enableFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
}
