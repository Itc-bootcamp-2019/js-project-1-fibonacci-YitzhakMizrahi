function fibonacci(x) {
  let first = 0,
    second = 1,
    next = 1;

  for (let i = 2; i <= x; i++) {
    next = first + second;
    first = second;
    second = next;
    console.log(next);

    document.getElementById(
      "myElement"
    ).innerText = `The Fibonacci of ${x} is ${next}`;
  }
}

fibonacci(10);
