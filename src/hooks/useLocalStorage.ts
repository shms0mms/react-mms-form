const parseJSONstring = (parceString: string) => {
	const res = parceString.split('"')
	res.shift()
	res.pop()

	const w = res.join("")

	return w
}

export const useLocalStorage = () => {
	const get = (term: string) => {
		if (typeof window !== "undefined") {
			const response = JSON.parse(
				JSON.stringify(localStorage.getItem(term) || "")
			)

			if (typeof response === "string") return parseJSONstring(response)
			return response
		}
	}
	const remove = (term: string) => {
		if (typeof window !== "undefined") localStorage.removeItem(term)
	}
	const set = async (term: string, elem: unknown) => {
		if (typeof window !== "undefined")
			await localStorage.setItem(term, JSON.stringify(elem))
	}
	return { set, remove, get }
}
