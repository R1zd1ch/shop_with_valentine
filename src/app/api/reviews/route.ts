/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server'

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

// export async function GET(request?: NextRequest) {
export async function GET(request: NextRequest) {
	console.log(request)
	// console.log(apiUrl)
	// const searchParams: any = new URL(request.url)

	// const productId = searchParams.get('productId')

	// console.log(searchParams, productId)
	// const res = await fetch(`${apiUrl}/reviews/product/${productId}`)
	const res = await fetch(`${apiUrl}/reviews/`)
	return NextResponse.json(res)
	// return NextResponse.json({ message: apiUrl }, { status: 200 })
}
