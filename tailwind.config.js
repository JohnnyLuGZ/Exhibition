module.exports = {
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1180px',
        },
        extend: {
            borderRadius: {
                'xl': '1rem'
            }
        }
    },
    variants: {},
    plugins: [
    	require('@tailwindcss/custom-forms'),
    ]
}
