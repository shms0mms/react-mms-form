import { FieldValues, WithStorage } from "../declarations/form"
import { useCookies } from "../hooks/useCookies"
import { useLocalStorage } from "../hooks/useLocalStorage"
const { get: getLocalStorage } = useLocalStorage()
const { get: getCookies } = useCookies()
const getFromStorage = <FormData extends FieldValues>(
	withLocalStorage: WithStorage<FormData>,
	withCookies: WithStorage<FormData>,
	data: keyof FormData
) => {
	const isLocalStorage = withLocalStorage && withLocalStorage.includes(data)
	const isCookies = withCookies && withCookies.includes(data)

	if (isLocalStorage) {
		return getLocalStorage(data as string)
	}
	if (isCookies) {
		return getCookies(data as string)
	}
	return ""
}
export default getFromStorage
