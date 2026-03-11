"use client";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserSearch, LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react";
import { User } from "@/types";

export const SignOut = ({ user, className }: {user: User, className: string}) => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className={className}>
				<div className="flex items-center gap-1.5">
					<Image
						src={user?.image || "/default.jpg"}
						alt="User profile picture"
						className="inline-block w-8 h-8 rounded-full ml-2"
						width="30"
						height="30"
					/>
					<p className="text-primary-secondary text-sm sm:text-base font-medium">
						{user?.username}
					</p>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => window.open(`https://github.com/${user.username}`, "_blank")}>
					<UserSearch/>
					GitHub Profile
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				<DropdownMenuItem onSelect={() => signOut({ redirectTo: "/" })} variant="destructive">
					<LogOutIcon/>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};