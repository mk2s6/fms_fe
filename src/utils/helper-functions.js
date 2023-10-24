/**
 * Check whether the object (JSON can be used) is empty or not. This also check if object
 * is undefined or null. Generally used when we get response from external API.
 *
 * @param {object|JSON} obj JS variable/object/JSON
 *
 * @returns {boolean} Representing whether the object is empty or not
 */
function isEmptyJSON(obj) {
	// only using obj === will work but this is just for readability
	if (obj === null || obj === undefined) {
		return true;
	}
	return !Object.keys(obj).length;
}

/**
 * Check whether the given value is empty or not. This also check if object
 * is undefined or null. Generally used in case of validator implementation of ifExists****.
 *
 * @param {any} val any value in JS. If it is object use isEmptyJSON
 *
 * @returns {boolean} Representing whether the value is empty or not
 */
function isEmptyValue(val) {
	// only using obj === null will work but this is just for 'undefined' readability
	// https://stackoverflow.com/a/2647888
	return val === undefined || val === null || val === '';
}

export { isEmptyJSON, isEmptyValue };
