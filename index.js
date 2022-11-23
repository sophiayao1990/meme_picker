import { catsData } from "./data.js";

const getEmotionArray = () => {
  let emotionArray = [];
  for (let cat of catsData) {
    for (let emotionTag of cat.emotionTags) {
      if (!emotionArray.includes(emotionTag)) {
        emotionArray.push(emotionTag);
      }
    }
  }
  return emotionArray;
};

const renderEmotionArray = (cats) => {
  let radioItems = "";
  const emotions = getEmotionArray(cats);
  for (let emotion of emotions) {
    radioItems += `
    <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
    </div>`;
  }
  document.getElementById("emotion-radios").innerHTML = radioItems;
};

renderEmotionArray(catsData);
