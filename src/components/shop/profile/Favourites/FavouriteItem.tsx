'use client'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/storage/UseProductStore'
import useCartStore from '@/storage/UseCartStore'
import Image from 'next/image'
import { LiaShoppingCartSolid } from 'react-icons/lia'
import { Minus, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { ToastAction } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'

const FavouriteItem = ({
	item,
	handleRemoveFromFavourite,
	userId,
}: {
	item: Product
	handleRemoveFromFavourite: (id: number) => void
	userId: number
}) => {
	const { toast } = useToast()
	const router = useRouter()
	const [isRemoving, setIsRemoving] = useState(false)
	const [cancelTimeout, setCancelTimeout] = useState<null | (() => void)>(null)
	const { addItem, setCurrentItem, CartItems, updateItem, removeItem } =
		useCartStore()

	const handleRemoveClick = () => {
		if (isRemoving) return

		setIsRemoving(true)

		let cancel = false

		toast({
			title: 'Удаление из избранного',
			description: (
				<div className='flex flex-col'>
					<span>Этот товар будет удалён из избранного через 3 секунды.</span>
				</div>
			),
			action: (
				<ToastAction
					altText='Cancel'
					onClick={() => {
						cancel = true
						setIsRemoving(false)
						setCancelTimeout(null)
					}}
				>
					Отмена
				</ToastAction>
			),
			duration: 3000,
		})

		const timeout = setTimeout(() => {
			if (!cancel) {
				handleRemoveFromFavourite(item.id)
				toast({
					title: 'Удалено ✅',
					description: 'Товар успешно удалён из избранного.',
					duration: 1000,
				})
			}
			setIsRemoving(false)
		}, 3000)

		setCancelTimeout(() => () => {
			clearTimeout(timeout)
			setIsRemoving(false)
		})
	}

	useEffect(() => {
		return () => {
			if (cancelTimeout) cancelTimeout()
		}
	}, [cancelTimeout])

	const handleClickCard = () => {
		router.push(`/catalog/product/${item.id}`)
	}

	const handleAddToCart = () => {
		setCurrentItem({
			id: item.id,
			productId: item.id,
			price: item.price,
			userId: userId,
			quantity: 1,
			oldPrice: item.oldPrice ? item.oldPrice : undefined,
		})
		addItem()

		toast({
			title: 'Товар добавлен в корзину ✅',
			description: `Товар: ${item.name}`,
		})
	}

	const handleIncrement = () => {
		const cartItem = CartItems.find(cartItem => cartItem.productId === item.id)
		if (cartItem) {
			setCurrentItem({
				...cartItem,
				quantity: cartItem.quantity + 1,
			})
			updateItem()
		}
	}

	const handleDecrement = () => {
		const cartItem = CartItems.find(cartItem => cartItem.productId === item.id)
		if (cartItem) {
			if (cartItem.quantity > 1) {
				setCurrentItem({
					...cartItem,
					quantity: cartItem.quantity - 1,
				})
				updateItem()
			} else {
				removeItem(cartItem.productId)
				toast({
					title: 'Товар удалён из корзины ❌',
					description: `Товар: ${item.name}`,
				})
			}
		}
	}

	const isInCart = () =>
		CartItems.some(cartItem => cartItem.productId === item.id)

	const getCartItemQuantity = () => {
		const cartItem = CartItems.find(cartItem => cartItem.productId === item.id)
		return cartItem ? cartItem.quantity : 0
	}

	return (
		<Card
			className='border p-2 flex flex-col w-full shadow-sm rounded-md hover:shadow-md transition-shadow duration-200 relative cursor-pointer'
			onClick={handleClickCard}
		>
			<div onClick={e => e.stopPropagation()}>
				<Button
					size='sm'
					variant='link'
					className='text-xs absolute top-2 right-2 z-50'
					disabled={isRemoving}
					onClick={handleRemoveClick}
				>
					<FaHeart className='w-10 h-10' />
				</Button>
			</div>

			<div className='relative w-full h-32 md:h-40 rounded-md overflow-hidden bg-muted'>
				<Image
					src={Array.isArray(item.img) ? item.img[0] : item.img}
					alt={item.name}
					fill
					className='object-cover'
				/>
				<CardHeader className='absolute bottom-0 left-0 right-0 py-0 pt-2 pb-2 px-0 text-center text-primary'>
					<CardTitle className='text-lg font-semibold line-clamp-1'>
						{item.name}
					</CardTitle>
				</CardHeader>
			</div>

			<CardFooter className='mt-auto flex flex-col lg:flex-row items-center justify-between p-0 pt-2 px-2'>
				<div className='flex flex-col'>
					{item.oldPrice && item.oldPrice < item.price ? (
						<>
							<span className='text-xs font-medium line-through text-muted-foreground'>
								{item.price} ₽
							</span>
							<span className='font-bold text-primary text-sm'>
								{item.oldPrice} ₽
							</span>
						</>
					) : (
						<span className='font-bold text-primary text-sm'>
							{item.price} ₽
						</span>
					)}
				</div>
				<div onClick={e => e.stopPropagation()}>
					{isInCart() ? (
						<div className='flex items-center justify-between w-full space-x-2'>
							<Button size='sm' variant='outline' onClick={handleDecrement}>
								<Minus />
							</Button>
							<div className='text-center font-medium w-5'>
								{getCartItemQuantity()}
							</div>
							<Button size='sm' variant='outline' onClick={handleIncrement}>
								<Plus />
							</Button>
						</div>
					) : (
						<Button size='sm' variant='outline' onClick={handleAddToCart}>
							В корзину <LiaShoppingCartSolid className='ml-1 w-4 h-4' />
						</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	)
}

export default FavouriteItem
