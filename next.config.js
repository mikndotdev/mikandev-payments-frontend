/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        loader: "custom",
        loaderFile: "./loader.ts",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.mikn.dev",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/avatars/**",
            },
            {
                protocol: "https",
                hostname: "cdn.statically.io",
                port: "",
                pathname: "/avatars/*",
            },
            {
                protocol: "https",
                hostname: "cdn.mdusercontent.com",
                port: "",
                pathname: "/avatars/*",
            },
        ],
    },
};

module.exports = nextConfig;
