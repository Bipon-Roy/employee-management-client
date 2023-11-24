/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#014F86",
                secondary: "#013A63",
            },
        },
    },
    plugins: [require("daisyui")],
};
