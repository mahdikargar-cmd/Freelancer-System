/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                bgComponent: "var(--bgComponent)",
                bgbackground:"var(--bgbackground)"
            },
            keyframes: {
                'bounce-vertical': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-40px)' }, // می‌توانید مقدار ۲۰ را تغییر دهید
                },
            },
            animation: {
                'bounce-vertical': 'bounce-vertical 2s ease-in-out infinite', // انیمیشن با مدت زمان ۲ ثانیه
            },
        },
    },
    plugins: [],
};

module.exports = config;
