module.exports = {
    mode: 'jit',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#222222',
                'secondary': '#4B4B4B',
                'gray-2': '#525252',
                'gray-1': '#313131',
                'lightGrey': '#9D9D9D',
                'turquoise': '#27E0A6',
                'offWhite': '#EFEFEF',
            },
            boxShadow: {
                'active': '0px 0px 10px -3px #27E0A6;',
            }
        },
        fontFamily: {
            'sans': 'poppins'
        }
    },
    plugins: [],
}
