/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useProductFormStore } from '@/storage/UseProductFormStore'
import Image from 'next/image'
import CatalogCarousel from '@/components/shop/catalog/CatalogCarousel'
import { Minus, Plus } from 'lucide-react'

const CardModel = ({
	quantity,
	isInCart,
	HandleIncrement,
	HandleDecrement,
	isOutOfStock,
	isFavourite,
	setIsFavourite,
}: {
	quantity: number | null
	isInCart: boolean
	HandleIncrement: () => void
	HandleDecrement: () => void
	isOutOfStock: boolean
	isFavourite: boolean
	setIsFavourite: (value: boolean) => void
}) => {
	const { name, price, oldPrice, img, description } = useProductFormStore()

	const product = {
		name: name || 'Название товара',
		price: price || '200000',
		oldPrice,
		img,
		description: description || 'Описание товара',
	}

	// Локальное состояние для ререндера изображений
	const [currentImages, setCurrentImages] = useState(img || [])

	// Следить за изменением массива изображений в Zustand
	useEffect(() => {
		setCurrentImages(img || [])
	}, [img])

	return (
		<Card className='relative flex flex-col p-0 rounded-lg shadow-md bg-card group transition-shadow hover:shadow-lg no-select min-h-[400px] min-w-[300px] w-full'>
			<CardHeader className='relative rounded-lg overflow-hidden p-0'>
				{/* Карусель или изображение */}
				<div onClick={e => e.stopPropagation()}>
					<Button
						size={'default'}
						variant={'link'}
						disabled={isOutOfStock}
						onClick={() => setIsFavourite(!isFavourite)}
						className={`absolute right-2 top-2 z-50 py-2 rounded-lg text-sm font-medium text-muted ${
							isFavourite
								? 'opacity-100 text-primary hover:text-primary/80'
								: 'hover:text-primary/80'
						}`}
					>
						<div>{isFavourite ? <FaHeart /> : <FaRegHeart />}</div>
					</Button>
					{currentImages.length > 1 ? (
						<CatalogCarousel product={product as any} isPreview={true} />
					) : currentImages.length === 1 ? (
						<Image
							draggable={false}
							src={currentImages[0]}
							alt={product.name}
							width={500}
							height={400}
							className='w-full h-60 object-cover'
						/>
					) : (
						<Image
							draggable={false}
							src='https://via.placeholder.com/500x400'
							alt={product.name}
							width={500}
							height={400}
							className='w-full h-60 object-cover'
						/>
					)}
				</div>
			</CardHeader>

			<CardContent className='flex-1 p-4 flex flex-col justify-between'>
				<div className='mt-2 flex flex-col text-start space-y-3 px-2 cursor-pointer'>
					<p className='text-xl font-bold text-card-foreground truncate'>
						{product.name}
					</p>
					<p className='text-sm text-muted-foreground truncate'>
						{product.description}
					</p>
					<div className='flex flex-row items-start gap-3'>
						{product.oldPrice ? (
							<>
								<p className='text-xl font-bold text-red-500'>
									{product.price.toLocaleString()} ₽
								</p>
								<p className='text-sm line-through text-muted-foreground'>
									{product.oldPrice.toLocaleString()} ₽
								</p>
							</>
						) : (
							<p className='text-xl font-bold text-card-foreground'>
								{product.price.toLocaleString()} ₽
							</p>
						)}
					</div>
				</div>
				<CardFooter
					className='p-0 flex items-end justify-center sm:flex mt-4'
					onClick={e => e.stopPropagation()}
				>
					{isInCart ? (
						<div className='rounded-lg w-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center min-h-[36px]'>
							<div className='flex items-center justify-between flex-row-reverse w-full px-4'>
								<Button size={'sm'} variant={'ghost'} onClick={HandleIncrement}>
									<Plus />
								</Button>
								<div>
									<p>{quantity}</p>
								</div>
								<Button size={'sm'} variant={'ghost'} onClick={HandleDecrement}>
									<Minus />
								</Button>
							</div>
						</div>
					) : (
						<Button
							disabled={isOutOfStock}
							onClick={HandleIncrement}
							size='sm'
							className={`py-2 rounded-lg w-full text-sm font-medium ${
								isOutOfStock
									? 'bg-muted text-muted-foreground cursor-not-allowed'
									: 'bg-primary text-primary-foreground'
							}`}
						>
							{isOutOfStock ? 'Нет в наличии' : 'В корзину'}
						</Button>
					)}
				</CardFooter>
			</CardContent>
		</Card>
	)
}

export default CardModel
