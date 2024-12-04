'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

type Purchase = {
	id: number
	productName: string
	date: string
	price: number
	status: string
}

export default function PurchaseHistory() {
	const [purchases, setPurchases] = useState<Purchase[]>([])
	const [loading, setLoading] = useState(true)

	// Имитация загрузки данных
	useEffect(() => {
		// Здесь можно использовать fetch/axios для получения данных с API
		const timer = setTimeout(() => {
			setPurchases([
				{
					id: 1,
					productName: 'Золотое кольцо',
					date: '2024-11-01',
					price: 12000,
					status: 'Доставлено',
				},
				{
					id: 2,
					productName: 'Серебряный браслет',
					date: '2024-10-15',
					price: 7000,
					status: 'В пути',
				},
				{
					id: 3,
					productName: 'Серебряный браслет',
					date: '2024-10-15',
					price: 7000,
					status: 'В пути',
				},
				{
					id: 4,
					productName: 'Серебряный браслет',
					date: '2024-10-15',
					price: 7000,
					status: 'В пути',
				},
			])
			setLoading(false)
		}, 2000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<Card className='space-y-4  lg:max-h-[75vh] lg:min-h-[75vh]'>
			<CardHeader className='text-2xl font-semibold'>
				<CardTitle>История покупок</CardTitle>
			</CardHeader>
			<CardContent className='overflow-y-auto max-h-[65vh] space-y-4'>
				{loading ? (
					<div className='space-y-4'>
						<Skeleton className='h-24 w-full' />
						<Skeleton className='h-24 w-full' />
						<Skeleton className='h-24 w-full' />
					</div>
				) : purchases.length > 0 ? (
					purchases.map(purchase => (
						<Card key={purchase.id} className='border '>
							<CardHeader className='flex justify-between flex-row'>
								<div className='flex flex-col  justify-center gap-1'>
									<h3 className='text-lg font-medium'>
										{purchase.productName}
									</h3>
									<span className='text-sm text-muted-foreground'>
										{purchase.date}
									</span>
								</div>
								<span
									className={`text-sm font-medium mr-2 ${
										purchase.status === 'Доставлено'
											? 'text-green-600'
											: 'text-yellow-600'
									}`}
								>
									{purchase.status}
								</span>
							</CardHeader>

							<CardContent className='flex justify-between items-center '>
								<p className='text-primary font-semibold'>{purchase.price} ₽</p>
								<Button variant='secondary' className='' size='sm'>
									Подробнее
								</Button>
							</CardContent>
						</Card>
					))
				) : (
					<p className='text-center text-muted'>Покупок пока нет.</p>
				)}
			</CardContent>
		</Card>
	)
}
