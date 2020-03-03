function getInputValue() {
  let input = document.getElementById("fiboInput").value;
  fibonacci(input);
}
function fibonacci(x) {
  let first = 0,
    second = 1,
    next = 1;
  for (let i = 1; i <= x; i++) {
    next = first + second;
    first = second;
    second = next;
    console.log(next);
  }
  document.getElementById("fiboResult").innerText = `${next}`;
}
