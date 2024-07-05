import { Menu } from '@headlessui/react'
import Link from 'next/link'

export default function GuestSection() {
	return (
		<Menu as='div' className='relative ml-3'>
			<Link
				href={'/login'}
				passHref
				className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 mx-1 text-sm font-medium'
			>
				Sign In
			</Link>
			<Link
				href={'/signup'}
				passHref
				className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 mx-1 text-sm font-medium'
			>
				Sign Up
			</Link>
		</Menu>
	)
}
