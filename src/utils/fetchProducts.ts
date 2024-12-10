export const getProducts = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		cache: 'no-cache',
		credentials: 'same-origin',
		mode: 'no-cors',
	})
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}
	return res.json()
}
