export default (fields: object, property: unknown) => {
	for (let key in fields) {
		if (
			(fields as Record<string, string>)[key] !== property ||
			key == undefined
		)
			return false
	}
	return Object.keys(fields).length ? true : false
}
