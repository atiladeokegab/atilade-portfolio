'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'

interface MenuItem {
    name: string;
    href: string;
}

const menuItems: MenuItem[] = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: 'https://linkedin.com/in/atiladeoke' },
]

const profileImage = '/profile-icons/profile-icon.jpeg';

export const Header = () => {
    const [menuState, setMenuState] = React.useState(false)

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0">
                        <div className="flex w-full justify-between items-center lg:w-auto">
                            <div className="flex items-center space-x-2 text-base font-semibold tracking-tight text-gray-900">
                                <Link href="/" aria-label="home">
                                    <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-md">
                                        <Image
                                            src={profileImage}
                                            alt="Atilade Gabriel Oke"
                                            width={44}
                                            height={44}
                                            className="h-full w-full object-cover object-top"
                                        />
                                    </div>
                                </Link>
                                <Link href="/" className="inline-flex min-h-11 items-center active:scale-[0.97] transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Atilade Oke
                                </Link>
                            </div>

                            <div className="flex items-center gap-3 lg:hidden">
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -mr-4 block cursor-pointer p-2.5">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <NavigationMenu>
                                <NavigationMenuList className="flex gap-2 text-sm">
                                    {menuItems.map((item, index) => (
                                        <NavigationMenuItem key={index}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground group inline-flex h-11 w-max items-center justify-center rounded-md bg-transparent px-4 text-base! font-medium transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground flex min-h-11 items-center duration-150"
                                                onClick={() => setMenuState(false)}
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit items-center flex-nowrap">
                                <a
                                    href="mailto:okeatilade@gmail.com"
                                    className="inline-flex h-11 items-center rounded-md bg-gray-900 px-4 text-base font-medium text-white transition-colors hover:bg-gray-700"
                                >
                                    Email me
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
