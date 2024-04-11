import { FieldState } from "@/types/field"
import { FieldsValues, UpdateField } from "@/types/form"

export interface IButtonChangeValue<FormData extends FieldsValues = object> {
	updateField: UpdateField<FormData>
	field: FieldState
}

const ButtonChangeValue = <FormData extends FieldsValues = object>({
	field,
	updateField,
}: IButtonChangeValue<FormData>) => {
	return (
		<>
			<button
				type="button"
				onClick={() =>
					updateField("password", {
						...field,
						value: "RandomValue",
					})
				}
			>
				Change value
			</button>
		</>
	)
}

export default ButtonChangeValue
