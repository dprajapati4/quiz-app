const username = document.getElementById("username")
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");


const highScores = JSON.parse(localStorage.getItem("highScores"))
console.log(JSON.parse(localStorage.getItem("highScores")))
const mostRecentScore = localStorage.getItem("mostRecentScore")

finalScore.innerText = mostRecentScore;


username.addEventListener("keyup",() =>{
  console.log(username.value)
  saveScoreBtn.disabled = !username.value
})


saveHighScore = (e) => {
console.log("i clicked save")
e.preventDefault();

}