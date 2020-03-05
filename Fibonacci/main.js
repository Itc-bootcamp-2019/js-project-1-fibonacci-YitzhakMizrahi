function fibonacci(x) {
  if (x < 2) {
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
