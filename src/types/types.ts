import { ChangeEvent } from "react"
import { FieldsValues } from "./form"

export type StateFunction<T> = React.Dispatch<React.SetStateAction<T>>
export type OnChange<T> = ChangeEvent<T>
export type Nullable<T> = { [P in keyof T]: T[P] | null }
export type ObjectType<T, K = string> = { [P in keyof T]: K }
export type Optional<T> = Partial<T>
export type ArrayRecord<T extends FieldsValues = object> =
	| (keyof T)[]
	| undefined
