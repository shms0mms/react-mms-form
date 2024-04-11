import { FieldState } from "../types/field"
import { FieldsValues, WithStorage } from "../types/form"
import { RegisterParams } from "../types/register"
import getFromStorage from "./getFromStorage.utils"
const getDefaultField = <FormData extends FieldsValues = object>(
	name: keyof FormData,
	objects: WithStorage<FormData> & { params?: RegisterParams }
) => {
	const _field: FieldState = {
		error: undefined,
		isFocus: false,
		isInvalid: false,
		isTouched: false,
		isValid: false,
		value:
			getFromStorage<FormData>(name, objects) ||
			(objects.defaultValues && objects.defaultValues[name]),
		params: objects.params || {},
	}

	return {
		..._field,
	}
}

export default getDefaultField
