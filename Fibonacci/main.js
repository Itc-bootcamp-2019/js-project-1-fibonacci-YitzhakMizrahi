// fiboCalc = receives an input from the user
// Sends the input to the server for calculation
// Receives the result from the server and prints it to the user
function fiboCalc() {
  let input = document.getElementById("fiboInput").value;

  fetch(`http://localhost:5050/fibonacci/${input}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("fiboResult").innerText = data.result;
    });
}
