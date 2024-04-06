import { IInputField } from "../../types/field"
import { FieldsValues } from "../../types/form"

export const InputField = <T extends FieldsValues = object>(
	props: IInputField<T>
) => {
	const {
		name,
		params = {},
		register,
		className,
		error,
		type,
		..._props
	} = props

	const registered = { ...register(name, params) }

	return (
		<>
			<div className="flex flex-col gap-1">
				<input
					{..._props}
					type={type || "text"}
					className={`${className} px-2 py-2`}
					{...registered}
				/>
				<div className="text-red-500 text-xl">{error?.message}</div>
			</div>
		</>
	)
}
