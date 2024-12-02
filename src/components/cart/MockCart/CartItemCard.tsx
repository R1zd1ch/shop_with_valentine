'use client'

import { FC } from 'react'
import { Card } from '../../ui/card'
import { Button } from '../../ui/button'
import { Heart, Minus, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/storage/UseProductStore'

interface CartItemCardProps {
	product: Product
	quantity: number
	onRemove?: (id: number) => void
	onIncrease?: (id: number) => void
	onDecrease?: (id: number) => void
}

const CartItemCard: FC<CartItemCardProps> = ({
	product,
	quantity,
	onRemove,
	onIncrease,
	onDecrease,
}) => {
	return (
		<Card className='flex flex-col gap-4 p-4  shadow-sm md:flex-col lg:flex-row h-full w-full'>
			{/* Изображение товара */}
			<div className='flex flex-row gap-4'>
				<div className='md:w-auto'>
					<Image
						src={product.img}
						alt={product.name}
						width={80}
						height={80}
						className='w-32 h-40 rounded-lg object-cover md:w-32'
					/>
				</div>

				{/* Основная информация */}
				<div className='flex flex-1 flex-col gap-2 '>
					<div className='flex justify-between md:items-center'>
						<p className='font-semibold text-lg truncate'>{product.name}</p>
					</div>
					<p className='text-primary font-semibold text-lg'>
						{product.price.toLocaleString()} ₽
					</p>
					<p className='text-xs text-muted-foreground lg:text-sm line-clamp-1'>
						{product.description}
					</p>
					<div className='flex flex-wrap gap-1 text-xs lg:text-sm text-muted-foreground truncate line-clamp-1'>
						<p>Категория: {product.category}</p>
						<p>Цвет: {product.color}</p>
						<p>Память: {product.memory}</p>
						<p>Совместимость: {product.compatibility}</p>
					</div>
				</div>
			</div>

			{/* Управление */}
			<div className='flex  gap-2 items-center justify-between md:flex-row lg:flex-col lg:ml-auto flex-1 lg:items-end '>
				<div className='flex  gap-2 items-center lg:mt-12'>
					<Button
						size='sm'
						variant='secondary'
						onClick={() => onDecrease?.(product.id)}
						aria-label='Уменьшить количество'
					>
						<Minus />
					</Button>
					<p className='text-sm font-medium'>{quantity}</p>
					<Button
						size='sm'
						variant='secondary'
						onClick={() => onIncrease?.(product.id)}
						aria-label='Увеличить количество'
					>
						<Plus />
					</Button>
				</div>

				<div className=' flex gap-2 md:gap-2 lg:gap-6 items-center'>
					<Button
						size='sm'
						variant='secondary'
						onClick={() => onRemove?.(product.id)}
						aria-label='Удалить из корзины'
					>
						<Heart />
					</Button>
					<Button
						size='sm'
						variant='destructive'
						onClick={() => onRemove?.(product.id)}
						aria-label='Удалить из корзины'
					>
						<Trash />
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default CartItemCard
