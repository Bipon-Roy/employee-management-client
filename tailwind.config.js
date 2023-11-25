/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#014F86",
                secondary: "#013A63",
                mainText: "#001524",
                mainBg: "#EEF5F9",
            },
        },
    },
    plugins: [require("daisyui")],
};
