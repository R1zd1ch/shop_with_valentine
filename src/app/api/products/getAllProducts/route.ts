import { getProducts } from '@/utils/fetchProducts'
import { NextResponse } from 'next/server'

export async function GET() {
	const res = await getProducts()
	return new NextResponse(JSON.stringify(res), { status: 200 })
}
