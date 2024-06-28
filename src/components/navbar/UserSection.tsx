import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import Image from "next/image";
import {Fragment} from "react";
import Link from "next/link";
import {useAppSelector} from "@/lib/hooks";

export default function UserSection() {
    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <MenuButton
                    className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm ring-2 ring-gray-600 ring-offset-2 ring-offset-gray-800 focus:outline-none">
                    <span className="absolute -inset-1.5"/>
                    <span className="sr-only">Open user menu</span>
                    <p className="text-gray-300 m-1">{useAppSelector(state => state.user.login)}</p>
                    <Image className="h-8 w-8 rounded-full mx-1"
                           width={32}
                           height={32}
                           priority
                           src='/avatar-default.svg' alt=""/>
                </MenuButton>
            </div>
            {/*<Transition*/}
            {/*    as={Fragment}*/}
            {/*    enter="transition ease-out duration-100"*/}
            {/*    enterFrom="transform opacity-0 scale-95"*/}
            {/*    enterTo="transform opacity-100 scale-100"*/}
            {/*    leave="transition ease-in duration-75"*/}
            {/*    leaveFrom="transform opacity-100 scale-100"*/}
            {/*    leaveTo="transform opacity-0 scale-95"*/}
            {/*>*/}
            {/*    <MenuItems*/}
            {/*        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">*/}
            {/*        {userNavigation.map((item) => (*/}
            {/*            <MenuItem key={item.name}>*/}
            {/*                <Link*/}
            {/*                    href={item.href}*/}
            {/*                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"*/}
            {/*                >*/}
            {/*                    {item.name}*/}
            {/*                </Link>*/}
            {/*            </MenuItem>*/}
            {/*        ))}*/}
            {/*    </MenuItems>*/}
            {/*</Transition>*/}
        </Menu>
    )
}