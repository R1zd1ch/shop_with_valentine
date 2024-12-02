import Link from 'next/link'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'

const testimonials = [
	{
		id: 1,
		name: 'Анна Иванова',
		title: 'Постоянный клиент',
		feedback:
			'Отличный магазин! Товары всегда качественные, доставка быстрая. Всегда довольна покупками.',
		image: '/images/user1.jpg',
	},
	{
		id: 2,
		name: 'Иван Петров',
		title: 'Фотограф',
		feedback:
			'Купил камеру и объектив, качество просто на высоте! Консультанты помогли с выбором, рекомендую.',
		image: '/images/user2.jpg',
	},
	{
		id: 3,
		name: 'Екатерина Сидорова',
		title: 'Геймер',
		feedback:
			'Никогда не думала, что Nintendo Switch принесёт столько радости! Спасибо за рекомендации!',
		image: '/images/user3.jpg',
	},
]

const Testimonials = () => {
	return (
		<Card className='px-4 sm:px-6 py-8 bg-muted/10 rounded-lg shadow-lg'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
				<h2 className='text-2xl sm:text-3xl font-bold text-card-foreground mb-4 sm:mb-0'>
					Отзывы наших клиентов
				</h2>
				<Link
					href='/reviews'
					className='transition duration-300 hover:text-primary text-muted-foreground font-bold text-sm sm:text-base'
				>
					Все отзывы
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
				{testimonials.map(testimonial => (
					<Card
						key={testimonial.id}
						className='flex flex-col items-center text-center bg-card rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow dark:shadow-white/10'
					>
						{/* User Avatar */}
						<CardHeader>
							<div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4'>
								<Image
									src={'https://via.placeholder.com/150x150'}
									alt={testimonial.name}
									width={96}
									height={96}
									className='object-cover'
								/>
							</div>
						</CardHeader>
						{/* Name and Title */}
						<CardContent>
							<h3 className='text-base sm:text-lg font-semibold text-foreground'>
								{testimonial.name}
							</h3>
							<p className='text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4'>
								{testimonial.title}
							</p>
							{/* Feedback */}
							<p className='text-xs sm:text-sm text-muted-foreground italic'>
								“{testimonial.feedback}”
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</Card>
	)
}

export default Testimonials
