import { FieldsValues, UIFormProps } from "../types/form"

const Form = <T extends FieldsValues = {}>(props: UIFormProps<T>) => {
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

export default Form
