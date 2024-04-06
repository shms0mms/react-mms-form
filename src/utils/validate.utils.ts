import isValueShouldNotBeUndefined from "../scripts/isValueShouldNotBeUndefined"
import { FieldState } from "../types/field"
import { RegisterParams } from "../types/register"
const validate = ({
	params,
	field,
}: {
	params?: RegisterParams
	field: FieldState
}): {
	isInvalid: boolean
	isValid: boolean
	newField: FieldState
} => {
	if (params?.max) {
		const isCorrect =
			isValueShouldNotBeUndefined(field.value) &&
			+field.value > params.max.value
				? false
				: true
		if (isCorrect === false) {
			return {
				isInvalid: true,
				isValid: false,

				newField: {
					...field,
					error: { message: params.max.message },
				},
			}
		}
	}
	if (params?.min) {
		const isCorrect =
			isValueShouldNotBeUndefined(field.value) &&
			+field.value < params.min.value
				? false
				: true
		if (isCorrect === false) {
			return {
				isInvalid: true,
				isValid: false,

				newField: {
					...field,
					error: { message: params.min.message },
				},
			}
		}
	}
	if (params?.minLength) {
		const isCorrect =
			isValueShouldNotBeUndefined(field.value) &&
			field.value.length > 0 &&
			field.value.length < params.minLength.value
				? false
				: true

		if (isCorrect === false) {
			return {
				isInvalid: true,
				isValid: false,
				newField: {
					...field,
					error: { message: params.minLength.message },
				},
			}
		}
	}
	if (params?.maxLength) {
		const isCorrect =
			isValueShouldNotBeUndefined(field.value) &&
			field.value.length > params.maxLength.value
				? false
				: true

		if (isCorrect === false) {
			return {
				isInvalid: true,
				isValid: false,
				newField: {
					...field,
					error: { message: params.maxLength.message },
				},
			}
		}
	}
	if (params?.required) {
		const isCorrect =
			isValueShouldNotBeUndefined(field.value) && field.value.length > 0
				? true
				: false
		if (isCorrect === false) {
			return {
				isInvalid: true,
				isValid: false,
				newField: {
					...field,
					error: {
						message: params.required.message,
					},
				},
			}
		}
	}
	if (params?.regex) {
		const isCorrect = params.regex.value.match(
			isValueShouldNotBeUndefined(field.value) ? field.value : ""
		)
			? true
			: false
		if (isCorrect === false) {
			return {
				isInvalid: true,
				isValid: false,
				newField: {
					...field,
					error: {
						message: params.regex.message,
					},
				},
			}
		}
	}

	return {
		isInvalid: false,
		isValid: true,
		newField: { ...field, isValid: true, isInvalid: false },
	}
}

export default validate
