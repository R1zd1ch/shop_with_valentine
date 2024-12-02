'use client'
import { useState } from 'react'
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
import useCartStore from '@/storage/UseCartStore' // Путь к zustand-хранилищу

const CartRightSide = () => {
	const {
		discountTotal,
		appliedPromoCode,
		applyPromoCode,
		removePromoCode,
		clearCart,
	} = useCartStore()

	const { toast } = useToast()
	const [promoCode, setPromoCode] = useState<string>('')

	const handleApplyPromoCode = () => {
		if (applyPromoCode(promoCode)) {
			toast({
				title: 'Промокод успешно применён',
				description: 'Скидка была добавлена.',
			})
		} else {
			toast({
				title: 'Неверный промокод',
				description: 'Пожалуйста, проверьте промокод и попробуйте ещё раз.',
			})
		}
	}

	const handleRemovePromoCode = () => {
		removePromoCode()
		toast({
			title: 'Промокод удалён',
			description: 'Промокод успешно удалён.',
		})
		setPromoCode('')
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Итоговая стоимость</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-semibold text-xl'>
					Сумма: {discountTotal.toFixed(2)} руб.
				</p>
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
				<Button onClick={clearCart}>Очистить корзину</Button>
			</CardFooter>
		</Card>
	)
}

export default CartRightSide
