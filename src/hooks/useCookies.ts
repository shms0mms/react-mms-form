import Cookie from "js-cookie"
export const useCookies = () => {
	const get = (name: string): any => {
		return Cookie.get(name)
	}
	const set = (name: string, value: any) => {
		Cookie.set(name, value)
	}
	return { get, set }
}
