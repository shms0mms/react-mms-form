import { Fields, FieldsValues } from "../types/form"
import { ArrayRecord } from "../types/types"

const getFieldsValues = <FormData extends FieldsValues = {}>(
	names: ArrayRecord<FormData>,
	_fields: Fields<FormData>
): FormData => {
	const values: Record<keyof FormData, string> = {} as Record<
		keyof FormData,
		string
	>
	if (names && names.length) {
		for (let i = 0; i < names.length; i++) {
			const name = names[i]
			const fs = (_fields as Fields<FormData>)[name].value
			if (fs) {
				values[name] = fs
			}
		}
		return values as FormData
	} else {
		for (let i in _fields) {
			values[i] = _fields[i].value
		}
		return values as FormData
	}
}
export default getFieldsValues
