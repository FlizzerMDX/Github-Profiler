"use client";

import React from "react";
import Link from "next/link";

const Header: React.FC = () =>{
    return (
        <header className="border-b border-white flex justify-between items-center gap-4 mx-6 px-2 text-xl min-h-20 shadow-[0_3px_1px_-2px_#0003,_0_2px_2px_#00000024,_0_1px_5px_#0000001f] p-4 text-black z-30">
            <div className="flex pl-2">
                <Link href={"/"} className="content-center text-white">
                    HomePage
                </Link>
                <Link href={"/"} className="text-2xl hover:text-[#FF0000] hover:cursor-pointer pl-2 ml-1 sm:block text-white hidden">
                    <h1>
                        GHProfiler
                    </h1>
                </Link>
            </div>
        </header>
    );
};

export default Header;