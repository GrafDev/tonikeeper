/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@tonconnect/ui-react'],
    output: 'standalone',
}

export default nextConfig;
