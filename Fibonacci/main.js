// fibCalc gets activated onclick() when the user clicks on the (Is) button
function fibCalc() {
  //Receives n for fibonacci from the input form
  let input = document.getElementById("fibInput").value;
  //Receives input for the calculation to be saved or not (checkbox)
  let checkBox = document.getElementById("checkbox");
  clearResults();
  showLoader();
  hideLoader();
  if (input >= 50) {
    //Prints error mesage under input form if the input is >= 50 and adds css to it
    const fibFiftyOrMore = document.getElementById("fibFiftyOrMore");
    fibFiftyOrMore.classList.add("fib-fifty-or-more");
    fibFiftyOrMore.innerText = "Can't be larger than 50";
    // Adds css class to the input form when this error occurs
    const fibInput = document.getElementById("fibInput");
    fibInput.classList.add("form-error");
  } else {
    if (checkBox.checked === true) {
      // Executes when checkbox is checked
      fibCalcRemote(input);
    } else {
      // Executes when checkbox is not checked
      let fibonacciLocal = fibCalcLocal(input);
      document.getElementById("fibResult").innerText = `${fibonacciLocal}`;
    }
  }
}
//Function to calculate fibonacci via remote server
function fibCalcRemote(input) {
  fetch(`http://localhost:5050/fibonacci/${input}`).then(response => {
    if (response.ok) {
      response.json().then(data => {
        document.getElementById("fibResult").innerText = data.result;
        getResults();
      });
    } else {
      response.text().then(text => {
        document.getElementById("fibError").innerText = text;
      });
    }
  });
}
//Function to calculate fibonacci locally
function fibCalcLocal(input) {
  if (input < 2) {
    return input;
  } else {
    return (input = fibCalcLocal(input - 1) + fibCalcLocal(input - 2));
  }
}
//Clears the previous results for different possibilities in order to maintain a clean ui
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
//Hides Loader
function hideLoader() {
  setTimeout(function() {
    const loader = document.getElementById("loader");
    loader.classList.remove("loader");
  }, 2000);
}
//Function to receive saved calculations from the server
function getResults() {
  //Clears result history
  document.getElementById("fibSavedResults").innerHTML = "";
  let sortBy = document.getElementById("sortBy");
  fetch(`http://localhost:5050/getFibonacciResults`).then(response => {
    response.json().then(data => {
      let results = data.results;
      //Executes if sortBy is selected
      if (sortBy.selected) {
        results.sort(function(a, b) {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
      } else if (numberAsc.selected) {
        results.sort(function(a, b) {
          return a.number - b.number;
        });
      } else if (numberDesc.selected) {
        results.sort(function(a, b) {
          return b.number - a.number;
        });
      } else if (dateAsc.selected) {
        results.sort(function(a, b) {
          return new Date(a.createdDate) - new Date(b.createdDate);
        });
      } else if (dateDesc.selected) {
        results.sort(function(a, b) {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
      }

      for (let i = 0; i < results.length; i++) {
        let createdDate = new Date();
        createdDate.toISOString(`${results[i].createdDate}`);

        const resultItemWrapper = document.createElement("div");
        resultItemWrapper.classList.add("results-wrapper");

        const resultItem = document.createElement("div");
        resultItem.classList.add("results-item");
        resultItem.innerHTML = `The Fibonacci of <b>${results[i].number}</b> is <b>${results[i].result}</b>. Calculated at: ${createdDate}`;

        resultItemWrapper.append(resultsNumber);
        fibSavedResults.append(resultItemWrapper);
      }
    });
  });
}
