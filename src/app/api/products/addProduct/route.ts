/* eslint-disable @typescript-eslint/no-explicit-any */
import { addProduct } from '@/utils/fetchProducts'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const product = await request.json()
		console.log('Полученные данные:', product)
		const res = await addProduct(product)
		return new NextResponse(JSON.stringify(res), { status: 201 })
	} catch (error: any) {
		console.error('Ошибка на сервере:', error)
		return new NextResponse(
			JSON.stringify({ error: `Failed to add product: ${error.message}` }),
			{ status: 500 }
		)
	}
}
