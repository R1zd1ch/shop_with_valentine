import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const ContactInfo = () => {
	return (
		<Card className='w-full p-6 bg-gradient-to-br from-muted to-card shadow-md rounded-lg'>
			<CardHeader>
				<CardTitle className='text-3xl font-bold text-card-foreground'>
					Свяжитесь с нами
				</CardTitle>
			</CardHeader>
			<CardContent className='w-full'>
				<div className='space-y-6 md:space-y-0 flex flex-col md:flex-row md:gap-12 md:items-center md:justify-center'>
					{/* Адрес */}
					<div className='flex items-center space-x-4'>
						<MapPin className='text-primary w-6 h-6' />
						<div>
							<h3 className='text-lg font-semibold text-muted-foreground'>
								Адрес:
							</h3>
							<p className='text-base text-foreground'>
								г. Москва, ул. Технопарковая, д. 10
							</p>
						</div>
					</div>
					{/* Телефон */}
					<div className='flex items-center space-x-4'>
						<Phone className='text-primary w-6 h-6' />
						<div>
							<h3 className='text-lg font-semibold text-muted-foreground'>
								Телефон:
							</h3>
							<p className='text-base text-foreground'>
								<a
									href='tel:+78001234567'
									className='text-primary hover:underline font-medium'
								>
									+7 (800) 123-45-67
								</a>
							</p>
						</div>
					</div>
					{/* Часы работы */}
					<div className='flex items-center space-x-4'>
						<Clock className='text-primary w-6 h-6' />
						<div>
							<h3 className='text-lg font-semibold text-muted-foreground'>
								Часы работы:
							</h3>
							<ul className='text-base text-foreground'>
								<li>Пн–Пт: 9:00 – 20:00</li>
								<li>Суббота: 10:00 – 18:00</li>
								<li>Воскресенье: выходной</li>
							</ul>
						</div>
					</div>
					{/* Email */}
					<div className='flex items-center space-x-4'>
						<Mail className='text-primary w-6 h-6' />
						<div>
							<h3 className='text-lg font-semibold text-muted-foreground'>
								Email:
							</h3>
							<p className='text-base text-foreground'>
								<a
									href='mailto:support@techstore.com'
									className='text-primary hover:underline font-medium'
								>
									support@techstore.com
								</a>
							</p>
						</div>
					</div>
				</div>
				{/* Разделитель */}
				<div className='mt-6 border-t border-muted pt-6 text-center'>
					<p className='text-sm text-muted-foreground'>
						Или посетите наш офис по указанному адресу!
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default ContactInfo
