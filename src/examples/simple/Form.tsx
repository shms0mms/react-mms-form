import { FC } from "react"
import { Form as ReactForm } from "@/components/Form"
import { useForm } from "@/hooks/useForm"
import { OnSubmitHandler } from "@/types/submit"
interface FormData {
	name: string
	description: string
}
const Form: FC = () => {
	const { handleSubmit, register, getFields, getFieldsValues } =
		useForm<FormData>()
	const onSubmitHandler: OnSubmitHandler<FormData> = data => {
		console.log(data)

		// Here you can pass it to a function which in turn will make a request to the backend
	}
	console.log(getFieldsValues(["description"]))
	console.log(getFields(["name", "description"]))

	return (
		<>
			<ReactForm handleSubmit={handleSubmit} onSubmitHandler={onSubmitHandler}>
				<div className="flex flex-col gap-2">
					<input type="text" {...register("name")} />
					<input type="text" {...register("description")} />
					<button type="submit" className="btn">
						Submit
					</button>
				</div>
			</ReactForm>
		</>
	)
}

export default Form
