export default (
	obj: Record<string, unknown>,
	callback: (value: unknown) => boolean
) => {
	Object.values(obj).some(callback)
}
