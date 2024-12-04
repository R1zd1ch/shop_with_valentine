import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Product } from '@/storage/UseProductStore'
import useCartStore from '@/storage/UseCartStore'
import useFavouritesStore from '@/storage/UseFavourites'
import { Minus, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const PreviewsButtons = ({
	userId,
	product,
}: {
	userId: number
	product: Product
}) => {
	const { addItem, setCurrentItem, CartItems, updateItem, removeItem } =
		useCartStore()
	const {
		addFavourite,
		removeFavouriteByUserAndProduct,
		isFavouriteByUserAndProduct,
	} = useFavouritesStore()
	const { toast } = useToast()

	// Проверка, есть ли товар в корзине
	const isInCart = () => CartItems.some(item => item.productId === product.id)

	// Добавление товара в корзину
	const handleAddToCart = () => {
		setCurrentItem({
			id: product.id,
			productId: product.id,
			price: product.price,
			userId,
			quantity: 1,
			discountPrice: product.discountPrice ? product.discountPrice : undefined,
		})
		addItem()

		toast({
			title: 'Товар добавлен в корзину ✅',
			description: `Товар: ${product.name}`,
		})
	}

	const isFavourite = isFavouriteByUserAndProduct(userId, product.id)

	const handleAddToFavourite = () => {
		addFavourite({
			id: Date.now(),
			productId: product.id,
			userId,
		})

		toast({
			title: 'Товар добавлен в избранное ✅',
			description: `Товар: ${product.name}`,
		})
	}

	const handleRemoveFromFavourite = () => {
		removeFavouriteByUserAndProduct(userId, product.id)

		toast({
			title: 'Товар удален из избранного ❌',
			description: `Товар: ${product.name}`,
		})
	}
	const isOutOfStock = product.stock === 0
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

	return (
		<Card className='w-full h-full flex items-center justify-center min-h-[100px]'>
			<div className='flex gap-2 flex-row-reverse'>
				{/* Кнопка добавления/удаления из избранного */}
				<Button
					onClick={
						isFavourite ? handleRemoveFromFavourite : handleAddToFavourite
					}
					className={`py-2 text-sm font-medium  ${
						isFavourite ? '' : ' text-primary-foreground'
					}`}
				>
					<div className='flex items-center gap-2 justify-between w-full'>
						{isFavourite ? <FaHeart></FaHeart> : <FaRegHeart></FaRegHeart>}
					</div>
				</Button>

				{/* Кнопка добавления в корзину */}
				{isInCart() && (
					<div className='rounded-lg w-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center min-h-[36px] min-w-[100px]'>
						<div className='flex items-center justify-between flex-row-reverse w-full '>
							<Button variant={'ghost'} size={'sm'} onClick={handleIncrement}>
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
							<Button variant={'ghost'} size={'sm'} onClick={handleDecrement}>
								<Minus></Minus>
							</Button>
						</div>
					</div>
				)}
				{!isInCart() && (
					<Button
						disabled={isOutOfStock}
						onClick={handleAddToCart}
						className={` py-2 rounded-lg w-full text-sm font-medium min-w-[100px] ${
							isOutOfStock
								? 'bg-muted text-muted-foreground cursor-not-allowed'
								: 'bg-primary text-primary-foreground '
						}`}
					>
						{isOutOfStock ? 'Нет в наличии' : 'В корзину'}
					</Button>
				)}
			</div>
		</Card>
	)
}

export default PreviewsButtons
