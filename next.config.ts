import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://shopapi-h5u6.onrender.com/shop_api/v1/:path*',
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
			},
			{
				protocol: 'https',
				hostname: 'aoxtcavlbnnrjlsohgnz.supabase.co',
			},
		],
	},
}

export default nextConfig
