const parseJSONstring = (parceString: string) => {
	const res = parceString.split('"')
	res.shift()
	res.pop()

	const w = res.join("")

	return w
}

export const useLocalStorage = () => {
	const get = (term: string) => {
		const response = JSON.parse(
			JSON.stringify(localStorage.getItem(term) || "")
		)

		if (typeof response === "string") return parseJSONstring(response)
		return response
	}
	const remove = (term: string) => {
		localStorage.removeItem(term)
	}
	const set = async (term: string, elem: unknown) => {
		await localStorage.setItem(term, JSON.stringify(elem))
	}
	return { set, remove, get }
}
