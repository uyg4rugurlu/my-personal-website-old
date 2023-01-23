module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        plugins: [
            require("@tailwindcss/typography"),
            require("@headlessui/tailwindcss"),
            require("@headlessui/tailwindcss")({prefix: "ui"}),
        ],
    },
};
