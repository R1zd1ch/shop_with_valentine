import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card'
import { Button } from '../../ui/button'
import Image from 'next/image'
import useCartStore from '@/storage/UseCartStore'
import { Minus, Plus } from 'lucide-react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import CatalogCarousel from './CatalogCarousel'
import { Product } from '@/storage/UseProductStore'
import useFavouritesStore from '@/storage/UseFavourites'
import Link from 'next/link'
import { ToastAction } from '../../ui/toast'

const DURATION_TIME = 2000

const ProductCard = ({ product }: { product: Product }) => {
	const router = useRouter()
	const isOutOfStock = product.stockQuantity === 0

	const { addItem, setCurrentItem, CartItems, updateItem, removeItem } =
		useCartStore()
	const {
		addFavourite,
		removeFavouriteByUserAndProduct,
		isFavouriteByUserAndProduct,
	} = useFavouritesStore()
	const userId = 1
	const { toast } = useToast()

	const handleAddToCart = () => {
		setCurrentItem({
			id: product.id,
			productId: product.id,
			price: product.price,
			userId: userId,
			quantity: 1,
			oldPrice: product.oldPrice ? product.oldPrice : undefined,
		})
		addItem()

		toast({
			title: 'Товар добавлен в корзину ✅',
			description: `Товар: ${product.name}`,
			duration: DURATION_TIME,
		})
	}

	const handleIncrement = () => {
		const item = CartItems.find(i => i.id === product.id)
		if (item) {
			setCurrentItem({
				...item,
				quantity: item.quantity + 1,
			})
			updateItem()
			console.log(CartItems)
		} else {
			console.log('Item not found in cart')
		}
	}

	const handleDecrement = () => {
		const item = CartItems.find(i => i.id === product.id)
		if (item) {
			const newQuantity = item.quantity - 1
			if (newQuantity > 0) {
				setCurrentItem({
					...item,
					quantity: newQuantity,
				})
				updateItem()
			} else {
				removeItem(product.id)
				toast({
					title: 'Товар удален из корзины ❌',
					description: `Товар: ${product.name}`,
					duration: DURATION_TIME,
				})
			}
		}
	}

	const isInCart = () => {
		const cartItems = useCartStore.getState().CartItems
		return cartItems.some(item => item.productId === product.id)
	}

	const handlePageCard = () => {
		router.push(`/catalog/product/${product.id}`)
	}

	const handleAddToFavourite = () => {
		addFavourite({
			id: Date.now(),
			productId: product.id,
			userId: userId,
		})
		toast({
			title: 'Товар добавлен в избранное ✅',
			description: (
				<Link href={`/profile/${userId}/favorites`}>Товар: {product.name}</Link>
			),
			action: (
				<ToastAction altText='Перейти в избранное'>
					<Link href={`/profile/${userId}/favorites`}>В избранное</Link>
				</ToastAction>
			),
			duration: DURATION_TIME,
		})
	}

	const handleRemoveFromFavourite = () => {
		removeFavouriteByUserAndProduct(1, product.id)
		toast({
			title: 'Товар удален из избранного ❌',
			description: `Товар: ${product.name}`,
			duration: DURATION_TIME,
		})
	}

	const isFavourite = isFavouriteByUserAndProduct(1, product.id)

	return (
		<Card
			className='relative flex flex-col p-0 rounded-lg shadow-md bg-card group transition-shadow hover:shadow-lg no-select '
			onClick={handlePageCard} // Переход при клике на карточку
		>
			<CardHeader className='relative rounded-lg overflow-hidden p-0'>
				{/* Карусель или изображение */}
				<div
					className=''
					onClick={e => e.stopPropagation() /* Останавливаем всплытие */}
				>
					<Button
						size={'default'}
						variant={'link'}
						disabled={isOutOfStock}
						onClick={
							isFavourite ? handleRemoveFromFavourite : handleAddToFavourite
						}
						className={`absolute right-2 top-2 z-50 py-2 rounded-lg text-sm font-medium text-muted  ${
							isFavourite
								? ' opacity-100 text-primary hover:text-primary/80'
								: 'hover:text-primary/80'
						}`}
					>
						<div>{isFavourite ? <FaHeart /> : <FaRegHeart />}</div>
					</Button>
					{product.img ? (
						typeof product.img === 'string' ? (
							<Image
								draggable={false}
								src={product.img || 'https://via.placeholder.com/400x300'} // Проверка на наличие строки изображения
								alt={product.name}
								width={400}
								height={300}
								className='w-full h-40 object-cover'
							/>
						) : (
							<CatalogCarousel product={product} />
						)
					) : (
						// Если изображения нет вообще, показываем изображение по умолчанию
						<Image
							draggable={false}
							src='https://via.placeholder.com/400x300' // Default image
							alt={product.name}
							width={400}
							height={300}
							className='w-full h-40 object-cover'
						/>
					)}
				</div>
			</CardHeader>

			<CardContent className='p-2 '>
				<div className='mt-1 flex flex-col text-start space-y-2 px-2 cursor-pointer'>
					<p className='text-lg font-bold text-card-foreground truncate'>
						{product.name}
					</p>
					<p className='text-xs text-muted-foreground truncate'>
						{product.description}
					</p>
					<div className='flex flex-row  items start gap-2'>
						<p className='text-base font-bold text-card-foreground '>
							{product.oldPrice ? (
								<span className='text-red-500 text-lg'>
									{product.oldPrice.toLocaleString()} ₽
								</span>
							) : (
								product.price.toLocaleString() + ' ₽'
							)}{' '}
						</p>
						{product.oldPrice && (
							<p className='text-xs line-through text-muted-foreground'>
								{product.price.toLocaleString()} ₽
							</p>
						)}
					</div>
				</div>

				<CardFooter
					className='p-0 flex items-end justify-center mt-2 sm:flex'
					onClick={e => e.stopPropagation()}
				>
					{isInCart() ? (
						<div className='rounded-lg w-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center min-h-[36px]'>
							<div className='flex items-center justify-between flex-row-reverse w-full px-4'>
								<Button size={'sm'} variant={'ghost'} onClick={handleIncrement}>
									<Plus />
								</Button>
								<div>
									<p>
										{
											CartItems.find(item => item.productId === product.id)
												?.quantity
										}
									</p>
								</div>
								<Button size={'sm'} variant={'ghost'} onClick={handleDecrement}>
									<Minus />
								</Button>
							</div>
						</div>
					) : (
						<Button
							disabled={isOutOfStock}
							onClick={handleAddToCart}
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

export default ProductCard
