import { Input } from '@headlessui/react'
import { clsx } from 'clsx'

export default function InputFieldUI({
	nameField,
	secret,
	required
}: {
	nameField: string
	secret: boolean
	required: boolean
}) {
	return (
		<Input
			type={secret ? 'password' : 'text'}
			className={clsx(
				'mt-3 block w-full rounded-lg border-none bg-white/10 py-1.5 px-3 text-sm/6 text-white',
				'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
			)}
			name={nameField}
			required={required}
		/>
	)
}
