

module.exports = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.grilld.com.au',
        port: '',
        pathname: '/images/**'
      }
    ]
  }
}