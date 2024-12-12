'use client'

import { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	useCalendarStore,
	CalendarEvent,
	EventType,
} from '@/storage/UseCalendarStore'
import { v4 as uuidv4 } from 'uuid'
import CustomToolbar from './CustomToolbar'

moment.locale('ru')
const localizer = momentLocalizer(moment)

const eventStyleGetter = (event: CalendarEvent) => {
	const style: React.CSSProperties = {
		backgroundColor: '',
		borderRadius: '5px',
		opacity: 0.8,
		color: 'white',
		border: '0px',
		display: 'block',
	}

	const colorMapping: Record<string, string> = {
		delivery: 'hsl(var(--chart-1))',
		promotion: 'hsl(var(--chart-2))',
		profitable: 'hsl(var(--chart-3))',
		meeting: 'hsl(var(--chart-4))',
		task: 'hsl(var(--chart-5))',
	}

	style.backgroundColor = colorMapping[event.type] || 'hsl(var(--muted))'

	if (event.completed) {
		style.textDecoration = 'line-through'
		style.opacity = 0.5
	}

	return { style }
}

export default function Calendar() {
	const { events, addEvent, toggleEventCompletion } = useCalendarStore()
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [showAddEventDialog, setShowAddEventDialog] = useState(false)
	const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
		title: '',
		start: new Date(),
		end: new Date(),
		type: 'task',
	})
	const [customType, setCustomType] = useState('')

	const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
		setNewEvent({ ...newEvent, start: slotInfo.start, end: slotInfo.end })
		setShowAddEventDialog(true)
	}

	const handleAddEvent = () => {
		const eventType = newEvent.type === 'custom' ? customType : newEvent.type
		addEvent({ ...newEvent, id: uuidv4(), type: eventType })
		setShowAddEventDialog(false)
		setNewEvent({ title: '', start: new Date(), end: new Date(), type: 'task' })
		setCustomType('')
	}

	const handleSelectEvent = (event: CalendarEvent) => {
		toggleEventCompletion(event.id)
	}

	return (
		<div className='h-[600px]'>
			<BigCalendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: '100%' }}
				date={selectedDate}
				onNavigate={date => setSelectedDate(date)}
				eventPropGetter={eventStyleGetter}
				selectable
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleSelectEvent}
				components={{
					toolbar: props => (
						<CustomToolbar
							onView={action => props.onView(action)}
							label={props.label}
							View='month'
							onNavigate={action => {
								if (action === 'TODAY') {
									setSelectedDate(new Date())
								} else if (action === 'PREV' || action === 'NEXT') {
									props.onNavigate(action)
								} else {
									setSelectedDate(action as Date)
								}
							}}
						/>
					),
				}}
				className='bg-card text-card-foreground shadow-md'
			/>
			<Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
				<DialogContent className='bg-card text-card-foreground rounded-lg shadow-lg'>
					<DialogHeader>
						<DialogTitle>Добавить событие</DialogTitle>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='title' className='text-right'>
								Название
							</Label>
							<Input
								id='title'
								value={newEvent.title}
								onChange={e =>
									setNewEvent({ ...newEvent, title: e.target.value })
								}
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='type' className='text-right'>
								Тип
							</Label>
							<select
								id='type'
								value={newEvent.type}
								onChange={e =>
									setNewEvent({
										...newEvent,
										type: e.target.value as EventType,
									})
								}
								className='col-span-3 bg-muted text-muted-foreground'
							>
								<option value='delivery'>Поставка</option>
								<option value='promotion'>Акция</option>
								<option value='profitable'>Прибыльный день</option>
								<option value='meeting'>Встреча</option>
								<option value='task'>Задача</option>
								<option value='custom'>Другое (указать)</option>
							</select>
						</div>
						{newEvent.type === 'custom' && (
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='customType' className='text-right'>
									Свой тип
								</Label>
								<Input
									id='customType'
									value={customType}
									onChange={e => setCustomType(e.target.value)}
									className='col-span-3'
								/>
							</div>
						)}
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='start' className='text-right'>
								Начало
							</Label>
							<Input
								id='start'
								type='datetime-local'
								value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
								onChange={e =>
									setNewEvent({ ...newEvent, start: new Date(e.target.value) })
								}
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='end' className='text-right'>
								Конец
							</Label>
							<Input
								id='end'
								type='datetime-local'
								value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
								onChange={e =>
									setNewEvent({ ...newEvent, end: new Date(e.target.value) })
								}
								className='col-span-3'
							/>
						</div>
					</div>
					<Button
						onClick={handleAddEvent}
						className='bg-primary text-primary-foreground hover:bg-primary-foreground'
					>
						Добавить событие
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	)
}