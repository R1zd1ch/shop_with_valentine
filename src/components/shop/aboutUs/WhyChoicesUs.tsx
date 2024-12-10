import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { ThumbsUp, Truck, Star } from 'lucide-react'

const WhyChooseUs = () => {
	return (
		<Card className='w-full text-left bg-card text-card-foreground shadow-md border border-border  shadow-black/20'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-center'>
					Почему выбирают нас
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='flex items-start gap-4'>
					<ThumbsUp className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Гарантированное качество</h3>
						<p className='text-muted-foreground'>
							Мы продаём только оригинальную технику Apple с официальной
							гарантией.
						</p>
					</div>
				</div>
				<div className='flex items-start gap-4'>
					<Truck className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Быстрая доставка</h3>
						<p className='text-muted-foreground'>
							Оперативная доставка по всему региону в удобное для вас время.
						</p>
					</div>
				</div>
				<div className='flex items-start gap-4'>
					<Star className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Высокий уровень сервиса</h3>
						<p className='text-muted-foreground'>
							Дружелюбная поддержка и помощь на каждом этапе покупки.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default WhyChooseUs
