"use client";
import React from "react";
import { signIn } from "next-auth/react";

export const SignIn: React.FC = () => {
	return (
		<div className="flex items-center gap-1.5">
			<span onClick={() => signIn("github", { redirectTo: "/Edit" })} className="text-muted-foreground hover:text-foreground hover:cursor-pointer font-medium">
                Sign In
            </span>
		</div>
	);
};