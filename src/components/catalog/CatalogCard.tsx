import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import useCartStore from '@/storage/UseCartStore'
import { Minus, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import CatalogCarousel from './CatalogCarousel'
import { Product } from '@/storage/UseProductStore'

const ProductCard = ({ product }: { product: Product }) => {
	const router = useRouter()
	const isOutOfStock = product.stock === 0

	const { addItem, setCurrentItem, CartItems, updateItem, removeItem } =
		useCartStore()

	const { toast } = useToast()

	const handleAddToCart = () => {
		setCurrentItem({
			id: product.id,
			productId: product.id,
			price: product.price,
			userId: 1,
			quantity: 1,
			discountPrice: product.discountPrice ? product.discountPrice : undefined,
		})
		addItem()

		toast({
			title: 'Товар добавлен в корзину ✅',
			description: `Товар: ${product.name}`,
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

	return (
		<Card
			className='relative flex flex-col p-0 rounded-lg shadow-md bg-card group transition-shadow hover:shadow-lg no-select'
			onClick={handlePageCard} // Переход при клике на карточку
		>
			<CardHeader className='relative rounded-lg overflow-hidden p-0'>
				{/* Карусель или изображение */}
				<div onClick={e => e.stopPropagation() /* Останавливаем всплытие */}>
					{typeof product.img === 'string' ? (
						<Image
							draggable={false}
							src={
								typeof product.img === 'string' ? product.img : product.img[0]
							}
							alt={product.name}
							width={400}
							height={300}
							className='w-full h-40 object-cover'
						/>
					) : (
						<CatalogCarousel product={product} />
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
							{product.discountPrice ? (
								<span className='text-red-500 text-lg'>
									{product.discountPrice.toLocaleString()} ₽
								</span>
							) : (
								product.price.toLocaleString() + ' ₽'
							)}{' '}
						</p>
						{product.discountPrice && (
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
