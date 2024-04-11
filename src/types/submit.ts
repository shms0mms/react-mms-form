import { FormEvent } from "react"
import { FieldsValues } from "./form"

export type HandleSubmit<FormData extends FieldsValues = object> = (
	e: FormEvent,
	fn: OnSubmitHandler<FormData>
) => void

export type OnSubmitHandler<FormData extends FieldsValues = object> = (
	data: Record<keyof FormData, string>
) => void
