export function format(number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 12,
  }).format(number);
}

export function findLast(calculation) {
  return calculation[calculation.length - 1];
}

export function findLastOperator(calculation) {
  return calculation.reduce((accumulator, currentValue) => (isOperator(currentValue) ? currentValue : accumulator), "");
}

export function isOperator(token) {
  return ["+", "-", "x", "÷", "xʸ"].includes(token);

}

//運算次序
function PEMDAS(calculation) {
  const index = calculation.findIndex((operator) =>
    ["x", "÷", "xʸ"].includes(operator)

  );

  return index !== -1
    ? index
    : calculation.findIndex((operator) => ["+", "-"].includes(operator));
}

function merge([left, operator, right]) {
  return {
    "xʸ": (a, b) => Math.pow(a,b),
    "÷": (a, b) => a / b,
    "x": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  }[operator](Number(left), Number(right));
}


//計算過程:數字 運算子 數字 ex:1+1
export function calculate(calculation) {
  if (calculation.length < 3) return calculation;

  const index = PEMDAS(calculation);

  if (index === -1) return calculation;

  return calculate([
    ...calculation.slice(0, index - 1),
    merge(calculation.slice(index - 1, index + 2)),
    ...calculation.slice(index + 2),
  ]);
}
