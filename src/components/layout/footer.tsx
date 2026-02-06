"use client"

import React from "react";
import Link from "next/link";
import packageConfig from '../../../package.json' with { type: 'json' };

const Footer: React.FC = () => {

    return (
        <footer className="border-t border-white flex justify-between items-center gap-2 text-xl mx-6 px-2 m-2 min-h-10 shadow-[0_3px_1px_-2px_#0003,_0_2px_2px_#00000024,_0_1px_5px_#0000001f] z-[19]">
            <Link href={`https://github.com/flizzermdx/ghprofiler/releases/tag/v${packageConfig.version}`} target="_blank" className="hover:text-[#FF0000]">
                v{packageConfig.version}
            </Link>
        </footer>
    );
};

export default Footer;