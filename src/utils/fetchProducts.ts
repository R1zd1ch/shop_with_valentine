/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const addProduct = async (product: any) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/products/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				cache: 'no-cache',
				credentials: 'same-origin',
				mode: 'no-cors',
				body: JSON.stringify(product),
			}
		)

		if (response.ok) {
			const result = await response.text()
			console.log('Ответ от внешнего API:', result)
			return result
		} else {
			throw new Error(`Ошибка при добавлении продукта: ${response.statusText}`)
		}
	} catch (error) {
		console.error('Ошибка сети:', error)
		throw error
	}
}
