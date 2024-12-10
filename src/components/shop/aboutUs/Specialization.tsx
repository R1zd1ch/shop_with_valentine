import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Smartphone, Monitor, Headphones } from 'lucide-react'

const Specialization = () => {
	return (
		<Card className='w-full  text-left bg-card text-card-foreground shadow-md border border-border  shadow-black/20'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-center'>
					Наша специализация
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='flex items-start gap-4'>
					<Smartphone className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Смартфоны и планшеты</h3>
						<p className='text-muted-foreground'>
							Широкий ассортимент iPhone и iPad с гарантией качества и доступной
							ценой.
						</p>
					</div>
				</div>
				<div className='flex items-start gap-4'>
					<Monitor className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Компьютеры и ноутбуки</h3>
						<p className='text-muted-foreground'>
							Мы предлагаем последние модели MacBook и iMac для работы,
							творчества и развлечений.
						</p>
					</div>
				</div>
				<div className='flex items-start gap-4'>
					<Headphones className='text-primary h-6 w-6' />
					<div>
						<h3 className='font-semibold text-lg'>Аксессуары</h3>
						<p className='text-muted-foreground'>
							Наушники, чехлы, зарядные устройства и другие оригинальные
							аксессуары Apple.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default Specialization
