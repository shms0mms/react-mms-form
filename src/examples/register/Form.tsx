import { FC } from "react"
import { Form as ReactForm } from "@/components/Form"
import { useForm } from "@/hooks/useForm"
import { OnSubmitHandler } from "@/types/submit"
import ButtonChangeValue from "./ButtonChangeValue"
interface RegisterData {
	password: string
	email: string
	name: string
	login: string
}

const Register: FC = () => {
	const { handleSubmit, register, formState, fields, getFields, updateField } =
		useForm<RegisterData>({
			mode: "onSubmit",
			withLocalStorage: ["email", "password"],
			withStorageMode: "onChange",
		})
	const onSubmitHandler: OnSubmitHandler<RegisterData> = async data => {
		console.log(data)

		// Here you can pass it to a function which in turn will make a request to the backend
	}
	console.log(fields)

	// Checking email on valid
	const EMAIL_REGEXP =
		// eslint-disable-next-line no-useless-escape
		/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
	return (
		<ReactForm handleSubmit={handleSubmit} onSubmitHandler={onSubmitHandler}>
			<div className="flex flex-col gap-2">
				<ButtonChangeValue
					updateField={updateField}
					field={getFields(["password"]).password}
				/>
				<input
					placeholder="Ваш пароль"
					type="password"
					{...register("password", {
						minLength: {
							value: 8,
							message: "Min length should be a 8",
						},
					})}
				/>
				<div style={{ color: "red" }}>{formState.errors.password}</div>
				<input
					placeholder="Ваш Email"
					type="text"
					{...register("email", {
						regex: {
							value: EMAIL_REGEXP,
							message: "Email is not a valid",
						},
					})}
				/>
				<div style={{ color: "red" }}>{formState.errors.email}</div>
				<button disabled={formState.isLoading} className="btn" type="submit">
					Submit
				</button>
			</div>
		</ReactForm>
	)
}

export default Register
