function fibonacci(x) {
  if (x == 0) {
    return (x = 0);
  }
  if (x == 1) {
    return (x = 1);
  } else {
    return (x = fibonacci(x - 1) + fibonacci(x - 2));
  }
}

function getInputValue() {
  let input = document.getElementById("fiboInput").value;
  let result = fibonacci(input);
  document.getElementById("fiboResult").innerText = result;
}
