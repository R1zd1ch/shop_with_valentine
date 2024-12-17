import { NextResponse } from 'next/server'

export async function POST(req) {
	const clientId = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID

	if (!clientId) {
		console.error('Imgur Client ID is not set')
		return NextResponse.json(
			{ error: 'Imgur Client ID is not set' },
			{ status: 500 }
		)
	}

	try {
		const formData = await req.formData()
		const file = formData.get('image')

		if (!file) {
			console.error('No image file provided')
			return NextResponse.json(
				{ error: 'No image file provided' },
				{ status: 400 }
			)
		}

		const imgurFormData = new FormData()
		imgurFormData.append('image', file)

		const response = await fetch('https://api.imgur.com/3/upload', {
			method: 'POST',
			headers: {
				Authorization: `Client-ID ${clientId}`,
			},
			body: imgurFormData,
		})

		const data = await response.json()

		if (!response.ok) {
			console.error('Imgur upload failed:', data.data?.error)
			throw new Error(data.data?.error || 'Failed to upload image to Imgur')
		}

		console.log('Imgur upload successful:', data.data.link)
		return NextResponse.json({ link: data.data.link }, { status: 200 })
	} catch (error) {
		console.error('API Route Error:', error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
