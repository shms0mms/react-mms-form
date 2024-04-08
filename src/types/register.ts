import { FieldsValues } from "./form"

export type RegisterParam<T> = {
	message?: string
	value: T
}

export type UseRegisterReturn = object
export type Register<FormData extends FieldsValues = object> = (
	name: keyof FormData,
	params?: RegisterParams
) => UseRegisterReturn
export type RegisterParams = Partial<{
	required: RegisterParam<string | boolean>
	minLength: RegisterParam<number>
	maxLength: RegisterParam<number>
	min: RegisterParam<number>
	max: RegisterParam<number>
	regex: RegisterParam<RegExp>
	lockOn: RegisterParam<boolean>
}>
