import { FormEvent } from "react"
import {
	FieldState,
	FieldStateValues,
	FieldValues,
	FormProps,
	OnChange,
	OnSubmitHandler,
	RegisterParams,
	WithStorage,
} from "../declarations/form"
import useFormStates from "./useFormStates"
import saveToStorage from "../utils/save-to-storage.utils"
import useValidate from "./useValidate"
import useSaveToForm from "./useSaveToForm"
export const useForm = <FormData extends FieldValues>({
	withCookies,
	withLocalStorage,
	mode: propsMode,
}: FormProps<FormData>) => {
	const {
		formData,
		formState,
		mode,
		setFormData,
		setFormState,
		setFormValidate,
		formValidate,
	} = useFormStates({
		withCookies,
		mode: propsMode,
		withLocalStorage,
	})
	const { saveToForm, saveToFormData } = useSaveToForm({
		setFormData,
		setFormState,
		withCookies,
		withLocalStorage,
	})
	const { checkValidate } = useValidate<FormData>({
		formState,
		setFormState,
		formValidate,
		setFormValidate,
	})

	const getFieldsValues = (names: WithStorage<FormData>) => {
		const fieldsValues = {}
		if (names && names.length) {
			for (let i = 0; i < names.length; i++) {
				const name = names[i]
				const fs = (formData as FormData)[name]
				if (fs) (fieldsValues as FormData)[name] = fs
			}
			return fieldsValues
		} else {
			return formData
		}
	}
	const getFields = (names: WithStorage<FormData>) => {
		const fields = {}
		if (names && names.length) {
			for (let i = 0; i < names.length; i++) {
				const name = names[i]
				const fs = (formData as FormData)[name]
				if (fs) (fields as FormData)[name] = fs
			}
			return fields
		} else {
			return formState
		}
	}
	const handleSubmit = (e: FormEvent, fn: OnSubmitHandler<FormData>) => {
		fn(formData || {})
		if (mode === "onSubmit") {
			saveToStorage(
				withLocalStorage,
				withCookies,
				formData as keyof FormData,
				formData
			)
		}
		e.preventDefault()
	}
	console.log("FormState ", formState)

	const register = (name: keyof FormData, params?: RegisterParams) => {
		const value = (formData as FormData)[name]
		if (
			(formData as FormData)[name] === undefined &&
			(formState as FieldStateValues<FormData>)[name] === undefined
		)
			saveToForm({
				name,
				currentValue: value,
				formData,
				formState,
			})
		const onChange = (e: OnChange<HTMLInputElement>) => {
			const currentValue = e.currentTarget.value
			saveToForm({
				name,
				currentValue,
				formData,
				formState,
			})

			if (mode === "onChange") {
				checkValidate(name, params)
				saveToStorage(withLocalStorage, withCookies, name, {
					[name]: currentValue,
				})
			}
		}
		const onMouseEnter = () => {
			setFormState({
				...formState,
				[name]: {
					...(formState as FormData)[name],
					isHover: true,
				} as FieldState,
			})
		}
		const onMouseLeave = () => {
			setFormState({
				...formState,
				[name]: {
					...(formState as FormData)[name],
					isHover: false,
				} as FieldState,
			})
		}
		const onClick = () => {
			setFormState({
				...formState,
				[name]: {
					...(formState as FormData)[name],
					isClick: true,
				} as FieldState,
			})
		}
		const onFocus = () => {
			setFormState({
				...formState,
				[name]: {
					...(formState as FormData)[name],
					isFocus: true,
				} as FieldState,
			})
			if (mode === "onFocus") checkValidate(name, params)
		}
		const onBlur = () => {
			setFormState({
				...formState,
				[name]: {
					...(formState as FormData)[name],
					isFocus: false,
				} as FieldState,
			})
			if (mode === "onBlur") checkValidate(name, params)
		}

		return {
			onChange,
			value,
			onBlur,
			onFocus,
			onClick,
			onMouseEnter,
			onMouseLeave,
		}
	}

	const data = formData
	return {
		handleSubmit,
		register,
		data,
		getFieldsValues,
		formState,
		...formValidate,
		getFields,
	}
}
