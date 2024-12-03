'use client'

import { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../ui/card'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { useToast } from '@/hooks/use-toast'
import useCartStore from '@/storage/UseCartStore'

const CartRightSide = () => {
	const {
		total,
		discountTotal,
		appliedPromoCode,
		applyPromoCode,
		removePromoCode,
		clearCart,
		CartItems,
	} = useCartStore()

	const { toast } = useToast()
	const [promoCode, setPromoCode] = useState<string>('')
	const [benefit, setBenefit] = useState<number>(0)

	// Обработчик применения промокода
	const handleApplyPromoCode = () => {
		const success = applyPromoCode(promoCode)
		if (success) {
			toast({
				title: 'Промокод успешно применён',
				description: `Скидка была добавлена.`,
			})
		} else {
			toast({
				title: 'Неверный промокод',
				description: 'Пожалуйста, проверьте промокод и попробуйте ещё раз.',
			})
		}
	}

	// Обработчик удаления промокода
	const handleRemovePromoCode = () => {
		removePromoCode()
		toast({
			title: 'Промокод удалён',
			description: 'Промокод успешно удалён.',
		})
		setPromoCode('')
	}

	useEffect(() => {
		let totalBenefit = 0
		if (CartItems.length > 0) {
			CartItems.forEach(item => {
				// Если есть скидка, считаем выгоду
				totalBenefit += item.price * item.quantity
			})
			setBenefit(totalBenefit)
		}
	}, [total])

	let result = discountTotal ? discountTotal : total
	useEffect(() => {
		result = discountTotal ? discountTotal : total
	}, [discountTotal, total])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Итоговая стоимость</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex flex-row items-start relative'>
					<p className='text-semibold text-xl'>
						Сумма: {result.toFixed(2)}
						руб.
					</p>
					{benefit > result && CartItems.length > 0 && (
						<p className=' text-sm text-red-500 line-through'>
							{benefit.toFixed(2)}
						</p>
					)}
				</div>

				<p className='text-muted-foreground text-sm'>
					Убедитесь, что все товары добавлены в корзину и перейдите к оплате.
				</p>
				<div className='mt-6 flex flex-col min-h-[152px]'>
					{appliedPromoCode ? (
						<div className='flex flex-col gap-2'>
							<p>
								Применённый промокод: <strong>{appliedPromoCode.code}</strong>
							</p>
							<div className='flex gap-2 flex-col'>
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
				<div className='flex flex-row gap-2 items-center justify-between w-full'>
					<Button onClick={clearCart}>Очистить корзину</Button>
					<Button variant='default'>Перейти к оплате</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default CartRightSide
