import NextAuth from "@/node_modules/next-auth/index";
import { Account, User as AuthUser } from "@/node_modules/next-auth/index";
import CredentialsProvider from "@/node_modules/next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import { SubresourceIntegrityPlugin } from "@/node_modules/next/dist/build/webpack/plugins/subresource-integrity-plugin";

export const authOptions: any = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: {label: "Password", type:"password"},
            },
            async authorize(credentials: any) {
                await connect();
                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isPasswordCorrect) {
                            return user;
                        } 
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: AuthUser; account: Account }) {
            if (account?.provider == "credentials") {
                return true;
            }
        },
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
