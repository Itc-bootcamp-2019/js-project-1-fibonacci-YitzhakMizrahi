// fibCalc = receives an input from the user
// If the input is < 50 sends the input to the server for calculation
// Receives the result from the server and prints it to the user
// If the input is >= 50 does not send it to the server and prints an error

function fibCalc() {
  let input = document.getElementById("fibInput").value;
  if (input >= 50) {
    clearResults();
    showLoader();
    hideLoader();

    const fibFiftyOrMore = document.getElementById("fibFiftyOrMore");
    fibFiftyOrMore.classList.add("fib-fifty-or-more");
    fibFiftyOrMore.innerText = "Can't be larger than 50";

    const fibInput = document.getElementById("fibInput");
    fibInput.classList.add("form-error");
  } else {
    fetch(`http://localhost:5050/fibonacci/${input}`).then(response => {
      clearResults();
      showLoader();
      hideLoader();
      if (response.ok) {
        response.json().then(data => {
          document.getElementById("fibResult").innerText = data.result;
        });
      } else {
        response.text().then(text => {
          document.getElementById("fibError").innerText = text;
        });
      }
    });
  }
}

//Clears the previous results for all possibilities
function clearResults() {
  const fibFiftyOrMore = document.getElementById("fibFiftyOrMore");
  fibFiftyOrMore.classList.remove("fib-fifty-or-more");
  fibFiftyOrMore.innerText = "";

  const fibInput = document.getElementById("fibInput");
  fibInput.classList.remove("form-error");

  document.getElementById(
    "fibResult"
  ).innerHTML = `<div class="col-6 result" id="fibResult"><span class="col-6 error-42" id="fibError"></span></div>`;
}

//Adds css class to present Loader
function showLoader() {
  setTimeout(function() {
    const loader = document.getElementById("loader");
    loader.classList.add("loader");
  }, 0);
}

//Removes Loader css class in 2 seconds
function hideLoader() {
  setTimeout(function() {
    const loader = document.getElementById("loader");
    loader.classList.remove("loader");
  }, 2000);
}
