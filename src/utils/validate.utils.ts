import {
	FieldState,
	FieldValues,
	Mode,
	RegisterParams,
	ValidateFieldState,
} from "../declarations/form"
const validate = <FormData extends FieldValues>({
	params,
	fieldState,
	setFieldState,
	field,
}: {
	params?: RegisterParams
	fieldState: ValidateFieldState
	setFieldState: (fieldState: ValidateFieldState) => void
	mode?: Mode
	field: FieldState
}) => {
	const changeFieldState = (isCorrect: boolean) => {
		setFieldState({
			isValid: [...fieldState.isValid, isCorrect],
			isInvalid: [...fieldState.isInvalid, isCorrect],
		})
	}
	if (params?.max) {
		const isCorrect = field.value && +field.value > params.max ? false : true
		changeFieldState(isCorrect)
	}
	if (params?.min) {
		const isCorrect = field.value && +field.value < params.min ? false : true
		changeFieldState(isCorrect)
	}
	if (params?.minLength) {
		const isCorrect =
			field.value && field.value.length < params.minLength ? false : true
		changeFieldState(isCorrect)
	}
	if (params?.maxLength) {
		const isCorrect =
			field.value && field.value.length > params.maxLength ? false : true
		changeFieldState(isCorrect)
	}
	if (params?.required) {
		const isCorrect = field.value && field.value.length > 0 ? true : false
		changeFieldState(isCorrect)
	}
	if (params?.regex) {
		const isCorrect = params.regex.match(field.value ? field.value : "")
			? true
			: false
		changeFieldState(isCorrect)
	}
	const values = {
		isValid: fieldState.isInvalid.some(i => i === true) ? false : true,
		isInvalid: fieldState.isValid.some(i => i === true) ? false : true,
	}

	return {
		...values,
	}
}

export default validate
