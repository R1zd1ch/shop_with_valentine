'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import CardModel from './Card'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

const CardPreview = ({}) => {
	const [quantity, setQuantity] = useState<number | null>(null)
	const [isInCart, setIsInCart] = useState(false)
	const [isOutOfStock, setIsOutOfStock] = useState(false)
	const [isFavourite, setIsFavourite] = useState(false)

	useEffect(() => {
		if (quantity !== null && quantity > 0) {
			setIsInCart(true)
		}
	}, [quantity])

	const HandleIncrement = () => {
		setQuantity(quantity ? quantity + 1 : 1)
	}

	const HandleDecrement = () => {
		if (quantity === 1) {
			setIsInCart(false)
			setQuantity(null)
		}
		if (quantity && quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

	const props = {
		quantity,
		isInCart,
		HandleIncrement,
		HandleDecrement,
		isOutOfStock,
		isFavourite,
		setIsFavourite,
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Предпросмотр карточки</CardTitle>
				<CardDescription className='text-[12px] py-0 '>
					*Здесь вы можете увидеть, как карточка будет выглядеть в каталоге
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-row items-center justify-center'>
				<CardModel {...props}></CardModel>
			</CardContent>
			<CardFooter className='flex flex-col gap-2'>
				<CardDescription className='text-[12px] py-0 '>
					Кнопки для событий карточки
				</CardDescription>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row gap-2'>
						<Button
							onClick={HandleDecrement}
							disabled={isOutOfStock || quantity === 0 || quantity === null}
						>
							<Minus></Minus>
						</Button>
						<Button
							onClick={() => {
								setQuantity(quantity ? quantity + 1 : 1)
							}}
							disabled={isOutOfStock || isInCart}
						>
							Добавить в корзину
						</Button>
						<Button
							onClick={HandleIncrement}
							disabled={isOutOfStock || quantity === null || quantity === 0}
						>
							<Plus></Plus>
						</Button>
					</div>
					<div className='flex flex-row gap-2'>
						<Button
							onClick={() => {
								setIsOutOfStock(!isOutOfStock)
								setIsInCart(false)
								setQuantity(0)
							}}
						>
							Закончился товар
						</Button>
						<Button
							className='w-full'
							onClick={() => setIsFavourite(!isFavourite)}
						>
							{isFavourite ? 'Удалить' : 'В избранное'}
						</Button>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}

export default CardPreview
