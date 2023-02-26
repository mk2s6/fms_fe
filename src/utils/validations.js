export const PAYMENT_METHOD_TYPES = ['CREDIT CARD', 'DEBIT CARD', 'BANK ACCOUNT', 'WALLET', 'GROCERY CARD', 'FOOD CARD'];
export function validateTax(value) {
  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
}

export function validateString(min = 1, max = Infinity) {
  return value => value.length >= min && value.length <= max;
}

export function validateMultiSelectValues(min = 1, max = Infinity) {
  return value => value.length >= min && value.length <= max;
}

export function validatePaymentMethodTypes(type) {
  return PAYMENT_METHOD_TYPES.includes(type);
}

export const checkErrors = fields => {
  return fields
    .map(_f => {
      _f.validate();
      return _f;
    })
    .map(_f => _f.error)
    .some(v => v === true);
};
