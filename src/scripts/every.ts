export default <T>(obj: T, callback: (value: unknown) => boolean) => {
	for (const key in obj) {
		if (!callback(obj[key])) {
			return false
		}
	}
	return true
}
