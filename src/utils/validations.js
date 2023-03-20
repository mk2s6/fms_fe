export const PAYMENT_METHOD_TYPES = ['CREDIT CARD', 'DEBIT CARD', 'BANK ACCOUNT', 'WALLET', 'GROCERY CARD', 'FOOD CARD'];
export const TRANSACTION_TYPES = ['CREDIT', 'DEBIT', 'CASHBACK', 'IN-VALID', 'REFUND'];
export function validateTax(value) {
	return parseFloat(value) >= 0 && parseFloat(value) <= 100;
}

export function validateAmount(value) {
	return !isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= Number.POSITIVE_INFINITY;
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

export function validateTransactionCategories(categories) {
	return categories.length;
}

export const checkErrors = fields => {
	return fields
		.map(_f => {
			_f.Validate();
			return _f;
		})
		.map(_f => _f.error)
		.some(v => v === true);
};
