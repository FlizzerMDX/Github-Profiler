"use client";

import Link from "next/link";

import { SignIn } from "../auth/signin";
import { SignOut } from "../auth/signout";

import { User } from "@/types";
import Image from "next/image";

import MoonarrIconLight from '../../../public/moonarr-light.webp'
import MoonarrIconDark from '../../../public/moonarr-dark.webp'

const Header = ({ user }: {user: User }) =>{
    return (
        <header className="border-b border-white flex justify-between items-center gap-4 mx-6 px-2 text-xl min-h-20 p-4 z-30">
            <Link href={"/"} className="content-center text-white hover:text-hover flex gap-2">
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
            <nav>
                <Link href={"/Edit"} className="text-2xl hover:text-hover hover:cursor-pointer pl-2 ml-1 sm:block text-white hidden">
                    Edit page
                </Link>
            </nav>
            {
                user ? 
                    <SignOut user={user}/>
                    :
                    <SignIn/>
            }
        </header>
    );
};

export default Header;