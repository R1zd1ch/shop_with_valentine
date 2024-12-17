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

export const useCalendarStore = create<CalendarStore>((set, get) => ({
	events: [],
	addEvent: event => {
		console.log(get().events)
		set(state => ({ events: [...state.events, event] }))
	},
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
