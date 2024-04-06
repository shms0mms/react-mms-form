import React, { InputHTMLAttributes } from "react"
import { Register, RegisterParams } from "./register"
import { FieldsValues } from "./form"

export type InputSelect = (props: IInputSelect) => React.JSX.Element
export type InputField = (props: IInputField) => React.JSX.Element
export type InputDate = (props: IInputDate) => React.JSX.Element
export type InputSearch = (props: IInputSearch) => React.JSX.Element

export interface IInputSelect<T extends FieldsValues = object>
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
	params?: RegisterParams
	register: Register<T>
	error?: ErrorType
	name: keyof T
}
export interface IInputDate<T extends FieldsValues = object>
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
	params?: RegisterParams
	register: Register<T>
	error?: ErrorType
	name: keyof T
}
export interface IInputField<T extends FieldsValues = object>
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
	params?: RegisterParams
	register: Register<T>
	error?: ErrorType
	name: keyof T
}
export interface IInputSearch {}
export type FieldState = {
	isValid: boolean
	isFocus: boolean
	isTouched: boolean
	isInvalid: boolean
	error: ErrorType | undefined
	value: string
	params: RegisterParams
}
export type ErrorType = {
	message: string | undefined
}
