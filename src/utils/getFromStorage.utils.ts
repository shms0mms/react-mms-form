import { FieldsValues, WithStorage } from "../types/form"
import { useCookies } from "../hooks/useCookies"
import { useLocalStorage } from "../hooks/useLocalStorage"
const { get: getLocalStorage } = useLocalStorage()
const { get: getCookies } = useCookies()
const getFromStorage = <FormData extends FieldsValues = object>(
	key: keyof FormData,
	objects: WithStorage<FormData>
) => {
	const { withCookies, withLocalStorage } = objects
	const isLocalStorage =
		withLocalStorage && withLocalStorage.includes(key as never)
	const isCookies = withCookies && withCookies.includes(key as never)

	if (isLocalStorage) {
		return getLocalStorage(key as string)
	}
	if (isCookies) {
		return getCookies(key as string)
	}
	return ""
}
export default getFromStorage
