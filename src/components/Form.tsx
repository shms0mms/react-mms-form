import { FieldsValues, UIFormProps } from "../types/form"

export const Form = <T extends FieldsValues = object>(
	props: UIFormProps<T>
) => {
	const { handleSubmit, onSubmitHandler, children, ..._props } = props

	return (
		<form
			onSubmit={e => handleSubmit && handleSubmit(e, onSubmitHandler)}
			{..._props}
		>
			{children}
		</form>
	)
}
