import isNullOrUndefined from "./isNullOrUndefined"

export default <T>(value: T) => isNullOrUndefined(value) || value
