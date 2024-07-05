'use client'

import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks'
import UserSection from '@/components/navbar/UserSection'
import GuestSection from '@/components/navbar/GuestSection'

export default function Navbar() {
	const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Music', href: '#' }
	]

	return (
		<div className='bg-main-dark pb-40'>
			<Disclosure as='nav' className='bg-secondary'>
				{({ open }) => (
					<>
						<div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
							<div className='border-b border-main-white bg-secondary'>
								<div className='flex h-16 items-center justify-between px-4 sm:px-0'>
									<div className='flex items-center'>
										<div className='flex-shrink-0'>
											<Image
												className='h-8 w-8'
												src='/mark.svg'
												alt='Your Company'
												width={32}
												height={32}
												priority
											/>
										</div>
										<div className='hidden md:block'>
											<div className='ml-10 flex items-baseline space-x-4'>
												{navigation.map(item => (
													<Link
														key={item.name}
														href={item.href}
														className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
													>
														{item.name}
													</Link>
												))}
											</div>
										</div>
									</div>
									<div className='hidden md:block'>
										<div className='ml-4 flex items-center md:ml-6'>
											{/* Profile dropdown */}
											{isLoggedIn ? (
												<UserSection />
											) : (
												<GuestSection />
											)}
										</div>
									</div>
									{/*<div className="-mr-2 flex md:hidden">*/}
									{/*    /!* Mobile menu button *!/*/}
									{/*    <DisclosureButton*/}
									{/*        className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">*/}
									{/*        <span className="absolute -inset-0.5"/>*/}
									{/*        <span className="sr-only">Open main menu</span>*/}
									{/*        {open ? (*/}
									{/*            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>*/}
									{/*        ) : (*/}
									{/*            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>*/}
									{/*        )}*/}
									{/*    </DisclosureButton>*/}
									{/*</div>*/}
								</div>
							</div>
						</div>
					</>
				)}
			</Disclosure>
			{/*<header className='py-10'>*/}
			{/*	<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>*/}
			{/*		<h1 className='text-3xl font-bold tracking-tight text-white'>*/}
			{/*			Dashboard*/}
			{/*		</h1>*/}
			{/*	</div>*/}
			{/*</header>*/}
		</div>
	)
}
