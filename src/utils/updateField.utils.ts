import { Fields, FieldsValues } from "../types/form"
import { FieldState } from "../types/field"
import { StateFunction } from "../types/types"
const updateField = <FormData extends FieldsValues = object>(
	name: keyof FormData,
	data: FieldState,
	updateFields: StateFunction<object | Fields<FormData>>
) => {
	updateFields(state => ({ ...state, [name]: data }))
}
export default updateField
