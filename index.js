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

document.getElementById("emotion-radios").addEventListener("change", () => {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document
    .querySelector('input[type="radio"]:checked')
    .parentElement.classList.add("highlight");
});

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = document.getElementById("gif-only-option").checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

const getSingleCatObject = () => {
  const matchingCatsArray = getMatchingCatsArray();
  if (matchingCatsArray.length === 1) {
    return matchingCatsArray[0];
  } else {
    const randomNum = Math.floor(Math.random() * matchingCatsArray.length);
    return matchingCatsArray[randomNum];
  }
};

const renderCat = () => {
  const catObject = getSingleCatObject();
  document.getElementById("meme-modal-inner").innerHTML = `
          <img src="./images/${catObject.image}" alt="${catObject.alt}" class="cat-img"  />
          `;
  document.getElementById("meme-modal").style.display = "flex";
};
document.getElementById("get-img-btn").addEventListener("click", () => {
  console.log(renderCat());
});

document
  .getElementById("meme-modal-close-btn")
  .addEventListener("click", () => {
    document.getElementById("meme-modal").style.display = "none";
  });
