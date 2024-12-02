'use client'
import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'

interface CartItem {
	id: number
	name: string
	price: number
	quantity: number
}

interface CartItemsProps {
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
}) => {
	const totalItems = items.reduce((total, item) => total + item.quantity, 0)

	return (
		<Card className='min-h-[400px] max-h-[400px] md:min-h-screen md:max-h-screen '>
			<CardHeader className='flex justify-between flex-row'>
				<CardTitle>Ваша корзина</CardTitle>
				<p>Всего товаров: {totalItems}</p>
			</CardHeader>
			<CardContent className='overflow-y-auto max-h-[320px] md:max-h-[88.5vh]'>
				{items.length === 0 ? (
					<p className='text-muted-foreground'>Ваша корзина пуста</p>
				) : (
					<ul className='space-y-4'>
						{items.map(item => (
							<Card
								key={item.id}
								className='flex justify-between items-center p-4'
							>
								<div>
									<p className='font-semibold'>{item.name}</p>
									<p className='text-sm text-muted-foreground'>
										Количество: {item.quantity} × {item.price} руб.
									</p>
								</div>
								<div className='flex gap-2'>
									<Button
										variant='secondary'
										size='sm'
										onClick={() => onIncItem?.(item.id)}
									>
										<Plus />
									</Button>
									<Button
										variant='secondary'
										size='sm'
										onClick={() => onDecItem?.(item.id)}
									>
										<Minus />
									</Button>

									<Button
										variant='destructive'
										size='sm'
										onClick={() => onRemoveItem?.(item.id)}
									>
										Удалить
									</Button>
								</div>
							</Card>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	)
}

export default CartItems
