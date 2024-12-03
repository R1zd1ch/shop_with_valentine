import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'

import { useToast } from '@/hooks/use-toast'
import useCartStore from '@/storage/UseCartStore'
import { Heart, Minus, Plus } from 'lucide-react'
import ProductDetailsDialog, { Product } from './ProductDetailsDialog'

const InformationCard = ({ product }: { product: Product }) => {
	const { addItem, setCurrentItem, CartItems, updateItem, removeItem } =
		useCartStore()

	const { toast } = useToast()
	const isOutOfStock = product.stock === 0
	const handleAddToCart = () => {
		setCurrentItem({
			id: product.id,
			productId: product.id,
			price: product.price,
			userId: 1,
			quantity: 1,
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

	return (
		<Card className='flex flex-col flex-1 rounded-lg bg-card shadow-md border text-card-foreground shadow-black/20 w-full'>
			<CardHeader className='p-10 pb-2 flex flex-row justify-between'>
				<div>
					<CardTitle className=' font-bold'>{product.name}</CardTitle>
					<CardDescription className='text-sm text-muted-foreground'>
						Категория: {product.category}
					</CardDescription>
				</div>
				<div className='relative'>
					<p className='text-2xl font-bold text-primary'>${product.price}</p>
					<div>
						<p
							className={`text-sm absolute -bottom-2 md:-bottom-2 right-0 ${
								product.stock > 0 ? 'text-green-600' : 'text-destructive'
							}`}
						>
							{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
						</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className='px-8 mt-12 md:mt-10 flex flex-col gap-4'>
				<div>
					<p className='font-semibold '>Описание:</p>
					<p className='text-sm text-muted-foreground line-clamp-3'>
						{product.description}
					</p>
				</div>
				<div className='flex flex-col'>
					<p className='font-semibold'>Характеристики:</p>
					<div className='text-sm flex flex-row gap-32 w-full'>
						<div>
							<p>Цвет</p>
							<p>Память</p>
							<p>Совместимость</p>
						</div>
						<div>
							<p>{product.color}</p>
							<p>{product.memory}</p>
							<p>{product.compatibility}</p>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center mt-5'>
					<ProductDetailsDialog product={product}></ProductDetailsDialog>
				</div>
			</CardContent>
			<CardFooter>
				<div className='flex w-2/3 items-center justify-center mt-4 gap-4  sm:flex mx-auto'>
					{isInCart() && (
						<div className='rounded-lg w-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center min-h-[36px]'>
							<div className='flex items-center justify-between flex-row-reverse w-full px-4'>
								<Button variant={'ghost'} onClick={handleIncrement}>
									<Plus></Plus>
								</Button>
								<div>
									<p>
										{
											CartItems.find(item => item.productId === product.id)
												?.quantity
										}
									</p>
								</div>
								<Button variant={'ghost'} onClick={handleDecrement}>
									<Minus></Minus>
								</Button>
							</div>
						</div>
					)}
					{!isInCart() && (
						<Button
							disabled={isOutOfStock}
							onClick={handleAddToCart}
							className={` py-2 rounded-lg w-full text-sm font-medium ${
								isOutOfStock
									? 'bg-muted text-muted-foreground cursor-not-allowed'
									: 'bg-primary text-primary-foreground '
							}`}
						>
							{isOutOfStock ? 'Нет в наличии' : 'В корзину'}
						</Button>
					)}

					<Button
						disabled={isOutOfStock}
						onClick={handleAddToCart}
						className={`py-2 rounded-lg text-sm font-medium `}
					>
						<Heart></Heart>
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default InformationCard