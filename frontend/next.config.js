const withPWA = require('next-pwa')

module.exports = withPWA({
    reactStrictMode: true,
    images: {
        domains: ['bit.ly', 'avatars.githubusercontent.com', 'eu.ui-avatars.com'],
    },
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development'
    }
})
