'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCalendarStore } from '@/storage/UseCalendarStore'

const getEventTypeColor = (type: string) => {
	switch (type) {
		case 'delivery':
			return 'bg-blue-500'
		case 'promotion':
			return 'bg-red-500'
		case 'profitable':
			return 'bg-green-500'
		default:
			return 'bg-gray-500'
	}
}

const eventType: Record<string, string> = {
	delivery: 'Доставка',
	promotion: 'Акция',
	profitable: 'Прибыльный день',
}

export default function UpcomingEvents() {
	const { events } = useCalendarStore()
	console.log('aaaa', events)
	const upcomingEvents = events
		.filter(event => event.start > new Date())
		.sort((a, b) => a.start.getTime() - b.start.getTime())
		.slice(0, 5)

	console.log('bbbb', upcomingEvents)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Предстоящие события</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='space-y-2'>
					{upcomingEvents.map(event => (
						<li key={event.id} className='flex justify-between items-center'>
							<div>
								<span>{event.title}</span>
								<Badge
									className={`ml-2 ${getEventTypeColor(event.type)}`}
									// {eventType[event.type]}
								>
									{' '}
									{eventType[event.type]}
								</Badge>
							</div>
							<span className='text-muted-foreground'>
								{event.start.toLocaleDateString()}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
