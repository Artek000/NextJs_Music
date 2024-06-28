'use client'

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import {clsx} from "clsx";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useAppSelector} from "@/lib/hooks";
import UserSection from "@/components/navbar/UserSection";

export default function Navbar() {
    const user = {
        name: useAppSelector(state => state.user.login),
        email: 'tom@example.com',
        imageUrl:
            '/avatar-default.svg',
    }
    const navigation = [
        {name: 'Dashboard', href: '#', current: true},
        {name: 'Team', href: '#', current: false},
        {name: 'Projects', href: '#', current: false},
        {name: 'Calendar', href: '#', current: false},
        {name: 'Reports', href: '#', current: false},
    ]
    const userNavigation = [
        {name: 'Your Profile', href: '#'},
        {name: 'Settings', href: '#'},
        {name: 'Sign out', href: '#'},
    ]

    return (
        <div className="bg-gray-800 pb-32">
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="border-b border-gray-700">
                                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Image
                                                className="h-8 w-8"
                                                src="/mark.svg"
                                                alt="Your Company"
                                                width={32}
                                                height={32}
                                                priority
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={clsx(
                                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium')}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* Profile dropdown */}
                                            <UserSection />
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <DisclosureButton
                                            className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5"/>
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                            )}
                                        </DisclosureButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="border-b border-gray-700 md:hidden">
                            <div className="space-y-1 px-2 py-3 sm:px-3">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as={Link}
                                        href={item.href}
                                        className={clsx(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <Image className="h-10 w-10 rounded-full" priority width={32} height={32} src={user.imageUrl} alt=""/>
                                    </div>
                                    <div className="ml-3">
                                        <div
                                            className="text-base font-medium leading-none text-white">{user.name}</div>
                                        <div
                                            className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as={Link}
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <header className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                </div>
            </header>
        </div>
    )
}