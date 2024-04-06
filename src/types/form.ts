import { ReactNode } from "react"
import { FieldState } from "./field"
import { Register, RegisterParams } from "./register"
import { HandleSubmit, OnSubmitHandler } from "./submit"
import { ArrayRecord, StateFunction } from "./types"
export type ValidateFields<FormData extends FieldsValues = object> = Record<
	keyof FormData,
	RegisterParams
>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldsValues = Record<string, any>
export type Fields<FormData extends FieldsValues = object> = Record<
	keyof FormData,
	FieldState
>
export type UIFormProps<FormData extends FieldsValues = object> = {
	children?: ReactNode
	handleSubmit: HandleSubmit<FormData>
	onSubmitHandler: OnSubmitHandler<FormData>
} & Omit<HTMLFormElement, "onSubmit">
export type DefaultValues<FormData extends FieldsValues = object> = {
	[P in keyof FormData]?: string
}
export type Mode = "onSubmit" | "onChange" | "onBlur" | "onFocus"
export type FormProps<FormData extends FieldsValues = object> = {
	withCookies?: ArrayRecord<FormData>
	withLocalStorage?: ArrayRecord<FormData>
	mode?: Mode
	defaultValues?: DefaultValues<FormData>
	withStorageMode?: Mode
}
export type FormErrors<FormData extends FieldsValues = object> = Record<
	keyof FormData,
	string
>
export type FormState<FormData extends FieldsValues = object> = {
	isValid: boolean
	isTouched: boolean
	isInvalid: boolean
	isLoading: boolean
	isValidating: boolean
	submitCount: number
	errors: FormErrors<FormData>
}
export type WithStorage<FormData extends FieldsValues = object> = {
	withLocalStorage: ArrayRecord<FormData>
	withCookies: ArrayRecord<FormData>
	defaultValues?: DefaultValues<FormData>
}
export type GetFields<FormData extends FieldsValues = object> = (
	names: ArrayRecord<FormData>
) => Fields<FormData>
export type GetFieldsValues<FormData extends FieldsValues = object> = (
	names: ArrayRecord<FormData>
) => FormData
export interface UseFormReturn<FormData extends FieldsValues = object>
	extends UseFormControlReturn<FormData> {
	control: UseFormControlReturn<FormData>
}
export interface CreateFormControlProps<FormData extends FieldsValues = object>
	extends FormProps<FormData> {
	fields: Fields<FormData> | object
	updateFields: StateFunction<Fields<FormData> | object>
	formState: FormState<FormData>
	updateFormState: StateFunction<FormState<FormData>>
}
export type UseFormControlReturn<FormData extends FieldsValues = object> = {
	register: Register<FormData>
	handleSubmit: HandleSubmit<FormData>
	getFields: GetFields<FormData>
	getFieldsValues: GetFieldsValues<FormData>
	formState: FormState<FormData>
	fields: Fields<FormData>
	fieldsValues: FormData
}
