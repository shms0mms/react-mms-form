import { FieldValues } from "../declarations/form"
import { useCookies } from "../hooks/useCookies"
import { useLocalStorage } from "../hooks/useLocalStorage"
const { set: setLocalStorage } = useLocalStorage()
const { set: setCookies } = useCookies()
const saveToStorage = <TFormData extends FieldValues>(
	withLocalStorage: Array<keyof TFormData> | undefined,
	withCookies: Array<keyof TFormData> | undefined,
	data: TFormData | keyof TFormData,
	formData: {} | TFormData
) => {
	if (typeof data === "object") {
		for (let name in data) {
			if (withLocalStorage && withLocalStorage.includes(name)) {
				setLocalStorage(name, data[name])
			}
			if (withCookies && withCookies.includes(name)) {
				setCookies(name, data[name])
			}
		}
	} else {
		const txt = (formData as TFormData)[data]
		if (withLocalStorage && withLocalStorage.includes(data)) {
			setLocalStorage(data as string, txt)
		}
		if (withCookies && withCookies.includes(data)) {
			setCookies(data as string, txt)
		}
	}
}
export default saveToStorage
