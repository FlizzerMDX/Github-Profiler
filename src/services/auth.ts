import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { Profile } from "@/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string,
            authorization: { params: { scope: 'user:email repo' } }
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.account = account;
                token.profile = profile;
            }
            return token;
        },
        async session({ session, token }) {
            const profile: Profile = token?.profile as Profile;
            return {
                ...session,
                user: {...session.user, username: profile?.login},
                accessToken: token.accessToken,
            };
        },
    },
})