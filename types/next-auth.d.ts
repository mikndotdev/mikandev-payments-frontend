import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            discord: string;
            email: string;
            image: string;
            name: string;
            id: string;
        };
    }
    interface Profile {
        /** The user's postal address. */
        discord: string;
        email: string;
        image: string;
        picture: string;
        name: string;
        id: string;
        username: string;
    }
}
