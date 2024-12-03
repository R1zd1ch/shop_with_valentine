'use client'
import { FC, useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useToast } from '@/hooks/use-toast'

interface CartItem {
	price: number
	discountPrice?: number
	quantity: number
}

interface CartRightSide {
	cartItems: CartItem[]
}

const CartRightSide: FC<CartRightSide> = ({ cartItems }) => {
	const [totalPrice, setTotalPrice] = useState(0)
	const [originalPrice, setOriginalPrice] = useState(0)
	const { toast } = useToast()
	const currency = 'руб.'

	const [promoCode, setPromoCode] = useState<string>('')
	const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null)

	useEffect(() => {
		const original = cartItems.reduce(
			(acc, item) => acc + (item.discountPrice ?? item.price) * item.quantity,
			0
		)
		setOriginalPrice(original)
		setTotalPrice(original)
	}, [cartItems])

	const handleApplyPromoCode = () => {
		if (promoCode === 'DISCOUNT10') {
			setAppliedPromoCode(promoCode)
			toast({
				title: 'Промокод успешно применён',
				description: 'Скидка 10% была добавлена.',
			})
			setTotalPrice(originalPrice * 0.9)
		} else if (promoCode === 'SAVE50') {
			setAppliedPromoCode(promoCode)
			toast({
				title: 'Промокод успешно применён',
				description: 'Скидка 50 рублей была добавлена.',
			})
			setTotalPrice(Math.max(originalPrice - 50, 0))
		} else {
			toast({
				title: 'Неверный промокод',
				description: 'Пожалуйста, попробуйте ещё раз.',
			})
		}
	}

	const handleRemovePromoCode = () => {
		setAppliedPromoCode(null)
		setPromoCode('')
		setTotalPrice(originalPrice)
	}

	const handleEditPromoCode = () => {
		setAppliedPromoCode(null)
		setTotalPrice(originalPrice)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Итоговая стоимость</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-semibold text-xl'>
					Сумма: {totalPrice.toFixed(2)} {currency}
				</p>
				<p className='text-muted-foreground text-sm'>
					Убедитесь, что все товары добавлены в корзину и перейдите к оплате.
				</p>
				<div className='mt-6 flex flex-col min-h-[152px]'>
					{appliedPromoCode ? (
						<div className='flex flex-col gap-2'>
							<p>
								Применённый промокод: <strong>{appliedPromoCode}</strong>
							</p>
							<div className='flex gap-2 flex-col'>
								<Button variant='secondary' onClick={handleEditPromoCode}>
									Изменить промокод
								</Button>
								<Button variant='secondary' onClick={handleRemovePromoCode}>
									Удалить промокод
								</Button>
							</div>
						</div>
					) : (
						<div>
							<Label>
								<p className='mb-2 text-base'>
									Введите промокод, если у вас он есть:
								</p>
								<Input
									value={promoCode}
									onChange={e => setPromoCode(e.target.value)}
									placeholder='Введите промокод'
								/>
							</Label>
							<Button className='mt-4' onClick={handleApplyPromoCode}>
								Применить
							</Button>
						</div>
					)}
				</div>
			</CardContent>
			<CardFooter>
				<Button>Перейти к оплате</Button>
			</CardFooter>
		</Card>
	)
}

export default CartRightSide
