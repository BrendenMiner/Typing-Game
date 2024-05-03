document.addEventListener("DOMContentLoaded", () => {
  const textToTypeElement = document.getElementById("text-to-type");
  const typingInputElement = document.getElementById("typing-input");
  const speedElement = document.getElementById("speed");
  const accuracyElement = document.getElementById("accuracy");

  //Text to display
  const sampleTexts = ["you", "me", "when", "they"];

  // initial values
  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;

  //funcion to initialize or restart
  function initializeGame() {
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textToTypeElement.textContent = text;
    typingInputElement.value = "";
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    updateFeedback();
  }
  //function to update the speed and accuracy feedback
  function updateFeedback() {
    const currentTime = new Date();
    const elaspedTime = (currentTime - startTime) / 60000;
    if (elaspedTime <= 0) {
      speedElement.textContent = 0;
    } else {
      const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
      const speed = Math.round(wordsTyped / elaspedTime);
      speedElement.textContent = speed;
    }
    //calc accuracy
    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;
    accuracyElement.textContent = accuracy;
  }

  //functino to checked typed character
  function checkCharacter(inputChar, targetChar) {
    if (inputChar !== targetChar) {
      errors++;
      new Audio("/error.mp3").play();
      return false;
    } else {
      return true;
    }
  }
  //functino to display message to the user
  function displayMessage(message) {
    const messageArea = document.getElementById("message-area");
    messageArea.textContent = message;
    setTimeout(() => {
      messageArea.textContent = "";
    }, 3000);
  }
  //event listent for typing input
  typingInputElement.addEventListener("input", (e) => {
    const typedText = typingInputElement.value;
    const targetText = textToTypeElement.textContent;
    if (currentIndex < targetText.length) {
      const isCorrect = checkCharacter(
        typedText[currentIndex],
        targetText[currentIndex]
      );

      textToTypeElement.innerHTML =
        targetText.substring(0, currentIndex) +
        `<span class= '${isCorrect ? "correct" : "incorrect"}'>${
          targetText[currentIndex]
        }</span>` +
        targetText.substring(currentIndex + 1);
      currentIndex++;
      if (currentIndex === targetText.length) {
        displayMessage("Text Completed, Starting new text");
        initializeGame();
      }
    }
    updateFeedback();
  });
  //start the game
  initializeGame();
});
