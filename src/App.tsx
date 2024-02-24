import { OnSubmitHandler } from "./declarations/form"
import { useForm } from "./hooks/useForm"
interface FormData {
	name: string
	password: string
}
export default function App() {
	const { handleSubmit, register } = useForm<FormData>({
		withLocalStorage: ["name", "password"],
		mode: "onChange",
	})

	const onSubmit: OnSubmitHandler<FormData> = data => {}
	return (
		<>
			<form
				className="flex flex-col gap-5"
				onSubmit={e => handleSubmit(e, onSubmit)}
			>
				<input type="text" {...register("name")} />
				<input
					type="text"
					{...register("password", {
						maxLength: 4,
					})}
				/>
				<button className="bg-pink-600" type="submit">
					Submit
				</button>
			</form>
		</>
	)
}
