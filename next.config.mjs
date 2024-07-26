/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'static.vecteezy.com',
				port: '',
				pathname: '/**'
			}
		]
	}
}

export default nextConfig
