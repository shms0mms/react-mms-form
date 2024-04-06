import isObject from "./isObject"

export default <T = {}>(object: T, name: keyof T, value?: any) => {
	if (isObject(object)) object[name] = value
}
