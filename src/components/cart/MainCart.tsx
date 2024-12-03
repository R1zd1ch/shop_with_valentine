'use client'
import CartRightSide from './CartRightSide'
import CartItems from './CartItems'
import { useState } from 'react'

const itemsData = [
	{ id: 1, name: 'iPhone 15 Pro Max', price: 129990, quantity: 1 },
	{ id: 2, name: 'MacBook Pro 14" M2', price: 199990, quantity: 1 },
	{ id: 3, name: 'Apple Watch Series 9', price: 45990, quantity: 2 },
	{
		id: 4,
		name: 'AirPods Pro (2-го поколения)',
		price: 24990,
		quantity: 1,
		discountPrice: 21990,
	},
	{ id: 5, name: 'iPad Pro 11" M2', price: 99990, quantity: 1 },
]

const MainCart = () => {
	const [items, setItems] = useState(itemsData)

	const handleRemoveItem = (id: number) => {
		setItems(items.filter(item => item.id !== id))
	}

	const IncItem = (id: number) => {
		setItems(
			items.map(item => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 }
				}
				return item
			})
		)
	}

	const DecItem = (id: number) => {
		setItems(
			items
				.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 }
					}
					return item
				})
				.filter(item => item.quantity > 0)
		)
	}

	return (
		<div className='w-full max-w-screen-2xl mx-auto'>
			<div className='flex flex-col md:flex-row md:mx-[100px] gap-6'>
				{/* Левая часть: CartItems */}
				<div className='flex-1'>
					<CartItems
						items={items}
						onRemoveItem={handleRemoveItem}
						onIncItem={IncItem}
						onDecItem={DecItem}
					/>
				</div>

				{/* Правая часть: CartRightSide */}
				<div className='w-full md:w-[30%]'>
					<CartRightSide
						cartItems={items.map(item => ({
							price: item.price,
							discountPrice: item.discountPrice,
							quantity: item.quantity,
						}))}
					/>
				</div>
			</div>
		</div>
	)
}

export default MainCart
