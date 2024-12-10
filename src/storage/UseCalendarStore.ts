import { create } from 'zustand'

export type EventType =
	| 'delivery'
	| 'promotion'
	| 'profitable'
	| 'meeting'
	| 'task'
	| 'other'
	| string

export interface CalendarEvent {
	id: string
	title: string
	start: Date
	end: Date
	type: EventType
	completed?: boolean
}

interface CalendarStore {
	events: CalendarEvent[]
	addEvent: (event: CalendarEvent) => void
	removeEvent: (id: string) => void
	updateEvent: (id: string, updatedEvent: Partial<CalendarEvent>) => void
	toggleEventCompletion: (id: string) => void
}

export const useCalendarStore = create<CalendarStore>(set => ({
	events: [
		{
			id: '1',
			title: 'Поступление новых iPhone',
			start: new Date(2023, 5, 15, 10, 0),
			end: new Date(2023, 5, 15, 12, 0),
			type: 'delivery',
		},
		{
			id: '2',
			title: 'Распродажа ноутбуков',
			start: new Date(2023, 5, 20, 9, 0),
			end: new Date(2023, 5, 22, 18, 0),
			type: 'promotion',
		},
		{
			id: '3',
			title: 'Прибыльный день',
			start: new Date(2023, 5, 25, 0, 0),
			end: new Date(2023, 5, 25, 23, 59),
			type: 'profitable',
		},
	],
	addEvent: event => set(state => ({ events: [...state.events, event] })),
	removeEvent: id =>
		set(state => ({ events: state.events.filter(event => event.id !== id) })),
	updateEvent: (id, updatedEvent) =>
		set(state => ({
			events: state.events.map(event =>
				event.id === id ? { ...event, ...updatedEvent } : event
			),
		})),
	toggleEventCompletion: id =>
		set(state => ({
			events: state.events.map(event =>
				event.id === id ? { ...event, completed: !event.completed } : event
			),
		})),
}))
