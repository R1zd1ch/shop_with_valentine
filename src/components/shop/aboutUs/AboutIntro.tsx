import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Info } from 'lucide-react'

const AboutIntro = () => {
	return (
		<Card className='w-full text-left bg-card text-card-foreground shadow-md border border-border shadow-black/20'>
			<CardHeader className='flex items-center gap-3 flex-row justify-center'>
				<Info className='text-primary h-6 w-6' />
				<CardTitle className='text-2xl font-bold'>О нас</CardTitle>
			</CardHeader>
			<CardContent className='text-lg leading-relaxed space-y-4'>
				<p>
					Мы —{' '}
					<strong className='font-semibold'>
						компания, специализирующаяся на технике и современных технологиях.
					</strong>
				</p>
				<p>
					Наша миссия — предлагать{' '}
					<span className='text-primary font-medium'>лучшие решения</span> в
					сфере техники, чтобы упростить вашу жизнь.
				</p>
				<p>
					Мы верим, что качественная техника должна быть доступной каждому, а
					инновации способны улучшить ваш повседневный опыт.
				</p>
			</CardContent>
		</Card>
	)
}

export default AboutIntro
