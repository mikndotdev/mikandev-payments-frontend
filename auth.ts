import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, profile, account, user }) {
            if (account && profile) {
                token.id = profile.sub;
                token.name = profile.name ?? profile.username;
                token.email = profile.email;
                token.picture = profile.picture;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.image = token.picture as string;
            return session;
        },
    },
    providers: [
        {
            id: "logto",
            name: "MikanDev Account",
            type: "oidc",
            issuer: "https://auth.mikandev.com/oidc",
            authorization: {
                params: {
                    scope: "openid offline_access profile email identities",
                },
            },

            clientId: process.env.LOGTO_CLIENT_ID,
            clientSecret: process.env.LOGTO_CLIENT_SECRET,
            client: {
                id_token_signed_response_alg: "ES384",
            },
            token: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name ?? profile.username,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        },
    ],
});
