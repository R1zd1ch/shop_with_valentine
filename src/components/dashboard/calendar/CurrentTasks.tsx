'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useCalendarStore } from '@/storage/UseCalendarStore'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const getEventTypeColor = (type: string) => {
	switch (type) {
		case 'delivery':
			return 'bg-blue-500'
		case 'promotion':
			return 'bg-red-500'
		case 'profitable':
			return 'bg-green-500'
		case 'meeting':
			return 'bg-purple-500'
		case 'task':
			return 'bg-yellow-500'
		default:
			return 'bg-gray-500'
	}
}

export default function CurrentTasks() {
	const { events, toggleEventCompletion } = useCalendarStore()
	const [timeRange, setTimeRange] = useState('today')

	const filterEvents = () => {
		const now = new Date()
		const startOfDay = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		)
		const endOfDay = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			23,
			59,
			59
		)

		switch (timeRange) {
			case 'today':
				return events.filter(
					event => event.start >= startOfDay && event.end <= endOfDay
				)
			case 'tomorrow':
				const tomorrow = new Date(now)
				tomorrow.setDate(tomorrow.getDate() + 1)
				const startOfTomorrow = new Date(
					tomorrow.getFullYear(),
					tomorrow.getMonth(),
					tomorrow.getDate()
				)
				const endOfTomorrow = new Date(
					tomorrow.getFullYear(),
					tomorrow.getMonth(),
					tomorrow.getDate(),
					23,
					59,
					59
				)
				return events.filter(
					event => event.start >= startOfTomorrow && event.end <= endOfTomorrow
				)
			case 'week':
				const endOfWeek = new Date(now)
				endOfWeek.setDate(endOfWeek.getDate() + 7)
				return events.filter(
					event => event.start >= now && event.end <= endOfWeek
				)
			case 'all':
				return events.filter(event => event.end >= now)
			default:
				return events
		}
	}

	const filteredEvents = filterEvents().sort(
		(a, b) => a.start.getTime() - b.start.getTime()
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex justify-between items-center'>
					<span>Текущие задачи</span>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Выберите период' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='today'>Сегодня</SelectItem>
							<SelectItem value='tomorrow'>Завтра</SelectItem>
							<SelectItem value='week'>Неделя</SelectItem>
							<SelectItem value='all'>Все</SelectItem>
						</SelectContent>
					</Select>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='space-y-2'>
					{filteredEvents.map(event => (
						<li key={event.id} className='flex items-center space-x-2'>
							<Checkbox
								checked={event.completed}
								onCheckedChange={() => toggleEventCompletion(event.id)}
							/>
							<span className={event.completed ? 'line-through' : ''}>
								{event.title}
							</span>
							<Badge className={`ml-2 ${getEventTypeColor(event.type)}`}>
								{event.type}
							</Badge>
							<span className='text-muted-foreground ml-auto'>
								{event.start.toLocaleString([], {
									month: 'short',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
