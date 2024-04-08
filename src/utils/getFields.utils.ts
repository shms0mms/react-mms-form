import { FieldState } from "../types/field"
import { Fields, FieldsValues } from "../types/form"
import { ArrayRecord } from "../types/types"

const getFields = <FormData extends FieldsValues = object>(
	names: ArrayRecord<FormData>,
	_fields: Fields<FormData>
): Fields<FormData> => {
	const fields = {}
	if (names && names.length) {
		for (let i = 0; i < names.length; i++) {
			const name = names[i]
			const fs = (_fields as Fields<FormData>)[name]
			if (fs) {
				;(fields as Fields<FormData>)[name] = fs
			}
		}
		return fields as Record<keyof FormData, FieldState>
	} else {
		return _fields as Record<keyof FormData, FieldState>
	}
}
export default getFields
