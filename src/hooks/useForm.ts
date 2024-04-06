import { useEffect, useState } from "react"
import {
	CreateFormControlProps,
	Fields,
	FieldsValues,
	FormErrors,
	FormProps,
	FormState,
	UseFormControlReturn,
	UseFormReturn,
} from "../types/form"
import createFormControl from "../utils/createFormControl.utils"
import { VALIDATION_MODE_ON_CHANGE } from "../const/const"

export const useForm = <FormData extends FieldsValues = object>(
	props?: FormProps<FormData>
): UseFormReturn<FormData> => {
	const [formState, updateFormState] = useState<FormState<FormData>>({
		isInvalid: false,
		isLoading: false,
		isTouched: false,
		isValid: false,
		isValidating: false,
		submitCount: 0,
		errors: {} as FormErrors<FormData>,
	})

	const [fields, updateFields] = useState<Fields<FormData> | object>({})
	const _props: CreateFormControlProps<FormData> = {
		...props,
		mode: props?.mode || VALIDATION_MODE_ON_CHANGE,
		withStorageMode: props?.withStorageMode || VALIDATION_MODE_ON_CHANGE,
		fields,
		updateFields,
		formState,
		updateFormState,
	}
	const [formControl, updateFormControl] = useState<
		UseFormControlReturn<FormData>
	>(createFormControl<FormData>(_props).control)
	const control = formControl

	useEffect(() => {
		updateFormControl(createFormControl<FormData>(_props).control)
	}, [fields, formState])

	return {
		control,
		...control,
	}
}
