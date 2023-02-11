/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps: false,
    webpack(config, options) {
        if (options.isServer) {
            config.devtool = 'hidden-source-map';
        }
        return config;
    }
};

module.exports = nextConfig;
