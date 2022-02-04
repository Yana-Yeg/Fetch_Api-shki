import searchEvents from './index'; 

const element = document.querySelector(".form__select");
const elementSelect = element.querySelector("select"); // <=> document.querySelector("#search-form input");
const searchPlace = document.querySelector('.choices__input.choices__input--cloned');
// const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  // console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";

  element.insertAdjacentHTML("beforeend", '<button class="form-input-btn" type="button"><i class="fas fa-microphone-alt-slash"></i></button>');
  elementSelect.style.paddingRight = "50px";

  const micBtn = element.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone-alt-slash")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-alt-slash");
    micIcon.classList.add("fa-microphone-alt");
    elementSelect.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-alt");
    micIcon.classList.add("fa-microphone-alt-slash");
    elementSelect.focus();
    console.log("Speech recognition service disconnected");
  }
  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcriptCountry = event.results[current][0].transcript;
    // console.log(event.results[current][0]);
    // console.log(transcriptCountry);
    
    searchPlace.value = transcriptCountry;
    // console.log(searchPlace.value);
    element.value = searchPlace.value;
    console.log(element.value);

    if (transcriptCountry.toLowerCase().trim() === "stop recording") {
      console.log('stop recording');
      recognition.stop();
    }
    else if (!searchPlace.value) {
      console.log('пустое');
      element.value = searchPlace.value;
      console.log('element.value :', element.value);
    }
    else {
      if (transcriptCountry.toLowerCase().trim() === "go") {
        console.log('что-то и go');
        console.log(searchPlace.value)
        // element.submit();
        // console.log(event);
        searchEvents(event)
      }
      else if (transcriptCountry.toLowerCase().trim() === "reset input") {
        console.log('reset input');
        element.value = "";
      }
      else {
        console.log('не пустое и при этом не  go/reset');
        element.value = searchPlace.value;
        searchEvents(event)
        console.log('element.value :', element.value);
      }
    }
    // elementSelect.value = transcriptCountry;
    // elementSelect.focus();
    // setTimeout(() => {
    //   element.submit();
    // }, 500);
  }
//   info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
//   info.textContent = "Your Browser does not support Speech Recognition";
}