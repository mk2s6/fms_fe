export function validateTax(value) {
  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
}

export function validateString(min = 0, max = Infinity) {
  return value => value.length >= min && value.length <= max;
}

export function validateMultiSelectValues(min = 1, max = Infinity) {
  return value => value.length >= min && value.length <= max;
}
