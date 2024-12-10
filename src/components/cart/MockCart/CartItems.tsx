'use client'

import { FC, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import CartItemCard from './CartItemCard'
import useProductStore from '@/storage/UseProductStore'

interface CartItem {
	id: number
	productId: number
	quantity: number
	price: number
	oldPrice?: number // Скидочная цена товара
}

interface CartItemsProps {
	userId: number
	items: CartItem[]
	onRemoveItem?: (id: number) => void
	onIncItem?: (id: number) => void
	onDecItem?: (id: number) => void
}

const CartItems: FC<CartItemsProps> = ({
	items = [],
	onRemoveItem,
	onIncItem,
	onDecItem,
	userId,
}) => {
	const { products, fetchProducts } = useProductStore()

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	// Общее количество товаров
	const totalItems = items.reduce((total, item) => total + item.quantity, 0)

	return (
		<Card className='min-h-[400px] max-h-[94vh] md:min-h-screen md:max-h-screen'>
			<CardHeader className='flex justify-between flex-row'>
				<CardTitle>Ваша корзина</CardTitle>
				<p>Всего товаров: {totalItems}</p>
			</CardHeader>
			<CardContent className='overflow-y-auto max-h-[88vh] md:max-h-[88.5vh] px-0 md:px-4'>
				{items.length === 0 ? (
					<p className='text-muted-foreground'>Ваша корзина пуста</p>
				) : (
					<ul className='space-y-4'>
						{items.map(item => {
							const product = products.find(p => p.id === item.productId)
							if (!product) return null // Пропускаем, если продукт не найден

							return (
								<CartItemCard
									key={item.id}
									product={product}
									quantity={item.quantity}
									onRemove={onRemoveItem}
									onIncrease={onIncItem}
									onDecrease={onDecItem}
									userId={userId}
								/>
							)
						})}
					</ul>
				)}
			</CardContent>
		</Card>
	)
}

export default CartItems
