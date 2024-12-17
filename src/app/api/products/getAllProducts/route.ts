/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProducts } from '@/utils/fetchProducts'
import { NextResponse } from 'next/server'

// Обработчик для получения списка продуктов (GET)
export async function GET() {
	try {
		const res = await getProducts()
		return new NextResponse(JSON.stringify(res), { status: 200 })
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({ error: `Failed to fetch products ${error}` }),
			{ status: 500 }
		)
	}
}
