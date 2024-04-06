import { FormEvent } from "react"

import getFieldsLogic from "./getFields.utils"
import getFieldsValuesLogic from "./getFieldsValues.utils"
import getDefaultField from "./getDefaultField.utils"
import { VALIDATION_MODE_ON_CHANGE } from "../const/const"
import validate from "./validate.utils"
import { RegisterParams } from "../types/register"
import {
	CreateFormControlProps,
	Fields,
	FieldsValues,
	UseFormControlReturn,
} from "../types/form"
import { OnSubmitHandler } from "../types/submit"
import { ArrayRecord, OnChange } from "../types/types"
import set from "../scripts/set"
import get from "../scripts/get"
import isNullOrUndefined from "../scripts/isNullOrUndefined"
import saveToStorage from "./saveToStorage.utils"
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

	const updateValidate = (isInvalid: boolean, isValid: boolean) => {
		if (isInvalid) {
			updateFormState(state => ({
				...state,
				isValid: false,
				isInvalid: true,
			}))
		} else if (isValid && formState.isInvalid) {
			updateFormState(state => ({
				...state,
				isValid: true,
				isInvalid: false,
			}))
		}
	}
	const formValidate = () => {
		updateFormState(state => ({
			...state,
			isValidating: true,
		}))

		for (let key in fields) {
			const field = (fields as Fields<FormData>)[key]
			const { isInvalid, isValid, newField } = validate({
				field,
				params: field.params,
			})

			updateValidate(isInvalid, isValid)
			set<Fields<FormData>>(_fields, key, newField)
			if (isInvalid) {
				updateFormState(state => ({
					...state,
					errors: { ...state.errors, [key]: newField.error?.message },
				}))
			} else {
				updateFormState(state => ({
					...state,
					errors: { ...state.errors, [key]: undefined },
				}))
			}
		}

		updateFormState(state => ({
			...state,
			isValidating: false,
		}))
	}
	const handleSubmit = (e: FormEvent, fn: OnSubmitHandler<FormData>) => {
		updateFormState(state => ({
			...state,
			isLoading: true,
		}))
		let names: ArrayRecord<FormData> = [] as ArrayRecord<FormData>
		formValidate()
		for (let key in fields) names && names.push(key)
		fn({ ...getFieldsValuesLogic(names, _fields) })

		updateFormState(state => ({
			...state,
			submitCount: state.submitCount + 1,
			isLoading: false,
		}))

		e.preventDefault()
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
				updateValidate(isInvalid, isValid)
				if (isInvalid) {
					updateFormState(state => ({
						...state,
						errors: {
							...state.errors,
							[name]: newField.error?.message,
						},
					}))
				} else {
					updateFormState(state => ({
						...state,
						errors: { ...state.errors, [name]: undefined },
					}))
				}
			}
			if (mode === VALIDATION_MODE_ON_CHANGE) {
				const { isInvalid, isValid, newField } = validate({
					field: _fields[name],
					params,
				})
				set<Fields<FormData>>(_fields, name, newField)
				updateFields(prev => ({ ...prev, ..._fields }))
				updateValidate(isInvalid, isValid)
				if (isInvalid) {
					updateFormState(state => ({
						...state,
						errors: { ...state.errors, [name]: newField.error?.message },
					}))
				} else {
					updateFormState(state => ({
						...state,
						errors: { ...state.errors, [name]: undefined },
					}))
				}
			}
			if (withStorageMode === VALIDATION_MODE_ON_CHANGE) {
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
		}
	}
	const control: UseFormControlReturn<FormData> = {
		register,
		handleSubmit,
		getFields: (names: ArrayRecord<FormData>) => getFieldsLogic(names, _fields),
		getFieldsValues: (names: ArrayRecord<FormData>) =>
			getFieldsValuesLogic(names, _fields),
		formState,
		fields: fields as Fields<FormData>,
		fieldsValues: getFieldsValuesLogic(undefined, _fields),
	}
	return {
		control,
	}
}

export default createFormControl
