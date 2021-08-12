"use strict"; // credit to Yahtzee Master#0168
let ticker = document.getElementById("newsContent");
let tickerContainer = document.getElementById("newsTicker"); // ticker is the text element, tickerContainer is... the thing that contains ticker

let newsPosition = -1e100; // hopefully noones screen is this big

function tickNews() {
  newsPosition -= 2;
  ticker.style.left = `${newsPosition}px`;

  if (newsPosition < -ticker.offsetWidth) newNewsMessage();
}

function newNewsMessage() {
  const newsCandidates = [];
  for (const i in newsArray)
    if (newsArray[i][1] === undefined || newsArray[i][1]())
      newsCandidates.push(newsArray[i][0]);
  player.newsTotal = player.newsTotal.plus(1);
  ticker.innerHTML =
    newsCandidates[Math.floor(newsCandidates.length * Math.random())];
  newsPosition = tickerContainer.offsetWidth;
  ticker.style.left = `${newsPosition}px`;
}

// you can add a second element to each message's array
// the second element is a function that returns a boolean of whether to shown it
const newsArray = [
  ["This is the only news ticker you'll ever see"]
  

];
setTimeout(() => {
  ticker = document.getElementById("newsContent");
  tickerContainer = document.getElementById("newsTicker");
  setInterval(tickNews, 25);
}, 150);
