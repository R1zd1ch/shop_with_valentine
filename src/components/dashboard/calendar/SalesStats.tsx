import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const salesStats = [
	{ label: 'Продажи за неделю', value: '₽1,234,567' },
	{ label: 'Продажи за месяц', value: '₽5,678,901' },
	{ label: 'Рост продаж', value: '+15%' },
]

export default function SalesStats() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Статистика продаж</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='space-y-2'>
					{salesStats.map((stat, index) => (
						<li key={index} className='flex justify-between'>
							<span>{stat.label}</span>
							<span className='font-bold'>{stat.value}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
