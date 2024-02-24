import { useEffect, useState } from "react"
import {
	FieldError,
	FieldState,
	FieldStateValues,
	FieldValues,
	FormProps,
	Mode,
} from "../declarations/form"
import getFromStorage from "../utils/get-from-storage.utils"

const useFormStates = <FormData extends FieldValues>({
	mode: propsMode,
	withLocalStorage,
	withCookies,
}: FormProps<FormData>) => {
	const [formData, setFormData] = useState<FormData | {}>({})
	const formValidateValues = {
		isValid: false,
		isTouched: false,
		error: {
			message: "",
		} as FieldError | undefined,
		isInvalid: false,
		isLoading: false,
	}
	const [formValidate, setFormValidate] = useState(formValidateValues)
	const generateFormDataState = () => {
		const formDataState = {}
		for (let key in formData) {
			const value = getFromStorage(withLocalStorage, withCookies, key)

			if (formData) {
				;(formDataState as FieldValues)[key] = {
					isClick: false,
					isFocus: false,
					isHover: false,
					isInvalid: false,
					isTouched: false,
					isValid: false,
					value,
				} as FieldState
			}
		}

		return formDataState
	}
	const [formState, setFormState] = useState<FieldStateValues<FormData> | {}>(
		generateFormDataState() || {}
	)

	useEffect(() => {
		setFormState(generateFormDataState())
	}, [Object.keys(formData).length])
	const [mode, _] = useState<Mode>(propsMode || "onChange")

	return {
		formState,
		setFormState,
		formData,
		setFormData,
		mode,
		formValidate,
		setFormValidate,
	}
}

export default useFormStates
