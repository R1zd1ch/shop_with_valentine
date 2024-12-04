'use client'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Product } from '@/storage/UseProductStore'
import Image from 'next/image'
import { LiaShoppingCartSolid } from 'react-icons/lia'
import { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { ToastAction } from '@/components/ui/toast'

const FavouriteItem = ({
	item,
	handleRemoveFromFavourite,
}: {
	item: Product
	handleRemoveFromFavourite: (id: number) => void
}) => {
	const { toast } = useToast()
	const [isRemoving, setIsRemoving] = useState(false)
	const [progress, setProgress] = useState(100)
	const [cancelTimeout, setCancelTimeout] = useState<null | (() => void)>(null)

	const handleRemoveClick = () => {
		if (isRemoving) return

		setIsRemoving(true)
		setProgress(100)

		let cancel = false

		toast({
			title: 'Удаление из избранного',
			description: (
				<div className='flex flex-col'>
					<span>Этот товар будет удалён из избранного через 5 секунд.</span>
					<Progress value={progress} className='mt-2 w-full' />
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
			duration: 5000,
		})

		const interval = setInterval(() => {
			setProgress(prev => {
				if (prev <= 0) {
					clearInterval(interval)
					return 0
				}
				return prev - 20
			})
		}, 1000)

		const timeout = setTimeout(() => {
			if (!cancel) {
				handleRemoveFromFavourite(item.id)
				toast({
					title: 'Удалено ✅',
					description: 'Товар успешно удалён из избранного.',
				})
			}
			setIsRemoving(false)
			setProgress(100)
		}, 5000)

		setCancelTimeout(() => () => {
			clearTimeout(timeout)
			clearInterval(interval)
			setIsRemoving(false)
			setProgress(100)
		})
	}

	useEffect(() => {
		return () => {
			if (cancelTimeout) cancelTimeout()
		}
	}, [cancelTimeout])

	return (
		<Card className='border p-2 flex flex-col w-full shadow-sm rounded-md hover:shadow-md transition-shadow duration-200 relative'>
			{/* Кнопка удаления */}
			<Button
				size='sm'
				variant='link'
				className='text-xs absolute top-2 right-2 z-50'
				disabled={isRemoving}
				onClick={handleRemoveClick}
			>
				<FaHeart className='w-10 h-10' />
			</Button>

			{/* Изображение товара */}
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

			{/* Информация о товаре */}
			<CardFooter className='mt-auto flex flex-col lg:flex-row items-center justify-between p-0 pt-2 px-2'>
				<div className='flex flex-col'>
					{item.discountPrice && item.discountPrice < item.price ? (
						<>
							<span className='text-xs font-medium line-through text-muted-foreground'>
								{item.price} ₽
							</span>
							<span className='font-bold text-primary text-sm'>
								{item.discountPrice} ₽
							</span>
						</>
					) : (
						<span className='font-bold text-primary text-sm'>
							{item.price} ₽
						</span>
					)}
				</div>
				<Button size='sm' variant='outline' className='text-xs'>
					В корзину <LiaShoppingCartSolid className='ml-1 w-4 h-4' />
				</Button>
			</CardFooter>
		</Card>
	)
}

export default FavouriteItem
