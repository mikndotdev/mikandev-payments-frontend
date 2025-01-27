import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./index.html",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#ff9900",
                    secondary: "#ff7700",
                },
            },
        ],
    },
    theme: {
        extend: {
            colors: {
                primary: "#ff9900",
                "on-primary": "#ffffff",
                secondary: "#ff7700",
                "on-secondary": "#ffffff",
            },
            animation: {
                marquee: "marquee var(--duration) linear infinite",
                "marquee-vertical":
                    "marquee-vertical var(--duration) linear infinite",
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "marquee-vertical": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
            },
        },
    },
    plugins: [require("daisyui")],
};
export default config;