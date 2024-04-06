import Cookie from "js-cookie"
export const useCookies = () => {
	const get = (name: string) => {
		return Cookie.get(name)
	}
	const set = (name: string, value: never) => {
		Cookie.set(name, value)
	}
	return { get, set }
}
