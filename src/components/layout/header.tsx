"use client";

import Link from "next/link";

import { SignIn } from "../auth/signin";
import { SignOut } from "../auth/signout";

import { User } from "@/types";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { MoonarrIconDark } from "@/services/logo";

const Header = ({ user }: {user: User }) =>{
    return (
        <header className="border-b border-white grid grid-cols-3 items-center gap-4 mx-6 px-2 text-xl min-h-20 p-4 z-30">
            <Link href={"/"} className="content-center text-white hover:text-hover flex gap-2 justify-self-start">
                <Image
                src={MoonarrIconDark.src}
                width={30}
                height={30}
                alt="Moonarr Icon"
                />
                <span>
                    Moonarr
                </span>
            </Link>
            <NavigationMenu className="justify-self-center">
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger onPointerMove={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()}>Pages</NavigationMenuTrigger>
                    <NavigationMenuContent onPointerMove={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()}>
                        <NavigationMenuLink href={"/"} className="w-22">
                            Home Page
                        </NavigationMenuLink>
                        <NavigationMenuLink href={"/edit"} className="w-22">
                            Edit Page
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {
                user ? 
                    <SignOut user={user} className={"justify-self-end"}/>
                    :
                    <SignIn className={"justify-self-end"}/>
            }
        </header>
    );
};

export default Header;