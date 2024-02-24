import { useEffect, useState } from "react"
import {
	FieldState,
	FieldStateValues,
	FieldValues,
	FormValidate,
	Mode,
	RegisterParams,
	ValidateFieldState,
} from "../declarations/form"
import validate from "../utils/validate.utils"

const useValidate = <FormData extends FieldValues>({
	formState,
	setFormState,
	mode,
}: {
	formState: FieldStateValues<FormData> | {}
	setFormState: (formState: FieldStateValues<FormData>) => void
	mode?: Mode
	formValidate: FormValidate
	setFormValidate: (formValidate: FormValidate) => void
}) => {
	const [field, setField] = useState<FieldState | {}>({})
	const [fieldState, setFieldState] = useState({
		isInvalid: [],
		isValid: [],
	} as ValidateFieldState)
	const generateFormState = (name: keyof FormData) => {
		setFormState({
			...formState,
			[name]: field,
		} as FieldStateValues<FormData>)
	}
	console.log("Field ", field)

	const checkValidate = (name: keyof FormData, params?: RegisterParams) => {
		const fd = (formState as FieldStateValues<FormData>)[name]
		setField(fd)

		const { isInvalid, isValid } = validate({
			mode,
			params,
			fieldState,
			setFieldState,
			field: fd,
		})
		setField({
			...fd,
			isInvalid,
			isValid,
		})

		generateFormState(name)
	}

	return { checkValidate }
}

export default useValidate
