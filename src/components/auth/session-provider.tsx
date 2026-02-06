"use client";

import { SessionProvider as NextAuthSessionProvider, type SessionProviderProps } from "next-auth/react";

import Header from "../layout/header";
import Footer from "../layout/footer";

export function SessionProvider({ children, session }: SessionProviderProps) {
	return (
		<NextAuthSessionProvider session={session}>
			<Header session={session}/>
			{children}
			<Footer/>
		</NextAuthSessionProvider>
	);
}