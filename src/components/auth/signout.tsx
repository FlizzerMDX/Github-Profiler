"use client";
import React from "react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export const SignOut: React.FC = ({ user }) => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger>
				<div className="flex items-center gap-1.5">
					<Image
						src={user?.image || "/default.jpg"}
						alt="User profile picture"
						className="inline-block w-8 h-8 rounded-full ml-2"
						width="30"
						height="30"
					/>
					<p className="text-primary-secondary text-sm sm:text-base font-medium">
						{user?.name}
					</p>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => signOut({ redirectTo: "/" })}>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};