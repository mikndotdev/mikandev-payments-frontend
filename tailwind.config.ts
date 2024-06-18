import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./index.html",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "node_modules/@neodyland/ui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                /*
       Theme のカスタマイズ
        以下のカラーを変更できる

        - primary: ボタンやリンクなどのアクセントカラー (default: #6200ee)
        - on-primary: primary のテキストカラー (default: #ffffff)
        - secondary: ボタンやリンクなどのセカンダリカラー (default: #03dac4)
        - on-secondary: secondary のテキストカラー (default: #000000)
        - tertiary: ボタンやリンクなどの第三カラー (default: #3cf6e7ff)
        - on-tertiary: tertiary のテキストカラー (default: #000000)
        - background: 背景色 (default: #F2F9FF)
        - on-background: background のテキストカラー (default: #0A1014)
        - surface: card や modal の背景色 (default: #ffffff)
        - on-surface: surface のテキストカラー (default: #000000)
        - outline: border の色 (default: rgba(0, 0, 0, 0.12))
        - footer: footer に関する
          - background: 背景色 (default: #0A1014)
          - text: テキストカラー (default: #F2F9FF)
          - border: border の色 (default: #1f2937)

        primary, secondary, tertiary は、各component の colorScheme で指定できる
      */
                primary: "#ff9900",
                "on-primary": "#ffffff",
                secondary: "#ff9900",
                "on-secondary": "#2d1800",
                tertiary: "#ff9900",
                "on-tertiary": "#2d1800",
                background: "#ff9900",
                "on-background": "#ffffff",
                surface: "#ff9900",
                "on-surface": "#2d1800",
                outline: "#ff9900",
                footer: {
                    background: "#2d1800",
                    text: "#ffffff",
                    border: "#ff9900",
                },
            },
        },
    },
    plugins: [require("@neodyland/ui/plugin")],
};
export default config;
