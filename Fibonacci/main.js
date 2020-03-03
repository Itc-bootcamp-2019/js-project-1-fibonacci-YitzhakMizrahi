function fibonacci(x) {
  if (x == 0 || x == 1) {
    return x;
  } else {
    return (x = fibonacci(x - 1) + fibonacci(x - 2));
  }
}

function getInputValue() {
  let input = document.getElementById("fiboInput").value;
  let result = fibonacci(input);
  document.getElementById("fiboResult").innerText = result;
}
