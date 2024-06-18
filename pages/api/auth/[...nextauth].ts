// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, profile, account, user }) {
			if (account && profile) {
				token.name = profile.name ?? profile.username;
				token.email = profile.email;
				token.picture = profile.picture;
				token.discord = profile.discord;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.sub as string;
			session.user.name = token.name as string;
			session.user.email = token.email as string;
			session.user.image = token.picture as string;
			session.user.discord = token.discord as string;
			return session;
		},
	},
	providers: [
		{
			id: "logto",
			name: "MikanDev Account",
			type: "oauth",
			wellKnown:
				"https://account.mikn.dev/oidc/.well-known/openid-configuration",
			authorization: {
				params: { scope: "openid offline_access profile email identities" },
			},
			clientId: process.env.LOGTO_CLIENT_ID,
			clientSecret: process.env.LOGTO_CLIENT_SECRET,
			client: {
				id_token_signed_response_alg: "ES384",
			},
			profile: async (profile, tokens) => {
				try {
					const userinfoResponse = await fetch(
						"https://account.mikn.dev/oidc/me",
						{
							method: "GET",
							headers: {
								Authorization: `Bearer ${tokens.access_token}`,
								"Content-Type": "application/json",
							},
						},
					);

					if (!userinfoResponse.ok) {
						console.error(
							`Failed to fetch userinfo: ${userinfoResponse.status} - ${userinfoResponse.statusText}`,
						);
						const errorDetails = await userinfoResponse.json();
						console.error("Error details:", errorDetails);
						throw new Error(
							`Failed to fetch userinfo: ${userinfoResponse.statusText}`,
						);
					}

					const userinfo = await userinfoResponse.json();
					profile.discord = userinfo.identities?.discord?.userId;
					return {
						id: profile.sub,
						name: profile.name ?? profile.username,
						email: profile.email,
						picture: profile.picture,
						discord: profile.discord,
					};
				} catch (error) {
					console.error("Error fetching userinfo:", error);
					throw new Error("Failed to fetch userinfo");
				}
			},
		},
	],
};

export default NextAuth(authOptions);
