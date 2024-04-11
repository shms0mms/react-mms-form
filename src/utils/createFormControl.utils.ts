import { VALIDATION_MODE_ON_SUBMIT } from "./../const/const"
import { FormEvent } from "react"

import getFieldsLogic from "./getFields.utils"
import getFieldsValuesLogic from "./getFieldsValues.utils"
import getDefaultField from "./getDefaultField.utils"
import updateFieldLogic from "./updateField.utils"
import {
	VALIDATION_MODE_ON_BLUR,
	VALIDATION_MODE_ON_CHANGE,
	VALIDATION_MODE_ON_FOCUS,
} from "../const/const"
import validate from "./validate.utils"
import { RegisterParams } from "../types/register"
import {
	CreateFormControlProps,
	Fields,
	FieldsValues,
	FormState,
	UseFormControlReturn,
} from "../types/form"
import { OnSubmitHandler } from "../types/submit"
import { ArrayRecord, OnChange, StateFunction } from "../types/types"
import set from "../scripts/set"
import get from "../scripts/get"
import isNullOrUndefined from "../scripts/isNullOrUndefined"
import saveToStorage from "./saveToStorage.utils"
import { FieldState } from ".."
import every from "@/scripts/every"
const createFormControl = <FormData extends FieldsValues = object>(
	props: CreateFormControlProps<FormData>
): { control: UseFormControlReturn<FormData> } => {
	const {
		mode,
		fields,
		updateFields,
		formState,
		updateFormState,
		withStorageMode,
		defaultValues,
		withCookies,
		withLocalStorage,
	} = props

	let _fields: Fields<FormData> = fields as Fields<FormData>
	let _formState: FormState<FormData> = formState as FormState<FormData>
	const updateValidate = (isInvalid: boolean, isValid: boolean) => {
		if (isInvalid) {
			return { isInvalid: true, isValid: false }
		} else if (
			every(_fields, value => !(value as FieldState).isInvalid) &&
			isValid
		) {
			return { isValid: true, isInvalid: false }
		}
	}
	const validateFields = (
		updateFormState: StateFunction<FormState<FormData>>
	) => {
		_formState.isValidating = true
		updateFormState(state => ({
			...state,
			..._formState,
		}))

		for (let key in _fields) {
			const field = (fields as Fields<FormData>)[key]
			const { isInvalid, newField } = validate({
				field,
				params: field.params,
			})

			set<Fields<FormData>>(_fields, key, newField)
			updateFields(state => ({
				...state,
				..._fields,
			}))

			if (isInvalid) {
				_formState.errors = {
					..._formState.errors,
					[key]: newField.error?.message,
				}
				updateFormState(state => ({
					...state,
					..._formState,
				}))
			} else {
				_formState.errors = {
					..._formState.errors,
					[key]: undefined,
				}
				updateFormState(state => ({
					...state,
					..._formState,
				}))
			}
		}
		for (let key in _fields) {
			const { isValid, isInvalid } = _fields[key]

			const formStateValidatingOptions = updateValidate(isInvalid, isValid)

			if (formStateValidatingOptions) {
				_formState.isInvalid = formStateValidatingOptions?.isInvalid
				_formState.isValid = formStateValidatingOptions?.isValid
			}

			updateFormState(state => ({
				...state,
				..._formState,
			}))
		}
		_formState.isValidating = false
		updateFormState(state => ({
			...state,
			..._formState,
		}))
	}
	const handleSubmit = (e: FormEvent, fn: OnSubmitHandler<FormData>) => {
		_formState.isLoading = true
		updateFormState(state => ({
			...state,
			..._formState,
		}))
		let names: ArrayRecord<FormData> = [] as ArrayRecord<FormData>

		if (withStorageMode === VALIDATION_MODE_ON_SUBMIT) {
			for (let key in fields)
				saveToStorage(key, (fields as Fields<FormData>)[key].value as never, {
					withCookies,
					withLocalStorage,
				})
		}
		validateFields(updateFormState)
		for (let key in fields) names && names.push(key)

		if (!formState.isInvalid) fn({ ...getFieldsValuesLogic(names, _fields) })
		_formState.submitCount = _formState.submitCount + 1
		_formState.isLoading = false
		updateFormState(state => ({
			...state,
			..._formState,
		}))

		e.preventDefault()
	}
	const validateOnField = (name: keyof FormData, params?: RegisterParams) => {
		const { isInvalid, isValid, newField } = validate({
			field: _fields[name],
			params,
		})
		set<Fields<FormData>>(_fields, name, newField)
		updateFields(prev => ({ ...prev, ..._fields }))
		updateValidate(isInvalid, isValid)
		if (isInvalid) {
			_formState.errors = {
				..._formState.errors,
				[name]: newField.error?.message,
			}
			updateFormState(state => ({
				...state,
				..._formState,
			}))
		} else {
			_formState.errors = {
				..._formState.errors,
				[name]: undefined,
			}
			updateFormState(state => ({
				...state,
				..._formState,
			}))
		}
	}
	const register = (name: keyof FormData, params?: RegisterParams) => {
		const value = isNullOrUndefined((fields as Fields<FormData>)[name])
			? ""
			: (fields as Fields<FormData>)[name].value

		if (isNullOrUndefined(_fields[name])) {
			const _field = getDefaultField(name, {
				withCookies: withCookies,
				withLocalStorage: withLocalStorage,
				defaultValues: defaultValues,
				params,
			})

			set<Fields<FormData>>(_fields, name, _field)
			updateFields(prev => ({ ...prev, ..._fields }))
		}
		if (withStorageMode === VALIDATION_MODE_ON_CHANGE) {
			saveToStorage(name, value as never, {
				withCookies,
				withLocalStorage,
			})
		}
		const onChange = (e: OnChange<HTMLInputElement>) => {
			const value = e.target.value

			const field = get<Fields<FormData>>(_fields, name)
			field.value = value
			set<Fields<FormData>>(_fields, name, field)
			updateFields(prev => ({ ...prev, ..._fields }))

			if (mode !== VALIDATION_MODE_ON_CHANGE && formState.errors[name]) {
				const { isInvalid, isValid, newField } = validate({
					field: _fields[name],
					params,
				})
				set<Fields<FormData>>(_fields, name, newField)
				updateFields(prev => ({ ...prev, ..._fields }))
				const formStateValidatingOptions = updateValidate(isInvalid, isValid)
				if (formStateValidatingOptions) {
					_formState.isInvalid = formStateValidatingOptions.isInvalid
					_formState.isValid = formStateValidatingOptions.isValid
				}
				updateFormState(state => ({
					...state,
					..._formState,
				}))
				if (isInvalid) {
					_formState.errors = {
						..._formState.errors,
						[name]: newField.error?.message,
					}
					updateFormState(state => ({
						...state,
						..._formState,
					}))
				} else {
					_formState.errors = {
						..._formState.errors,
						[name]: undefined,
					}
					updateFormState(state => ({
						...state,
						..._formState,
					}))
				}
			}
			if (mode === VALIDATION_MODE_ON_CHANGE) {
				validateOnField(name, params)
			}
			if (withStorageMode === VALIDATION_MODE_ON_CHANGE) {
				saveToStorage(name, value as never, {
					withCookies,
					withLocalStorage,
				})
			}
		}
		const onBlur = () => {
			if (mode === VALIDATION_MODE_ON_BLUR) {
				validateOnField(name, params)
			}
			if (withStorageMode === VALIDATION_MODE_ON_BLUR) {
				saveToStorage(name, value as never, {
					withCookies,
					withLocalStorage,
				})
			}
			const field = get<Fields<FormData>>(_fields, name)
			field.isFocus = false
			set<Fields<FormData>>(_fields, name, field)
			updateFields(prev => ({ ...prev, ..._fields }))
		}
		const onFocus = () => {
			if (!_formState.isTouched) {
				_formState.isTouched = true
				updateFormState(state => ({ ...state, ..._formState }))
			}
			const field = get<Fields<FormData>>(_fields, name)
			field.isTouched = true
			field.isFocus = true
			set<Fields<FormData>>(_fields, name, field)
			updateFields(prev => ({ ...prev, ..._fields }))

			if (mode === VALIDATION_MODE_ON_FOCUS) {
				validateOnField(name, params)
			}
			if (withStorageMode === VALIDATION_MODE_ON_FOCUS) {
				saveToStorage(name, value as never, {
					withCookies,
					withLocalStorage,
				})
			}
		}

		return {
			value,
			name,
			onChange,
			onFocus,
			onBlur,
		}
	}
	const control: UseFormControlReturn<FormData> = {
		register,
		handleSubmit,
		getFields: (names?: ArrayRecord<FormData>) =>
			getFieldsLogic(names, _fields),
		getFieldsValues: (names?: ArrayRecord<FormData>) =>
			getFieldsValuesLogic(names, _fields),
		formState,
		fields: fields as Fields<FormData>,
		fieldsValues: getFieldsValuesLogic(undefined, _fields),
		updateField: (name: keyof FormData, data: FieldState) =>
			updateFieldLogic(name, data, updateFields),
	}
	return {
		control,
	}
}

export default createFormControl
