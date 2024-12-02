import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle, Heart, Shield } from 'lucide-react'

const OurValues = () => {
	return (
		<Card className='w-full text-left bg-card text-card-foreground shadow-md border border-border  shadow-black/20'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-center'>
					Наши ценности
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='flex items-start gap-4'>
					<CheckCircle className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Качество</h3>
						<p className='text-muted-foreground'>
							Мы предлагаем только оригинальную продукцию Apple и гарантируем её
							надежность.
						</p>
					</div>
				</div>
				<div className='flex items-start gap-4'>
					<Heart className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Забота о клиентах</h3>
						<p className='text-muted-foreground'>
							Мы всегда рядом, чтобы помочь вам с выбором, настройкой и
							обслуживанием техники.
						</p>
					</div>
				</div>
				<div className='flex items-start gap-4'>
					<Shield className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Надежность</h3>
						<p className='text-muted-foreground'>
							Каждая сделка безопасна, а ваш комфорт и доверие — наш приоритет.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default OurValues
