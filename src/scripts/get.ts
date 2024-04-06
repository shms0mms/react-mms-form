export default <T = {}>(object: T, name: keyof T) => {
	return object[name]
}
