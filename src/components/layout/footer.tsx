"use client"

import React from "react";
import Link from "next/link";
import packageConfig from '../../../package.json' with { type: 'json' };
import { Github } from "lucide-react";

const Footer: React.FC = () => {

    return (
        <footer className="border-t border-white flex justify-center items-center gap-4 text-xl mx-6 px-2 m-2 min-h-10 z-[19]">
            <div>
                <Link href={`https://github.com/flizzermdx/moonarr`} target="_blank" className="hover:text-hover">
                    <Github />
                </Link>
            </div>
            <span>
                Made with ♥ by{" "}
                <Link href={`https://github.com/FlizzerMDX`} target="_blank" className="hover:text-hover">
                    FlizzerMDX
                </Link>
            </span>
            <Link href={`https://github.com/flizzermdx/moonarr/releases/tag/v${packageConfig.version}`} target="_blank" className="hover:text-hover">
                v{packageConfig.version}
            </Link>
        </footer>
    );
};

export default Footer;