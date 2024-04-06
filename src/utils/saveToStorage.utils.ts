/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldsValues, WithStorage } from "../types/form"
import { useCookies } from "../hooks/useCookies"
import { useLocalStorage } from "../hooks/useLocalStorage"
const { set: setLocalStorage } = useLocalStorage()
const { set: setCookies } = useCookies()
const saveToStorage = <FormData extends FieldsValues = object>(
	name: keyof FormData,
	value: never,
	objects: WithStorage<FormData>
) => {
	const { withCookies, withLocalStorage } = objects
	if (typeof value === "object") {
		for (const key in value as object) {
			if (withLocalStorage && withLocalStorage.includes(key as never)) {
				setLocalStorage(key, value[key])
			}
			if (withCookies && withCookies.includes(key as never)) {
				setCookies(key, value[key])
			}
		}
	} else if (name) {
		if (withLocalStorage && withLocalStorage.includes(name as never)) {
			setLocalStorage(name as string, value)
		}
		if (withCookies && withCookies.includes(name as never)) {
			setCookies(name as string, value)
		}
	}
}
export default saveToStorage
