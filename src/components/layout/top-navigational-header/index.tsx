'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/app/favicon.ico';

export const TopNavigationalHeader = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isGeneratePage = pathname.includes('generate');

    return (
        <nav
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300',
                (isGeneratePage || isScrolled) ? 'bg-background shadow-sm' : 'bg-transparent',
                isGeneratePage ? 'w-[calc(100%-40px)] left-1/2 -translate-x-1/2 mt-2 rounded-lg' : '',
                'px-4 py-4')}
        >
            <div className={cn(
                'flex items-center justify-between',
                // isGeneratePage ? 'container-fluid' : 'container'
            )}>
                <Link href="/" className="flex items-center">
                    <Image
                        src={Logo}
                        alt="Piggment Logo"
                        width={120}
                        height={30}
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem asChild>
                                <Link href="/explore" className={pathname === '/explore' ? 'font-semibold' : ''}>
                                    Explore
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/generate" className={pathname === '/generate' ? 'font-semibold' : ''}>
                                    Generate Gradient
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/generate-palette" className={pathname === '/generate-palette' ? 'font-semibold' : ''}>
                                    Generate Palette
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/palette" className={pathname === '/palette' ? 'font-semibold' : ''}>
                                    Palettes
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/contrast-checker" className={pathname === '/contrast-checker' ? 'font-semibold' : ''}>
                                    Contrast Checker
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/extension" className={pathname === '/extension' ? 'font-semibold' : ''}>
                                    Chrome Extension
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/saved" className="flex items-center gap-1">
                                    <Heart className="h-4 w-4 fill-accent" />
                                    <span className={pathname === '/saved' ? 'font-semibold' : ''}>Saved</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href='/explore' className={navigationMenuTriggerStyle() + (pathname === '/explore' ? ' font-semibold' : '')}>
                                    Explore
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={cn(
                                        'transition-colors duration-200 hover:bg-accent/10 data-[state=open]:bg-accent/10',
                                        pathname.includes('generate') ? 'bg-accent/10 font-semibold' : ''
                                    )}
                                >
                                    <span className="relative">
                                        Generate
                                        {pathname.includes('generate') && (
                                            <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-primary rounded-full" />
                                        )}
                                    </span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent
                                    className="rounded-lg border-border/50 shadow-lg animate-in fade-in zoom-in-95"
                                >
                                    <ul className="grid gap-1 p-2 w-[200px]">
                                        <li>
                                            <NavigationMenuLink
                                                href="/generate"
                                                className={cn(
                                                    'px-4 py-2 rounded-md transition-colors hover:bg-accent/10',
                                                    pathname === '/generate' ? 'bg-accent/10 font-semibold' : ''
                                                )}
                                            >
                                                Generate Gradient
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink
                                                href="/generate-palette"
                                                className={cn(
                                                    'px-4 py-2 rounded-md transition-colors hover:bg-accent/10',
                                                    pathname === '/generate-palette' ? 'font-semibold' : '')}>
                                                Generate Palette
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>

                                <NavigationMenuLink
                                    href="/palette"
                                    className={navigationMenuTriggerStyle() + (pathname === '/palette' ? ' font-semibold' : '')}>
                                    Palettes
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/contrast-checker"
                                    className={navigationMenuTriggerStyle() + (pathname === '/contrast-checker' ? ' font-semibold' : '')}>
                                    Contrast Checker
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>

                                <NavigationMenuLink
                                    href="/extension"
                                    className={navigationMenuTriggerStyle() + (pathname === '/extension' ? ' font-semibold' : '')}>
                                    Chrome Extension
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/saved"
                                    className={navigationMenuTriggerStyle() + ' flex items-center gap-1' + (pathname === '/saved' ? ' font-semibold' : '')}>
                                    <Heart className="h-4 w-4 fill-accent" />
                                    Saved
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </nav>
    );
}