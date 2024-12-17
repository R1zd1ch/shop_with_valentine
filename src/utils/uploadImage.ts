/* eslint-disable @typescript-eslint/no-explicit-any */
export async function uploadToImgur(imageBase64: string) {
	const clientId = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID

	if (!clientId) {
		throw new Error('IMGUR_CLIENT_ID is not set')
	}

	try {
		const response = await fetch('https://api.imgur.com/3/image', {
			method: 'POST',
			headers: {
				Authorization: `Client-ID ${clientId}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ image: imageBase64 }),
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.data?.error || 'Failed to upload image')
		}

		return data.data // Возвращаем данные загруженного изображения
	} catch (error: any) {
		throw new Error(error.message || 'Error uploading image')
	}
}

export default uploadToImgur
