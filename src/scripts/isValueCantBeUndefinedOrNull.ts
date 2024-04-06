import isNullOrUndefined from "./isNullOrUndefined"

export default <T>(value: T) =>
	isNullOrUndefined(value) ? false : value && true
