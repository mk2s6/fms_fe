const { Buffer } = require('buffer');
const { isEmptyValue, isEmptyJSON } = require('./helper-functions');

const convertToBase64 = _ => Buffer.from(String(_)).toString('base64');

const convertFromBase64 = _ => Buffer.from(_, 'base64').toString('ascii');

function encryptJSON(key, value) {
	if (typeof value === 'object') {
		return [convertToBase64(key), encryptRequest(value)];
	}
	return [convertToBase64(key), convertToBase64(value)];
}

function encryptRequest(obj) {
	if (isEmptyValue(obj)) {
		return null;
	}

	if (isEmptyJSON(obj)) {
		return {};
	}

	if (Array.isArray(obj)) {
		return obj.map(V => encryptRequest(V));
	}

	if (typeof obj === 'object') {
		const entries = Object.entries(obj);
		return Object.fromEntries(entries.map(([key, value]) => encryptJSON(key, value)));
	}

	return convertToBase64(obj);
}

function decryptKeyValues(_key, _value) {
	if (typeof _value === 'object') {
		return [convertFromBase64(_key), decryptResponse(_value)];
	}

	let [key, value] = [convertFromBase64(_key), convertFromBase64(_value)];

	if (['true', 'false'].includes(value)) {
		if (value === 'true') value = true;
		if (value === 'false') value = false;
	}

	return [key, value];
}

function decryptResponse(obj) {
	if (isEmptyValue(obj)) {
		return null;
	}

	if (isEmptyJSON(obj)) {
		return {};
	}

	if (Array.isArray(obj)) {
		return obj.map(V => decryptResponse(V));
	}

	if (typeof obj === 'object') {
		const entries = Object.entries(obj);
		return Object.fromEntries(entries.map(([key, value]) => decryptKeyValues(key, value)));
	}

	return convertFromBase64(obj);
}

module.exports = { decryptResponse, encryptRequest };
