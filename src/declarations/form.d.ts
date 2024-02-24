import React, { ChangeEvent, FC } from "react"
import {
	IInputDate,
	IInputField,
	IInputSearch,
	IInputSelect,
} from "./form.interface"
import { Form } from "react-hook-form"
declare function InputSelect(props: IInputSelect): React.JSX.Element
declare function InputField(props: IInputField): React.JSX.Element
declare function InputDate(props: IInputDate): React.JSX.Element
declare function InputSearch(props: IInputSearch): React.JSX.Element
type Nullable<T> = { [P in keyof T]: T[P] | null }
type FieldState = Nullable<{
	isValid: boolean
	isFocus: boolean
	isTouched: boolean
	isInvalid: boolean
	isHover: boolean
	isClick: boolean
	error: FieldError | {} | undefined
	value: string
}>

type FieldValues = Record<string, any>
type FieldStateValues<TFormData> = Record<keyof TFormData, FieldState>
type OptionalFieldValues<T> = Partial<T>
type Mode = "onSubmit" | "onChange" | "onBlur" | "onFocus"
type OnSubmitHandler<FieldValues = {}> = (data: FieldValues | {}) => void
type WithStorage<T = FieldValues> = (keyof T)[] | undefined
type FormProps<FieldValues> = {
	withCookies?: WithStorage<FieldValues>
	withLocalStorage?: WithStorage<FieldValues>
	mode?: Mode
}

type ValidateFieldState = {
	isInvalid: boolean[]
	isValid: boolean[]
}
type FieldError = {
	message: ""
}
type FormValidate = {
	isValid: boolean
	isTouched: boolean
	error: FieldError | undefined
	isInvalid: boolean
	isLoading: boolean
}
type RegisterParams = Partial<{
	required: string | boolean
	minLength: number
	maxLength: number
	min: number
	max: number
	regex: string
	lockOn: boolean
}>
type OnChange<T> = ChangeEvent<T>
declare function OnSubmit<T extends FormData>(data: T): void
type StateFunction<T> = (state: T) => void
interface IInputSelect {}
interface IInputDate {}
interface IInputField {}
interface IInputSearch {}
interface IFormProps {}

export {
	OnSubmit,
	FormProps,
	OnSubmitHandler,
	FieldValues,
	IInputSelect,
	IInputDate,
	IInputField,
	IInputSearch,
	IFormProps,
	RegisterParams,
	OnChange,
	Mode,
	FieldError,
	FieldState,
	FieldStateValues,
	ValidateFieldState,
	FormValidate,
	WithStorage,
	StateFunction,
	Nullable,
}
