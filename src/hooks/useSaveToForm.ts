import {
	FieldState,
	FieldStateValues,
	FieldValues,
	StateFunction,
	WithStorage,
} from "../declarations/form"
import getFromStorage from "../utils/get-from-storage.utils"

const useSaveToForm = <FormData extends FieldValues>({
	withLocalStorage,
	setFormState,
	withCookies,
	setFormData,
}: {
	withLocalStorage: WithStorage<FormData>
	withCookies: WithStorage<FormData>
	setFormState: StateFunction<FieldStateValues<FormData> | {}>
	setFormData: StateFunction<FormData | {}>
}) => {
	const saveToFormData = ({
		name,
		currentValue,
		formData,
	}: {
		name: keyof FormData
		currentValue?: string
		formData: FormData | {}
	}) => {
		const value = getFromStorage(withLocalStorage, withCookies, name)

		setFormData({
			...formData,
			[name]: currentValue || value || "",
		})
	}
	const saveToFormState = ({
		name,
		currentValue,
		formState,
	}: {
		name: keyof FormData
		currentValue?: string
		formState: FieldStateValues<FormData> | {}
	}) => {
		const value = getFromStorage(withLocalStorage, withCookies, name)
		setFormState({
			...formState,
			[name]: {
				error: undefined,
				isClick: null,
				isFocus: null,
				isHover: null,
				isInvalid: null,
				isValid: null,
				isTouched: null,
				value: currentValue || value || null,
			} as FieldState,
		} as FieldStateValues<FormData>)
	}
	const saveToForm = ({
		name,
		currentValue,
		formData,
		formState,
	}: {
		name: keyof FormData
		currentValue?: string
		formState: FieldStateValues<FormData> | {}
		formData: FormData | {}
	}) => {
		saveToFormData({
			name,
			currentValue,
			formData,
		})
		saveToFormState({
			name,
			currentValue,
			formState,
		})
	}
	return { saveToForm, saveToFormData, saveToFormState }
}

export default useSaveToForm
